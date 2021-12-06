import store from "@/store/index.js"

const request = function({
	url = '',
	methods = 'POST',
	data = {}
}) {
	// 判断是是否为登陆接口
	let isLogin = url.indexOf('login') !== -1
	const reqData = {
		timestamp: new Date().getTime(),
		...data
	}
	if (isLogin) {
		reqData['cityId'] = store.state.user.cityId || '';
		reqData['clientVer'] = store.state.user.clientVer || '';
	}
	let reqUrl = ' https://www.rongjiu.online' + url;
	// http://pow6rm42.dongtaiyuming.net:29203
	//https://www.caomeixinxi.com
	if (store.state.user.sessionID) {
		reqUrl += ";jsessionid=" + store.state.user.sessionID;
	}
	const requestObj = {
		url: reqUrl,
		method: 'POST',
		//post提交的时候加上这个header
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'xmlhttprequest'
		},
		data: reqData
	}
	return new Promise((resolve, reject) => {
		uni.request(requestObj).then((response) => {
			// setTimeout(function() {
			//     uni.hideLoading();
			// }, 200);
			// 获取接口原有数据
			const reponseData = response[1].data
			// uni-app返回一个数组
			if (reponseData.code !== 0) {
				let content = ''
				let flag = false

				if(reponseData.message.indexOf('当前登录已失效') !== -1){
					flag = true
					content = '当前登录已失效,点击确认返回首页重新登录~'
				}else{
					content = reponseData.message
				}
				uni.showModal({
					content: content,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							if(flag){
								// 登陆失效设置缓存
								uni.reLaunch({
									url:'/pages/first/first'
								})
							}
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
				reject(reponseData.message)
			}
			// 格式化data数据
			if(reponseData.data)
				reponseData.data = JSON.parse(reponseData.data)
			console.log('reponseData', reponseData.data);
			resolve(reponseData.data);
		}).catch(error => {
			// let [err, res] = error;
			reject(error)
		})
	})
}
export default request
