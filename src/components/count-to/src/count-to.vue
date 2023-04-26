<!--
 * @Description: 数字动画
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-14 10:58:34
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:30:10
-->
<template>
  <span :style="{ color }">{{ number }}</span>
</template>
<script lang="ts" setup>
import { computed, watchEffect, onMounted, watch } from 'vue';
import { useTransition, TransitionPresets } from '@vueuse/core';

interface Props {
  startVal: number;
  endVal: number;
  duration?: number;
  autoplay?: boolean;
  decimals?: number;
  prefix: string;
  suffix?: string;
  separator?: string;
  decimal?: string;
  /**
   * font color
   */
  color?: string;
  /**
   * Turn on digital animation
   */
  useEasing?: boolean;
  /**
   * Digital animation
   */
  transition?: string;
}
const props = withDefaults(defineProps<Props>(), {
  startVal: 0,
  endVal: 2023,
  duration: 1500,
  autoplay: true,
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: '',
  decimal: '',
  /**
   * Turn on digital animation
   */
  useEasing: true,
  /**
   * Digital animation
   */
  transition: 'linear'
});

const emit = defineEmits(['onStarted', 'onFinished']);

const source = ref<number>(props.startVal);
const disabled = ref<boolean>(false);
let outputValue = useTransition(source);
const number = computed<string>(() => formatNumber(outputValue.value));
watchEffect(() => {
  source.value = props.startVal;
});
watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    start();
  }
});
onMounted(() => {
  props.autoplay && start();
});
const start = () => {
  run();
  source.value = props.endVal;
};

const run = () => {
  outputValue = useTransition(source, {
    disabled,
    duration: props.duration,
    onFinished: () => emit('onFinished'),
    onStarted: () => emit('onStarted'),
    ...(props.useEasing ? { transition: (TransitionPresets as any)[props.transition] } : {})
  });
};

const formatNumber = (num: number | string) => {
  if (!num && num !== 0) {
    return '';
  }
  const { decimals, decimal, separator, suffix, prefix } = props;
  num = Number(num).toFixed(decimals);
  num += '';
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  if (separator && typeof separator !== 'number') {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }
  return prefix + x1 + x2 + suffix;
};
</script>
