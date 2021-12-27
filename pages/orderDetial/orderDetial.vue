<template>
	<view>
		<cu-custom bgColor="bg-gradual-default" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">订单详情</view>
		</cu-custom>

		<view class="container">
			<form>
				<view class="cu-form-group flex-container padding-tb round-card">
					<view class="content ">
						<view>订单编号：{{orderDetail.code||''}}</view>
						<view>下单时间：{{orderDetail.createTime||''}}</view>
						<view>订单状态：{{NavMap[orderDetail.orderState]||''}}</view>
					</view>
				</view>
				<view class="cu-item cu-form-group padding-tb round-card">
					<view class="content">
						<view>{{orderDetail.needPickUp ? ' 上门信息' :'最近网点'}}</view>
						<view>
							{{orderDetail.needPickUp ? orderDetail.receiverName || '' : orderDetail.deliveryName || ''}} 
							{{orderDetail.needPickUp ? orderDetail.receiverPhone || '' : orderDetail.companyPhone || ''}} 
						</view>
						<view>{{orderDetail.needPickUp ? orderDetail.address || '' : orderDetail.deliveryAdress || ''}}</view>
						<view v-if="orderDetail.needPickUp">上门时间： {{orderDetail.appointmentTime}}</view>
					</view>
				</view>


				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
						<view class="content">
							<view class="">
								<text>维修方案</text>
							</view>
							<view style="display:flex;align-items:center">
							<image :src="imageUrl + orderDetail.goodsList[0].pictureId" class="reverse_1" mode='widthFix' style="height: auto;"></image>
							<view>
								<view class="margin-lr-sm">	<text>{{orderDetail.goodsList[0].phoneType}}</text></view>
								<view class="flex">
									<view class="margin-tb-sm margin-left-sm" v-for="item in phoneColorList" :key="item.color" >
										<template v-if="orderDetail.goodsList[0].quickMemo === item.name">
											<view class="round phone-color-border" >
											<view class="round phone-color cuIcon-check"  :style="'background-color:'+item.color"></view>
										</view>
										<view class="margin-tb-sm">{{item.name}}</view>
										</template>
										
									</view>
								</view>
						</view>
							</view>
					</view>
					
				</view>
				<view v-for="(item) in orderDetail.goodsList" :key="item.title">
					<view class="cu-form-group ">
						<view class="flex-container">
							<view>{{item.title}}</view>
							<view class="text_right">{{item.salePrice}}</view>
						</view>
					</view>
				</view>

				<view v-if="orderDetail.needPickUp" class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>取件费用</view>
						<view class="text_right">{{delivery.expressFee||''}}</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>合计</view>
						<view class="text_right">{{orderDetail.totalMoney}}</view>
					</view>
				</view>
`				<template v-if="NavMap[orderDetail.orderState] !== '已取消'">
						<button class="cu-btn shadow lg submit-btn round" style="position:fixed;bottom:50rpx;left:50rpx" @click="gotoOrderList">订单列表</button>
						<button v-if="NavMap[orderDetail.orderState] !== '已接单' && NavMap[orderDetail.orderState] !== '维修中' && NavMap[orderDetail.orderState] !== '已送达' &&  NavMap[orderDetail.orderState] !== '已完成'" class="cu-btn shadow lg submit-btn round" style="position:fixed;bottom:50rpx;right:50rpx" @click="deleteOrder">取消订单</button>
						<button v-else class="cu-btn shadow lg submit-btn round" style="position:fixed;bottom:50rpx;right:50rpx" @click="callPhone">联系客服</button>
				</template>
			</form>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'//引入mapState
	export default {

		// 下拉刷新
		onPullDownRefresh(){
			this.onLoadDetail();
			uni.stopPullDownRefresh();
		},
		//
		onLoad(option) {
			if (Object.keys(option).length > 0) {
				const navigateParams = JSON.parse(decodeURIComponent(option.param));
				this.orderId = navigateParams["orderId"]
				this.onLoadDetail();
			}
		},
		computed: mapState({
			imageUrl:state => state.user.imageBaseUrl,
			gmPhone:state => state.user.gmPhone,
			delivery: state => state.user.delivery
		}),
		data() {
			return {
				orderId:'',
				sent: true,
				orderDetail:{
					goodsList:[{}]
				},
				switcha: false,
				time: '12:01',
				NavMap : {
					'ALL':'全部',
					'New':'已下单',
					'Confirm': '已接单',
					'Packaged': '已送达',
					'Shipped': '维修中',
					'Check':'待验收',
					'Canceled': '已取消',
					'Completed': '已完成'
				},
				phoneColorList:[
					{
						name:'白色',
						color:'#FFFFFF',
						isCheck:true,
					},
					{
						name:'黑色',
						color:'#000000',
						isCheck:false
					},
						{
						name:'金色',
						color:'#D9D919',
						isCheck:false
					}
				],
			}
		},
		methods: {
			onLoadDetail(){
				this.$request({
					url:'/phoneReparisServer/service/rest/login.orderService/collection/getOrderDetail',
					methods:'POST',
					data:{
						orderId:this.orderId
					}
				}).then(res=>{
					console.log("orderdetial res" + JSON.stringify(res))
					this.orderDetail = res
					// alert(this.orderDetail.needPickUp)
				}).catch(e=>{
					console.log(e)
				})
			},
			// navigateToDetail() {
			// 	uni.navigateBack({
			// 		url: '../maintenanceList/maintenanceList'
			// 	})
			// },
			SwitchA(e) {
				this.switch = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			gotoOrderList() {
				uni.redirectTo({
					url: '../orderList/orderList'
				})
			},
			callPhone(){
				uni.makePhoneCall({
				  phoneNumber: this.gmPhone,
				})
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
								uni.showToast({
								title: "取消成功",
								icon: "none"
							})
								console.log("deleteOrder:"+JSON.stringify(res));
							}).catch(e => {
								console.log('deleteOrder', e)
							})
							uni.redirectTo({
								url:'../mine/mine'
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
	
	.phone-color-border {
		border: 1px solid #04D4C6;
		width: 26px;
		height: 26px;
	}
	
	.phone-color {
		width: 20px;
		height: 20px;
		margin: 2px;
		background-color: #CCE6FF;
		/* border: 1px solid #04D4C6; */
	}
	
	button{
		color: #04D4C6;
		background-color: #04D4C6 !important;
	}
	.cancle {
		margin-top: 60px;
		text-align: right;
	}
</style>
