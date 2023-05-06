import SheepCard from '../sheep-card';

export function useSheep() {
  const xUnit = ref<number>(0);
  const yUnit = ref<number>(0);

  const cardWrapStyle = computed(() => ({
    width: (xUnit.value + 2) * SheepCard.X + 'px',
    height: (yUnit.value + 5) * SheepCard.Y + 'px'
  }));
  const leftOffset = computed(() => {
    const wrapWidth = (xUnit.value + 2) * SheepCard.X;
    return (wrapWidth - 7 * SheepCard.X * 2) / 2;
  });

  /**
   * 创建map数据模型
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} y
   * @param {number} z
   * @return {*}
   */
  const createGameMap = ({ x, y, z }: { x: number; y: number; z: number }) => {
    xUnit.value = x * 2;
    yUnit.value = y * 2;
    const map = new Array(z);
    // 地图初始化
    for (let k = 0; k < z; k++) {
      map[k] = new Array(yUnit.value);
      for (let i = 0; i < yUnit.value; i++) {
        map[k][i] = new Array(xUnit.value).fill(0);
      }
    }
    return map;
  };
  /**
   * 生成卡片列表，表示地图最大为 x * y 张牌，最多有 z 层
   * @param {number} x 行
   * @param {number} y 列
   * @param {number} z 层数
   * @param {number} cardRandom
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
    const cardMap = createGameMap({ x, y, z });

    const initCardList = [];
    let key = 0;
    for (let k = 0; k < z; k++) {
      const shrinkSpeed = 3;
      const shrink = Math.floor((z - k - 1) / shrinkSpeed);
      const shrinkX = Math.min(Math.floor(xUnit.value / 2) - 2, shrink);
      const shrinkY = Math.min(Math.floor(yUnit.value / 2) - 2, shrink);

      // 行
      for (let i = shrinkY; i < yUnit.value - 1 - shrinkY; i++) {
        // 列
        for (let j = shrinkX; j < Math.ceil((xUnit.value - 1) / 2); j++) {
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
            initCardList.push(cardItem);
            // 对称放置
            const mirrorX = xUnit.value - 2 - j;
            if (mirrorX > j) {
              key++;
              const cardItem = new SheepCard({
                x: mirrorX,
                y: i,
                z: k,
                key
              });
              cardMap[k][i][mirrorX] = cardItem;
              initCardList.push(cardItem);
            }
          }
        }
      }
    }
    initCardList.reverse();
    for (let i = 1; i <= key % 3; i++) {
      const clearItem = initCardList.pop();
      if (clearItem) {
        cardMap[clearItem.z][clearItem.y][clearItem.x] = 0;
      }
    }
    initCardList.reverse();
    return initCardList;
  };

  return {
    xUnit,
    yUnit,
    sheepCardX: SheepCard.X,
    cardWrapStyle,
    leftOffset,
    getCardList
  };
}
