export default {
  namespaced: true,
  state: {
    renderData: []
  },
  mutations: {
    setRenderData: function (state, data) {
      state.renderData = data
      console.log(data)
    },
    updateModuleData: function (state, data) {
      let idx = state.renderData.map(x => x.id).indexOf(data.id)
      state.renderData[idx].dataSet.column[data.cIdx].value[data.lang] = data.value
    }
  },
  actions: {
  }
}
