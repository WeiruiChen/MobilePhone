<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" ><block slot="content">首页</block></cu-custom>
		
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="imageUrl+item.fileId" mode="aspectFill" ></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view  v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<image :src="imageUrl+item.fileId" style="width: 180rpx;height: 180rpx;"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<view class="cu-bar solid-bottom" style="margin-top: 20rpx;">
			<view class="action">
				<image style="width: 50rpx;height: 50rpx;" src="@/static/first/限时优惠icon@3x.png"></image>
				<text style="margin-left: 10rpx;font-weight: 900;">限时优惠</text>
			</view>
		</view>
		
		<scroll-view scroll-x scroll-with-animation >
			<view class="cu-card" style="display: inline-flex;">
					<view class="cu-item-scroll" style="margin: 10rpx;" v-for="item in 34">
						<view style="display: flex;background-color: #E7F0F4;">
							<view style="margin: 20rpx;width: 250rpx;">
								<view style="font-weight: 900;">内存升级256G</view>
								<view style="font-weight: 500;">升级后速度更快</view>
								<view style="display: inline-flex;align-items: center;">
									<view style="font-size: 40rpx;color: #E05A28;font-weight: 700;">168</view>
									<view style="text-decoration:line-through;margin-left:10rpx;">33</view>
								</view>
							</view>
							<view style="position: relative;">
								<image src="../../static/first/立即抢购@3x.png" style="width: 50rpx;height: 100%;"></image>
								<view style="position: absolute;top: 10rpx;left: 10rpx;color: #FFFFFF;font-weight: b;">立即抢购</view>
							</view>
						</view>
						
					</view>
					
			</view>
		</scroll-view>
		
		<view class="cu-bar solid-bottom" style="margin-top: 20rpx;">
			<view class="action">
				<image style="width: 50rpx;height: 50rpx;" src="@/static/first/服务流程icon@3x.png"></image>
				<text style="margin-left: 10rpx;font-weight: 900;">服务流程</text>
			</view>
		</view>
		
		<view class="cu-card">
			<view class="cu-item shadow">
				<view class="content" style="display: flex;justify-content: space-around;margin: 15rpx;">
					<view v-for="(item,index) in preferentialList" :key="index">
						<view style="display: flex;margin: 0rpx 0 0 28rpx;">
							<image style="width: 50rpx;height: 50rpx;" :src="item.cuIcon"></image>
							<view style="display: absolute;">
								<image v-if="index <4" style="left: 15rpx;top:5rpx;width: 50rpx;height: 10rpx;" src="../../static/first/线@3x.png"></image>
							</view>
						</view>
						<view style="font-weight: bold;">{{item.name}}</view>
					</view>

				</view>
			</view>
		</view>
		
		<view class="cu-bar solid-bottom" style="margin-top: 20rpx;">
			<view class="action">
				<image style="width: 50rpx;height: 50rpx;" src="../../static/first/服务优势icon@3x.png"></image>
				<text style="margin-left: 10rpx;font-weight: 900;">服务优势</text>
			</view>
		</view>
		
		<view class="cu-card case" v-for="(item,index) in serviceProfitList">
			<view class="cu-item shadow" style="position: relative;">
				<view class="image">
					<image :src="imageUrl+item.fileId"
					 mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<view style="display:flex;align-items: center;justify-content: center;">
			<text style="text-align: center;">24小时客服电话:xsxxxx</text>
		</view>
		<nabBar type="first" :isActive="true"></nabBar>
	</view>
</template>

<script>
	import { mapState } from 'vuex'//引入mapState
	import { navBar } from '../navBar/navBar.vue'
	export default {
		// components:{
		// 	navBar
		// },
		data() {
			return {
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
					name:"设备验收"
				},
				{
					cuIcon:require("@/static/first/付款取件@3x.png"),
					name:"付款取件"
				},
				],
				dotStyle: false,
				cardCur: 0,
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
					// cuIcon: '../../static/show/苹果手机@3x.png',
					// // color: 'red',
					// // badge: 120,
					// name: '苹果手机',
					}]
			}
		},
		computed: mapState({
			// 从state中拿到数据 
			loginName: state => state.user.loginName,
			cityId: state => state.user.cityId,
			imageUrl:state => state.user.imageBaseUrl
		}),
		onLoad(){
			// 获取用户登陆信息
			this.getUserData()
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getFastClick(){
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.homeService/collection/getFastClick',
					methods:'GET',
					data:{}
				}).then(res=>{
					this.cuIconList = res
					console.log('resres',res)
				}).catch(error=>{
					console.log('error',error)
				})
			},
			getHomeBannerData(){
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.homeService/collection/getHomeBanner',
					methods:'GET',
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
					console.log('resre',res)
				}).catch(e=>{
					console.log('getHomeBanner',e)
				})
			},
			getUserData(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.customer.login/collection/login',
					methods:'GET',
					data:{
						openId:'opfA81LO4KG84eBUeulJ0WmvK198',
						loginType:"openId"
					}
				}).then(res=>{
					const resFormat = res
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
					this.$store.dispatch('actionTrigger',{
						key:'openId',value:resFormat['openId'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'loginName',value:resFormat['loginName'] || '',
					})
					// 获取轮播图等信息
					this.getHomeBannerData()
					// 获取Goods
					this.getFastClick()
					uni.hideLoading()
				}).catch(error=>{
					console.log('error',error)
				})
			}
		}
	}
</script>

<style>

</style>
