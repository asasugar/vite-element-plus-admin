<!--
 * @Description: 🐑了个🐑
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-12-08 17:08:51
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-12 18:40:05
-->

<template>
  <AsPageWrapper header-title="🐑了个🐑">
    <template #bodyContent>
      <div v-if="step === 0" class="intro">
        <div>
          横向卡片最大平铺排数
          <input v-model="option.x" min="2" max="10" type="range" /> {{ option.x }}
        </div>
        <div>
          纵向卡片最大平铺排数
          <input v-model="option.y" min="2" max="10" type="range" /> {{ option.y }}
        </div>
        <div>
          卡片最大堆叠层数
          <input v-model="option.z" min="2" max="10" type="range" /> {{ option.z }}
        </div>
        <div>
          卡片密度
          <input v-model="option.cardRandom" min="0" max="1" step="0.1" type="range" />
          {{ option.cardRandom }}
        </div>
        <div>
          最大卡片种类
          <input v-model="option.maxCardTypeNum" min="3" max="14" step="1" type="range" />
          {{ option.maxCardTypeNum }}
        </div>
        <div>
          可取出卡片数
          <input v-model="option.maxPickNum" min="0" max="5" step="1" type="range" />
          {{ option.maxPickNum }}
        </div>
        <br />
        <el-button @click="handleStartGame">开始游戏</el-button>
      </div>
      <div v-else-if="step === 2" class="intro">
        <h1>{{ result ? 'You Win！🎉' : 'You Lose!😢' }}</h1>
        <el-button @click="handleRePlay">再来一轮</el-button>
        <el-button @click="handleSetGame">难度调节</el-button>
      </div>
      <div v-else class="box">
        <div class="card-wrap" :style="cardWrapStyle">
          <div
            v-for="item in cardList"
            :key="item.key"
            :class="{ 'item-cover': item.cover }"
            class="card-item"
            :style="item.style"
            @click="handleClickCard(item)"
          >
            {{ item.content }}
          </div>
          <div v-for="item in penddingList" :key="item.key" class="card-item" :style="item.style">
            {{ item.content }}
          </div>
          <div
            v-for="item in clearList"
            :key="item.key"
            class="card-item clear-item"
            :style="item.style"
          >
            {{ item.content }}
          </div>
          <div
            v-for="item in pickList"
            :key="item.key"
            class="card-item"
            :style="item.style"
            @click="handleClickPickCard(item)"
          >
            {{ item.content }}
          </div>
        </div>
        <div class="pt30 pb10 text-center">
          剩余空位:{{ 7 - penddingList.length }}/7；已消除:{{ clearList.length }}/{{
            cardList.length + penddingList.length + pickList.length + clearList.length
          }}
        </div>
        <div class="text-center">
          道具：
          <el-button :disabled="!tools.pick" @click="handlePickCard"
            >取出{{ option.maxPickNum }}个卡片</el-button
          >
          <el-button :disabled="!tools.rand" @click="handleRandCard">随机</el-button>
          <el-button @click="handleRePlay">再来一轮</el-button>
        </div>
      </div>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';
import SheepCard from './sheep-card';

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

let timer: null | NodeJS.Timeout = null;
let calcValueList: number[] = [];
let xUnit = 0;
let yUnit = 0;

const cardWrapStyle = computed(() => ({
  width: (xUnit + 2) * SheepCard.X + 'px',
  height: (yUnit + 5) * SheepCard.Y + 'px'
}));
const leftOffset = computed(() => {
  const wrapWidth = (xUnit + 2) * SheepCard.X;
  return (wrapWidth - 7 * SheepCard.X * 2) / 2;
});

/**
 * @description: 随机卡片
 */
const handleRandCard = () => {
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
  calcCover();
};

/**
 * @description: 取出三个选中的卡片
 */
const handlePickCard = () => {
  if (!tools.pick) {
    return false;
  }
  tools.pick = false;
  pickList.value = penddingList.value.slice(0, option.maxPickNum);
  setTimeout(() => {
    pickList.value.forEach((item: SheepCard, index: number) => {
      item.style.top = '70%';
      item.style.left = leftOffset.value + index * SheepCard.X * 2 + 'px';
      calcValueList[item.val]--;
    });
  }, 0);
  penddingList.value = penddingList.value.slice(option.maxPickNum);
  penddingList.value.forEach((item: SheepCard, index: number) => {
    item.style.top = '90%';
    item.style.left = leftOffset.value + index * SheepCard.X * 2 + 'px';
  });
};

/**
 * @description: 创建map数据模型
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} y
 * @param {Number} z
 * @return {*}
 */
const createGameMap = ({ x, y, z }: { x: number; y: number; z: number }) => {
  xUnit = x * 2;
  yUnit = y * 2;
  const map = new Array(z);
  // 地图初始化
  for (let k = 0; k < z; k++) {
    map[k] = new Array(yUnit);
    for (let i = 0; i < yUnit; i++) {
      map[k][i] = new Array(xUnit).fill(0);
    }
  }
  return map;
};
/**
 * @description: 生成卡片列表，表示地图最大为 x * y 张牌，最多有 z 层
 * @param {Number} x 行
 * @param {Number} y 列
 * @param {Number} z 层数
 * @param {Number} cardRandom
 */
