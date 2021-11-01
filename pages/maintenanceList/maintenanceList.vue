<template>
	<view>

		<cu-custom :isBack="true"  bgColor="bg-gradual-blue">
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
					<view class="nav-item" style="margin-top:10rpx" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list"
						:key="index" @tap ="TabSelect" :data-item="{id:item.id,index}">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
				:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in forkMaintenance" :key="index" :id="'main-'+index">
					<form>
						<view class="cu-form-group padding margin-bottom-sm round-card">
							<view style="width: 100%;">
								<view class="text-title"><text>{{item.title}}</text></view>
								<view class="text-gray margin-top"><text>{{item.subTitle}}</text></view>
								<view class="text-gray"><div v-html="item.description"></div></view>
								<view class="flex-container margin-top">
									<view class="text-price"><text>{{item.salePrice}}</text></view>
									<button v-if="item.selected" class="cu-btn cuIcon icon-move" @click="addShopping(item,false)">
										<text class="cuIcon-move"></text>
									</button>
									<button v-else class="cu-btn cuIcon icon-add" style="font-weight: 900;" @click="addShopping(item,true)">
										<text class="cuIcon-add"></text>
									</button>
								</view>
							</view>
						</view>

					</form>
				</view>
			</scroll-view>
		</view>
		<view style="position: fixed;buttom:0;width: 100%;">
			<view style="display: flex;align-items: center;">
				<button @click="navigateOrderSuccess" style="background-color: #04D4C6">预约下单</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'//引入mapState
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
				],
				currentGoodId:'',
				forkMaintenance:[]
			};
		},
		onLoad(option) {
			// 获取维修参数
			if(Object.keys(option).length > 0){
				const navigateParams = JSON.parse(decodeURIComponent(option.phone));
				navigateParams['title'] = option.title
				this.phone = navigateParams
			}
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.$request({
				url:'/phoneReparisServer/service/rest/login.customerService/collection/getCategoryTwo',
				methods:'POST',
				data:{
					categoryId:this.phone.id
				}
			}).then(res=>{
				console.log(res)
				this.list = res
				// 获取第一个四级信息
				// if(this.list >)
				this.getGoods(this.list[0].id)
			}).catch(e=>{
				console.log(e)
			})
			this.listCur = this.list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		computed: mapState({
			// 从state中拿到数据 
			maintenanceList: state => state.goods.maintenanceList,
		}),
		methods: {
			navigateOrderSuccess(){
				// 判断本地购物车是否有数据 有数据则跳转
				let selectedFlag = false
				for (let good of this.maintenanceList) {
					if(good.selected) selectedFlag = true
				}
				// if(this.maintenanceList)
				if(selectedFlag)
					uni.navigateTo({
						url:'../reserve/reserve'
					})
				else
					uni.showModal({
					    content:  '目前没有选择方案,请选择再下单～',
						showCancel:false,
					    success: function (res) {
					        if (res.confirm) {
					            // console.log('用户点击确定');
					        } else if (res.cancel) {
					            // console.log('用户点击取消');
					        }
					    }
					});
			},
			addShopping(item,status){
				// this.forkMaintenance = JSON.parse(JSON.stringify(this.maintenanceList));
				console.log('status',status)
				// 判断是否重复 重复的话则删除 下一步再添加
				if(this.forkMaintenance.length > 0){
					for (let index in this.forkMaintenance) {
						if((this.forkMaintenance[index].title === item.title)){
							// 删除旧数据
							if(index === 0) this.forkMaintenance.pop()
							else this.forkMaintenance.splice(index,1)
						}
					}
				}
				this.forkMaintenance.push({
					...item,
					selected:status
				})
				// 同步全局
				this.$store.dispatch('shoppingTrigger',{
					key:'maintenanceList',
					value:this.forkMaintenance
				})
			},
			changePhone(){
				uni.navigateTo({
					url:'../phoneModel/phoneModel'
				})
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.item.index;
				this.mainCur = e.currentTarget.dataset.item.index;
				this.verticalNavTop = (e.currentTarget.dataset.item.index - 1) * 50
				this.currentGoodId = e.currentTarget.dataset.item.id
				this.getGoods(this.currentGoodId)
			},
			getGoods(id){
				this.$request({
					url:'/phoneReparisServer/service/rest/login.customerService/collection/getAllServiceGoods',
					methods:'POST',
					data:{
						page:1,
						rows:20,
						categoryId:'0136673507f5442a820c2742ee7e5c37'
						// sort:'createTime',
						// order:'desc'
					}
				}).then(res=>{
					// mockshuju
					const mockData = {"message":"成功","totalCount":7,"page":1,"pageSize":20,"data":"[{\"id\":\"2ca6245c588640b4a0e7748a282d84af\",\"createTime\":\"2021-10-27 20:14:50\",\"subTitle\":\"摄像头问题\",\"title\":\"摄像头问题\",\"price\":100,\"description\":\"<strong>保修一年<\\/strong>\",\"salePrice\":80,\"code\":\"00006140\",\"pictureId\":\"70e94e91c1e343529f6e3129a95d1fdf\"}]","javaClass":"com.caomei.xinxikeji.util.ResultInfo","code":0,"totalPage":1}
					this.goodsList = JSON.parse(mockData.data)
					// console.log('this.goodsList',this.goodsList)
					// 如果购物车里面本地存在数据则拿购物车的数据 不更新数据
					if(this.maintenanceList.length === 0){
						this.forkMaintenance = this.goodsList.map(element => {
								return {
									...element,
									selected:false
								}
						});
						this.$store.dispatch('shoppingTrigger',{
							key:'maintenanceList',
							value: this.forkMaintenance
						})
					}else{
						this.forkMaintenance = this.maintenanceList
					}
				})
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

	.category-two {
		font-size: 20rpx;
	}

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
		/* flex-direction: row; */
		justify-content: space-between;
	}

	.flex-vertical {
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
