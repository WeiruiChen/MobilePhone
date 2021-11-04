<template>
	<view style="position: relative;">
		<cu-custom bgColor="bg-gradual-blue" ><block slot="content">首页</block></cu-custom>
		
		<swiper class="card-swiper"  :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item" @click="onClickHandler(item)">
					<image :src="imageUrl+item.fileId" mode="aspectFill" ></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view  v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<image @click="onClickHandler(item,index)" :src="imageUrl+item.fileId" style="width: 180rpx;height: 180rpx;"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<view v-show="">
			
			<view class="cu-bar" style="margin-top: 20rpx;">
				<view class="action">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/xianshiyouhuiicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;">限时优惠</text>
				</view>
			</view>
		
			<scroll-view scroll-x scroll-with-animation >
				<view class="cu-card" style="display: inline-flex;">
						<view class="cu-item-scroll" style="margin: 10rpx;" v-for="(item,index) in salesTimeList" :key="index" @click="onClickHandler(item)">
							<view style="display: flex;;background-color: #E7F0F4;height: 100%;">
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
									<view style="position: absolute;top: 30rpx;left: 10rpx;color: #FFFFFF;font-weight: 700;font-size: 35rpx;">立即抢购</view>
								</view>
							</view>
							
						</view>
				</view>
			</scroll-view>
			
			<view class="cu-bar" style="margin-top: 20rpx;">
				<view class="action">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/processicon.png"></image>
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
		
			<view class="cu-bar" style="margin-top: 20rpx;">
				<view class="action">
					<!-- src="../../static/first/服务优势icon@3x.png" -->
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/xianshiyouhuiicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;">服务优势</text>
				</view>
			</view>
			
		</view>
		
		<view class="cu-card case" v-for="(item,index) in serviceProfitList" :key="item.fileId">
			<view class="cu-item shadow" style="position: relative;">
				<view class="image">
					<image :src="imageUrl+item.fileId"
					 mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view style="display:flex;align-items: center;justify-content: center;">
			<text style="text-align: center;">24小时客服电话:{{cshPhone}}</text>
		</view>
		<view style="height: 100rpx;"></view>
		<nabBar style="height: 100rpx;" type="first" :isActive="true"></nabBar>		
	</view>
</template>

<script>
	import { mapState } from 'vuex'//引入mapState
	import { navBar } from '../navBar/navBar.vue'
	
	export default {
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
				showStatic:false
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
						url:pathMap[item.gotoValue]
					})
					},
					'Category':function(){
						if(index > 3){
							uni.navigateTo({
							url:'../maintenanceList/maintenanceList'
						})
						}else{
							uni.navigateTo({
							url:'../phoneModel/phoneModel?category='+encodeURIComponent(JSON.stringify(item))
						})
						}
					},
					'Goods':function(){
						console.log(JSON.stringify(item))
						uni.navigateTo({
							url:'../reserve/reserve?goods='+encodeURIComponent(JSON.stringify(item))
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
			getUserData(){
				uni.showLoading({
				    title: '加载中'
				});
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.customer.login/collection/login',
					methods:'POST',
					data:{
						openId:'opfA81LO4KG84eBUeulJ0WmvK198',
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
					this.$store.dispatch('actionTrigger',{
						key:'openId',value:resFormat['openId'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'loginName',value:resFormat['loginName'] || '',
					})
					this.$store.dispatch('actionTrigger',{
						key:'sessionID',value:resFormat['sessionID'] || '',
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
</style>
