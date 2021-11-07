<template>
	<view>
		<view-tabbar :current="0"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/pages/tabBar/tabBar.vue'
	export default {
		components: {
			'view-tabbar': Tabbar
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
		},
	}
</script>
