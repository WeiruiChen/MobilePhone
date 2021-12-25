<template>
	<view>
		<cu-custom  bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">下单成功</view>
		</cu-custom>
	<view class="seccess-container">
		<view class="container ">
			<image src="../../static/images/order-success-icon.png" mode="widthFix"
				class="order-success-icon margin-top-xl"></image>
			<view class="margin">下单成功</view>
			<view class="text-gray">下单时间为8：00 - 20：00，客服会在15分钟内与您联系</view>
			<view class="text-gray">下单时间为20：00 - 8：00，客服响应时间可能会有所延迟</view>
		</view>

		<view class="btn-bottom">
			<button @click="navigateDetail" class="cu-btn  block lg round">查看订单</button>
			<button @click="navigateFirst" class="cu-btn  block lg round">返回首页</button>
		</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex' //引入mapState

	export default {
		onLoad(option) {
			if (Object.keys(option).length > 0) {
				const navigateParams = JSON.parse(decodeURIComponent(option.param));
				this.orderId = navigateParams;
				console.log("navigateParams:" + navigateParams);
			}
			// 下单成功后清除购物车
			this.$store.dispatch('shoppingTrigger',{
						key:'maintenanceList',
						value:[]
					})

			// 下单成功后删除选择地址
			uni.setStorageSync("selectAdrress",undefined);
			
		},
		data() {
			return {
				orderId: {},
				fanganlist: []
			}
		},
		computed:{
			// maintenanceList: state => state.goods.maintenanceList,
		},
		methods: {
			navigateDetail() {
				uni.redirectTo({
					url: '../orderDetial/orderDetial?param=' + encodeURIComponent(JSON.stringify(this.orderId))
				})
			},
			navigateFirst() {
				uni.switchTab({
					url: '../first/first'
				})
			}
		}
	}
</script>

<style>
	.seccess-container {
		display: flex;
		flex-direction:column;
		justify-content:space-between;
		height: calc(100vh - 500upx);

	}
	.container {
		padding-top: 10px;
		width: 100%;
		text-align: center;
	}


	.btn-bottom {
		display: flex;
		justify-content: space-around;
		align-items:flex-end;
	}

	button {
		color: #FFFFFF;
		background-color: #04D4C6 !important;
	}

	.order-success-icon {
		width: 80px;
		height: auto;
	}
</style>
