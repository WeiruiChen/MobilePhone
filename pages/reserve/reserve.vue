<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">提交订单</view>
		</cu-custom>

		<view class="container">
			<form>
				<view class="cu-form-group margin-top round-card">
					<view
						style="display:flex;flex-direction:row;justify-content:space-between;width:100%;;margin-top:20rpx;margin-bottom:20rpx">
						<!-- <view style="display:flex;justify-content:flex-end">
							<view class="outer round"
								style="width: 120px;height: 36px;border: 1px solid #04D6C8;display: flex; font-size: 0.6rem;">
								<view :class="changeType ? 'inner-left round-left' :'inner-left round-left active'"
									@click="sentBySelf">
									<text style="width: 59px;line-height: 34px;">自行送修</text>
								</view>
								<view :class="changeType ? 'inner-left round-right active' :'inner-left round-right'"
									@click="getByDelivery">
									<text style="width: 59px;line-height: 34px;">上门取件</text>
								</view>
							</view>
						</view> -->
						<view style="margin-top:20rpx">
							<view style="display:flex;justify-content:space-between;align-items:flex-end;">
								<view style="display:flex;flex-direction:column;width:100%" v-if="haveDefaultAddress">
									<view v-if="changeType">
										<picker @change="PickerChange" :value="index" :range="addressList">
											<view style="font-weight: bold;">
												{{chooseAddress.label}}:{{index>-1?addressList[index]:'暂无地址'}}
											</view>
										</picker>
									</view>
									<view style="font-weight: bold;" v-if="!changeType">
										{{chooseAddress.label}}:{{chooseAddress.address}}
									</view>
									<view style="color: gray;margin-top: 5rpx;">{{name}} {{phone}}</view>
								</view>
								<view v-else>
									<view>暂无联系人信息，请点击右侧增加联系人地址</view>
									<button class="cu-btn cuIcon icon-add" @click="addAddress" style="height:50rpx">
										<text class="cuIcon-add"></text>
									</button>
								</view>

							</view>
						</view>

						<view style="display:flex;justify-content:flex-end">
							<view class="outer round"
								style="width: 120px;height: 36px;border: 1px solid #04D6C8;display: flex; font-size: 0.6rem;">
								<view :class="changeType ? 'inner-left round-left' :'inner-left round-left active'"
									@click="sentBySelf">
									<text style="width: 59px;line-height: 34px;">自行送修</text>
								</view>
								<view :class="changeType ? 'inner-left round-right active' :'inner-left round-right'"
									@click="getByDelivery">
									<text style="width: 59px;line-height: 34px;">上门取件</text>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view v-if="changeType">
					<view class="cu-form-group round-card">
						<view class="title">取件日期：</view>

						<picker mode="date" fields="day" :value="date" :start="startTime" :end="endTime"
							@change="dateChange">
							<view class="picker">
								{{date}}
							</view>
						</picker>
					</view>

					<view class="cu-form-group round-card">
						<view class="title">取件时间：</view>

						<picker @change="timeChange" :value="timeIndex" :range="timeList">
							<view class="text-right picker">
								{{time}}
							</view>
						</picker>
						<!-- <picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
							<view class="picker">
								{{time}}
							</view>
						</picker> -->
					</view>
				</view>

				<view class="cu-form-group round-card" v-if="!changeType">
					<view class="title">送修日期：无特殊要求</view>
				</view>

				<view class="cu-item cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view class="">
							<text>维修方案</text>
						</view>
						<view style="display:flex;align-items:flex-end">
							<image :src="baseImageUrl + fanganList[0]['pictureId']" class="reverse_1" mode='widthFix'
								style="height: auto;"></image>
							<view>
								<view class="margin-lr-sm"><text>{{fanganList[0].phoneType}}</text></view>
								<view class="flex">
									<view class="margin-tb-sm margin-left-sm" v-for="item in phoneColorList"
										:key="item.color">
										<view class="round phone-color-border" @tap="onSelectType(item.name,true)">
											<!-- <text> </text> -->
											<!-- <text class="lg text-gray" :class="'cuIcon-check'"></text> -->
											<view class="round phone-color" :class="item.isCheck ? 'cuIcon-check' : ''"
												:style="'background-color:'+item.color"></view>
										</view>
										<view class="margin-tb-sm">{{item.name}}</view>
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

				<view v-if="changeType" class="cu-form-group">
					<view class="flex-container">
						<view>上门取件费用</view>
						<view class="text_right">{{delivery.expressFee||''}}</view>
						<!-- <view class="text_right">20</view> -->
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
						<!-- <view>3、若工程师检测后，由于您个人原因不维修，需要支付检测费{{delivery.testingFee||''}}元；</view> -->
						<view>3、若工程师检测后，由于您个人原因不维修，需要支付检测费；</view>
						<view>4、预约订单无需支付费用，最终费用待您验收完成后一并支付。</view>
					</view>
				</view>


				<view style="margin-top:150px" v-if="!changeType">

				</view>

				<view class="cu-form-group padding-top padding-bottom" style="position:sticky;bottom:0">
					<view>
						<view> 预估费用：{{totalSalePrice}} <text class="margin-left"
								style="text-decoration: line-through;color: #767676;font-size: 12px;">{{totalPrice}}</text>
						</view>
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

	import {
		formatDateTime,
		getNextDayDate,
		compareTimeStr,
		formatFullTime,
		formatTime
	} from '../../utils/time'
	export default {
		data() {
			return {
				sent: true,
				chooseAddress: {
					label: "",
					address: ""
				},
				// 判断是否有默认地址
				haveDefaultAddress: true,
				phone: "",
				name: "",
				time: '17:00-19:00',
				date: '',
				timeIndex:'',
				goodsList: [],
				fanganList: [],
				deliveryPrice: 20,
				defaultAddress: {},
				changeType: true,
				addressList: [],
				timeList: [],
				index: -1,
				orginList: [],
				phoneColorList: [{
						name: '白色',
						color: '#FFFFFF',
						isCheck: true,
					},
					{
						name: '黑色',
						color: '#000000',
						isCheck: false
					},
					{
						name: '金色',
						color: '#D9D919',
						isCheck: false
					}
				],
				selectedMemo: '',
				startTime: '',
				endTime: '',
				startTime1: '',
				endTime1: '',
				// 判断是否立即抢购跳转
				isShopping: false,
				// phoneColor
				phtonColorMap:{},
				// 地址跟索引的
				// imageUrl: ''
				
			}
		},
		onLoad(option) {
			if (Object.keys(option).length > 0) {
				const navigateParams = JSON.parse(decodeURIComponent(option.goods));
				console.log('navigateParamsnavigateParamsnavigateParamsnavigateParamsnavigateParams', navigateParams);
				this.fanganList = [navigateParams.goods];
				this.isShopping = true;
			}
		},
		onShow() {
			// 获取线上购物车
				this.phoneColorList = []
				this.$request({
						url:'/phoneReparisServer/service/rest/login.shoppingCart/collection/getShopCart',
						methods:'POST',
					}).then(res=>{
						console.log("getShopCart" + JSON.stringify(res))
						// 获取单个商品
						let item =  res.items[0];
						let  colors = item.colors.split(',');
						let  colorsValue = item.colorsValue.split(',');
						for (const index in colors) {
							this.phoneColorList.push({
								name: colors[index],
								color: colorsValue[index],
								isCheck: index == 0 ? true :false
							})
						}
						// if(item.colors)
						// for (const key in object) {
						// 	if (Object.hasOwnProperty.call(object, key)) {
						// 		const element = object[key];
								
						// 	}
						// }
						// 获取手机颜色显示
						// this.orderDetail = res
					}).catch(e=>{
						console.log(e)
				})

			// 初始化日期
			let dateTime = new Date()
			this.startTime = formatDateTime(dateTime)
			this.endTime = formatDateTime(getNextDayDate(7, dateTime))
			this.date = this.startTime
			this.changeTimeList()
			
			//从本地获取方案列表和图片url
			if (!this.isShopping)
				this.fanganList = this.maintenanceList.filter(item => item.selected == true);
			console.log("fanganList" + JSON.stringify(this.fanganList));
			// this.imageUrl = this.baseImageUrl;
			console.log(this.imageUrl);

			// 先获取全部地址
			this.getAddressList()

		},
		computed: mapState({
			// 从state中拿到数据 
			maintenanceList: state => state.goods.maintenanceList,
			baseImageUrl: state => state.user.imageBaseUrl,
			delivery: state => state.user.delivery,
			totalPrice() {
				let list = this.fanganList;
				let total = 0
				for (let item in list) {
					total += list[item].price;
				}
				return total;
			},
			totalSalePrice() {
				let list = this.fanganList;
				let totalSale = 0;
				for (let item in list) {
					totalSale += list[item].salePrice;
				}

				if (this.changeType) {
					totalSale = totalSale + (parseFloat(this.delivery.expressFee)||0);
				}

				return totalSale
			}
		}),
		methods: {
			compareTime(t1, t2) {
				let time = new Date();
				let a = t1.split(":");
				let b = t2.split(":");
				return time.setHours(a[0], a[1], a[2]) < time.setHours(b[0], b[1], b[2]);
			},
			changeTimeList(){
				let t = new Date()
				let n = t.toTimeString()
				let t1 = n.split(" ")[0]
				let timeList = [
					'8:00-9:00',
					'9:00-10:00',
					'10:00-11:00',
					'11:00-12:00',
					'12:00-13:00',
					'13:00-14:00',
					'14:00-15:00',
					'15:00-16:00',
					'16:00-17:00',
					'17:00-18:00',
					'18:00-19:00',
					'19:00-20:00'
				]
				
				let timeList1 = [
					'09:00:00',
					'10:00:00',
					'11:00:00',
					'12:00:00',
					'13:00:00',
					'14:00:00',
					'15:00:00',
					'16:00:00',
					'17:00:00',
					'18:00:00',
					'19:00:00',
					'20:00:00'
				]
				let list = []
				let t2 = this.date.toString().split("-")[2]
				
				// 如果当前日期等于送修日期改变timelist,getDate()一月中的一天
				if(t.getDate().toString()==t2){
					for(let j in timeList1){
						//当前时间小于时间段结束时间
						if(this.compareTime(t1,timeList1[j])){
							list.push(timeList[j])
						}
					}
					this.timeList = list;
				}else{
					this.timeList = timeList;
				}
				// uni.showModal({
				// 	content:t.getDate().toString()
				// 	// content:
				// })
				if(this.timeList.length==0){
					this.time = "暂无可选时段，请更改日期再选。"
				}else{
					this.time = this.timeList[0]
				}
			},
			onSelectType(name, checked) {
				// 判断只能有一个选中
				this.phoneColorList = this.phoneColorList.map(item => {
					return {
						...item,
						isCheck: false,
					}
				})
				// 然后选中
				for (const index in this.phoneColorList) {
					// 先全部未选
					if (name == this.phoneColorList[index].name) {
						console.log('checked', checked)
						this.phoneColorList[index].isCheck = checked;
					}

				}
				this.selectedMemo = name

			},
			PickerChange(e) {
				console.log('e.detail.value', e.detail.value)
				console.log('this.addressList',this.addressList)
				this.index = e.detail.value
				this.name = this.orginList[this.index].name
				this.phone = this.orginList[this.index].phone
				this.chooseAddress.address = this.addressList[this.index]
				this.defaultAddress.id = this.orginList[this.index].id
			},
			addAddress() {
				uni.navigateTo({
					url: '../allAddress/allAddress'
				})
			},
			timeChange(e) {
				this.timeIndex = e.detail.value
				this.time = this.timeList[this.timeIndex]
			},
			getAddressList() {
				this.haveDefaultAddress = true;
				this.$request({
					url: '/phoneReparisServer/service/rest/login.customer.addressService/collection/getAddressList',
					methods: 'POST'
				}).then(res => {
					console.log('resresres', res)
					this.orginList = res
					this.addressList = []
					if (this.orginList.length > 0) {
						for (const value of this.orginList) {
							this.addressList.push(value.region + ' ' + value.address)
						}
					}
					//获取默认联系人
					this.$request({
						url: '/phoneReparisServer/service/rest/login.customer.addressService/collection/getDefaultaddress',
						methods: 'POST',
					}).then(res => {
						if (res.length === 0) {
							this.haveDefaultAddress = false;
						}
						this.defaultAddress = res[0] || {};

						// 获取默认地址在全部地址中的索引
						for (const index in this.orginList) {
							if (this.orginList[index].id == this.defaultAddress.id) {
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
				}).catch(err => {
					
					console.error(err)
				})
			},
			dateChange(e) {
				this.date = e.detail.value
				this.changeTimeList()
			},
			sentBySelf() {
				this.chooseAddress.label = "最近网点";
				//默认最近网点只有一个固定值，主页已经拿到
				this.chooseAddress.address = this.delivery.adress;
				this.phone = this.delivery.phone;
				this.name = this.delivery.name;
				this.changeType = false;
			},
			getByDelivery() {
				this.chooseAddress.label = "取件地址";
				this.chooseAddress.address = (this.defaultAddress.region || '') + (this.defaultAddress.address || '') + (
					this.defaultAddress.houseNumber || '');
				this.phone = this.defaultAddress.phone || '';
				this.name = this.defaultAddress.name || '';
				this.changeType = true;
			},
			submitOrder() {
				if (!this.defaultAddress.id&&this.addressList.length==0) {
					uni.showModal({
						content: '目前没有地址,请选择或者新增地址后再进行下单',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
					return;
				}
				
				if(this.changeType){
					if(this.timeList.length==0||!this.time) {
						uni.showModal({
							content: '请选择取件时间',
							showCancel: false,
						});
						return;
					}
				}

				let param_orderParams = {};
				param_orderParams["receiverId"] = this.defaultAddress.id || ''; //地址id
				param_orderParams["points"] = 0; //暂时固定 0
				param_orderParams["balance"] = 0; //暂时固定 0
				param_orderParams["payType"] = "WxSmallProgramReaders"; //暂时固定
				param_orderParams["orderType"] = "Order"; //暂时固定 Order
				param_orderParams["remark"] = "..."; //用户备注
				// param_orderParams["predetermine"] = "2021-10-23 08:00-11:00" //预订上门时间
				param_orderParams["predetermine"] = this.date + " " + this.time; //预订上门时间
				param_orderParams["isForced"] = true; //暂时固定 true
				//param_orderParams["cityId"] = ""; //登录返回的cityId
				param_orderParams["needPickUp"] = this.changeType; //是否上门取件 ，true  是，false  自行送修
				//获取最近网点和快递费getDeliveryAddressList接口返回的id，目前只有一个
				// param_orderParams["deliveryId"] = "66a88b5cbc434905875ac6c8a3aff86c";
				param_orderParams["deliveryId"] = this.delivery.id;
				
				console.log("param_orderParams:" + JSON.stringify(param_orderParams));

				let param_goodsList = [];
				for (let item in this.fanganList) {
					let tempObject = {};
					tempObject["price"] = this.fanganList[item].salePrice;
					tempObject["goodsId"] = this.fanganList[item].id; //商品id
					tempObject["count"] = 1; //暂时固定 1
					tempObject["quickMemo"] = this.selectedMemo; //颜色备注， getShopCart接口会返回，做出选择后传入
					param_goodsList.push(tempObject);
				}
				console.log("param_goodsList:" + JSON.stringify(param_goodsList));

				this.$request({
					url: '/phoneReparisServer/service/rest/login.orderService/collection/createOrder',
					methods: 'POST',
					data: {
						orderParams: JSON.stringify(param_orderParams),
						goodsList: JSON.stringify(param_goodsList)
					}
				}).then(res => {
					// console.log("create order success:"+JSON.stringify(res));
					//跳转到下单成功页面
					let order = {};
					order["orderId"] = res[0]["orderId"];
					console.log("create order success:" + JSON.stringify(res[0]));
					uni.redirectTo({
						url: '../orderSuccess/orderSuccess?param=' + encodeURIComponent(JSON.stringify(
							order))
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
