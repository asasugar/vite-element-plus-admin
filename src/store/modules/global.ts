const global = {
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
    asyncIncrement({ commit }) {
      commit('INCREMENT');
    },
    asyncDecrement({ commit }) {
      commit('DECREMENT');
    }
  }
};

export default global;
