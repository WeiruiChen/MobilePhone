<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" ><block slot="content">首页</block></cu-custom>
	<!-- 	<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="image">
					<image src="../../static/show/banner1@3x.png"
					 mode="widthFix"></image>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
				this.getFirstData()
		},
		methods: {
			getFirstData(){
				this.$request({
					url:'/phoneReparisServer/service/rest/nologin.customer.login/collection/login',
					methods:'GET',
					data:{
						openId:'opfA81LO4KG84eBUeulJ0WmvK198',
						loginType:"openId"
					}
				}).then(res=>{
					console.log('resres',res)
				}).catch(error=>{
					console.log('error',error)
				})
					
			}
		}
	}
</script>

<style>

</style>
