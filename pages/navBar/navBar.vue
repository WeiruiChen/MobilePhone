<template>
	<view class="box">
		<view class="cu-bar tabbar bg-white">
			<view class="action">
				<view class="cuIcon-cu-image">
					<image :src="isActive && type == 'first'  ? require('@/static/bar/first_active.png') : require('@/static/bar/first.png')"></image>
				</view>
				<view :class="isActive && type == 'first' ? 'text-green' : 'text-gray'">首页</view>
			</view>
			
			<view class="action">
				<view class="cuIcon-cu-image">
					<image :src="isActive && type == 'order'  ? require('@/static/bar/order_active.png') : require('@/static/bar/order.png')"></image>
				</view>
				<view :class="isActive && type == 'order' ? 'text-green' : 'text-gray'">下单</view>
			</view>
			
			<view class="action">
				<view class="cuIcon-cu-image">
					<image :src="isActive && type == 'mine'  ? require('@/static/bar/mine_active.png') : require('@/static/bar/mine.png')"></image>
				</view>
				<view :class="isActive && type == 'mine' ? 'text-green' : 'text-gray'">我的</view>
			</view>
		
	
	</view>
	</view>
	
</template>
<script>
	export default {
		props:['isActive','type']
		
	}
</script>

<style>
</style>
