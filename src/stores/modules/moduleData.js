export default {
  namespaced: true,
  state: {
    moduleData: []
  },
  getters: {

  },
  mutations: {
    moduleData: function (state, data) {
      state.moduleData = data
      // console.log(state.moduleData)
    }
  },
  actions: {
  }
}
