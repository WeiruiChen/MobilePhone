<template>
	<view>
		<cu-custom bgColor="bg-gradual-default" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">我的订单</view>
		</cu-custom>
		<view class="container">
			<scroll-view scroll-x class="nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.title==TabCur?'text-nav cur':''"
						v-for="(item) in navList" :key="item.title" @tap="tabSelect" :data-id="item.title">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
			<view v-for="(item) in showOrderList" :key="item.code">
				<view @click="gotoDetail(item.id,item)"
					class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content" style="width:100%">
						<view style="display:flex;justify-content: space-between;">
							<text style="color:#999999">订单编号：{{item.code}}</text>
							<view class="cu-btn round sm" >{{item.orderStateName}}</view>
						</view>
						<view v-if="item.goodsList.length == 0">暂无商品信息</view>
						<view v-else style="display: flex;align-items: center;">
						
							<image :src="imageUrl + item.goodsList[0].pictureId" class="reverse_1" mode='widthFix'
								style="height: auto;">
							</image>
							<view>
								<view>
									<text>{{item.goodsList[0].phoneType}}</text>
								</view>
								<view v-for="(subItem) in item.goodsList" :key="subItem.title">
									<text>{{subItem.title}}x{{subItem.count}}</text>
								</view>
							</view>
						</view>

					</view>

				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>共{{item.goodsList.length||''}}项 合计：{{item.totalMoney}}</view>
						<button v-if="item.orderState === 'Check'" class="cu-btn round sm submit-btn" @click="navigateToPayment(item.id)">立即支付</button>
						<button v-if="item.orderState === 'New' || item.orderState === 'Confirm'" class="cu-btn round sm submit-btn" @click="deleteOrder(item.id)">取消订单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex' //引入mapState
	const NavMap = {
		'全部': 'ALL',
		'已预约': 'New',
		'已接单': 'Confirm',
		'已送达': 'Packaged',
		'维修中': 'Shipped',
		'待验收': 'Check',
		'已取消': 'Canceled',
		'已完成': 'Completed'
	}
	export default {
			// 下拉刷新
		onPullDownRefresh(){
			this.getOrderList();
			uni.stopPullDownRefresh();
		},

		onLoad(option) {
			if (Object.keys(option).length > 0) {
				console.log(option)
				this.TabCur = option.title
			}
			this.getOrderList(this.NavMap[this.TabCur])
		},
		onshow() {
		},
		data() {
			return {
				TabCur: '全部',
				scrollLeft: 0,
				NavMap,
				showOrderList: [],
				navList: [{
						title: '全部',
					},
					{
						title: '已预约',
					},
					{
						title: '已接单',
					},
					{
						title: '已送达',
					},
					{
						title: '维修中',
					},
					{
						title: '待验收',
					}
				]
			};
		},
		computed: mapState({
			// 从state中拿到数据 
			imageUrl: state => state.user.imageBaseUrl
		}),
		methods: {
			gotoDetail(id,item) {
				let order = {};
				order["orderId"] = id;
				if(item.orderState == 'Check'){
						uni.navigateTo({
						url: '../payment/payment?param=' + encodeURIComponent(JSON.stringify(id))
					})
				}else{
						uni.navigateTo({
						url: '../orderDetial/orderDetial?param=' + encodeURIComponent(JSON.stringify(order))
					})
				}
				
			},
			getOrderList(type = 'ALL') {
				this.showOrderList = [];
				this.$request({
					url: '/phoneReparisServer/service/rest/login.orderService/collection/getPagingOrder',
					methods: 'POST',
					data: {
						rows: 999,
						page: 1,
						status: type
					}
				}).then(res => {
					this.showOrderList = res
					// alert(JSON.stringify(this.showOrderList))
				}).catch(e => {
					console.log('e')
				})
			},
			navigateToPayment(id){
				uni.navigateTo({
					url: '../payment/payment?param=' + encodeURIComponent(JSON.stringify(id))
				})
			},
			deleteOrder(id) {
				let that = this;
				uni.showModal({
					title: '确认',
					content: '确认取消订单?',
					success: function(e) {
						if (e.confirm) {
							that.$request({
								url: '/phoneReparisServer/service/rest/login.orderService/collection/cancelOrder',
								methods: 'POST',
								data: {
									orderId: id
								}
							}).then(res => {
								uni.showToast({
								title: "取消成功",
								icon: "none",
								success: function(){
									that.getOrderList()
								}
							})
							}).catch(e => {
								console.log('deleteOrder', e)
							})
						} else if (e.cancel) {
							uni.showToast({
								title: "取消删除",
								icon: "none"
							})
						}
					}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.getOrderList(NavMap[this.TabCur])
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
		width: 200rpx;
	}

	.flex-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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

	.cancle {
		margin-top: 60px;
		text-align: right;
	}

	button {
		color: #04D4C6;
	}

	.submit-btn {
		/* background-color: blue; */
		background-color: #ffffff !important;
		color: #04D4C6;
		border: 1rpx solid #04D4C6;

	}
</style>
