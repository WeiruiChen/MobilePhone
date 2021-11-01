<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText" @click="backToMine">返回</view>
			<view slot="content">我的订单</view>
		</cu-custom>
		<view class="container">
			<scroll-view scroll-x class="nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.title==TabCur?'text-nav cur':''" v-for="(item,index) in navList"
						:key="item.title" @tap="tabSelect" :data-id="item.title">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
			<form>
				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view>
							<text>订单编号：338485977574939</text>
						</view>
						<image src="/static/BasicsBg.png" class="reverse_1" mode='widthFix'></image>
					</view>
					<view>
						<view>
							<text>iPhone12pro max</text>
						</view>
						<view>
							<text>更换屏幕 x1</text>
						</view>
						<view>
							<text>上门取件 x1</text>
						</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>共2项 合计：889</view>
						<button class="cu-btn round sm">取消订单</button>
					</view>
				</view>
			</form>

		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option){
			if(Object.keys(option).length>0){
				console.log(option)
				this.TabCur = option.title
			}
		},
		data() {
			return {
				TabCur: '全部',
				scrollLeft: 0,
				navList:[
					{
						title:'全部',
					},
					{
						title:'已下单',
					},
					{
						title:'已送达',
					},
					{
						title:'维修中',
					},
					{
						title:'待验收',
					},
					{
						title:'待支付',
					}
				]
			};
		},
		methods: {
			backToMine(){
				uni.navigateTo({
					url:'../mine/mine'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
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

	.submit-btn {
		/* background-color: blue; */
		color: #FFFFFF;
	}

	.cancle {
		margin-top: 60px;
		text-align: right;
	}

	button {
		color: #04D4C6;
	}
</style>
