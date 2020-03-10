import Store from '../lib/store.js';

export default new Store({
  actions: {
    addItem(context, payload) {
      context.commit('addItem', payload);
    },
    clearItem(context, payload) {
      context.commit('clearItem', payload);
    },
    add(context, payload){
      context.commit('add', payload)
    }
  },
  mutations: {
    add(state, payload) {
      state.count = state.count + payload;
      debugger
      return state;
    },
    /**
     * 修改state对象
     * @param state
     * @param payload
     * @returns {*}
     */
    addItem(state, payload) {
      state.items.push(payload);
      return state;
    },
    /**
     * 修改state对象
     * @param state
     * @param payload
     * @returns {*}
     */
    clearItem(state, payload) {
      state.items.splice(payload.index, 1);
      return state;
    }
  },
  state: {
    count: 0,
    items: [
      'I made this',
      'Another thing'
    ]
  }
});
