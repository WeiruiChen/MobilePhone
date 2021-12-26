<template>
	<view style="position: relative;">
		<cu-custom bgColor="bg-gradual-default" ><block slot="content">首页</block></cu-custom>
		<!-- 强制用户点击获取信息 -->
		<!-- <swiper class="card-swiper square-dot"  :circular="true" :indicator-dots="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#04D4C6">
			<swiper-item v-for="(item,index) in swiperList" :key="index" style="width:100%!important" :class="cardCur==index?'cur':''">
				<view class="swiper-item" @click="onClickHandler(item)">
					<image :src="imageUrl+item.fileId" mode="aspectFill" ></image>
				</view>
			</swiper-item>
		</swiper> -->
		<view class="cu-bar search" >
			<view class="search-form round" style="background-color:#FFFFFF;text-align:center">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索" @click="gotoSearch"></input>
			</view>
		</view>

		<view v-if="isRecommend" style="background-color:#FFFFFF;text-align:center;height:100rpx;border-radius:20rpx;margin:0 10rpx 0 10rpx;display:flex;justify-content:center;align-items:center">
				<image
				src="../../static/first/nonePhone.png"
				style="width: 80rpx;height: 80rpx;"
				mode="scaleToFill"
			/>
			<view style="color:#136169;font-weight:bold">无法匹配当前手机型号</view>
			<view @click="gotoPhoneType" style="color:#136169;margin-left:20rpx">手动选择其他手机型号
				<text class="lg text-gray" :class="'cuIcon-right'" style="color:#136169"></text>
			</view>
		</view>

		<view v-else style="background-color:#FFFFFF;boder-radius:20rpx;margin:0 10rpx 0 10rpx;">
			<view style="display:flex;justify-content:space-between" >
				<view style="display:flex;align-items:center">
					<image
					src="../../static/first/nonePhone.png"
					style="width: 80rpx;height: 80rpx;margin:30rpx"
					mode="scaleToFill"
				/>
					<view>
						<view style="font-weight: bold;color:#136169;">手机型号</view>
						<view style="color:#136169;">描述</view>
					</view>
				</view>

				<view @click="gotoPhoneType" style="color:#136169;margin-left:20rpx;margin-top:30rpx">更换其他手机型号
					<text class="lg text-gray" :class="'cuIcon-right'" style="color:#136169"></text>
				</view>
			</view>
			<view>
				<scroll-view scroll-x scroll-with-animation >
					<view class="cu-card" style="display: inline-flex;">
							<view class="cu-item-scroll" style="margin: 10rpx;" v-for="(item,index) in salesTimeList" :key="index" @click="onClickHandler(item)">
								<view style="display: flex;;background-color: #E7F0F4;height: 210rpx;">
									<view style="margin: 20rpx;width: 250rpx;display: flex;flex-direction:column;justify-content: space-between;">
										<view style="font-weight: 900;font-size: 35rpx;">{{item.goods.title}}</view>
										<view style="font-weight: 500;" class="show-subTitle">{{item.goods.subTitle}}</view>
										<view style="display: inline-flex;align-items: center;">
											<view style="font-size: 40rpx;color: #E05A28;font-weight: 700;">{{item.goods.salePrice}}</view>
											<view style="text-decoration:line-through;margin-left:10rpx;">{{item.goods.price}}</view>
								</view>
									</view>
									<view style="position: relative;">
										<image src="../../static/first/lijiqianggou.png" style="width: 60rpx;height: 100%;"></image>
										<view style="position: absolute;top: 25rpx;left: 15rpx;color: #FFFFFF;font-weight: 700;font-size: 30rpx;">立即抢购</view>
									</view>
								</view>
								
							</view>
					</view>
				</scroll-view>
			</view>
		</view>

			<swiper class="screen-swiper"  :class="true?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" style="border-radius:20rpx;heigth:50rpx"  @click="onClickHandler(item)">
				<view v-if="!item.fileId"></view>
				<!-- {{item}} -->
				<image v-else alt="error" :src="imageUrl+item.fileId" mode="aspectFill" style="padding:10rpx"></image>
			</swiper-item>
		</swiper>

		<!-- <swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper> -->
		
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view  v-for="(item,index) in cuIconList" :key="index" v-if="index < gridCol*2">
				<view style="display:flex;flex-direction:column;align-items:center">
					<view v-if="!item.fileId"></view>
					<image v-else @click="onClickHandler(item,index)" :src="imageUrl+item.fileId" style="width: 120rpx;height: 120rpx;"></image>
					<view >{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<view v-show="showStatic">
			<view v-if="salesTimeList.length > 0">
			<!-- <view class="cu-bar" style="margin-top: 20rpx;">
				<view class="action">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/xianshiyouhuiicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;font-size:40rpx">限时优惠</text>
				</view>
			</view> -->
		
			</view>
			<view class="cu-bar" >
				<view class="action">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/processicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;font-size:40rpx">服务流程</text>
				</view>
			</view>
		
			<view class="cu-card">
				<view class="cu-item shadow">
					<view class="content" style="display: flex;justify-content: space-around;margin: 40rpx 15rpx 40rpx 15rpx">
						<view v-for="(item,index) in preferentialList" :key="index">
							<view style="display: flex;margin: 0rpx 0 0 28rpx;">
								<image style="width: 65rpx;height: 65rpx;" :src="item.cuIcon"></image>
								<view style="display: absolute;">
									<image v-if="index <3" style="left: 28rpx;top:20rpx;width: 50rpx;height: 10rpx;" src="../../static/first/线@3x.png"></image>
								</view>
							</view>
							<view style="font-weight: bold;">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		
			<view class="cu-bar">
				<view class="action">
					<!-- src="../../static/first/服务优势icon@3x.png" -->
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/advanceicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;font-size:40rpx">服务优势</text>
				</view>
			</view>
		</view>
		
		<!-- <view class="cu-card case" v-for="(item) in serviceProfitList" :key="item.fileId" @click="onClickHandler(item)"> -->
		<view class="cu-card case" v-for="(item) in serviceProfitList" :key="item.fileId" @click="onClickHandler(item)">
			<view class="cu-item shadow" style="position: relative;">
				<view class="image">
					<image :src="imageUrl+item.fileId"
					 mode="widthFix" style="height: auto;"></image>
				</view>
			</view>
		</view>
		<view class="csh-show"  @click="callPhone" >
			<image
				src="../../static/first/121.png"
				style="width: 80rpx;height: 80rpx;"
				mode="scaleToFill"
			/>
			<view>
				<view style="font-size:30rpx;font-weight:bold" >
					24小时客服电话
				</view>
				<view style="font-color:#999999;font-size:20rpx">
					如何预约？维修费用多少？保修多久?欢迎来电咨询。
				</view>
			</view>
			<!-- <text style="text-align: center;">24小时客服电话:{{cshPhone}}</text> -->
		</view>
		<view style="height: 150rpx;"></view>
		<view-tabbar current="0"></view-tabbar>
	</view>
</template>

<script>
	import { mapState } from 'vuex'//引入mapState
	import Tabbar from '@/pages/tabBar/tabBar.vue'
	
	export default {
		data() {
			return {
				isRecommend:false,
				gridCol: 4,
				gridBorder: false,
				preferentialList:[
				{
					cuIcon:require("@/static/first/免费预约@3x.png"),
					name:"免费预约"
				},
				{
					cuIcon:require("@/static/first/上门取件@3x.png"),
					name:"上门取件"
				},
				{
					cuIcon:require("@/static/first/服务直播@3x.png"),
					name:"服务直播"
				},
				{
					cuIcon:require("@/static/first/设备验收@3x.png"),
					name:"验收付款"
				}
				],
				dotStyle: false,
				cardCur: 0,
				cshPhone:'获取失败',
				// 轮播图
				swiperList: [
				],
				// 限时优惠
				salesTimeList:[
				],
				// 服务优势
				serviceProfitList:[],
				// 手机选项
				cuIconList: [{
				}],
				// 静态图等资源加载完后再限时
				showStatic:false,
				showClickUser:true,
				// 推荐手机型号
				recommendGood:{}
			}
		},
		components: {
			'view-tabbar': Tabbar
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
		},
		computed: mapState({
			// 从state中拿到数据 
			loginName: state => state.user.loginName,
			cityId: state => state.user.cityId,
			imageUrl:state => state.user.imageBaseUrl,
			openId:state => state.user.openId,
			gmPhone:state => state.user.gmPhone,
			wxHead:state => state.user.wxHead
		}),
		onLoad(){
			// 获取系统信息
			console.log('system:'+JSON.stringify(uni.getSystemInfoSync()));
			 if(uni.getSystemInfoSync().platform == 'mac' || uni.getSystemInfoSync().platform == 'windows'){
				 this.getUserData()
			 }else{
				 this.wxLogin()
				 // 获取版本号
				 this.getAppVersion()
				 // 获取手机型号推荐数据
				 
			 }
		},
		// onShow(){
			// // 登陆失效后重新加载
			// const loginStatus = uni.getStorageSync('login');
			// console.log('loginStatus',loginStatus)
			// if(loginStatus){
			// 	if(uni.getSystemInfoSync().platform == 'mac'){
			// 	 	this.getUserData()
			// 	}else{
			// 		this.wxLogin()
			// 		// 获取版本号
			// 		this.getAppVersion()
			// 	}
			// 	this.getUserData()
			// }
			// // 清除登陆状态
			// uni.setStorageSync('login',false);
		// },
		methods: {
			getRecommend(){

			},
			gotoPhoneType(){
				uni.switchTab({
							url:'../phoneModel/phoneModel'
						})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'./search',
				})
			},
			//获取小程序版本号
			getAppVersion(){
				const accountInfo = wx.getAccountInfoSync();
				// console.log('accountInfoaccountInfoaccountInfo',JSON.stringify(accountInfo));
				// this.$store.dispatch('actionTrigger',{
				// 		key:'clientVer',value:accountInfo.miniProgram.version || accountInfo.miniProgram.envVersion,
				// })
			},
			// 微信登陆
			wxLogin(){
				let that = this;
				uni.login({
						provider: 'weixin',
						onlyAuthorize:true,
						success: function (loginRes) {
							// console.log('code',loginRes.authResult);
							console.log('code',loginRes.code);
							if(loginRes.code){
							// 拿到code获取用户openid
								that.$request({
									url:'/phoneReparisServer/service/rest/nologin.productService/collection/getMiniOpenid',
									methods:'POST',
									data:{
										code:loginRes.code,
										payTypeStr:"WxSmallProgramReaders"
									}
								}).then(res=>{
									console.log('openiddrequest',res)
									that.$store.dispatch('actionTrigger',{
										key:'openId',value:res['openId'] || '',
										// key:'openId',value:'opfA81LO4KG84eBUeulJ0WmvK198',
									})
									// 获取用户登陆信息
									that.getUserData()
								}).catch(err=>{
									console.log('err',err)
								})
							}
							// loginName
						}
					});
			},
			onClickHandler(item,index=0){
				const pathMap = {
					'panelMy':'/pages/mine/mine',
					'createOrder':'/pages/orderList/orderList',
					'pageAddress':'/pages/allAddress/allAddress'
				}
				const clickMap = {
					// gototype为ClientPage则跳转
					'ClientPage':function(){
						uni.navigateTo({
							url:pathMap[item.gotoValue],
							fail:function(){
								uni.switchTab({
									url:pathMap[item.gotoValue]
								})
							}
						})
					},
					'Category':function(){
						// 设置缓存供phonemodel使用
						try {
							uni.setStorageSync('category',JSON.stringify(item));
						} catch (e) {
							// error
							console.log('缓存设置错误',e)
						}
						uni.switchTab({
							url:'../phoneModel/phoneModel'
						})
					},
					'Goods':function(){
						uni.switchTab({
							url:'../phoneModel/phoneModel'
							// url:'../reserve/reserve?goods='+encodeURIComponent(JSON.stringify(item))
						})
					}
				}
				// 执行
				// console.log('item.gotoType',item.gotoType)
				// console.log(clickMap[item.gotoType])
				clickMap[item.gotoType]()
			
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getFastClick(){
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.homeService/collection/getFastClick',
					methods:'POST',
					data:{}
				}).then(res=>{
					this.cuIconList = res
					console.log('resres',res)
				}).catch(error=>{
					console.log('error',error)
				})
			},
			//获取客服电话
			getCSHText(){
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.locationService/collection/getDeliveryAddressList',
					methods:'POST',
				}).then(res=>{
					this.cshPhone = res[0].phone
					// console.log('getDeliveryAddressList:',JSON.stringify(res))
					this.$store.dispatch('actionTrigger',{
						key:'gmPhone',
						value: this.cshPhone
					})
					this.$store.dispatch('actionTrigger',{
						key:'delivery',
						value: res[0]
					})
					this.$store.dispatch('actionTrigger',{
						key:'deliveryList',
						value: res
					})
				}).catch(e=>{
					console.log('getDeliveryAddressList',e)
				})
			},
			getHomeBannerData(){
				this.showStatic = false
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.homeService/collection/getHomeBanner',
					methods:'POST',
					data:{
						rows:6,
						page:1
					}
				}).then(res=>{
					// 获取全部数据
					for (let data of res) {
						//获取轮播图
						if(data['typeSetting'] === 'One'){
							this.swiperList = data.itemList
						}
						if(data['typeSetting'] === 'Six'){
							this.salesTimeList = data.itemList
						}
						if(data['typeSetting'] === 'Two'){
							this.serviceProfitList = data.itemList
						}
					}
					this.showStatic = true
					// console.log('resre',res)
				}).catch(e=>{
					console.log('getHomeBanner',e)
				})
			},
			callPhone(){
				console.log('callPhone')
				uni.makePhoneCall({
				  phoneNumber: this.gmPhone,
				})
			},
			getUserData(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.customer.login/collection/login',
					methods:'POST',
					data:{
						openId:this.openId || 'opfA81LO4KG84eBUeulJ0WmvK198',
						loginType:"openId"
					}
				}).then(res=>{
					const resFormat = res;
					// 获取信息存储到全局
					this.$store.dispatch('actionTrigger',{
						key:'cityId',value:resFormat['cityId'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'gender',value:resFormat['gender'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'deviceId',value:resFormat['deviceId'] || '',
					})
					// this.$store.dispatch('actionTrigger',{
					// 	key:'loginName',value:resFormat['loginName'] || '',
					// })
					this.$store.dispatch('actionTrigger',{
						key:'sessionID',value:resFormat['sessionID'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'name',value:resFormat['name'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'wxHead',value:resFormat['wxHead'] || '',
					})
					// 获取轮播图等信息
					this.getHomeBannerData()
					// 获取Goods
					this.getFastClick()
					// 获取客户电话
					this.getCSHText()
					uni.hideLoading()
				}).catch(error=>{
					console.log('error',error)
				})
			}
		}
	}
</script>

<style>
	.show-subTitle{
		  color: rgba(0, 0, 0, 0.8);
		  display: -webkit-box;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  word-break: break-all;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 3;
	}
	/* 悬浮样式 */
	.csh-show{
		position: fixed;bottom:130rpx;display:flex;align-items: center;justify-content:flex-start;width:100%;background:#FFFFFF;border-radius:50rpx;
		box-shadow:10rpx 10rpx 15rpx -10rpx;
	}
</style>
