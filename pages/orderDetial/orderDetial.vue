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
						<view>上门信息</view>
						<view>大名 125635414878</view>
						<view>北京市朝阳区三环到四环之间 东三环</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="content">
						<view>上门时间</view>
						<view>2021-12-12 12：00</view>
					</view>
				</view>


				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view class="">
							<text>维修方案</text>
						</view>
						<!-- <image :src="imageUrl + item.pictureId" class="reverse_1" mode='widthFix'></image> -->
					</view>
					<view class="">
						<view class="">
							<text>iPhone12pro max</text>
						</view>
						<view class="">
							<!-- <text>颜色</text> -->
						</view>
						<button class="cu-btn bg-blue shadow">白色</button>
						<button class="cu-btn bg-grey shadow">灰色</button>
						<button class="cu-btn bg-grey shadow">黑色</button>
					</view>
				</view>

				<view class="cu-form-group ">
					<view class="flex-container">
						<view>更换屏幕方案1</view>
						<view class="text_right">188</view>
					</view>
				</view>

				<view class="cu-form-group">
					<view class="flex-container">
						<view>上门取件费用1</view>
						<view class="text_right">20</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>合计</view>
						<view class="text_right">208</view>
					</view>
				</view>

				<view class="cancle">
					<button class="cu-btn  shadow lg submit-btn round">取消订单</button>
				</view>

			</form>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'//引入mapState
	export default {
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
				orderDetail:{},
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
