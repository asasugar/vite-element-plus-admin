/*
 * @Description: 复制
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-29 15:22:01
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-26 11:15:21
 */
import { isDef } from '@/utils/is';
interface Options {
  target?: HTMLElement;
}
export function useCopyToClipboard(initial?: string) {
  const clipboardRef = ref(initial || '');
  const isSuccessRef = ref(false);

  watch(
    clipboardRef,
    (str?: string) => {
      if (isDef(str)) {
        isSuccessRef.value = copyTextToClipboard(str);
      }
    },
    { immediate: !!initial, flush: 'sync' }
  );

  return { clipboardRef, isSuccessRef };
}

export function copyTextToClipboard(input: string, { target = document.body }: Options = {}) {
  const element = document.createElement('textarea');
  const previouslyFocusedElement = document.activeElement;

  element.value = input;

  element.setAttribute('readonly', '');

  (element.style as any).contain = 'strict';
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.fontSize = '12pt';

  const selection = document.getSelection();
  let originalRange;
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  target.append(element);
  element.select();

  element.selectionStart = 0;
  element.selectionEnd = input.length;

  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
  } catch (e: any) {
    throw new Error(e);
  }

  element.remove();

  if (originalRange && selection) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  if (previouslyFocusedElement) {
    (previouslyFocusedElement as HTMLElement).focus();
  }
  return isSuccess;
}
