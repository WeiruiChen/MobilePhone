import store from "@/store/index.js"

const request = function({url='',methods='GET',data={}}){
	// 判断是是否为登陆接口
	let isLogin = url.indexOf('login') !== -1
	const reqData = {
		timestamp:new Date().getTime(),
		...data
	}
	console.log('isLogin',isLogin)
	console.log('url',url)
	console.log('methods',methods)
	if(isLogin) {
		reqData['cityId'] =  store.state.user.cityId || '';
		reqData['clientVer'] =  store.state.user.clientVer || '';
	}
	const requestObj = {
			url:'http://pow6rm42.dongtaiyuming.net:29203' +  url,
			methods:methods || 'GET',
			data:reqData
	}
	return  new Promise((resolve,reject)=>{
		uni.request(requestObj).then((response) => {
            // setTimeout(function() {
            //     uni.hideLoading();
            // }, 200);
			// 获取接口原有数据
			const reponseData = response[1].data
			// uni-app返回一个数组
			console.log(reponseData)
			if(reponseData.code !== 0){
				uni.showModal({
				    content: reponseData.message,
					showCancel:false,
				    success: function (res) {
				        if (res.confirm) {
				            // console.log('用户点击确定');
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
				reject(reponseData.message)
			}
			// 格式化data数据
			reponseData.data = JSON.parse(reponseData.data)
			console.log('reponseData',reponseData.data);
            resolve(reponseData.data);
        }).catch(error => {
            // let [err, res] = error;
            reject('error',error)
        })
	})
}
export default request