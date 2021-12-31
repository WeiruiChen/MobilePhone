<template>
  <view style="position: relative">
    <cu-custom bgColor="bg-gradual-default"
      ><block slot="content">首页</block></cu-custom
    >
    <!-- 强制用户点击获取信息 -->
    <!-- <swiper class="card-swiper square-dot"  :circular="true" :indicator-dots="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#04D4C6">
			<swiper-item v-for="(item,index) in swiperList" :key="index" style="width:100%!important" :class="cardCur==index?'cur':''">
				<view class="swiper-item" @click="onClickHandler(item)">
					<image :src="imageUrl+item.fileId" mode="aspectFill" ></image>
				</view>
			</swiper-item>
		</swiper> -->
    <view class="cu-bar search" @click="gotoSearch">
      <view
        class="search-form round"
        style="background-color: #ffffff; text-align: center"
      >
        <text class="cuIcon-search"></text>
        <input type="text" placeholder="搜索" />
      </view>
    </view>

    <view
      style="background-color: #ffffff; margin: 20rpx; border-radius: 20rpx"
    >
      <view
        v-if="!isRecommend"
        style="
          border-radius: 20rpx;
          background-color: #ffffff;
          text-align: center;
          height: 120rpx;
          border-radius: 20rpx;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <image
          src="../../static/first/nonePhone.png"
          style="width: 60rpx; height: 80rpx"
          mode="scaleToFill"
        />
        <view style="width: 20rpx"></view>
        <view style="color: #136169; font-weight: bold; font-size: 26rpx"
          >无法匹配当前手机型号</view
        >
        <view
          @click="gotoPhoneType"
          style="color: #136169; margin-left: 20rpx; font-size: 26rpx"
          >手动选择其他手机型号
          <text
            class="lg text-gray"
            :class="'cuIcon-right'"
            style="color: #136169"
          ></text>
        </view>
      </view>

      <view v-else style="background-color: #ffffff; border-radius: 20rpx">
        <view
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <view style="display: flex; align-items: center">
            <image
              :src="imageUrl + recommendData.pictureId"
              style="width: 100rpx; height: 100rpx; margin: 30rpx"
              mode="scaleToFill"
            />
            <view>
              <view style="font-weight: bold; color: #136169">{{
                recommendData.phoneType
              }}</view>
              <view style="color: #136169; font-size: 22rpx"
                >免费预约 修好再付</view
              >
            </view>
          </view>

          <view
            @click="gotoPhoneType"
            style="color: #136169; margin-left: 20rpx; margin-right: 20rpx"
            >更换其他手机型号
            <text
              class="lg text-gray"
              :class="'cuIcon-right'"
              style="color: #136169"
            ></text>
          </view>
        </view>
        <view style="margin: 0rpx 20rpx 30rpx 20rpx">
          <scroll-view scroll-x scroll-with-animation>
            <view class="cu-card" style="display: inline-flex">
              <view
                class="cu-item-scroll"
                v-for="(item, index) in salesTimeList"
                style="margin-right: 14rpx"
                :key="index"
                @click="onClickHandler(item)"
              >
                <view
                  style="
                    display: flex;
                    background-color: #f6fcff;
                    height: 210rpx;
                  "
                >
                  <view
                    style="
                      margin: 20rpx;
                      width: 230rpx;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                    "
                  >
                    <view>
                      <view
                        class="one-line"
                        style="
                          font-weight: 900;
                          font-size: 30rpx;
                          color: #136169;
                        "
                        >{{ item.title }}</view
                      >
                      <view
                        class="show-subTitle two-line"
                        style="
                          font-weight: 500;
                          color: #136169;
                          font-size: 26rpx;
                        "
                        >{{ item.subTitle }}</view
                      >
                    </view>
                    <view style="display: inline-flex; align-items: center">
                      <view
                        style="
                          font-size: 55rpx;
                          color: #e05a28;
                          font-weight: 700;
                        "
                        >{{ item.salePrice }}</view
                      >
                      <view
                        style="
                          text-decoration: line-through;
                          margin-left: 10rpx;
                          color: #669ca1;
                        "
                        >{{ item.price }}</view
                      >
                    </view>
                  </view>
                  <view style="position: relative">
                    <image
                      src="../../static/first/lijiqianggou.png"
                      style="width: 60rpx; height: 100%"
                    ></image>
                    <view
                      style="
                        position: absolute;
                        top: 25rpx;
                        left: 15rpx;
                        color: #ffffff;
                        font-weight: 700;
                        font-size: 30rpx;
                      "
                      >立即抢购</view
                    >
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>

      <swiper
        class="screen-swiper"
        :class="true ? 'square-dot' : 'round-dot'"
        style="
          margin: 20rpx 10rpx 0rpx 10rpx;
          min-height: 200rpx;
          height: 200rpx;
        "
        :indicator-dots="true"
        :circular="true"
        :autoplay="true"
        interval="5000"
        duration="500"
      >
        <swiper-item
          v-for="(item, index) in swiperList"
          :key="index"
          style="border-radius: 8rpx"
          @click="onClickHandler(item)"
        >
          <view v-if="!item.fileId"></view>
          <image
            alt="error"
            :src="imageUrl + item.fileId"
            mode="aspectFill"
          ></image>
        </swiper-item>
      </swiper>

      <!-- <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view  v-for="(item,index) in cuIconList" :key="index" v-if="index < gridCol*2">
				<view style="display:flex;flex-direction:column;align-items:center">
					<view v-if="!item.fileId"></view>
					<image v-else @click="onClickHandler(item,index)" :src="imageUrl+item.fileId" style="width: 120rpx;height: 120rpx;"></image>
					<view >{{item.title}}</view>
				</view>
			</view>
		</view> -->

      <view
        style="
          background-color: #ffffff;
          border-radius: 20rpx;
          display: flex;
          flex-wrap: wrap;
          margin: 20rpx 0rpx 20rpx 0rpx;
        "
      >
        <view
          style="
            width: 50%;
            display: flex;
            margin: 10rpx 0 10rpx 0;
            color: #666666;
            align-items: center;
          "
          v-for="(item, index) in cuIconList"
          :key="index"
          @click="onClickHandler(item, index)"
        >
          <image
            :src="imageUrl + item.fileId"
            style="width: 100rpx; height: 100rpx"
          ></image>
          <view
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 10rpx;
            "
          >
            <view style="font-size: 30rpx; font-weight: bold">{{
              item.title
            }}</view>
            <view style="font-size: 22rpx; color: #999999; margin-top: 8rpx"
              >{{ item.subTitle || "" }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view  v-for="(item,index) in cuIconList" :key="index" v-if="index < gridCol*2">
				<view style="display:flex;flex-direction:column;align-items:center">
					<view v-if="!item.fileId"></view>
					<image v-else @click="onClickHandler(item,index)" :src="imageUrl+item.fileId" style="width: 120rpx;height: 120rpx;"></image>
					<view >{{item.title}}</view>
				</view>
			</view>
		</view>  -->

    <view v-show="showStatic">
      <!-- <view v-if="salesTimeList.length > 0">
		
			</view> -->
      <!-- <view class="cu-bar" >
				<view class="action">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/processicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;font-size:40rpx">服务流程</text>
				</view>
			</view>
		
			<view class="cu-card">
				<view class="cu-item shadow">
					<view class="content" style="display: flex;justify-content: space-around;margin: 40rpx 10rpx 40rpx 10rpx">
						<view v-for="(item,index) in preferentialList" :key="index">
							<view style="display: flex;margin: 0rpx 0 0 28rpx;">
								<image style="width: 65rpx;height: 65rpx;" :src="item.cuIcon"></image>
								<view style="display: absolute;">
									<image v-if="index <3" style="left: 28rpx;top:20rpx;width: 50rpx;height: 10rpx;" src="../../static/first/line.png"></image>
								</view>
							</view>
							<view style="font-weight: bold;">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view> -->

      <!-- <view class="cu-bar">
				<view class="action">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/first/advanceicon.png"></image>
					<text style="margin-left: 10rpx;font-weight: 900;font-size:40rpx">服务优势</text>
				</view>
			</view> -->
    </view>

    <!-- <view class="cu-card case" v-for="(item) in serviceProfitList" :key="item.fileId" @click="onClickHandler(item)">
			<view class="cu-item shadow" style="position: relative;">
				<view class="image">
					<image :src="imageUrl+item.fileId"
					 mode="widthFix" style="height: auto;"></image>
				</view>
			</view>
		</view> -->
    <view v-show="showStatic">
      <view class="csh-show" @click="callPhone">
        <image
          src="../../static/first/121.png"
          style="width: 100rpx; height: 100rpx"
          mode="scaleToFill"
        />
        <view style="margin-left: 20rpx">
          <view style="font-size: 30rpx; font-weight: bold">
            24小时客服电话
          </view>
          <view
            style="font-color: #999999; font-size: 20rpx; letter-spacing: 2rpx"
          >
            如何预约？维修费用多少？保修多久?欢迎来电咨询。
          </view>
        </view>
      </view>
    </view>
    <view style="height: 150rpx"></view>
    <view-tabbar current="0"></view-tabbar>
  </view>
</template>

<script>
import { mapState } from "vuex"; //引入mapState
import Tabbar from "@/pages/tabBar/tabBar.vue";

export default {
  data() {
    return {
      systemInfo: {},
      isRecommend: false,
      // 推荐手机型号
      recommendData: {
        title: "苹果iPhone 11",
        subTitle: "免费预约,修好再付",
      },
      gridCol: 4,
      gridBorder: false,
      preferentialList: [
        {
          cuIcon: require("@/static/first/免费预约@3x.png"),
          name: "免费预约",
        },
        {
          cuIcon: require("@/static/first/上门取件@3x.png"),
          name: "上门取件",
        },
        {
          cuIcon: require("@/static/first/服务直播@3x.png"),
          name: "服务直播",
        },
        {
          cuIcon: require("@/static/first/设备验收@3x.png"),
          name: "验收付款",
        },
      ],
      dotStyle: false,
      cardCur: 0,
      cshPhone: "获取失败",
      // 轮播图
      swiperList: [],
      // 限时优惠
      salesTimeList: [],
      // 服务优势
      serviceProfitList: [],
      // 手机选项
      cuIconList: [{}],
      // 静态图等资源加载完后再限时
      showStatic: false,
      showClickUser: true,
    };
  },
  components: {
    "view-tabbar": Tabbar,
  },
  onShow() {
    uni.hideTabBar({
      animation: false,
    });
    // 清空category
    // uni.setStorageSync('category',undefined);
  },
  computed: mapState({
    // 从state中拿到数据
    loginName: (state) => state.user.loginName,
    cityId: (state) => state.user.cityId,
    imageUrl: (state) => state.user.imageBaseUrl,
    openId: (state) => state.user.openId,
    gmPhone: (state) => state.user.gmPhone,
    model: (state) => state.user.model,
  }),
  onLoad() {
    // 获取系统信息
    // console.log('system:'+JSON.stringify(uni.getSystemInfoSync()));
    const systemInfo = uni.getSystemInfoSync();
    this.systemInfo = systemInfo;
    this.$store.dispatch("actionTrigger", {
      key: "model",
      value: systemInfo.model,
    });
    // console.log('system',this.model);
    if (
      uni.getSystemInfoSync().platform == "mac" ||
      uni.getSystemInfoSync().platform == "windows"
    ) {
      this.getUserData();
      this.getRecommend(this.systemInfo.model);
    } else {
      this.wxLogin();
      // 获取版本号
      this.getAppVersion();
    }
  },
  methods: {
    getRecommend(model) {
      this.$request({
        url: "/phoneReparisServer/service/rest/login.customerService/collection/getServiceGoodsByType",
        methods: "POST",
        data: {
          page: 1,
          rows: 20,
          phoneType: model,
          phoneName: this.systemInfo.brand,
        },
      })
        .then((res) => {
          if (Array.isArray(res) && res.length > 0) {
            this.isRecommend = true;
            this.recommendData = res[0];
            this.salesTimeList = res;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    gotoPhoneType() {
      uni.switchTab({
        url: "../phoneModel/phoneModel",
      });
    },
    gotoSearch() {
      uni.navigateTo({
        url: "./search",
      });
    },
    //获取小程序版本号
    getAppVersion() {
      const accountInfo = wx.getAccountInfoSync();
      // console.log('accountInfoaccountInfoaccountInfo',JSON.stringify(accountInfo));
      // this.$store.dispatch('actionTrigger',{
      // 		key:'clientVer',value:accountInfo.miniProgram.version || accountInfo.miniProgram.envVersion,
      // })
    },
    // 微信登陆
    wxLogin() {
      let that = this;
      uni.login({
        provider: "weixin",
        onlyAuthorize: true,
        success: function (loginRes) {
          // console.log('code',loginRes.authResult);
          console.log("code", loginRes.code);
          if (loginRes.code) {
            // 拿到code获取用户openid
            that
              .$request({
                url: "/phoneReparisServer/service/rest/nologin.productService/collection/getMiniOpenid",
                methods: "POST",
                data: {
                  code: loginRes.code,
                  payTypeStr: "WxSmallProgramReaders",
                },
              })
              .then((res) => {
                console.log("openiddrequest", res);
                that.$store.dispatch("actionTrigger", {
                  key: "openId",
                  value: res["openId"] || "",
                  // key:'openId',value:'opfA81LO4KG84eBUeulJ0WmvK198',
                });
                // 获取用户登陆信息
                that.getUserData();
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
          // loginName
        },
      });
    },
    onClickHandler(item, index = 0) {
      // 清空购物车
      this.$store.dispatch("shoppingTrigger", {
        key: "maintenanceList",
        value: [],
      });
      // 创建level跳转逻辑
      const levelMap = {
        3: function () {
          uni.setStorageSync("maintenance", JSON.stringify(item));
          uni.navigateTo({
            url: "../maintenanceList/maintenanceList",
          });
        },
        4: function () {
          uni.setStorageSync("maintenance", JSON.stringify(item));
          // 设置选择商品
          uni.setStorageSync("selectGood", item.id || undefined);
          uni.navigateTo({
            url: "../maintenanceList/maintenanceList",
          });
        },
      };

      const pathMap = {
        panelMy: "/pages/mine/mine",
        createOrder: "/pages/orderList/orderList",
        pageAddress: "/pages/allAddress/allAddress",
      };
      const clickMap = {
        // gototype为ClientPage则跳转
        ClientPage: function () {
          uni.navigateTo({
            url: pathMap[item.gotoValue],
            fail: function () {
              uni.switchTab({
                url: pathMap[item.gotoValue],
              });
            },
          });
        },
        Category: function () {
          // 判断跳转页面
          if (item.gotoValue.indexOf(",")) {
            let level = item.gotoValue.split(",")[0];
            levelMap[level]
              ? levelMap[level]()
              : (function () {
                  // 设置缓存供phonemodel使用
                  uni.setStorageSync("category", JSON.stringify(item));
                  uni.switchTab({
                    url: "../phoneModel/phoneModel",
                  });
                })();
          }
        },
        Goods: function () {
          uni.switchTab({
            url: "../phoneModel/phoneModel",
          });
        },
      };
      // 执行
      clickMap[item.gotoType]();
    },
    cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    getFastClick(model) {
      this.$request({
        url: "/phoneReparisServer/service/rest/nologin.homeService/collection/getFastClick",
        methods: "POST",
        data: {
          phoneType: model,
          phoneName: this.systemInfo.brand,
        },
      })
        .then((res) => {
          this.cuIconList = res;
          console.log("resres", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    //获取客服电话
    getCSHText() {
      this.$request({
        url: "/phoneReparisServer/service/rest/nologin.locationService/collection/getDeliveryAddressList",
        methods: "POST",
        data: {},
      })
        .then((res) => {
          this.cshPhone = res[0].phone;
          // console.log('getDeliveryAddressList:',JSON.stringify(res))
          this.$store.dispatch("actionTrigger", {
            key: "gmPhone",
            value: this.cshPhone,
          });
          this.$store.dispatch("actionTrigger", {
            key: "delivery",
            value: res[0],
          });
          this.$store.dispatch("actionTrigger", {
            key: "deliveryList",
            value: res,
          });
        })
        .catch((e) => {
          console.log("getDeliveryAddressList", e);
        });
    },
    getHomeBannerData() {
      this.showStatic = false;
      this.$request({
        url: "/phoneReparisServer/service/rest/nologin.homeService/collection/getHomeBanner",
        methods: "POST",
        data: {
          rows: 6,
          page: 1,
        },
      })
        .then((res) => {
          // 获取全部数据
          for (let data of res) {
            //获取轮播图
            if (data["typeSetting"] === "One") {
              this.swiperList = data.itemList;
            }
            // if(data['typeSetting'] === 'Six'){
            // 	this.salesTimeList = data.itemList
            // }
            if (data["typeSetting"] === "Two") {
              this.serviceProfitList = data.itemList;
            }
          }
          this.showStatic = true;
          // console.log('resre',res)
        })
        .catch((e) => {
          console.log("getHomeBanner", e);
        });
    },
    callPhone() {
      console.log("callPhone");
      uni.makePhoneCall({
        phoneNumber: this.gmPhone,
      });
    },
    getUserData() {
      uni.showLoading({
        title: "加载中",
      });
      this.$request({
        url: "/phoneReparisServer/service/rest/nologin.customer.login/collection/login",
        methods: "POST",
        data: {
          openId: this.openId || "opfA81LO4KG84eBUeulJ0WmvK198",
          loginType: "openId",
        },
      })
        .then((res) => {
          const resFormat = res;
          // 获取信息存储到全局
          this.$store.dispatch("actionTrigger", {
            key: "cityId",
            value: resFormat["cityId"] || "",
          });
          this.$store.dispatch("actionTrigger", {
            key: "gender",
            value: resFormat["gender"] || "",
          });
          this.$store.dispatch("actionTrigger", {
            key: "deviceId",
            value: resFormat["deviceId"] || "",
          });
          this.$store.dispatch("actionTrigger", {
            key: "sessionID",
            value: resFormat["sessionID"] || "",
          });
          this.$store.dispatch("actionTrigger", {
            key: "name",
            value: resFormat["name"] || "",
          });
          this.$store.dispatch("actionTrigger", {
            key: "wxHead",
            value: resFormat["wxHead"] || "",
          });
          // 获取轮播图等信息
          this.getHomeBannerData();
          // 获取Goods
          this.getFastClick(this.systemInfo.model);
          // 获取客户电话
          this.getCSHText();
          // 获取推荐型号
          this.getRecommend(this.systemInfo.model);
          // 获取推荐限时栏
          uni.hideLoading();
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style>
.show-subTitle {
  color: rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
/* 悬浮样式 */
.csh-show {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  border-radius: 50rpx;
  /* box-shadow:10rpx 10rpx 5rpx 0rpx; */
}
/* 显示一行 */
.one-line {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
/* 显示二行 */
.two-line {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
