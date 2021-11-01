<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">下单成功</view>
		</cu-custom>

		<view class="container ">
			<image src="../../static/images/order-success-icon.png" mode="widthFix" class="order-success-icon margin-top-xl"></image>
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
	export default {
		data() {
			return {

			}
		},
		methods: {
			navigateDetail(){
				uni.navigateTo({
					url:'../orderDetial/orderDetial'
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
	button{
		color: #04D4C6;
	}
	
	.order-success-icon{
		width: 80px;
	}
</style>
