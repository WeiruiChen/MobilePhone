<template>
	<view class="background">

		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<block slot="backText">返回</block>
			<block slot="content">设备型号</block>
		</cu-custom>

		<view class="VerticalBox container">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				style="height:calc(100vh)">

				<view class="flex-vertical margin-top-xl">
					<view class="nav-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list"
						:key="index" @tap="TabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

			<scroll-view class="VerticalMain bg-white" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
				:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="text-center margin">
					<text>——iPhone 系列——</text>
				</view>
				
				<view  v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view>
						<view class="grid margin-bottom text-center col-3">
							<view class="padding-sm" v-for="(item,indexs) in 6" :key="indexs">
									<image src="../../static/images/iphone13.png" mode="widthFix"></image>
								<view class="text-sm"><text>iphone13 Pro</text></view>
							</view>
						</view>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			list = [{
					name: "苹果",
					id: "0"
				},
				{
					name: "华为",
					id: "1"
				},
				{
					name: "小米",
					id: "2"
				},
				{
					name: "魅族",
					id: "3"
				}
			]
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.background {
		background-color: #FFFFFF;
	}

	.container {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		display: flex;
	}

	.VerticalNav.nav {
		width: 20%;
		white-space: initial;
	}

	.VerticalNav.nav .nav-item {
		/* width: 100%; */
		text-align: center;
		margin: 0;
		border: none;
		height: 50px;
	}

	.VerticalNav.nav .nav-item.cur {
		color: #04D6C8;
	}

	.VerticalNav {
		border-radius: 8px;
		text-align: center;

	}

	.VerticalNav.nav .nav-item.cur::after {
		width: 8upx;
		height: 30upx;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.nav-item {
		width: 80% !important;
		line-height: 50px;
	}

	.VerticalMain {
		width: 80%;
		/* background-color: #f1f1f1; */
		flex: 1;
	}

	.flex-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.flex-vertical {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

</style>
