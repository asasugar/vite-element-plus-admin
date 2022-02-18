import { nextTick, onMounted, onActivated } from 'vue';

export default function onMountedOrActivated(hook: () => void) {
  let mounted: boolean;

  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });

  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}
