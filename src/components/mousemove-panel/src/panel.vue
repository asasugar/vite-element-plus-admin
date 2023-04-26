<!--
 * @Description: 跟随鼠标动画
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-15 17:21:46
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:03:45
-->
<template>
  <div ref="panel" class="as-panel"></div>
</template>
<script lang="ts" setup>
import { useEventListener, useThrottleFn, useMouse } from '@vueuse/core';

interface Props {
  throttleTime?: number;
  bgColor?: string;
  boxShadowColor?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  throttleTime: 0,
  bgColor: '#55b9f3',
  boxShadowColor: () => ['#489dcf', '#62d5ff']
});
const { x, y } = useMouse();

const panel = shallowRef<HTMLElement | undefined>(document.documentElement);
const handleMousemove = () => {
  if (panel.value) {
    const oSpan = document.createElement(`span`);
    const size = Math.random() * 20;

    oSpan.style.left = x.value + `px`;
    oSpan.style.top = y.value - 50 + `px`;
    oSpan.style.width = 5 + size + `px`;
    oSpan.style.height = 5 + size + `px`;
    panel.value.appendChild(oSpan);
    let t = setTimeout(() => {
      if (t) clearTimeout(t);
      oSpan.remove();
    }, 1000);
  }
};

const handleMousemoveThrottled = useThrottleFn(handleMousemove, props.throttleTime);
onMounted(() => {
  useEventListener(panel.value, 'mousemove', handleMousemoveThrottled);
});
</script>
<style lang="less" scoped>
.as-panel {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  :deep(span) {
    width: 10px;
    height: 10px;
    background: v-bind('props.bgColor');
    border-radius: 50%;
    position: absolute;
    box-shadow: 5px 5px 15px v-bind('props.boxShadowColor?.[0]'),
      -5px -5px 15px v-bind('props.boxShadowColor?.[1]');
    animation: blow 4s linear infinite;
    -webkit-animation: blow 4s linear infinite;
  }
}

@keyframes blow {
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
    filter: hue-rotate(0deg);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, -1000%);
    opacity: 0;
    filter: hue-rotate(720deg);
    -webkit-transform: translate(-50%, -1000%);
    -moz-transform: translate(-50%, -1000%);
    -ms-transform: translate(-50%, -1000%);
    -o-transform: translate(-50%, -1000%);
    -webkit-filter: hue-rotate(720deg);
  }
}
</style>
