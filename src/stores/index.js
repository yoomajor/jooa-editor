import Vue from 'vue'
import Vuex from 'vuex'

// 모든모듈 modules로 임포트
import * as modules from './modules'

// VUEX 사용처리
Vue.use(Vuex)

// VUEX 스토어 생성
const store = new Vuex.Store({
  // 전역 상태로 사용할것이 있다면 이곳에 추가
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: modules.default
})

export default store
