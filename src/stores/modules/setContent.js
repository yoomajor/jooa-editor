import LANG from '@/common/lang'

export default {
  namespaced: true,
  state: {
    lang: LANG.default
  },
  getters: {

  },
  mutations: {
    selectedLang: function (state, data) {
      state.lang = data
    }
  },
  actions: {
  }
}
