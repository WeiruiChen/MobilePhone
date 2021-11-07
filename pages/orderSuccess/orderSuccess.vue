<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">下单成功</view>
		</cu-custom>

		<view class="container ">
			<image src="../../static/images/order-success-icon.png" mode="widthFix"
				class="order-success-icon margin-top-xl"></image>
			<view class="margin">下单成功</view>
			<view class="text-gray">下单时间为8：30 - 20：00，客服会在15分钟内与您联系</view>
			<view class="text-gray">下单时间为8：30 - 20：00，客服响应时间可能会有所延迟</view>
		</view>

		<view class="btn-bottom">
			<button @click="navigateDetail" class="cu-btn  block lg round">查看订单</button>
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
		},
		data() {
			return {
				orderId: {},
				fanganlist: []
			}
		},
		methods: {
			navigateDetail() {
				uni.redirectTo({
					url: '../orderDetial/orderDetial?param=' + encodeURIComponent(JSON.stringify(this.orderId))
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-top: 10px;
		width: 100%;
		text-align: center;
	}


	.btn-bottom {
		position: fixed;
		width: 100%;
		padding-left: 20%;
		padding-right: 20%;
		bottom: 30px;
		text-align: center;
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
