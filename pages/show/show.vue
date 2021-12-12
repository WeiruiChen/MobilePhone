<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" ><block slot="content">首页</block></cu-custom>
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="../../static/show/banner1@3x.png"
					 mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<image :src="item.cuIcon" style="width: 180rpx;height: 180rpx;"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-bar solid-bottom" style="margin-top: 20rpx;">
			<view class="action">
				<image style="width: 50rpx;height: 50rpx;" src="../../static/show/限时优惠icon@3x.png"></image>
				<text style="margin-left: 10rpx;font-weight: 900;">限时优惠</text>
			</view>
		</view>
		<scroll-view scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<!-- <view class="cu-card article" :class="isCard?'no-card':''" v-for="(item,index) in 3"  >
			<view class="cu-item shadow">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view>
							<view class="cu-tag bg-red light sm round">正义天使</view>
							<view class="cu-tag bg-green light sm round">史诗</view>
						</view>
					</view>
				</view>
			</view>
			</view> -->
			<!-- <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
				Tab{{index}}
			</view> -->
		</scroll-view>
		
		<view class="cu-bar solid-bottom" style="margin-top: 20rpx;">
			<view class="action">
				<image style="width: 50rpx;height: 50rpx;" src="../../static/show/服务流程icon@3x.png"></image>
				<text style="margin-left: 10rpx;font-weight: 900;">服务流程</text>
			</view>
		</view>
		
		<view class="cu-bar solid-bottom" style="margin-top: 20rpx;">
			<view class="action">
				<image style="width: 50rpx;height: 50rpx;" src="../../static/show/服务优势icon@3x.png"></image>
				<text style="margin-left: 10rpx;font-weight: 900;">服务优势</text>
			</view>
		</view>
	<!-- 	<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view>
							<view class="cu-tag bg-red light sm round">正义天使</view>
							<view class="cu-tag bg-green light sm round">史诗</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow" style="position: relative;">
				<view class="image">
					<image src="../../static/show/服务优势图1@3x.png"
					 mode="widthFix" style="height: auto;"></image>
				</view>
					<view style="display:flex;align-items: center;justify-content: center;">
					</view>
				<view style="position: absolute; font-size:40rpx;top: 320rpx; left: 170rpx; margin:auto 0;color:#FFFFFF;">-极速快修 严选品质-</view>
			</view>
		</view>
		<view style="display:flex;align-items: center;justify-content: center;">
			<text style="text-align: center;">24小时客服电话:xsxxxx</text>
		</view>
		<view class="box">
			<view class="cu-bar tabbar bg-white">
				<view class="action">
					<view class="cuIcon-cu-image">
						<image src="/static/bar/首页@3x.png"></image>
					</view>
					<view class="text-green">首页</view>
				</view>
				<view class="action">
					<view class="cuIcon-cu-image">
						<image src="/static/bar/下单@3x.png"></image>
					</view>
					<view class="text-gray">下单</view>
				</view>
				<view class="action">
					<view class="cuIcon-cu-image">
						<image src="/static/bar/我的@3x.png"></image>
						<!-- <view class="cu-tag badge">99</view> -->
					</view>
					<view class="text-gray">我的</view>
				</view>
			</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isCard: false,
				modalName: null,
				gridCol: 4,
				gridBorder: false,
				cuIconList: [{
					cuIcon: '../../static/show/苹果手机@3x.png',
					// color: 'red',
					// badge: 120,
					name: '苹果手机'
				}, {
					cuIcon: '../../static/show/华为手机@3x.png',
					// color: 'orange',
					// badge: 1,
					name: '华为手机'
				}, {
					cuIcon: '../../static/show/小米手机@3x.png',
					// color: 'yellow',
					// badge: 0,
					name: '小米手机'
				}, {
					cuIcon: '../../static/show/其他机型@3x.png',
					// color: 'olive',
					// badge: 22,
					name: '其他机型'
				}, {
					cuIcon: '../../static/show/屏幕维修@3x.png',
					// color: 'cyan',
					// badge: 0,
					name: '屏幕维修'
				}, {
					cuIcon: '../../static/show/电池维修@3x.png',
					// color: 'blue',
					// badge: 0,
					name: '电池维修'
				}, {
					cuIcon: '../../static/show/外壳维修@3x.png',
					// color: 'purple',
					// badge: 0,
					name: '外壳维修'
				}, {
					cuIcon: '../../static/show/内存升级@3x.png',
					// color: 'mauve',
					// badge: 0,
					name: '内存升级'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
			}
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			// getShowData(){
				// uni.request({
				// 	method
				// })
			// }
			// showModal(e) {
			// 	this.modalName = e.currentTarget.dataset.target
			// },
			// hideModal(e) {
			// 	this.modalName = null
			// },
			// Gridchange(e) {
			// 	this.gridCol = e.detail.value
			// },
			// Gridswitch(e) {
			// 	this.gridBorder = e.detail.value
			// }
		}
	}
</script>

<style>

</style>
