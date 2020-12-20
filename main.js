import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'

Vue.config.productionTip = false

Vue.prototype.$api = api
// Vue.prototype.$isLogin = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
