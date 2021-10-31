<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">提交订单</view>
		</cu-custom>

		<view class="container">
			<form>
				<view class="cu-form-group flex-container round-card">
					<view class="content">
						<view>取件地址：湖南省长沙市长沙县XXX路XXX写字楼</view>
						<view>姓名 17600000000</view>
					</view>
					<view>
						<switch class='orange radius' @change="SwitchA" :class="switcha?'checked':''"
							:checked="switcha?true:false"></switch>
					</view>
				</view>
				
				<view class="cu-form-group round-card">
					<view class="title">取件时间：</view>
					<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
						<view class="picker">
							{{time}}
						</view>
					</picker>
				</view>

				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view class="">
							<text>维修方案</text>
						</view>
						<image src="/static/BasicsBg.png" class="reverse_1" mode='widthFix'></image>
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

				<view class=" ps-text">
					<view class="content">
						<view>温馨提示：</view>
						<view>1、最终维修方案以工程师检测为准；</view>
						<view>2、维修方案变更需经过您同意确认方可执行；</view>
						<view>3、若工程师检测后，由于您个人原因不维修，需要支付检测费50元；</view>
						<view>4、预约订单无需支付费用，最终费用待您验收完成后一并支付。</view>
					</view>
				</view>

				<view class="cu-form-group padding-top padding-bottom">
					<view>
						<view> 预估费用：2008 2888 </view>
						<view class="text-grey"> 免费预约 修好付款 </view>
					</view>
					<view>
						<button class="cu-btn  shadow lg bg-green submit-btn round">预约下单</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sent: true,
				address: {
					neareast: "最近网点：北京市朝阳区三环到四环之间 东三环",
					receive: "取件地址：北京市朝阳区三环到四环之间 东三环",
					receiveTime: "取件时间",
					sentTime: "送修时间",
					name: "王xx"
				},
				switcha: false,
				time: '12:01',
				goodsList:[]
			}
		},
		onLoad(option){
				if(Object.keys(option).length > 0){
					const navigateParams = JSON.parse(decodeURIComponent(option.goods));
					console.log('navigateParams',navigateParams)
					this.goodsList = [navigateParams]
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
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
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
</style>
