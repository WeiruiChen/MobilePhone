<template>
	<view>

		<cu-custom :isBack="true"  bgColor="bg-gradual-blue">
			<block slot="backText">返回</block>
			<block slot="content">维修方案列表</block>
		</cu-custom>

		<view class="VerticalBox container">

			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				style="height:calc(100vh - 375upx)">
				<view style="display:flex;flex-direction:column;">

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
					</view>
			</scroll-view>
		

			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
				:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view v-if="!showNull" class="padding-top padding-lr" v-for="(item,index) in forkMaintenance" :key="index" :id="'main-'+index">
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
				<view v-else class="padding margin-bottom-sm round-card">
					<view style="display:flex;flex-direction:column;align-items:center;height:370rpx">
						<image style="width:100%" src="../../static/maintenance/null.png"></image>
					<view style="color:#D9D9D9">暂无数据</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="btn-bottom">
			
		<view class="round-left" style="position:sticky;bottom:0">
			<!-- <view></view> -->
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="position: relative;z-index: 999;">
					<view v-if="selectedCount" class='cu-tag badge' style="font-size:20rpx;z-index:999">{{selectedCount}}</view>
					<image style="width: 40px;height: 40px;" :src="imageIcon"></image>
				</view>
				<view style="flex-direction: column; align-items:center;">
					<view style="color: #FFFFFF;"> 预估费用： {{totalSalePrice}}
						<text class="margin-left" style="text-decoration: line-through;color: #767676;font-size: 12px;">{{totalPrice}}</text> 
					</view>
					<view style="color: #04D4C6;"> 免费预约 修好付款 </view>
				</view>
			</view>
		</view>
			
			<view class="round-right center-button" :style="selectedCount==0?'background-color:#C6C6C6 !important':'background-color:#04D4C6 !important'">
				<button class="cu-btn  block lg submit-button" @click="navigateOrderSuccess" :style="selectedCount==0?'background-color:#C6C6C6 !important':'background-color:#04D4C6 !important'"><text>{{selectedCount==0?'未选方案':'预约下单'}}</text></button>
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
				imageIcon: require("@/static/images/shopcart.png"),
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
				forkMaintenance:[],
				showNull:true
			};
		},
		onLoad(option) {
			// 获取维修参数
			console.log('option',option)
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
			selectedCount(){
				return this.maintenanceList.filter(item=>item.selected === true).length;
			},
			totalPrice(){
				let list = this.maintenanceList.filter(item=>item.selected === true);
				let total = 0
				for(let item in list){
					total += list[item].price;
				}
				return total;
			},
			totalSalePrice(){
				let list = this.maintenanceList.filter(item=>item.selected === true);
				let totalSale = 0;
				for(let item in list){
					totalSale += list[item].salePrice;
				}
				return totalSale;
			}
		}),
		methods: {
			navigateOrderSuccess(){
				// 判断本地购物车是否有数据 有数据则跳转
				let selectedFlag = false
				for (let good of this.maintenanceList) {
					if(good.selected) selectedFlag = true
				}
				
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
				
				// 判断是否重复 重复的话则删除 下一步再添加
				this.forkMaintenance = this.judgeRepeat(this.maintenanceList,[
					{
						...item,
						selected:status
					}
				],true);
				console.log('maintasds',this.maintenanceList)
			},
			changePhone(){
				uni.redirectTo({
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
			judgeRepeat(Old,New,isCover = true){
				let resuleArray = JSON.parse(JSON.stringify(Old))
				let showForkData = JSON.parse(JSON.stringify(New))
				// 如果Old不存在则覆盖并返回
				console.log('全局状态是否为0',resuleArray.length === 0)
				if(resuleArray.length === 0){
					resuleArray = Array.isArray(showForkData) ?  resuleArray.concat(showForkData) : [showForkData]
					console.log('全局更新后的值',resuleArray)
					this.$store.dispatch('shoppingTrigger',{
						key:'maintenanceList',
						value:resuleArray
					})
					return resuleArray;
				}
				console.log('showForkDatashowForkData',Array.isArray(showForkData))
				if(Array.isArray(showForkData)){
					// 首先判断如果全局里面没有当前goods则增加 合并两个对象数组并去重
					let midArray=[...resuleArray,...showForkData];
					//根据id去重
					let map=new Map();
					for(let item of midArray){
					    if(!map.has(item.id)){
					        map.set(item.id,item)
					    }
					}
					resuleArray = [...map.values()];
					for (let oValueIndex in resuleArray) {
						for (let nValueIndex in showForkData) {
							if(resuleArray[oValueIndex].id === showForkData[nValueIndex].id){
								if(isCover){
									console.log('覆盖原始数据')
									// 删除旧数据
									resuleArray.splice(oValueIndex,1)
									// 增加增加新数据
									resuleArray.push(showForkData[nValueIndex])
									console.log('覆盖原始数据value',resuleArray)
								}else{
									console.log('取值判断')
									//不覆盖的话则取出本地购物车的商品状态
									// console.log('更新前对比',showForkData[nValueIndex])
									if(showForkData[nValueIndex].selected !== resuleArray[oValueIndex].selected){
										console.log('不相等则替换数据')
										showForkData[nValueIndex] = resuleArray[oValueIndex]
									}
								}
							}
						}
					}
				}else{
					for (let index in resuleArray) {
						if(resuleArray[index].id === showForkData.id){
							if(isCover){
								// 删除旧数据
								resuleArray.splice(index,1)
								// 增加增加新数据
								resuleArray.push(showForkData)
							}else{
								//不覆盖的话则取出本地购物车的商品状态
								showForkData = resuleArray[index]
							}
						}
					}
				}
				// 同步本地购物车
				this.$store.dispatch('shoppingTrigger',{
					key:'maintenanceList',
					value:resuleArray
				})
				return Array.isArray(showForkData) ? showForkData : [showForkData]
			},
			getGoods(id){
				// console.log('ididididi',id)
				this.$request({
					url:'/phoneReparisServer/service/rest/login.customerService/collection/getAllServiceGoods',
					methods:'POST',
					data:{
						page:1,
						rows:20,
						categoryId:id
						// categoryId:'0136673507f5442a820c2742ee7e5c37'
						// sort:'createTime',
						// order:'desc'
					}
				}).then(res=>{
					// mockshuju
					if(res.length === 0){
						this.showNull = true;
						return;
					}
					this.showNull = false;
					// const mockData = {"message":"成功","totalCount":7,"page":1,"pageSize":20,"data":"[{\"id\":\"2ca6245c588640b4a0e7748a282d84af\",\"createTime\":\"2021-10-27 20:14:50\",\"subTitle\":\"摄像头问题\",\"title\":\"摄像头问题\",\"price\":100,\"description\":\"<strong>保修一年<\\/strong>\",\"salePrice\":80,\"code\":\"00006140\",\"pictureId\":\"70e94e91c1e343529f6e3129a95d1fdf\"}]","javaClass":"com.caomei.xinxikeji.util.ResultInfo","code":0,"totalPage":1}
					this.goodsList = res
					// console.log('LOAD.....this.goodsListthis.goodsList',this.goodsList);
					if(this.goodsList.length > 0) this.goodsList = this.goodsList.map(element => {
						return {
							...element,
							selected:false,
						}
					})
					this.forkMaintenance = this.judgeRepeat(this.maintenanceList,this.goodsList,false);
					console.log('LOAD.....this.forkMaintenancethis.forkMaintenance',this.forkMaintenance)
					// 如果购物车里面本地存在数据则拿购物车的数据 不更新数据
				})
			},
			// VerticalMain(e) {
			// 	// #ifdef MP-ALIPAY
			// 	return false //支付宝小程序暂时不支持双向联动 
			// 	// #endif
			// 	let that = this;
			// 	let tabHeight = 0;
			// 	if (this.load) {
			// 		for (let i = 0; i < this.list.length; i++) {
			// 			let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
			// 			view.fields({
			// 				size: true
			// 			}, data => {
			// 				this.list[i].top = tabHeight;
			// 				tabHeight = tabHeight + data.height;
			// 				this.list[i].bottom = tabHeight;
			// 			}).exec();
			// 		}
			// 		this.load = false
			// 	}
			// 	let scrollTop = e.detail.scrollTop + 10;
			// 	for (let i = 0; i < this.list.length; i++) {
			// 		if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
			// 			this.verticalNavTop = (this.list[i].id - 1) * 50
			// 			this.tabCur = this.list[i].id
			// 			console.log(scrollTop)
			// 			return false
			// 		}
			// 	}
			// }
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
		font-size: 0.9rem;
	}
	.text-title{
		font-size: 0.9rem;
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

	.center-button{
		display: flex;
		flex-direction:column;
		align-items: center;
		justify-content: center;
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
	
	.btn-bottom {
		position: fixed;
		width: 100%;
		padding-left: 2%;
		padding-right: 2%;
		bottom: 30px;
		text-align: center;
		display: flex;
	}
	
	.submit-button{
		color: #FFFFFF;
		margin-top: 1px;
		margin-right: 12px;
	}
	
	.round-left {
		width: 60%;
		height: 46px; 
		border-top-left-radius: 23px;
		border-bottom-left-radius: 23px;
		background-color: #002B38;
		text-align: left;
	}
	
	.round-right {
		width: 40%;
		height: 46px; 
		background-color: #04D4C6;
		border-top-right-radius: 23px;
		border-bottom-right-radius: 23px;
	}
</style>
