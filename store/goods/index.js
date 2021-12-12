//存放用户小程序全局状态
const state = {
	// 全局照片存储
	maintenanceList:[]
}

const mutations = {
	update(state,payload){
		console.log(payload)
		state[payload.key]  = payload.value
	}
}

const actions = {
	shoppingTrigger(context,payload){
		context.commit('update',payload)
	}
}

export default {
	state,mutations,actions
}
