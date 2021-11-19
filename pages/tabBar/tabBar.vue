<!-- <template>
	<cover-view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
		<cover-view class="tabbar-item" v-for="(item, index) in list" :key="index" @click="tabbarChange(item.path)">
			<block>
				<cover-image class="item-img item-img" :src="item.icon_a" v-if="current == index"></cover-image>
				<cover-image class="item-img item-img" :src="item.icon" v-else></cover-image>
			</block>
			<block v-else>
				<image class="item-img" :src="item.icon_a" v-if="current == index"></image>
				<cover-image class="item-img" :src="item.icon" v-else></cover-image>
			</block>
			<cover-view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}
			</cover-view>

		</cover-view>
	</cover-view>
</template> -->
<template>
	<view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
		<view class="tabbar-item" v-for="(item, index) in list" :key="index" @click="tabbarChange(item.path)">
			<view>
				<image class="item-img item-img" :src="item.icon_a" v-if="current == index"></image>
				<image class="item-img item-img" :src="item.icon" v-else></image>
			</view>
			<!-- <view>
				<image class="item-img" :src="item.icon_a" v-if="current == index"></image>
				<image class="item-img" :src="item.icon" v-else></image>
			</view> -->
			<view class="item-name" :class="{'tabbarActive': current == index}" v-if="item.text">{{item.text}}
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: String
		},
		data() {
			return {
				paddingBottomHeight: 0, //苹果X以上手机底部适配高度
				list: [{
						text: '首页',
						icon: '../../static/bar/first.png',
						icon_a: '../../static/bar/first_active.png',
						path: "../../pages/first/first",
					},
					{
						text: '立即下单',
						icon: '../../static/bar/order.png',
						icon_a: '../../static/bar/order_active.png',
						path: "../../pages/phoneModel/phoneModel",
					},
					{
						text: '我的',
						icon: '../../static/bar/mine.png',
						icon_a: '../../static/bar/mine_active.png',
						path: "../../pages/mine/mine", 
					}
				]
			};
		},
		created() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
					model.forEach(item => {
						//适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
						if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
							that.paddingBottomHeight = 40;
						}
					})
				}
			});
		},
		watch: {

		},
		methods: {
			tabbarChange(path) {
				// this.$pageTo.toTab(path);
				uni.switchTab({
					url: path
				})
			}
		}
	};
</script>

<style>
	.tabbarActive {
		color: #79D5AD !important;
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 120rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		/* width: 50rpx; */
	}

	.item-img {
		width: 46rpx;
		height: 46rpx;
		margin-bottom: 4rpx;
	}

/* 	.item-img2 {
		width: 66rpx;
		height: 66rpx;
	} */

	.item-name {
		font-size: 26rpx;
		padding-left: 26rpx;
		padding-right: 26rpx;
		color: #A3A3A3;
	}

</style>
