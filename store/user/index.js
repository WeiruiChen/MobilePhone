//存放用户小程序全局状态
const state = {
	// 全局照片存储
	"imageBaseUrl":"https://www.rongjiu.online/phoneReparisServer/service/rest/tk.File/",
	"id":"xxx",
	// "clientVer":"1.1.5",
	"clientVer":"WxSmallProgramReaders",
	"loginName":"",
	"deviceId":"xxx",
	"cityId":"1.1.5",
	"sessionID":"",
	"gender":"",
	"openId":"opfA81LO4KG84eBUeulJ0WmvK198",
	"gmPhone":'',
	"avatarUrl":'',
	"province":'',
	"city":'',
	"country":'',
	"wxHead":'',
	'name':'',
	'delivery':{}

}

const mutations = {
	update(state,payload){
		state[payload.key]  = payload.value
	}
}

const actions = {
	actionTrigger(context,payload){
		context.commit('update',payload)
	}
}

export default {
	state,mutations,actions
	// state:{
	// 	//存放用户小程序全局状态
	// 	"id":"xxx",
	// 	"clientVer":"0.0.0",
	// 	"loginName":"xxxx",
	// 	"deviceId":"xxx",
	// 	"cityId":"xxxx",
	// 	"sessionID":"xxxx",
	// 	"openId":"opfA81LO4KG84eBUeulJ0WmvK198"
	// }
}
