import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index.js'
import goods from './goods/index.js'
Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	modules:{
		user,goods
	}
})
export default store