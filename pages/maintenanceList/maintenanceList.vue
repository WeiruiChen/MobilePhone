<template>
	<view>

		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<block slot="backText">返回</block>
			<block slot="content">维修方案列表</block>
		</cu-custom>


		<view class="VerticalBox container">

			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				style="height:calc(100vh - 375upx)">

				<view class="text-left margin-top-xl margin-left">
					<view class="category-one"><text>{{phone.title}}</text></view>
					<view class="category-two margin-tb-sm"><text>{{phone.name}}</text></view>
					<view class="change-phone" @click="changePhone"><text>更换机型</text></view>
					<view class="category-three">
					</view>
				</view>

				<view class="flex-vertical margin-top-xl">
					<view class="nav-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list"
						:key="index" @tap="TabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
				:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">

				<view class="padding-top padding-lr" v-for="(item,index) in goodsList" :key="index" :id="'main-'+index">
					<form>
						<view class="cu-form-group padding margin-bottom-sm round-card">
							<view>
								<view class="text-title"><text>{{item.title}}</text></view>
								<view class="text-gray margin-top"><text>{{item.subTitle}}</text></view>
								<view class="text-gray"><div v-html="item.description"></div></view>
								<view class="flex-container margin-top">
									<view class="text-price"><text>{{item.salePrice}}</text></view>
									<button class="cu-btn cuIcon icon-move">
										<text class="cuIcon-move"></text>
									</button>
								</view>
							</view>
						</view>

					</form>
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
				load: true,
				phone:{
					title:'苹果',
					name:'iphone12ProMax'
				},
				goodsList:[
				]
			};
		},
		onLoad(option) {
			// 获取维修参数
			if(Object.keys(option).length > 0){
				const navigateParams = JSON.parse(decodeURIComponent(option.phone));
				navigateParams['title'] = option.title
				console.log(navigateParams)
				this.phone = navigateParams
			}
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.$request({
				url:'/phoneReparisServer/service/rest/login.customerService/collection/getAllServiceGoods',
				methods:'GET',
				data:{
					page:1,
					rows:20
					// categoryId:'a937e38a4f554c36b31c836ebd9b1725',
					// sort:'createTime',
					// order:'desc'
				}
			}).then(res=>{
				this.goodsList = res
				console.log('this.goodlist',this.goodsList)
			})
			let list = [{}];
			list = [{
					name: "屏幕问题",
					id: "0"
				},
				{
					name: "电池充电",
					id: "1"
				},
				{
					name: "后壳问题",
					id: "2"
				},
				{
					name: "屏幕问题",
					id: "3"
				},
				{
					name: "屏幕问题",
					id: "4"
				},
				{
					name: "屏幕问题",
					id: "5"
				},
			]
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			changePhone(){
				uni.navigateTo({
					url:'../phoneModel/phoneModel'
				})
			},
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
	.container {
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
		display: flex;
	}

	.VerticalNav.nav {
		width: 35%;
		white-space: initial;
	}

	.VerticalNav.nav .nav-item {
		width: 100%;
		text-align: center;
		background-color: #D9D9D9;
		color: #A6A6A6;
		margin: 0;
		border: none;
		height: 50px;
		/* position: relative; */
	}

	.VerticalNav.nav .nav-item.cur {
		background-color: #04D4C6;
		color: #FFFFFF;
	}

	.VerticalNav {
		background-color: #FAFAFA;
		border-radius: 8px;
		text-align: center;

	}

	.VerticalNav.nav .nav-item.cur::after {
		/* content: ""; */
		width: 8upx;
		height: 30upx;
		/* border-radius: 10upx 0 0 10upx; */
		/* position: absolute; */
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.nav-item {
		border-radius: 8px;
		width: 80% !important;
		font-size: 1.1rem;
		line-height: 50px;
	}

	.category-one {
		font-size: 1.2rem;
	}

	.category-two {}

	.category-three {}

	.change-phone {
		color: #04D4C6;
		text-decoration-line: underline;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}

	.round-card {
		border-radius: 8px;
	}

	.flex-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.flex-vertical {
		height: 65%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.text-left {
		height: 13%;
	}

	.icon-add {
		background-color: #04D4C6 !important;
	}

	.cuIcon-add,
	.cuIcon-move {
		color: #FFFFFF;
	}

	.icon-move {
		background-color: #DD1717 !important;
	}

	.text-gray {
		color: #A6A6A6;
	}

	.text-price {
		font-size: 1.1rem;
	}
</style>
