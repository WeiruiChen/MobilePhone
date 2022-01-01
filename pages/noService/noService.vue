<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-default" >
			<!-- <view slot="backText">返回</view> -->
			<view slot="content">暂无服务</view>
		</cu-custom>


        <view style="display:flex;flex-direction:column;align-items:center;height:770rpx;margin-top:200rpx;">
            <image style="width:475rpx" src="../../static/images/noService.png"></image>
            <view style="color:#D9D9D9;margin-top:82rpx">抱歉，该服务暂未上架……</view>
                
            <view style="display:flex;justify-content:space-between;width:475rpx;margin-top:182rpx">
                <button class="cu-btn submit-btn round" @click="callPhone">联系客服</button>
		        <button class="cu-btn submit-btn round" @click="gotoPhoneModel">其他服务</button>
            </view>
        </view>


	</view>
</template>

<script>
	import {mapState} from 'vuex' //引入mapState
	
	export default {
		data() {
			return {

			};
		},
		computed: mapState({
            gmPhone:state => state.user.gmPhone,
		}),
		components: {
		},
		onLoad() {
		},
		onShow(){
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
           callPhone(){
				console.log('callPhone')
				uni.makePhoneCall({
				  phoneNumber: this.gmPhone,
				})
			},
            gotoPhoneModel(){
                uni.redirectTo({
					url:'../phoneModel/phoneModel'
				})
            }
		},
	}
</script>
<style>
	.submit-btn {
		/* background-color: blue; */
		background-color: #04D4C6;
        
	}
    button {
        border-radius: 12rpx;
		color: #FFFFFF;
        height: 64rpx !important;;
		background-color: #04D4C6 !important;
	}
</style>
