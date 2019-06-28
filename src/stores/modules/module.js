export default {
  namespaced: true,
  state: {
    info: {},
    moduleData: []
  },
  getters: {

  },
  mutations: {
    moduleData: function (state, data) {
      state.moduleData = data
    }
  },
  actions: {
  }
}
