<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">我的地址</view>
		</cu-custom>

		<view class="container">
			<form>
				<view v-for="(item,index) in addressList">
					<view class="cu-form-group padding-top padding-bottom round-top-card">
						<view class="content">
							<view>{{item.name}} {{item.phone}}</view>
							<view>{{item.address}}</view>
						</view>
					</view>

					<view class="cu-form-group round-bottom-card">
						<view class="flex-container icon-color">
							<view>
								<text class="cuIcon-round" @click="setDefaultAddress(item)">设为默认</text>
							</view>
							<view>
								<text class="cuIcon-edit margin-right" @click="editAddress(item)">编辑</text>
								<text class="cuIcon-delete" @click="deleteAddress(item)">删除</text>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>

		<view class="btn-bottom">
			<button class="cu-btn  block lg round" @click="addAddress"><text class="cuIcon-add"></text>新增地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: []
			}
		},
		onLoad() {
			// 获取地址列表
			this.getAddList()
		},
		methods: {
			getAddList() {
				this.$request({
					url: '/phoneReparisServer/service/rest/login.customer.addressService/collection/getAddressList',
					methods: 'GET',
				}).then(res => {
					console.log("addressList:"+JSON.stringify(res));
					this.addressList = res
				}).catch(e => {
					console.log('addressList', e)
				})
			},
			addAddress() {
				uni.navigateTo({
					url: '../editAddress/editAddress'
				})
			},
			editAddress(item) {
				console.log("item"+item);
				uni.navigateTo({
					url: '../editAddress/editAddress?param=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			setDefaultAddress(item) {
				item.isDefault = true;
				let that = this;
				uni.showModal({
					// title: '确认',
					content: '确认设置默认',
					success: function(e) {
						if (e.confirm) {
							that.$request({
								url: '/phoneReparisServer/service/rest/login.customer.addressService/collection/setAddressById',
								methods: 'POST',
								data:item
							}).then(res => {
								console.log("setDefaultAddress:"+JSON.stringify(res));
								
							}).catch(e => {
								console.log('setDefaultAddress', e)
								uni.showToast({
								    title: "设置失败",
								    icon: "none"
								})
							})
							uni.redirectTo({
								url:'../allAddress/allAddress'
							})
							uni.showToast({
							    title: "设置成功",
							    icon: "none"
							})
						} else if (e.cancel) {
							uni.showToast({
							    title: "取消设置",
							    icon: "none"
							})
						}
					}
				});
				
				
			},
			deleteAddress(item) {
				let that = this;
				uni.showModal({
					// title: '确认',
					content: '确认删除地址',
					success: function(e) {
						if (e.confirm) {
							that.$request({
								url: '/phoneReparisServer/service/rest/login.customer.addressService/collection/delAddress',
								methods: 'POST',
								data:{
									id:item.id
								}
							}).then(res => {
								console.log("setDefaultAddress:"+JSON.stringify(res));
								
							}).catch(e => {
								console.log('setDefaultAddress', e)
								uni.showToast({
								    title: "删除失败",
								    icon: "none"
								})
							})
							uni.redirectTo({
								url:'../allAddress/allAddress'
							})
						} else if (e.cancel) {
							uni.showToast({
							    title: "取消删除",
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

	.icon-color {
		color: #A6A6A6;
	}

	.btn-bottom {
		position: fixed;
		width: 100%;
		padding-left: 20%;
		padding-right: 20%;
		bottom: 30px;
		text-align: center;
	}

	button{
		color: #FFFFFF;
		background-color: #04D4C6 !important;
	}
</style>
