<!--
 * @Description: Markdown
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:02:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-29 15:16:25
-->
<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<script lang="ts" setup>
import { Ref, useAttrs } from 'vue';
import { shallowRef, ref, unref, nextTick, watch, onBeforeUnmount, onDeactivated } from 'vue';
import { useMountedOrActivated } from '@/hooks/core';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps({
  height: { type: Number, default: 360 },
  value: { type: String, default: '' }
});

defineExpose({
  md2html: Vditor.md2html,
  getVditor: (): Vditor => vditorRef.value!
});

const emit = defineEmits(['change', 'get', 'update:value']);
const attrs = useAttrs();

const wrapRef = shallowRef<HTMLElement | undefined>(document.documentElement);
const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
const initedRef = ref(false);
const valueRef = ref(props.value || '');
const instance = {
  getVditor: (): Vditor => vditorRef.value!
};
watch(
  () => props.value,
  v => {
    if (v !== valueRef.value) {
      instance.getVditor()?.setValue(v);
    }
    valueRef.value = v;
  }
);

function init() {
  const wrapEl = unref(wrapRef) as HTMLElement;
  if (!wrapEl) return;
  const bindValue = { ...attrs, ...props };
  const insEditor = new Vditor(wrapEl, {
    theme: 'classic',
    lang: 'zh_CN',
    mode: 'sv',
    typewriterMode: false,
    fullscreen: {
      index: 520
    },
    preview: {
      actions: []
    },
    input: (v: string) => {
      valueRef.value = v;
      emit('update:value', v);
      emit('change', v);
    },
    after: () => {
      nextTick(() => {
        insEditor.setValue(valueRef.value);
        vditorRef.value = insEditor;
        initedRef.value = true;
        emit('get', instance);
      });
    },
    cache: {
      enable: false, // 是否缓存markdown至localStorage
      id: 'markdown'
    },
    ...bindValue
  });
}

const destroy = () => {
  const vditorInstance = unref(vditorRef);
  if (!vditorInstance) return;
  try {
    vditorInstance?.destroy?.();
  } catch (error) {}
  vditorRef.value = null;
  initedRef.value = false;
};
useMountedOrActivated(init);
onBeforeUnmount(destroy);
onDeactivated(destroy);
</script>
