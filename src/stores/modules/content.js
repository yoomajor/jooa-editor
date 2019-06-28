export default {
  namespaced: true,
  state: {
    info: {},
    modules: []
  },
  getters: {

  },
  mutations: {
    modules: function (state, data) {
      state.modules = data.map(x => x)
    }
  },
  actions: {
  }
}
