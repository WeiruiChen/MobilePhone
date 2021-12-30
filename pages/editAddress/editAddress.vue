<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-default">
			<view slot="backText">返回</view>
			<view slot="content">新增/编辑地址</view>
		</cu-custom>

		<view class="container">
			<form>

				<view class="cu-form-group round-top-card ">
					<view style="border-radius:50%;height:12rpx;width:12rpx;background: red;"></view>
					<view class="title" style="margin-left:20rpx">收货人</view>
					<input name="name" v-model="address.name"/>
				</view>

				<view class="cu-form-group ">
						<view style="border-radius:50%;height:12rpx;width:12rpx;background: red;"></view>
					<view class="title" style="margin-left:20rpx">手机号</view>
					<input  name="phonenumber" v-model="address.phone"></input>
				</view>
				<view class="cu-form-group ">
					<view style="border-radius:50%;height:12rpx;width:12rpx;background: red;"></view>
					<view style="display:flex;flex-direction:column;width:100%">
						<view style="display:flex;justify-content: center;align-items: center;">
							<view class="title" style="margin-left:20rpx">备用手机号</view>
							<input  name="phonenumber" v-model="address.sparePhone"/>
						</view>
						<view style="font-size:20rpx;color:#999999;margin-left:32rpx">请确保手机送修后,能联系上机主本人。</view>
					</view>
				</view>

				<view class="cu-form-group">
						<view style="border-radius:50%;height:12rpx;width:12rpx;background: red;"></view>
					<view class="title" style="margin-left:20rpx">地址选择</view>
					<!-- 增加是否需要地址定位点击事件 -->
					<picker mode="region" @change="RegionChange" :value="region">
						<view class="picker">
							{{region[0]}}，{{region[1]}}，{{region[2]}}
						</view>
					</picker>
					<view style="margin-left: 10rpx;color:#02D5C7" @click="getLocationInfo">智能定位</view>
				</view>

				<view class="cu-form-group ">
						<view style="border-radius:50%;height:12rpx;width:12rpx;background: red;"></view>
					<view class="title" style="margin-left:20rpx"> 详细地址</view>
					<input  name="addressDetial" v-model="address.address"></input>
				</view>

				<view class="cu-form-group round-bottom-card ">
						<view style="border-radius:50%;height:12rpx;width:12rpx;background: red;"></view>
					<view class="title" style="margin-left:20rpx">门牌号</view>
					<input name="address" v-model="address.houseNumber"></input>
				</view>


				<view class="cu-form-group round-bottom-card flex-container icon-color">
					<checkbox class='round' :checked="address.isDefault" :class="address.isDefault?'checked':''"
						@click="checkHaddler(address.isDefault)"></checkbox>
					<text>设为默认</text>
				</view>

			</form>
		</view>

		<view class="btn-bottom">
			<button class="cu-btn  block lg round" @click="addNewAddress">保存</button>
		</view>
	</view>
</template>

<script>
	import BMapWX from '../../utils/bmap-wx.js';
	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
				address: {
					isDefault:true,
				},
				isedit:false,
				// checkbox: {
				// 	checked: true,
				// 	value: '1'
				// },
				radio: 'A',
				isFirstEntry:true
			}
		},
		onLoad(option) {
			if (Object.keys(option).length > 0) {
				// 判断是否选择地址
				const navigateParams = JSON.parse(decodeURIComponent(option.param));
				this.isedit = true;
				this.$nextTick(() => {
					this.address = navigateParams;
					this.region = this.address.region.split(',');
					console.log('this.address ',this.address);
				})
			}

		},
		methods: {
			// 获取位置信息
			getLocationInfo(){
				let that = this;
				// 首先校验是否有定位权限
				uni.authorize({
				scope: 'scope.userLocation',
				success() {
					if(that.isFirstEntry){
					const baiduMap = new BMapWX({
						ak:'PhSR9LImfQeGhPcwCYZKafcoBOX3rQlt'
					});
					uni.showLoading({
						title: '定位中'
					})
					baiduMap.regeocoding({
						fail: function(res){
							uni.hideLoading()
							// uni.showToast({
							// 	title: res.errMsg,
							// 	icon: "none",
							// 	duration: 1000
							// })
							uni.showModal({
							title: '定位失败',
							showCancel:false,
							content: '请确认定位相关权限已开启或手动选择输入',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						},
						success: function(res){
							const originalData = res['originalData'];
							const wxMarkerData = res['wxMarkerData'];
							that.region[0] = originalData['result']['addressComponent']['province'];
							that.region[1] = originalData['result']['addressComponent']['city'];
							that.region[2] = originalData['result']['addressComponent']['district'];
							that.address.address = originalData['result']['formatted_address'];
							that.isFirstEntry = false;
							uni.hideLoading();
						}
					})
				}
				}
			})
			
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			checkHaddler(value) {
				// console.log(e.target.dataset)
				this.address.isDefault = !value
				// this.address.isDefault = event.de
			},
			backToAll() {
				uni.redirectTo({
					url:'../allAddress/allAddress'
				})
			},
			addNewAddress() {
				this.address.region = this.region;
				this.address.label = '学校';
				
				console.log(JSON.stringify(this.address));
				//新增
				let url = '/phoneReparisServer/service/rest/login.customer.addressService/collection/addAddress'
				//编辑
				if(this.isedit){
					url = '/phoneReparisServer/service/rest/login.customer.addressService/collection/setAddressById'
				}
				let that = this;
				uni.showModal({
					// title: '确认',
					content: '确认提交地址',
					success: function(e) {
						// 校验参数是否正确
						let checkList = [{key:'name',value:'收货人'},{key:'phone',value:'手机号'},{key:'sparePhone',value:'备用手机号'},{key:"region",value:'地址选择'},{key:"address",value:'详情地址'},{key:"houseNumber",value:'门牌号'}];
						for (const obj of checkList) {
							if(that.address[obj.key] == '' || !that.address[obj.key]){
									uni.showModal({
										content: '您有必填项未填写',
										showCancel: false,
										success: function(res) {
										}
									});
								return;
							}
						}

						if (e.confirm) {
							that.$request({
								url: url,
								methods: 'POST',
								data: that.address
							}).then(res => {
								console.log("addNewAddress:" + JSON.stringify(res));
								uni.navigateBack({
									url:'../allAddress/allAddress'
								})
								uni.showToast({
								    title: "提交成功",
								    icon: "none"
								})
							}).catch(e => {
								// console.log('addNewAddress', e)
								// uni.showToast({
								//     title: "提交失败",
								//     icon: "none"
								// })
							})
						} else if (e.cancel) {
							uni.showToast({
							    title: "取消提交",
							    icon: "none"
							})
						}
					}
				});
				
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

	.round-bottom-card {
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	.round-top-card {
		margin-top: 10px;
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
	}

	.flex-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	button {
		color: #FFFFFF;
		background-color: #04D4C6 !important;
	}

	.btn-bottom {
		position: fixed;
		width: 100%;
		padding-left: 20%;
		padding-right: 20%;
		bottom: 30px;
		text-align: center;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
