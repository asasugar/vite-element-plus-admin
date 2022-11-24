export default defineComponent({
  name: 'vnode-template',
  props: {
    vnodes: {
      type: Function
    }
  },
  setup(props) {
    if (!props.vnodes) return null;
    return props.vnodes;
  }
});
