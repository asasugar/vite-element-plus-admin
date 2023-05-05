import type { Ref } from 'vue';

/**
 * useFocus
 *
 * @param {Ref<{
    focus: () => void;
  } | null>} el
 * @returns {{ focus: () => void; }}
 */
export const useFocus = (
  el: Ref<{
    focus: () => void;
  } | null>
) => {
  return {
    focus: () => {
      el.value?.focus?.();
    }
  };
};
