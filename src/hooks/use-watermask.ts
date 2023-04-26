/*
 * @Description: 水印
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 15:34:25
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-11-24 15:58:01
 */
import type { Ref } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { addResizeListener, removeResizeListener } from '@/utils/resize-ob-event';
import { isDef } from '@/utils/is';

const domSymbol = Symbol('watermask-dom');

export function useWatermask(
  appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>
) {
  const func = useThrottleFn(function () {
    const el = unref(appendEl);
    if (!el) return;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermask({ height, width });
  });
  const id = domSymbol.toString();
  const watermaskEl = shallowRef<HTMLElement>();

  const clear = () => {
    const domId = unref(watermaskEl);
    watermaskEl.value = undefined;
    const el = unref(appendEl);
    if (!el) return;
    domId && el.removeChild(domId);
    removeResizeListener(el, func);
  };

  function createBase64(str: string) {
    const can = document.createElement('canvas');
    const width = 300;
    const height = 240;
    Object.assign(can, { width, height });

    const cans = can.getContext('2d');
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120);
      cans.font = '15px Vedana';
      cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
      cans.textAlign = 'left';
      cans.textBaseline = 'middle';
      cans.fillText(str, width / 20, height);
    }
    return can.toDataURL('image/png');
  }

  function updateWatermask(
    options: {
      width?: number;
      height?: number;
      str?: string;
    } = {}
  ) {
    const el = unref(watermaskEl);
    if (!el) return;
    if (isDef(options.width)) {
      el.style.width = `${options.width}px`;
    }
    if (isDef(options.height)) {
      el.style.height = `${options.height}px`;
    }
    if (isDef(options.str)) {
      el.style.background = `url(${createBase64(options.str)}) left top repeat`;
    }
  }

  const createWatermask = (str: string) => {
    if (unref(watermaskEl)) {
      updateWatermask({ str });
      return id;
    }
    const div = document.createElement('div');
    watermaskEl.value = div;
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.position = 'absolute';
    div.style.zIndex = '100000';
    const el = unref(appendEl);
    if (!el) return id;
    const { clientHeight: height, clientWidth: width } = el;
    updateWatermask({ str, width, height });
    el.appendChild(div);
    return id;
  };

  function setWatermask(str: string) {
    createWatermask(str);
    addResizeListener(document.documentElement, func);
    const instance = getCurrentInstance();
    if (instance) {
      onBeforeUnmount(() => {
        clear();
      });
    }
  }

  return { setWatermask, clear };
}
