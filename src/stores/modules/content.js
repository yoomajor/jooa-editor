export default {
  namespaced: true,
  state: {
    info: {},
    modules: [],
    isActive: false, // 모듈 활성화 체크
    isFunction: false, // 기능탭 이용 가능한지 체크 (해당모듈의 setting.function이 비었는지 체크해서 넘겨줌)
    isPrice: false, // 가격이 발생하는 컨텐츠인지 체크
    activeModule: {},
    settingModuleData: {},
    settingModuleInfo: {}
  },
  mutations: {
    modules: function (state, data) {
      state.modules = data
    },
    moduleInfo: function (state, data) {
      state.activeModule = data
    },
    settingModuleData: function (state, data) {
      state.settingModuleData = data
    },
    settingModuleInfo: function (state, data) {
      state.settingModuleInfo = data
    },
    isActive: function (state, data) {
      state.isActive = data
    },
    isFunction: function (state, data) {
      state.isFunction = data
    },
    uploadImg: function (state, data) {
      state.settingModuleData.style.backgroundImage = data
    },
    isPrice: function (state, data) {
      state.isPrice = data
    }
  },
  actions: {
  }
}
