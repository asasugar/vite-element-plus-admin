const global = {
  // namespaced: true,
  state: {
    count: 0
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
