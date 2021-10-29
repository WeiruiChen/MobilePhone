<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<view slot="backText">返回</view>
			<view slot="content">新增/编辑地址</view>
		</cu-custom>

		<view class="container">
			<form>
				
				<view class="cu-form-group round-top-card ">
							<view class="title">收货人</view>
							<input placeholder="大名" name="name"></input>
						<!-- <view> -->
							<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio><text>先生</text>
							<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio><text>女士</text>
						<!-- </view> -->
				</view>
				
				<view class="cu-form-group ">
							<view class="title">手机号</view>
							<input placeholder="1234566788" name="phonenumber"></input>
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
						<input placeholder="四季星城2期附近" name="addressDetial"></input>
			</view>
			
			<view class="cu-form-group round-bottom-card ">
						<view class="title">门牌号</view>
						<input placeholder="307" name="doorNumber"></input>
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
						<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
						<text>设为默认</text>
						<!-- <text class="cuIcon-round">设为默认</text> -->
				</view>

			</form>
		</view>

		<view class="btn-bottom">
			<button class="cu-btn  block lg round">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
			}
		},
		methods: {
			SwitchA(e) {
				this.switch = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
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
		margin-top: 10px;
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

	.icon-color {
		color: #A6A6A6;
	}


	button{
		color: #04D4C6;
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
