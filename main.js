
import Vue from 'vue'
import App from './App'
import store from './store'
import request from '@/utils/request.js'

import nabBar from './pages/navBar/navBar.vue'
Vue.component('nabBar',nabBar)


import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$request = request
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



