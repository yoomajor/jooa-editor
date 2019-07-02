export default {
  namespaced: true,
  state: {
    info: {},
    modules: [],
    activeModule: {},
    settingModuleData: {},
    settingModuleInfo: {}
  },
  mutations: {
    modules: function (state, data) {
      state.modules = data.map(x => x)
    },
    moduleInfo: function (state, data) {
      state.activeModule = data
    },
    settingModuleData: function (state, data) {
      state.settingModuleData = data
    },
    settingModuleInfo: function (state, data) {
      state.settingModuleInfo = data
    }
  },
  actions: {
  }
}
