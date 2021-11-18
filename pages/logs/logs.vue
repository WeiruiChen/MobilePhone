<template>
	<view class="container log-list">
		<block v-for="(item,index) in logs" :key="index">
			<text class="log-item">{{index + 1}}. {{log}}</text>
		</block>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				logs: []
			}
		},
		onLoad() {
			this.logs = (wx.getStorageSync('logs') || []).map(log => {
				return {
					date: log,
					timeStamp: log
				}
			})
		}
	}
</script>

<style>
	.log-list {
		display: flex;
		flex-direction: column;
		padding: 40rpx;
	}

	.log-item {
		margin: 10rpx;
	}
</style>
