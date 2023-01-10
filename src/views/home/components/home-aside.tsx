import { defineComponent, PropType } from 'vue';
import { ElAside, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';
import 'element-plus/es/components/menu/style/css';
import type { HomeMenuInfo, HomeMenuItem } from '../typing';

export default defineComponent({
  props: {
    menuOption: {
      type: Object as PropType<HomeMenuInfo>,
      default: {
        defaultOpeneds: ['1'],
        defaultActive: '1-1',
        menu: []
      }
    }
  },
  emits: ['goMenu'],
  setup(props, { emit }) {
    const handleRouter = (object: HomeMenuItem | undefined, item: HomeMenuItem) => {
      emit('goMenu', object, item);
    };
    const recursiveFn = (object: HomeMenuItem | undefined, children: HomeMenuItem[]) => {
      if (children?.length) {
        return children.map(item => {
          if (item.children) {
            return (
              <ElSubMenu
                key={item.sortId}
                index={item.sortId}
                v-slots={{ title: () => <span>{item.title}</span> }}>
                {recursiveFn(item, item.children)}
              </ElSubMenu>
            );
          } else {
            return (
              <ElMenuItem index={item.sortId} onClick={() => handleRouter(object, item)}>
                {item.title}
              </ElMenuItem>
            );
          }
        });
      }
    };

    return () => (
      <ElAside width="200px">
        <ElMenu
          unique-opened
          default-openeds={props.menuOption.defaultOpeneds}
          default-active={props.menuOption.defaultActive}>
          {recursiveFn(undefined, props.menuOption.menu)}
        </ElMenu>
      </ElAside>
    );
  }
});