const getCardList = ({
  x,
  y,
  z,
  cardRandom
}: {
  x: number;
  y: number;
  z: number;
  cardRandom: number;
}) => {
  let cardMap = createGameMap({ x, y, z });

  let initCardIList = [];
  let key = 0;
  for (let k = 0; k < z; k++) {
    const shrinkSpeed = 3;
    const shrink = Math.floor((z - k - 1) / shrinkSpeed);
    const shrinkX = Math.min(Math.floor(xUnit / 2) - 2, shrink);
    const shrinkY = Math.min(Math.floor(yUnit / 2) - 2, shrink);

    // 行
    for (let i = shrinkY; i < yUnit - 1 - shrinkY; i++) {
      // 列
      for (let j = shrinkX; j < Math.ceil((xUnit - 1) / 2); j++) {
        let canSetCard = true;
        if (j > 0 && cardMap[k][i][j - 1]) {
          // 左边不能有牌
          canSetCard = false;
        } else if (i > 0 && cardMap[k][i - 1][j]) {
          // 上边不能有牌
          canSetCard = false;
        } else if (i > 0 && j > 0 && cardMap[k][i - 1][j - 1]) {
          // 左上不能有牌
          canSetCard = false;
        } else if (i > 0 && cardMap[k][i - 1][j + 1]) {
          // 右上不能有牌
          canSetCard = false;
        } else if (k > 0 && cardMap[k - 1][i][j]) {
          // 正底不能有牌
          canSetCard = false;
        } else if (Math.random() >= cardRandom) {
          canSetCard = false;
        }

        if (canSetCard) {
          key++;
          const cardItem = new SheepCard({ x: j, y: i, z: k, key });
          cardMap[k][i][j] = cardItem;
          initCardIList.push(cardItem);
          // 对称放置
          const mirrorX = xUnit - 2 - j;
          if (mirrorX > j) {
            key++;
            const cardItem = new SheepCard({
              x: mirrorX,
              y: i,
              z: k,
              key
            });
            cardMap[k][i][mirrorX] = cardItem;
            initCardIList.push(cardItem);
          }
        }
      }
    }
  }
  initCardIList.reverse();
  for (let i = 1; i <= key % 3; i++) {
    const clearItem = initCardIList.pop();
    if (clearItem) {
      cardMap[clearItem.z][clearItem.y][clearItem.x] = 0;
    }
  }
  initCardIList.reverse();
  cardList.value = initCardIList;
};

/**
 * @description: 生成游戏
 */
const initGame = () => {
  step.value = 1;
  getCardList(option);
  penddingList.value = [];
  clearList.value = [];
  pickList.value = [];
  tools.pick = true;
  tools.rand = true;
  setCardValue({ maxCardTypeNum: Number(option.maxCardTypeNum) });
  calcCover();
};

/**
 * @description: 设置卡片
 * @param {Number} maxCardTypeNum 最大卡片种类数
 * @return {*}
 */
const setCardValue = ({ maxCardTypeNum }: { maxCardTypeNum: number }) => {
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
 * @description: 计算遮挡关系
 * @return {*}
 */
const calcCover = () => {
  // 构建一个遮挡 map
  const coverMap = new Array(yUnit);
  for (let i = 0; i <= yUnit; i++) {
    coverMap[i] = new Array(xUnit).fill(false);
  }

  // 从后往前，后面的层数高
  for (let i = cardList.value.length - 1; i >= 0; i--) {
    const item = cardList.value[i];
    const { x, y } = item;
    if (coverMap[y][x]) {
      item.cover = true;
    } else if (coverMap[y][x + 1]) {
      item.cover = true;
    } else if (coverMap[y + 1][x]) {
      item.cover = true;
    } else if (coverMap[y + 1][x + 1]) {
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
const handleClickPickCard = (item: SheepCard) => {
  cardList.value.push(item);
  const index = pickList.value.indexOf(item);
  pickList.value = pickList.value.slice(0, index).concat(pickList.value.slice(index + 1));
  handleClickCard(item);
};

/**
 * @description: 消除3个一样的卡片
 */
const handleRemoveThreeCard = () => {
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
        item.style.left = leftOffset.value + index * SheepCard.X * 2 + 'px';
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
const handleClickCard = (item: SheepCard) => {
  timer && clearTimeout(timer);
  handleRemoveThreeCard();
  penddingList.value.push(item);
  const index = cardList.value.indexOf(item);
  cardList.value = cardList.value.slice(0, index).concat(cardList.value.slice(index + 1));
  calcCover();
  calcValueList[item.val]++;
  setTimeout(() => {
    item.style.top = '90%';
    item.style.left = leftOffset.value + (penddingList.value.length - 1) * SheepCard.X * 2 + 'px';
  }, 0);

  timer = setTimeout(() => {
    handleRemoveThreeCard();
  }, 500);
};
// 开始
const handleStartGame = () => {
  initGame();
};
// 设置
const handleSetGame = () => {
  step.value = 0;
};
// 重来
const handleRePlay = () => {
  initGame();
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
}

.intro {
  margin: 10% auto 0 auto;
  text-align: center;
}

.card-wrap {
  position: relative;
  margin: 10% auto 0 auto;
}

.card-item {
  font-size: 28px;
  text-align: center;
  position: absolute;
  border-radius: 2px;
  box-sizing: border-box;
  background: #ddd;
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0px 3px 0 0 #fff, 0 8px 0 0 #ddd, 0 8px 0 2px #333, 0 0 0 2px #333;
}

.card-item:hover {
  transform: scale3d(1.1, 1.1, 1.1);
  z-index: 1;
}

.item-cover {
  pointer-events: none;
  box-shadow: 0px 3px 0 0 #999, 0 8px 0 0 #666, 0 8px 0 2px #000, 0 0 0 2px #000;
}

.item-cover:after {
  border-radius: 2px;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.55;
}

.card-tips {
  transform: translate(-50%, 0);
  pointer-events: none;
}

.clear-item {
  pointer-events: none;
}
</style>
