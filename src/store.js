import Vue from 'vue'
import Vuex from 'vuex'
import CONFIG from '@@/config';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: CONFIG.baseURL,
    baseImgURL: CONFIG.baseImgURL,
    config: {}, //系统配置
    hasLogin: false, //登录状态
    userInfo: {}, //用户信息
    sound: {}, //音频播放器
  },

  mutations: {
    setConfig(state, payload) {
      state.config = payload;
    },

    setHasLogin(state, payload) {
      state.hasLogin = payload;
    },

    setUserInfo(state, payload) {
      state.userInfo = payload;
    },

    updateUserInfo(state, payload) {
      for(var key in payload) {
        state.userInfo[key] = payload[key];
      }
    },

    setSound(state, payload) {
      state.sound = payload;
    },
  },

  actions: {

  }
})
