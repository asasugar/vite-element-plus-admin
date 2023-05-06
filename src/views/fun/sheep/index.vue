<!--
 * 🐑了个🐑
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-12-08 17:08:51
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-05-06 10:20:08
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
        <el-button @click="initGame">再来一轮</el-button>
        <el-button @click="setGame">难度调节</el-button>
      </div>
      <div v-else class="box">
        <div class="card-wrap" :style="cardWrapStyle">
          <div
            v-for="item in cardList"
            :key="item.key"
            :class="{ 'item-cover': item.cover }"
            class="card-item"
            :style="item.style"
            @click="onClickCard(item)"
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
            @click="onClickPickCard(item)"
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
          <el-button :disabled="!tools.pick" @click="onPickCard"
            >取出{{ option.maxPickNum }}个卡片</el-button
          >
          <el-button :disabled="!tools.rand" @click="onRandCard">随机</el-button>
          <el-button @click="initGame">再来一轮</el-button>
        </div>
      </div>
    </template>
  </AsPageWrapper>
</template>
<script lang="ts" setup>
import { AsPageWrapper } from '@/containers/page-wrapper';
import { useMainFeature } from './hooks/use-main-feature';

const {
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
} = useMainFeature();

// 开始
const handleStartGame = () => {
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
