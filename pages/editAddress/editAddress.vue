<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">新增/编辑地址</view>
		</cu-custom>

		<view class="container">
			<form>

				<view class="cu-form-group round-top-card ">
					<view class="title">收货人</view>
					<input placeholder="大名" name="name" v-model="address.name"></input>
				</view>

				<view class="cu-form-group ">
					<view class="title">手机号</view>
					<input placeholder="1234566788" name="phonenumber" v-model="address.phone"></input>
				</view>

				<!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">地址选择</view>
					<picker mode="region" @change="RegionChange" :value="region">
						<view class="picker">
							{{region[0]}}，{{region[1]}}，{{region[2]}}
						</view>
					</picker>
				</view>
				<!-- #endif -->

				<view class="cu-form-group ">
					<view class="title">详细地址</view>
					<input placeholder="四季星城2期附近" name="addressDetial" v-model="address.address"></input>
				</view>

				<view class="cu-form-group round-bottom-card ">
					<view class="title">门牌号</view>
					<input placeholder="307" name="address" v-model="address.houseNumber"></input>
				</view>



				<view class="cu-form-group padding-top padding-bottom round-top-card flex-container">
					<view>
						<text>标签</text>
					</view>
					<view class="tag-group">
						<view class='cu-tag round'>学校</view>
						<view class='cu-tag round'>家</view>
						<view class='cu-tag round'>公司</view>
						<view class='cu-tag round'>其他</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card flex-container icon-color">
					<checkbox class='round' :data-value="address.isDefault" :class="address.isDefault?'checked':''"
						@click="checkHaddler"></checkbox>
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
	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
				address: {
					isDefault:false
				},
				isedit:false,
				// checkbox: {
				// 	checked: true,
				// 	value: '1'
				// },
				radio: 'A'
			}
		},
		onLoad(option) {
			if (Object.keys(option).length > 0) {
				const navigateParams = JSON.parse(decodeURIComponent(option.param));
				this.address = navigateParams;
				this.isedit = true;
				console.log(navigateParams);
			}

		},
		methods: {
			RegionChange(e) {
				this.region = e.detail.value
			},
			checkHaddler(e){
				console.log(e.target.dataset)
				this.address.isDefault = !e.target.dataset.value
				// this.address.isDefault = event.de
			},
			addNewAddress() {
				this.address.region = this.region;
				this.address.label = '学校';
				this.address.isDefault = false;
				// this.address.cityId='16d7615a4332c473f9dc0b1be46b717d0'
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
						if (e.confirm) {
							that.$request({
								url: url,
								methods: 'POST',
								data: that.address
							}).then(res => {
								console.log("addNewAddress:" + JSON.stringify(res));
								uni.navigateTo({
									url:'../allAddress/allAddress'
								})
								uni.showToast({
								    title: "提交成功",
								    icon: "none"
								})
							}).catch(e => {
								console.log('addNewAddress', e)
								uni.showToast({
								    title: "提交失败",
								    icon: "none"
								})
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
