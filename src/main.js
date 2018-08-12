import Vue from 'vue'
import Vant from 'vant';
import { Lazyload } from 'vant';

import 'normalize.css';
import 'vant/lib/vant-css/index.css';

import App from './App.vue'
import router from './router'
import store from './store'

import common from '@/assets/js/common'
import validator from '@/assets/js/validator'
import api from '@/assets/js/api'

Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(common)
Vue.use(validator)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
