export default {
  namespaced: true,
  state: {
    list: []
  },
  getters: {

  },
  mutations: {
    setModuleList: function (state, data) {
      state.list = data
    }
  },
  actions: {
  }
}
