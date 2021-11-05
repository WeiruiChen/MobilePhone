<template>
	<view>
		<cu-custom :isBack="true"  bgColor="bg-gradual-blue" >
			<view slot="backText">返回</view>
			<view slot="content">提交订单</view>
		</cu-custom>

		<view class="container">
			<form>
				<!-- <view class="outer round"
							style="width: 120px;height: 36px;border: 1px solid #04D6C8;display: flex; font-size: 0.6rem;">
							<view :class="changeType ? 'inner-left round-left' :'inner-left round-left active'" @click="sentBySelf">
								<text style="width: 59px;line-height: 34px;">立即送修</text>
							</view>
							<view :class="changeType ? 'inner-left round-right active' :'inner-left round-right'" @click="getByDelivery">
								<text style="width: 59px;line-height: 34px;">上门取件</text>
							</view>
						</view> -->
				<view class="cu-form-group margin-top">
					<view style="display:flex;flex-direction:column;width:100%;;margin-top:20rpx;margin-bottom:20rpx">
								<view style="display:flex;justify-content:flex-end">
										<view class="outer round"
											style="width: 120px;height: 36px;border: 1px solid #04D6C8;display: flex; font-size: 0.6rem;">
											<view :class="changeType ? 'inner-left round-left' :'inner-left round-left active'" @click="sentBySelf">
												<text style="width: 59px;line-height: 34px;">立即送修</text>
											</view>
											<view :class="changeType ? 'inner-left round-right active' :'inner-left round-right'" @click="getByDelivery">
												<text style="width: 59px;line-height: 34px;">上门取件</text>
											</view>
										</view>
								</view>
						<view style="margin-top:20rpx">
							<view style="display:flex;justify-content:space-between;align-items:flex-end;">
									<view style="display:flex;flex-direction:column;;width:100%" v-if="haveDefaultAddress">
											<view >
												<picker @change="PickerChange" :value="index" :range="addressList">
													<view>
														{{chooseAddress.label}}:{{index>-1?addressList[index]:'暂无地址'}}
													</view>
												</picker>
											</view>
												<view>{{name}} {{phone}}</view>								
									</view>
										<view v-else>
											暂无地址!请点击右侧增加地址
										</view>
									<button v-if="chooseAddress === '上门取件'" class="cu-btn cuIcon icon-add" @click="addAddress" style="height:50rpx" >
										<text class="cuIcon-add"></text>
									</button>
							</view>
							
						</view>
					
					</view>
				</view>
				<!-- <view class="cu-form-group flex-container round-card">
					
					<view class="content margin-tb">
						<view>{{chooseAddress.label}}:{{chooseAddress.address}}</view>
					
					</view>
					<view>
						
					</view>
				</view> -->

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
						<view style="display:flex;align-items:flex-end">
							<image :src="baseImageUrl + fanganList[0]['pictureId']" class="reverse_1" mode='widthFix' style="height: auto;"></image>
							<view>
								<view class="margin-lr-sm"><text>iPhone12pro max</text></view>
								<view class="flex">
									<view class="margin-tb-sm margin-left-sm">
										<view class="round phone-color-border">
											<view class="round phone-color"></view>
										</view>
										<view class="margin-tb-sm">白色</view>
									</view>

									<view class="margin-tb-sm margin-left-sm">
										<view class="round phone-color-border">
											<view class="round phone-color"></view>
										</view>
										<view class="margin-tb-sm">黑色</view>
									</view>

									<view class="margin-tb-sm margin-left-sm">
										<view class="round phone-color-border">
											<view class="round phone-color"></view>
										</view>
										<view class="margin-tb-sm">金色</view>
									</view>
								</view>
						</view>
					</view>
				
					</view>
				</view>

				<view class="cu-form-group " v-for="(item) in fanganList" :key="item.title">
					<view class="flex-container">
						<view>{{item.title}}</view>
						<view class="text_right">{{item.salePrice}}</view>
					</view>
				</view>

				<view class="cu-form-group">
					<view class="flex-container">
						<view>上门取件费用</view>
						<view class="text_right">20</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container">
						<view>合计</view>
						<view class="text_right">{{totalSalePrice}}</view>
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

				<view class="cu-form-group padding-top padding-bottom" style="position:sticky;bottom:0">
					<view>
						<view> 预估费用：{{totalSalePrice}} <text class="margin-left"
								style="text-decoration: line-through">{{totalPrice}}</text> </view>
						<view class="text-grey"> 免费预约 修好付款 </view>
					</view>
					<view>
						<button @click="submitOrder" class="cu-btn  shadow lg bg-green submit-btn round">预约下单</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex' //引入mapState

	export default {
		data() {
			return {
				sent: true,
				chooseAddress:{
					label:"",
					address:""
				},
				// 判断是否有默认地址
				haveDefaultAddress:true,
				phone:"",
				name:"",
				time: '12:01',
				goodsList: [],
				fanganList: [],
				deliveryPrice:20,
				defaultAddress: {},
				changeType:true,
				addressList:[],
				index:-1,
				orginList:[],
				// 地址跟索引的
				// imageUrl: ''
			}
		},
		onShow() {
			// if (Object.keys(option).length > 0) {
			// 	const navigateParams = JSON.parse(decodeURIComponent(option.goods));
			// 	console.log('navigateParams', navigateParams);
			// 	this.goodsList = [navigateParams];
			// }
			//从本地获取方案列表和图片url
			this.fanganList = this.maintenanceList.filter(item => item.selected == true);
			console.log("fanganList" + JSON.stringify(this.fanganList));
			// this.imageUrl = this.baseImageUrl;
			console.log(this.imageUrl);
			
			// 先获取全部地址
			this.getAddressList()

			// 获取地址数据
		
		},
		computed: mapState({
			// 从state中拿到数据 
			maintenanceList: state => state.goods.maintenanceList,
			baseImageUrl: state => state.user.imageBaseUrl,
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
				return totalSale+this.deliveryPrice;
			}
		}),
		methods: {
			PickerChange(e) {
				console.log('e.detail.value',e.detail.value)
				this.index = e.detail.value
				this.name = this.orginList[this.index].name
				this.phone = this.orginList[this.index].phone
				this.chooseAddress.address = this.addressList[this.index]
				this.defaultAddress.id = this.addressList[this.index].id
			},
			addAddress(){
				uni.redirectTo({
					url:'../allAddress/allAddress'
				})
			},
			// PickerChange(e) {
			// 	this.chooseAddress.address = e.detail.value
			// },
			getAddressList(){
				this.$request({
					url:'/phoneReparisServer/service/rest/login.customer.addressService/collection/getAddressList',
					methods:'POST'
				}).then(res=>{
					console.log('resresres',res)
					this.orginList = res
					this.addressList = []
					if(this.orginList.length>0){
						for (const value of this.orginList) {
							this.addressList.push(value.region +' ' +value.address)
						}
					}

					//获取默认联系人
					this.$request({
						url: '/phoneReparisServer/service/rest/login.customer.addressService/collection/getDefaultaddress',
						methods: 'GET',
						}).then(res => {
							if(res.length === 0) this.haveDefaultAddress = false;
							this.defaultAddress = res[0] || {};
							
							// 获取默认地址在全部地址中的索引
							for (const index in this.orginList) {
								if( this.orginList[index].id == this.defaultAddress.id){
									this.index = index;
								}
							}
							console.log(this.index)
							//加载地址，默认选中上门取件
							this.getByDelivery();
							console.log(JSON.stringify(res));
						}).catch(e => {
							console.log(e)
					})
				}).catch(err=>{
					console.error(err)
				})
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			sentBySelf(){
				this.chooseAddress.label = "最近网点" ;
				//默认最近网点只有一个固定值，主页已经拿到
				this.chooseAddress.address = "雨花区xxx街道xxx1号";
				this.phone = "188888888";
				this.name = "大名";
				this.changeType = false;
			},
			getByDelivery(){
				this.chooseAddress.label = "取件地址" ;
				this.chooseAddress.address = (this.defaultAddress.region||'') + (this.defaultAddress.address || '') + (this.defaultAddress.houseNumber||'') ;
				this.phone = this.defaultAddress.phone || '';
				this.name = this.defaultAddress.name || '';
				this.changeType = true;
			},
			submitOrder() {
				if(!this.defaultAddress.id){
					uni.showModal({
					    content:  '目前没有地址,请选择或者新增地址后再进行下单',
						showCancel:false,
					    success: function (res) {
					        if (res.confirm) {
					            // console.log('用户点击确定');
					        } else if (res.cancel) {
					            // console.log('用户点击取消');
					        }
					    }
					});
					return;
				}

				let param_orderParams = {};
				param_orderParams["receiverId"] = this.defaultAddress.id || ''; //地址id
				param_orderParams["points"] = 0; //暂时固定 0
				param_orderParams["balance"] = 0; //暂时固定 0
				param_orderParams["payType"] = "WeiXin"; //暂时固定 WeiXin
				param_orderParams["orderType"] = "Order"; //暂时固定 Order
				param_orderParams["remark"] = "..."; //用户备注
				param_orderParams["predetermine"] = "2021-10-23 08:00-11:00" //预订上门时间
				param_orderParams["isForced"] = true; //暂时固定 true
				//param_orderParams["cityId"] = "" //登录返回的cityId
				param_orderParams["needPickUp"] = true; //是否上门取件 ，true  是，false  自行送修
				//获取最近网点和快递费getDeliveryAddressList接口返回的id，目前只有一个
				param_orderParams["deliveryId"] ="66a88b5cbc434905875ac6c8a3aff86c"; 
				console.log("param_orderParams:"+JSON.stringify(param_orderParams));
				
				let param_goodsList = [];
				for(let item in this.fanganList){
					let tempObject = {};
					tempObject["price"] = this.fanganList[item].salePrice;
					tempObject["goodsId"] = this.fanganList[item].id;//商品id
					tempObject["count"] = 1;//暂时固定 1
					tempObject["quickMemo"] = "红色";//颜色备注， getShopCart接口会返回，做出选择后传入
					param_goodsList.push(tempObject);
				}
				console.log("param_goodsList:"+JSON.stringify(param_goodsList));
				
				this.$request({
					url: '/phoneReparisServer/service/rest/login.orderService/collection/createOrder',
					methods: 'POST',
					data:{
						orderParams: JSON.stringify(param_orderParams),
						goodsList: JSON.stringify(param_goodsList)
					}
				}).then(res => {
					// console.log("create order success:"+JSON.stringify(res));
					//跳转到下单成功页面
					let order = {};
					order["orderId"] = res[0]["orderId"];
					console.log("create order success:"+JSON.stringify(res[0]));
					uni.navigateTo({
						url: '../orderSuccess/orderSuccess?param='+encodeURIComponent(JSON.stringify(order))
						// url: '../orderSuccess/orderSucces'
					})
				}).catch(e => {
					console.log(e)
				})
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

	.phone-color-border {
		border: 1px solid #04D4C6;
		width: 26px;
		height: 26px;
	}

	.phone-color {
		width: 20px;
		height: 20px;
		margin: 2px;
		background-color: #CCE6FF;
		/* border: 1px solid #04D4C6; */
	}

	.round-left {
		border-top-left-radius: 17px;
		border-bottom-left-radius: 17px;
		background-color: #FFFFFF;
		width: 59px;
		height: 34px;
		text-align: center;
	}
	.round-right {
		border-top-right-radius: 17px;
		border-bottom-right-radius: 17px;
		background-color: #FFFFFF;
		width: 59px;
		height: 34px;
		text-align: center;
	}
	.active {
		background-color: #04D4C6;
	}
	button {
		color: #FFFFFF;
		background-color: #04D4C6 !important;
	}
</style>
