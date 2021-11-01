<template>
	<view >
			<view  style="position: relative;width: 100%">
				<image style="width: 100%"  src="@/static/mine/background.jpg"></image>
				<view style="display: flex;flex-direction: column;position:absolute;top:150rpx;left:300rpx;">
					<view class='cu-avatar xl radius' >
						<!-- <view class='cu-tag badge'>99</view> -->
						<text class='cuIcon-people'></text>
					</view>
					<view>{{loginName}}</view>
				</view>
			</view>
		<view class="cu-card article">
			<view class="cu-item shadow">
				<view style="display: flex;justify-content: space-between;">
					<text style="margin:10rpx;font-weight: 500;font-size: 30rpx;">我的订单</text>
					<view style="margin:10rpx;font-weight: 500;">
						<text style="font-size: 30rpx;" @click="navigateToOrderList('全部')">全部</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
				
				<view style="display: flex;justify-content: space-around;">
					<view v-for="(item,index) in optionList" :key="index">
						<view style="display: flex;margin: 0rpx 0 0 16rpx;margin-top: 20rpx;" @click="navigateToOrderList(item.name)">
							<view style="position: relative;">
								<view class='cu-tag badge'></view>
								<image style="width: 50rpx;height: 50rpx;" :src="item.cuIcon"></image>
							</view>
						</view>
						<view style="font-weight: bold;">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="cu-card article" style="margin-top: -40rpx;">
				<view class="cu-item shadow">
					<view style="display: flex;justify-content: space-between;margin-top: 30rpx;" @click="navigateToMyAddress">
						<text style="margin:15rpx;font-weight: 500;font-size: 30rpx;">我的地址</text>
						<view style="margin:15rpx;font-weight: 500;">
							<text class="lg text-gray cuIcon-right"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card article" style="margin-top: -40rpx;">
				<view class="cu-item shadow">
					<view style="display: flex;justify-content: space-between;;margin-top: 30rpx;">
						<text style="margin:15rpx;font-weight: 500;font-size: 30rpx;">客服电话</text>
						<view style="margin:15rpx;font-weight: 500;">
							{{gmPhone}}
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view style="height:100rpx;"></view>
		<nabBar  type="mine" :isActive="true"></nabBar>
	</view>
</template>

<script>
import { mapState } from 'vuex'//引入mapState
	export default {
		data() {
			return {
				optionList:[
				{
					cuIcon:require("@/static/mine/已下单@3x.png"),
					name:"已下单"
				},
				{
					cuIcon:require("@/static/mine/已送达@3x.png"),
					name:"已送达"
				},
				{
					cuIcon:require("@/static/mine/维修中@3x.png"),
					name:"维修中"
				},
				{
					cuIcon:require("@/static/mine/待验收@3x.png"),
					name:"待验收"
				},
				{
					cuIcon:require("@/static/mine/待支付@3x.png"),
					name:"待支付"
				}]
			}
		},
		computed: mapState({
			// 从state中拿到数据 
			loginName: state => state.user.loginName,
			gmPhone: state => state.user.gmPhone,
		}),
		methods: {
			navigateToOrderList(title){
				console.log('title',title)
				uni.navigateTo({
					url:'../orderList/orderList?title='+title
				})
			},
			navigateToMyAddress(){
				uni.navigateTo({
					url:'../allAddress/allAddress'
				})
			}
		}
	}
</script>

<style>
	.mine-background{
		background-image: url(../../static/mine/background.jpg);
		background-repeat:no-repeat;
	}

</style>
