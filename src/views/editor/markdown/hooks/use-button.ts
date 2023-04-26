import type { Ref } from 'vue';
import type { MarkDownActionType } from '@/components/markdown';

export function useButton(markDownRef: Ref<Nullable<MarkDownActionType>>) {
  const toggleTheme = (theme: 'dark' | 'classic') => {
    const instance = unref(markDownRef);
    if (!instance) return;
    const vditor = instance?.getVditor();
    vditor?.setTheme(theme);
  };

  const onClear = (valueRef: Ref<string>) => {
    valueRef.value = '';
  };
  return {
    toggleTheme,
    onClear
  };
}
