<template>
	<view class="background bg-white">

		<!-- <cu-custom :isBack="true" bgColor="bg-gradual-blue"> -->
		<cu-custom bgColor="bg-gradual-blue">
			<view slot="backText" @click="backToFirst">首页</view>
			<view slot="content">设备型号</view>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.id == TabCur?'text-orange cur':''"
					v-for="(item,index) in FirstMenu" :key="index" @tap="tabSelect" :data-item="{id:item.id,index}">
					{{item.text}}
				</view>
			</view>
		</scroll-view>

		<view class="VerticalBox container visualHeight">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
				<view class="flex-vertical margin-top-xl" style="overflow:scroll;">
					<view class="nav-item" :class="item.id == tabCur?'text-green cur':''" v-for="(item,index) in list"
						:key="index" @tap="TabSelect" :data-item="{id:item.id,index}">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

			<scroll-view  class="VerticalMain bg-white" scroll-y>
				<view  v-if="flag">
				<view v-for="(item,indexs) in deviceList" :key="indexs">
					<view class="text-center margin">
						<text>——{{item.groupName}}——</text>
					</view>
					<view class="grid margin-bottom text-center col-3">
						<view class="padding-sm" v-for="(item) in item.goodsList" :key="item.pictureId"
							@click="fixPhone(item)">
							<image :src="imageUrl+item.pictureId" mode="widthFix" style="height: auto;"></image>
							<view class="text-sm"><text>{{item.name}}</text></view>
						</view>
					</view>
				</view>
				</view>
			</scroll-view>
		</view>
		<!-- <nabBar type="phoneModel" :isActive="true"></nabBar> -->
		<view-tabbar current="1"></view-tabbar>
	</view>
</template>

<script>
	import {mapState} from 'vuex' //引入mapState
	import Tabbar from '@/pages/tabBar/tabBar.vue'
	
	export default {
		data() {
			return {
				list: [],
				tabCur: null,
				verticalNavTop: 0,
				load: true,
				TabCur: null,
				FirstMenu: [],
				deviceList: [],
				// 加载闪屏
				flag:false,
				titleMap:{},
				getNavigate:false,

			};
		},
		computed: mapState({
			// 从state中拿到数据 
			imageUrl: state => state.user.imageBaseUrl
		}),
		components: {
			'view-tabbar': Tabbar
		},
		// onShow() {
		// 	uni.hideTabBar({
		// 		animation: false
		// 	})
		// },
		onLoad() {
			//清空右边
			this.deviceList=[]
			// let navigateParams = null
			// if (Object.keys(option).length > 0) {
			// 	navigateParams = JSON.parse(decodeURIComponent(option.category));
			// 	if(navigateParams.gotoValue.indexOf(',')){
			// 		this.tabCur = navigateParams.gotoValue.split(',')[1]
			// 		this.TabCur = navigateParams.gotoValue.split(',')[0]
			// 		this.getNavigate = true
			// 	}
			// }
			// uni.showLoading({
			// 	title: '加载中...',
			// 	mask: true
			// });
			// this.flag = false
			// this.$request({
			// 	url: '/phoneReparisServer/service/rest/login.customerService/collection/getCategoryOne',
			// 	methods: 'POST'
			// }).then(res => {
			// 	this.FirstMenu = res
			// 	this.getSecondMenu(this.TabCur ?this.TabCur : this.FirstMenu[0].id)
			// 	if(!this.getNavigate)
			// 		this.TabCur = this.FirstMenu[0].id;
			// 	this.flag = true
			// }).catch(e => {
			// 	console.log('getCategoryOne', e)
			// })
		},
		onShow(){
			// 取缓存相关参数
			const category = uni.getStorageSync('category');
			if(category && category !== ''){
				let navigateParams = JSON.parse(category)
				if(navigateParams.gotoValue.indexOf(',')){
					this.tabCur = navigateParams.gotoValue.split(',')[1]
					this.TabCur = navigateParams.gotoValue.split(',')[0]
					this.getNavigate = true
				}
			}
			if(this.TabCur == 'root'){
				this.tabCur = undefined;
				this.TabCur = undefined;
				this.getNavigate = true;
			}
			//清空右边
			this.deviceList=[]
			// 获取值后清空category
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.$request({
				url: '/phoneReparisServer/service/rest/login.customerService/collection/getCategoryOne',
				methods: 'POST'
			}).then(res => {
				this.FirstMenu = res
				this.getSecondMenu(this.TabCur ? this.TabCur : this.FirstMenu[0].id)
				if(!this.getNavigate)
					this.TabCur = this.FirstMenu[0].id;
			}).catch(e => {
				console.log('getCategoryOne', e)
			})
			uni.setStorageSync('category',undefined);

			// 清空购物车
			this.$store.dispatch('shoppingTrigger',{
						key:'maintenanceList',
						value:[]
			})
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			// 维修页面跳转
			fixPhone(item) {
				console.log('itemitemitemitemitemitemitem',item )
				uni.navigateTo({
					url: '../maintenanceList/maintenanceList?title=' + this.titleMap[this.tabCur] + '&phone=' +
						encodeURIComponent(JSON.stringify(item))
				})
			},
			backToFirst() {
				uni.switchTab({
					url: '../first/first'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.item.id;
				// console.log('e.currentTarget.dataset', e.currentTarget.dataset)
				this.getSecondMenu(e.currentTarget.dataset.item.id)
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.item.id;
				this.getThirdMenu(e.currentTarget.dataset.item.id)
				// this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			getSecondMenu(id) {
				this.$request({
					url: '/phoneReparisServer/service/rest/login.customerService/collection/getCategoryTwo',
					methods: 'POST',
					data: {
						categoryId: id
					}
				}).then(res => {
					console.log('getCategoryTwo 手机型号', res)
					this.list = res
					// 初始化titlemap
					for (const index in this.list) {
						this.titleMap[index] = this.list[index].name
					}
					this.getThirdMenu(this.tabCur ? this.tabCur : this.list[0].id)
					if(!this.getNavigate)
						this.tabCur = this.list[0].id;
				}).catch(e => {
					console.log('getCategoryTwo', e)
				})
			},
			getThirdMenu(id) {
				this.$request({
					url: '/phoneReparisServer/service/rest/login.customerService/collection/getCategoryTwo',
					methods: 'POST',
					data: {
						categoryId: id,
						needGroup: true
					}
				}).then(res => {
					this.deviceList = []
					const keys = Object.keys(res);
					if (keys.length > 0)
						for (let key of keys) {
							this.deviceList.push({
								groupName: key,
								goodsList: res[key]
							})
						}
					this.flag = true
					uni.hideLoading()
					// this.list = res
				}).catch(e => {
					console.log('getCategoryThree', e)
				})
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
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

	.visualHeight{
		height: calc(100vh - 375upx);
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
