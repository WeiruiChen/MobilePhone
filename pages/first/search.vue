<template>
<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-default" >
			<!-- <view slot="backText">返回</view> -->
			<view slot="content">搜索</view>
		</cu-custom>
        <view class="cu-bar search" >
			<view class="search-form round" style="text-align:center">
				<text class="cuIcon-search"></text>
				<!-- <input v-model="value" type="text" placeholder="搜索" @input="getSearchList"/> -->
                 <input v-model="value" type="text" placeholder="搜索" @confirm="getSearchList" @input="checkNull"/> 
			</view>
		</view>
        <view v-if="searchList.length > 0" style="margin:0 50rpx 0 50rpx">
            <view v-for="item in searchList" :key="item.id">
                <view style="color:#333333;font-size:32rpx;margin:12rpx 0rpx 12rpx 0rpx;padding-bottom: 8rpx;border-bottom:2rpx solid #F5F5F5; " @click="gotoMaintance(item)" >{{item.name}}</view>
                 <!-- <view style="height:2rpx;background-color:#333333"></view> -->
            </view>
            <view style="height:30rpx"></view>
        </view>
        <view  v-else>
        <view style="margin-left:30rpx;color:#999999">搜索历史</view>
            <view style="margin-left:33rpx;display:flex;flex-wrap: wrap;">
                <view class="search-item" v-for="item in historyList" :key="item"  @click="onClickHot(item)">
                    <view>{{item}}</view>
                </view>
            </view>
    
            <view style="margin-left:30rpx;color:#999999;margin-top:58rpx">热门搜索</view>
                <view style="margin-left:33rpx;display:flex;flex-wrap: wrap;">
                <view class="search-item" v-for="item in hotList" :key="item"  @click="onClickHot(item)">
                    <view>{{item}}</view>
                </view>
            </view>
        </view>
</view>
</template>

<script>
	import {debounce} from '../../utils/debounce';

	export default {
		data() {
			return {
                historyList:[],
                hotList:[],
                searchList:[],
                value:''
			}
		},
		onShow() {
            this.historyList = uni.getStorageSync('historyList') || [];
            if(this.historyList == 2) this.historyList = [];
            this.hotSearch();
        },
        methods: {
            // 热门搜索
            hotSearch(){
                this.$request({
					url: '/phoneReparisServer/service/rest/nologin.productService/collection/getHotKeyword',
					methods: 'POST'
				}).then(res => {
                    this.hotList = res[0].split('，') || [];
				}).catch(e => {
					console.log(e)
				});
            },
            // 检查是否为空
            checkNull(){
                if(this.value == ''){
                    this.searchList = [];
                }
            },
            // 点击触发搜索
            onConfirmSearch(){
                  this.$request({
					url: '/phoneReparisServer/service/rest/login.customerService/collection/searchCategory',
					methods: 'POST',
					data: {
						keyWord: this.value
					}
				}).then(res => {
                    if(this.historyList.length > 0){
                        if(!this.historyList.includes(this.value))
                            uni.setStorageSync('historyList',this.historyList.push(this.value));
                    }else{
                        uni.setStorageSync('historyList',[this.value]);
                    }
                    this.searchList = res
				}).catch(e => {
					console.log(e)
				});
            },
            // 实时触发搜索
            getSearchList:debounce(function(){
                 this.$request({
					url: '/phoneReparisServer/service/rest/login.customerService/collection/searchCategory',
					methods: 'POST',
					data: {
						keyWord: this.value
					}
				}).then(res => {
                    if(this.historyList.length > 0){
                        uni.setStorageSync('historyList',this.historyList.push(this.value));
                    }else{
                        uni.setStorageSync('historyList',[this.value]);
                    }
                    this.searchList = res
				}).catch(e => {
					console.log(e)
				});
            }),
            gotoMaintance(item){
				uni.setStorageSync('maintenance',JSON.stringify({gotoValue:'root,'+item.id}));
                uni.navigateBack({ delta: 1,success: function(){
                     uni.navigateTo({
                         	url: '../maintenanceList/maintenanceList',
                            success: function(res){
                                console.log('success:'+JSON.stringify(res));
                            },
                     });

                }});
            },
            onClickHot(item){
                this.value = item;
                this.onConfirmSearch();
            }
        }
            // 获取历史搜索

	}
</script>
<style>
page {
	background-color : #FFFFFF;
    height: 100%;
}
</style>

<style>
	.search-item{
        border-radius: 35rpx;
        border: 2rpx solid #02D5C7;
        text-align: center;
        display:flex;
        flex-direction: column;
        justify-content: center;
        padding: 8rpx 14rpx 8rpx 14rpx;
        font-size:24rpx;
        color:#333333;
        margin: 20rpx 0 0 30rpx;
    }
</style>
