import { useSheep } from './use-sheep';
import type SheepCard from '../sheep-card';

export function useMainFeature() {
  const { xUnit, yUnit, sheepCardX, cardWrapStyle, leftOffset, getCardList } = useSheep();
  let timer: null | NodeJS.Timeout = null;
  const option = reactive({
    x: 6,
    y: 4,
    z: 8,
    cardRandom: 0.2,
    maxCardTypeNum: 11,
    maxPickNum: 3
  });
  const step = ref<number>(0);
  const result = ref<boolean>(false);
  const cardList = ref<SheepCard[]>([]);
  const penddingList = ref<SheepCard[]>([]); // 暂存中的消除卡片列表
  const clearList = ref<SheepCard[]>([]); // 已消除卡片列表
  const pickList = ref<SheepCard[]>([]); // 取出的卡片列表
  const tools = reactive({
    pick: true,
    rand: true
  });
  let calcValueList: number[] = [];

  // 回到设置
  const setGame = () => {
    step.value = 0;
  };

  /**
   * 生成游戏
   */
  const initGame = () => {
    step.value = 1;
    cardList.value = getCardList(option);
    penddingList.value = [];
    clearList.value = [];
    pickList.value = [];
    tools.pick = true;
    tools.rand = true;
    _setCardValue({ maxCardTypeNum: Number(option.maxCardTypeNum) });
    _calcCover();
  };
  /**
   * 设置卡片
   * @param {number} maxCardTypeNum 最大卡片种类数
   * @return {*}
   */
  const _setCardValue = ({ maxCardTypeNum }: { maxCardTypeNum: number }) => {
    // 卡片种类
    const valStack = new Array(maxCardTypeNum);
    calcValueList = new Array(maxCardTypeNum + 1).fill(0);
    // 给卡片设置值
    cardList.value?.forEach(item => {
      const value = Math.ceil(Math.random() * maxCardTypeNum);
      if (valStack[value]) {
        valStack[value].push(item);
        if (valStack[value].length === 3) {
          valStack[value].forEach((item: { setValue: (arg0: number) => void }) => {
            item.setValue(value);
          });
          valStack[value] = null;
        }
      } else {
        valStack[value] = [item];
      }
    });

    let count = 2;
    valStack.forEach(list => {
      list?.forEach((item: SheepCard) => {
        count++;
        item.setValue(Math.floor(count / 3));
      });
    });
  };
  /**
   * 计算遮挡关系
   * @return {*}
   */
  const _calcCover = () => {
    // 构建一个遮挡 map
    const coverMap = new Array(yUnit.value);
    for (let i = 0; i <= yUnit.value; i++) {
      coverMap[i] = new Array(xUnit.value).fill(false);
    }
    // 从后往前，后面的层数高
    for (let i = cardList.value.length - 1; i >= 0; i--) {
      const item = cardList.value[i];
      const { x, y } = item;

      if (coverMap?.[y]?.[x]) {
        item.cover = true;
      } else if (coverMap?.[y]?.[x + 1]) {
        item.cover = true;
      } else if (coverMap?.[y + 1]?.[x]) {
        item.cover = true;
      } else if (coverMap?.[y + 1]?.[x + 1]) {
        item.cover = true;
      } else {
        item.cover = false;
      }
      coverMap[y][x] = true;
      coverMap[y + 1][x] = true;
      coverMap[y][x + 1] = true;
      coverMap[y + 1][x + 1] = true;
    }
  };
  /**
   * 消除3个一样的卡片
   */
  const _removeThreeCard = () => {
    penddingList.value.some(item => {
      if (calcValueList[item.val] === 3) {
        penddingList.value.forEach(newItem => {
          if (newItem.val === item.val) {
            clearList.value.push(newItem);
          }
        });
        setTimeout(() => {
          clearList.value.forEach(item => {
            item.style.left = leftOffset.value - 60 + 'px';
          });
        }, 300);

        penddingList.value = penddingList.value.filter(newItem => {
          return newItem.val !== item.val;
        });
        penddingList.value.forEach((item, index) => {
          item.style.top = '90%';
          item.style.left = leftOffset.value + index * sheepCardX * 2 + 'px';
        });
        calcValueList[item.val] = 0;
        if (cardList.value.length === 0) {
          step.value = 2;
          result.value = true;
        }
      }
    });

    if (penddingList.value.length >= 7) {
      step.value = 2;
      result.value = false;
    }
  };

  // 点击卡片
  const onClickCard = (item: SheepCard) => {
    timer && clearTimeout(timer);
    _removeThreeCard();
    penddingList.value.push(item);
    const index = cardList.value.indexOf(item);
    cardList.value = cardList.value.slice(0, index).concat(cardList.value.slice(index + 1));
    _calcCover();
    calcValueList[item.val]++;
    setTimeout(() => {
      item.style.top = '90%';
      item.style.left = leftOffset.value + (penddingList.value.length - 1) * sheepCardX * 2 + 'px';
    }, 0);

    timer = setTimeout(() => {
      _removeThreeCard();
    }, 500);
  };

  const onClickPickCard = (item: SheepCard) => {
    cardList.value.push(item);
    const index = pickList.value.indexOf(item);
    pickList.value = pickList.value.slice(0, index).concat(pickList.value.slice(index + 1));
    onClickCard(item);
  };
  /**
   * @description: 取出三个选中的卡片
   */
  const onPickCard = () => {
    if (!tools.pick) {
      return false;
    }
    tools.pick = false;
    pickList.value = penddingList.value.slice(0, option.maxPickNum);
    setTimeout(() => {
      pickList.value.forEach((item: SheepCard, index: number) => {
        item.style.top = '70%';
        item.style.left = leftOffset.value + index * sheepCardX * 2 + 'px';
        calcValueList[item.val]--;
      });
    }, 0);
    penddingList.value = penddingList.value.slice(option.maxPickNum);
    penddingList.value.forEach((item: SheepCard, index: number) => {
      item.style.top = '90%';
      item.style.left = leftOffset.value + index * sheepCardX * 2 + 'px';
    });
  };

  /**
   * @description: 随机卡片
   */
  const onRandCard = () => {
    if (!tools.rand) {
      return;
    }
    tools.rand = false;
    const length = cardList.value.length;
    cardList.value?.forEach((item: SheepCard) => {
      const randNum = Math.floor(length * Math.random());
      const newItem: SheepCard = cardList.value[randNum];
      let temp;
      temp = item.style.left;
      item.style.left = newItem.style.left;
      newItem.style.left = temp;
      temp = item.style.top;
      item.style.top = newItem.style.top;
      newItem.style.top = temp;
      temp = item.x;
      item.x = newItem.x;
      newItem.x = temp;
      temp = item.y;
      item.y = newItem.y;
      newItem.y = temp;
      temp = item.z;
      item.z = newItem.z;
      newItem.z = temp;
    });

    cardList.value.sort((a: { z: number }, b: { z: number }) => a.z - b.z);
    _calcCover();
  };

  return {
    cardList,
    penddingList,
    clearList,
    pickList,
    option,
    tools,
    step,
    result,
    cardWrapStyle,
    initGame,
    setGame,
    onClickPickCard,
    onClickCard,
    onPickCard,
    onRandCard
  };
}
