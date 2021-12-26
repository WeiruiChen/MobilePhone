<template>
<view style="background-color:#FFFFFF;height:100vh">
		<cu-custom :isBack="true" bgColor="bg-gradual-default" >
			<!-- <view slot="backText">返回</view> -->
			<view slot="content">搜索</view>
		</cu-custom>
        <view class="cu-bar search" >
			<view class="search-form round" style="text-align:center">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索" @click="gotoSearch"></input>
			</view>
		</view>
        <view style="margin-left:30rpx;color:#999999">搜索历史</view>
            <view style="margin-left:33rpx;margin-top:14rpx">
                <span class="search-item" v-for="item in historyList" :key="item" >
                   23213
                </span>
            </view>
        <view style="margin-left:30rpx;color:#999999;margin-top:58rpx">热门搜索</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
                historyList:[1],
                hotList:[]
			}
		},
		onshow() {

        },
        methods: {
            // 获取历史搜索
        }
	}
</script>

<style>
	.search-item{
        border-radius: 35rpx;
        border: 1rpx solid #02D5C7;
        text-align: center;
        padding: 8rpx 14rpx 8rpx 14rpx;
        font-size:24rpx;
        color:#333333;
    }
</style>
