<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">订单详情</view>
		</cu-custom>

		<view class="container">
			<form>
				<view class="cu-form-group flex-container round-card">
					<view class="content">
						<view>订单编号：{{orderDetail.code}}</view>
						<view>下单时间：{{orderDetail.createTime}}</view>
						<view>订单状态：{{NavMap[orderDetail.orderState]}}</view>
					</view>
				</view>

				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view>{{orderDetail.needPickup ? '上门信息' : '最近网店'}}</view>
						<view> {{orderDetail.receiverName || '暂无'}}</view>
						<view>{{orderDetail.needPickup ? orderDetail.address || '' : orderDetail.deliveryName+' '+orderDetail.deliveryAdress}}</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card"  v-if="orderDetail.needPickup">
					<view class="content">
						<view>上门时间</view>
						<view>{{orderDetail.appointmentTime}}</view>
					</view>
				</view>


				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view class="">
							<text>维修方案</text>
						</view>
						<view style="display: flex;justify-content: center;align-items: center;">
							<image :src="imageUrl + orderDetail.goodsList[0].pictureId" class="reverse_1" mode='widthFix'></image>
							<view>
								<view class="">
									<text>{{orderDetail.goodsList[0].phoneType}}</text>
								</view>
								<view style="display: flex;align-items: center;">
									<view>颜色：</view>
									<view class="bg-white solid-bottom">
										<view class='cu-tag'>{{orderDetail.goodsList[0].quickMemo}}</view>
									</view>
								</view>
								
							</view>
						</view>
					</view>
					
				</view>
				<view v-for="(item,index) in orderDetail.goodsList">
					<view class="cu-form-group ">
						<view class="flex-container">
							<view>{{item.title}}</view>
							<view class="text_right">{{item.price}}</view>
						</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>合计</view>
						<view class="text_right">{{orderDetail.totalMoney}}</view>
					</view>
				</view>

				<view class="cancle">
					<button class="cu-btn shadow lg submit-btn round" @click="deleteOrder">取消订单</button>
				</view>

			</form>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'//引入mapState
	export default {
		// 这里跳转会穿optionID
		onLoad(option) {
			if(option.id){
				this.$request({
					url:'/phoneReparisServer/service/rest/login.orderService/collection/getOrderDetail',
					methods:'POST',
					data:{
						orderId:option.id
					}
				}).then(res=>{
					this.orderDetail = res
				}).catch(e=>{
					console.log(e)
				})
			}
		},
		computed: mapState({
			imageUrl:state => state.user.imageBaseUrl
		}),
		data() {
			return {
				sent: true,
				orderDetail:{
					goodsList:[{}]
				},
				address: {
					neareast: "最近网点：北京市朝阳区三环到四环之间 东三环",
					receive: "取件地址：北京市朝阳区三环到四环之间 东三环",
					receiveTime: "取件时间",
					sentTime: "送修时间",
					name: "王xx"
				},
				switcha: false,
				time: '12:01',
				NavMap : {
					'ALL':'全部',
					'Confirm':'已下单',
					'Packaged':'已接单',
					'Shipped':'已送达',
					'Check':'维修中',
					'Canceled':'已取消',
					'Completed':'已完成'
				}
			}
		},
		methods: {
			SwitchA(e) {
				this.switch = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			deleteOrder() {
				let that = this;
				uni.showModal({
					title: '确认',
					content: '确认删除订单?',
					success: function(e) {
						if (e.confirm) {
							that.$request({
								url: '/phoneReparisServer/service/rest/login.orderService/collection/cancelOrder',
								methods: 'POST',
								data:{
									orderId:that.orderDetail.id
								}
							}).then(res => {
								console.log("setDefaultAddress:"+JSON.stringify(res));
								
							}).catch(e => {
								console.log('setDefaultAddress', e)
								uni.showToast({
								    title: "删除失败",
								    icon: "none"
								})
							})
							uni.redirectTo({
								url:'../orderList/orderList'
							})
						} else if (e.cancel) {
							uni.showToast({
							    title: "取消删除",
							    icon: "none"
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	.container {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}

	.round-card {
		margin-top: 10px;
		border-radius: 8px;
	}

	.round-bottom-card {
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	.round-top-card {
		margin-top: 10px;
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
	}

	.reverse_1 {
		margin-top: 10px;
		width: 100px;
	}

	.flex-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.text_right {
		right: 0;
	}

	.ps-text {
		color: #A6A6A6;
		padding-top: 40px;
		padding-bottom: 40px;
	}

	.text-grey {
		color: #D9D9D9;
	}

	.submit-btn {
		/* background-color: blue; */
		background-color: #04D4C6;
		color: #FFFFFF;
	}
	
	button{
		color: #04D4C6;
	}
	.cancle {
		margin-top: 60px;
		text-align: right;
	}
</style>
