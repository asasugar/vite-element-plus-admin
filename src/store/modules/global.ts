const global = {
  namespaced: true,
  state: {
    count: 0,
    toDoList: [
      { text: '吃饭', done: true },
      { text: '睡觉', done: false },
      { text: '打保罗', done: false }
    ]
  },
  getters: {
    unDoList(state: { toDoList: any[] }) {
      return state.toDoList.filter(i => !i.done);
    }
  },
  mutations: {
    INCREMENT(state: { count: number }) {
      state.count++;
    },
    DECREMENT(state: { count: number }) {
      state.count--;
    }
  },
  actions: {
    asyncIncrement(content: { commit: (arg0: string) => void }) {
      content.commit('INCREMENT');
    },
    asyncDecrement(content: { commit: (arg0: string) => void }) {
      content.commit('DECREMENT');
    }
  }
};

export default global;
