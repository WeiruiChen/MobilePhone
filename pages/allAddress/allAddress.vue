<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-blue">
			<view slot="backText">返回</view>
			<view slot="content">我的地址</view>
		</cu-custom>

		<view class="container">
			<form>
				<view class="cu-form-group padding-top padding-bottom round-top-card">
					<view class="content">
						<view>大名 125635414878</view>
						<view>北京市朝阳区三环到四环之间 东三环</view>
					</view>
				</view>

				<view class="cu-form-group round-bottom-card">
					<view class="flex-container icon-color">
						<view>
							<!-- <radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio> -->
							<text class="cuIcon-round">设为默认</text>
						</view>
						<view>
							<text class="cuIcon-edit margin-right">编辑</text>
							<text class="cuIcon-delete">删除</text>
						</view>
					</view>
				</view>
				
			</form>
		</view>
		
		<view class="btn-bottom">
			<button class="cu-btn  block lg round"><text class="cuIcon-add"></text>新增地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
	
	.icon-color{
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
		color: #04D4C6;
	}
</style>
