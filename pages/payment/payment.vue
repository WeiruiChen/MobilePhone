<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">支付订单</view>
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
						<view>{{orderDetail.needPickUp ? orderDetail.address || '' : orderDetail.deliveryAdress || ''}}
						</view>
						<view v-if="orderDetail.needPickUp">上门时间： {{orderDetail.appointmentTime}}</view>
					</view>
				</view>


				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view class="">
							<text>维修方案</text>
						</view>
						<view style="display:flex;align-items:center">
							<image :src="imageUrl + orderDetail.goodsList[0].pictureId" class="reverse_1"
								mode='widthFix' style="height: auto;"></image>
							<view>
								<view class="margin-lr-sm"> <text>{{orderDetail.goodsList[0].phoneType}}</text></view>
								<view class="flex">
									<view class="margin-tb-sm margin-left-sm" v-for="item in phoneColorList"
										:key="item.color">
										<template v-if="orderDetail.goodsList[0].quickMemo === item.name">
											<view class="round phone-color-border">
												<view class="round phone-color cuIcon-check"
													:style="'background-color:'+item.color"></view>
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

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>合计</view>
						<view class="text_right">{{orderDetail.totalMoney}}</view>
					</view>
				</view>

				<button class="cu-btn shadow lg submit-btn round" style="position:fixed;bottom:50rpx;left:50rpx" @click="callPhone">联系客服</button>
				<button class="cu-btn shadow lg submit-btn round" style="position:fixed;bottom:50rpx;right:50rpx" @click="payment">支付订单</button>
				<!-- <button class="cu-btn shadow lg submit-btn round" style="position:fixed;bottom:50rpx;right:50rpx"
					@click="payment">支付订单</button> -->
			</form>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex' //引入mapState
	export default {
		//
		onLoad(option) {
			if (Object.keys(option).length > 0) {
				const navigateParams = JSON.parse(decodeURIComponent(option.param));
				console.log("navigateParams:" + navigateParams)
				this.$request({
					url: '/phoneReparisServer/service/rest/login.orderService/collection/getOrderDetail',
					methods: 'POST',
					data: {
						orderId: navigateParams
					}
				}).then(res => {
					console.log("payment res" + JSON.stringify(res))
					this.orderDetail = res
					// alert(this.orderDetail.needPickUp)
				}).catch(e => {
					console.log(e)
				})
			}
		},
		computed: mapState({
			imageUrl: state => state.user.imageBaseUrl,
			gmPhone: state => state.user.gmPhone,
		}),
		data() {
			return {
				orderDetail: {
					goodsList: [{}]
				},
				switcha: false,
				time: '12:01',
				NavMap: {
					'ALL': '全部',
					'New': '已下单',
					'Confirm': '已接单',
					'Packaged': '已送达',
					'Shipped': '维修中',
					'Check': '待验收',
					'Canceled': '已取消',
					'Completed': '已完成'
				},
				phoneColorList: [{
						name: '白色',
						color: '#FFFFFF',
						isCheck: true,
					},
					{
						name: '黑色',
						color: '#000000',
						isCheck: false
					},
					{
						name: '金色',
						color: '#D9D919',
						isCheck: false
					}
				],
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
				  phoneNumber: this.gmPhone,
				})
			},
			SwitchA(e) {
				this.switch = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			// gotoOrderList() {
			// 	uni.redirectTo({
			// 		url: '../orderList/orderList'
			// 	})
			// },
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.gmPhone,
				})
			},
			payment() {
				//获取支付信息
				this.$request({
					url: '/phoneReparisServer/service/rest/login.orderService/collection/getPayInfoForOrderIds',
					methods: 'POST',
					data: {
						orderIds: this.orderDetail.id,
						payType: 'WxSmallProgramReaders'
					}
				}).then(res => {
					console.log("payment:" + JSON.stringify(res))
					//微信小程序支付
					let param = JSON.parse(res["package"])
					uni.showLoading({
						title: "支付中...",
					})
					uni.requestPayment({
						// provider: 'wxpay',
						// // timeStamp: String(Date.now()),
						// nonceStr: 'A1B2C3D4E5',
						// package: 'prepay_id=wx20180101abcdefg',
						// signType: 'MD5',
						// paySign: '',
						provider: 'wxpay',
						timeStamp: param.timeStamp,
						nonceStr: param.nonceStr,
						package: param.package,
						signType: 'MD5',
						paySign: param.paySign,
						success: function(res) {
							uni.showToast({
								title:'支付成功',
								icon: "success",
								duration: 1000
							})
							uni.reLaunch({
								url:'/pages/orderDetial/orderDetial'
							})
							console.log('payment success:' + JSON.stringify(res));
						},
						fail: function(err) {
							uni.showToast({
								title:'支付失败',
								icon: "error",
								duration: 1000
							})
							console.log('payment fail:' + JSON.stringify(err));
						}
					});
					
				}).catch(e => {
					console.log('payment error：', e)
				})
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

	button {
		color: #04D4C6;
		background-color: #04D4C6 !important;
	}

	.cancle {
		margin-top: 60px;
		text-align: right;
	}
</style>
