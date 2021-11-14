<template>
	<view class="body">
		<cu-custom bgColor="bg-gradual-blue">
			<view slot="content">我的</view>
		</cu-custom>
		
		<view style="text-align: center;">
			<view style="margin-top:150rpx;text-align: center;">
				<view class="cu-avatar xl round" :style="'background-image:url('+wxHead+');'"></view>
				<view>{{loginName}}</view>
			</view>
		</view>
		<view class="cu-card article">
			<view class="cu-item shadow">
				<view style="display: flex;justify-content: space-between;">
					<text style="font-size: 30rpx;" class="margin">我的订单</text>
					<view class="margin">
						<text style="font-size: 30rpx;" @click="navigateToOrderList('全部')">全部</text>
						<text class="lg text-gray cuIcon-right margin-left-sm"></text>
					</view>
				</view>

				<view style="display: flex;justify-content: space-around;">
					<view v-for="(item,index) in optionList" :key="index">
						<view style="display: flex;margin: 0rpx 0 0 16rpx;margin-top: 20rpx;"
							@click="navigateToOrderList(item.name)">
							<view style="position: relative;">
								<view v-if="typeCount[item.countType]" class='cu-tag badge' style="font-size:20rpx;z-index:999">{{typeCount[item.countType]}}</view>
								<image style="width: 50rpx;height: 50rpx;" :src="item.cuIcon"></image>
							</view>
						</view>
						<view>{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-card article" style="margin-top: -40rpx;">
				<view class="cu-item shadow">
					<view style="display: flex;justify-content: space-between;margin-top: 30rpx;"
						@click="navigateToMyAddress">
						<text style="font-size: 30rpx;" class="margin">我的地址</text>
						<view class="margin">
							<text class="lg text-gray cuIcon-right"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card article" style="margin-top: -40rpx;" @click="callPhone">
				<view class="cu-item shadow">
					<view style="display: flex;justify-content: space-between;;margin-top: 30rpx;">
						<text style="font-size: 30rpx;" class="margin">客服电话</text>
						<view class="margin">
							{{gmPhone}}
						</view>
					</view>
				</view>
			</view>

		</view>
		<view style="height:100rpx;"></view>
		<!-- <nabBar type="mine" :isActive="true"></nabBar> -->
		<view-tabbar current="2"></view-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex' //引入mapState
	import Tabbar from '@/pages/tabBar/tabBar.vue'
	
	export default {
		onLoad(){
		},
		components: {
			'view-tabbar': Tabbar
		},
		onShow() {
			// 获取全部订单信息
			this.$request({
				url:'/phoneReparisServer/service/rest/login.orderService/collection/getOrderCounts',
				methods:'POST'
			}).then(res=>{
				console.log(JSON.stringify(res));
				// if(res.length >0){
				for (const key in res) {
					this.typeCount[key] = res[key]
				}
				// }
				// console.log(JSON.stringify(this.typeCount))
			}).catch(e=>{
				console.log(e)
			})
			uni.hideTabBar({
				animation: false
			})
		},
		data() {
			return {
				typeCount:{
					newCount:null,
					packagedCount:null,
					shippedCount:null,
					checkCount:null
				},
				optionList: [{
						cuIcon: require("@/static/mine/已下单@3x.png"),
						name: "已下单",
						countType:'newCount',
						type:"New"
					},
					{
						cuIcon: require("@/static/mine/已送达@3x.png"),
						name: "已送达",
						countType:'packagedCount',
						type:"Confirm"
					},
					{
						cuIcon: require("@/static/mine/维修中@3x.png"),
						name: "维修中",
						countType:'shippedCount',
						type:"Shipped"
					},
					{
						cuIcon: require("@/static/mine/待验收@3x.png"),
						name: "待验收",
						countType:'checkCount',
						type:"Check"
					},
				]
			}
		},
		computed: mapState({
			// 从state中拿到数据 
			loginName: state => state.user.loginName,
			gmPhone: state => state.user.gmPhone,
			// avatarUrl:state=>state.user.avatarUrl,
			wxHead: state => state.user.wxHead,
		}),
		methods: {
			navigateToOrderList(title) {
				console.log('title', title)
				uni.navigateTo({
					url: '../orderList/orderList?title=' + title
				})
			},
			navigateToMyAddress() {
				uni.navigateTo({
					url: '../allAddress/allAddress'
				})
			},
			callPhone(){
				uni.makePhoneCall({
				  phoneNumber: this.gmPhone,
				})
			},
		}
	}
</script>

<style>
	@import url("./background-mage.css");

</style>
