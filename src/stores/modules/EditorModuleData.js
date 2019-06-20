export default {
  namespaced: true,
  state: {
    moduleData: [
      { name: '', html: '' }
    ]
  },
  mutations: {
    setModuleData: function (state, data) {
      state.moduleData = data
    }
  },
  actions: {
  }
}
