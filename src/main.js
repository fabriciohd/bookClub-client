import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from 'vue-notification'
import VCalendar from 'v-calendar';

import store from './config/store'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Notifications)
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
