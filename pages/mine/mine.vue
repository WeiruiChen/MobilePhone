<template>
	<view class="body">
		<cu-custom bgColor="bg-gradual-blue">
			<view slot="content">我的</view>
		</cu-custom>
		
		<view style="text-align: center;">
			<view style="margin-top:150rpx;text-align: center;">
				<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
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
								<view class='cu-tag badge'></view>
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
			<view class="cu-card article" style="margin-top: -40rpx;">
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
		<nabBar type="mine" :isActive="true"></nabBar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex' //引入mapState
	export default {
		data() {
			return {
				optionList: [{
						cuIcon: require("@/static/mine/已下单@3x.png"),
						name: "已下单"
					},
					{
						cuIcon: require("@/static/mine/已送达@3x.png"),
						name: "已送达"
					},
					{
						cuIcon: require("@/static/mine/维修中@3x.png"),
						name: "维修中"
					},
					{
						cuIcon: require("@/static/mine/待验收@3x.png"),
						name: "待验收"
					},
					{
						cuIcon: require("@/static/mine/待支付@3x.png"),
						name: "待支付"
					}
				]
			}
		},
		computed: mapState({
			// 从state中拿到数据 
			loginName: state => state.user.loginName,
			gmPhone: state => state.user.gmPhone,
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
			}
		}
	}
</script>

<style>
	@import url("./background-mage.css");

</style>
