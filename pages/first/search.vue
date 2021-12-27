<template>
<view style="background-color:#FFFFFF;height:100vh">
		<cu-custom :isBack="true" bgColor="bg-gradual-default" >
			<!-- <view slot="backText">返回</view> -->
			<view slot="content">搜索</view>
		</cu-custom>
        <view class="cu-bar search" >
			<view class="search-form round" style="text-align:center">
				<text class="cuIcon-search"></text>
				<input v-model="value" type="text" placeholder="搜索" @input="getSearchList"></input>
			</view>
		</view>
        <view v-if="searchList.length > 0" style="margin:0 50rpx 0 50rpx">
            <view v-for="item in searchList" :key="item.id">
                <view style="color:#333333;font-size:30rpx" @click="gotoMaintance(item)" >{{item.name}}</view>
                 <view style="height:2rpx;background-color:#999999"></view>
            </view>
        </view>
        <view  v-else>
        <view style="margin-left:30rpx;color:#999999">搜索历史</view>
            <view style="margin-left:33rpx;margin-top:30rpx">
                <span class="search-item" v-for="item in historyList" :key="item.id" >
                   苹果12
                </span>
            </view>
        <view style="margin-left:30rpx;color:#999999;margin-top:58rpx">热门搜索</view>
        </view>
</view>
</template>

<script>
	import {debounce} from '../../utils/debounce';

	export default {
		data() {
			return {
                historyList:[1],
                hotList:[],
                searchList:[],
                value:''
			}
		},
		onshow() {

        },
        methods: {
            // 实时触发搜索
            getSearchList:debounce(function(){
                 this.$request({
					url: '/phoneReparisServer/service/rest/login.customerService/collection/searchCategory',
					methods: 'POST',
					data: {
						keyWord: this.value
					}
				}).then(res => {
                    this.searchList = res
				}).catch(e => {
					console.log(e)
				});
            }),
            gotoMaintance(item){
				uni.setStorageSync('category',JSON.stringify({gotoValue:'root,'+item.id}));
                uni.switchTab({
					url: '../phoneModel/phoneModel'
				})
            }
            }
            // 获取历史搜索

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
