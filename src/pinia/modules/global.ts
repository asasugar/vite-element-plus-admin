import { defineStore } from 'pinia';

const useGlobalStore = defineStore({
  id: 'global', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三'
    };
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    }
  }
});

export default useGlobalStore;
