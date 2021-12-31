<template>
  <view>
    <cu-custom :isBack="true" bgColor="bg-gradual-default">
      <view slot="backText">返回</view>
      <view slot="content">维修方案列表</view>
    </cu-custom>

    <view class="VerticalBox container">
      <scroll-view
        class="VerticalNav nav"
        scroll-y
        scroll-with-animation
        :scroll-top="verticalNavTop"
        style="height: calc(100vh - 375upx)"
      >
        <view style="display: flex; flex-direction: column">
          <view class="text-left margin-top-xl margin-left">
            <view class="category-one"
              ><text>{{ phone.groupCnName }}</text></view
            >
            <view class="category-two margin-tb-sm"
              ><text>{{ phone.name }}</text></view
            >
            <view class="change-phone" @click="backPhoneModel"
              ><text>更换机型</text></view
            >
            <view class="category-three"> </view>
          </view>

          <view class="flex-vertical margin-top-xl">
            <view
              class="nav-item"
              style="margin-top: 20rpx"
              :class="item.id == tabCur ? 'text-green cur' : ''"
              v-for="(item, index) in list"
              :key="index"
              @tap="TabSelect"
              :data-item="{ id: item.id, index }"
            >
              {{ item.name }}
              <view v-if="item.count && item.count != 0" class="cu-tag badge">{{
                item.count
              }}</view>
            </view>
          </view>
        </view>
      </scroll-view>

      <scroll-view
        class="VerticalMain"
        style="height: calc(100vh - 375upx)"
        scroll-y
        scroll-with-animation
      >
        <view v-if="!showNull" class="padding-top padding-lr">
          <form
            v-for="(item, index) in forkMaintenance"
            :key="index"
            :id="'main-' + index"
          >
            <view class="cu-form-group padding margin-bottom-sm round-card">
              <view style="width: 100%">
                <view class="text-title"
                  ><text>{{ item.title }}</text></view
                >
                <view class="text-gray" style="margin-top: 10rpx"
                  ><text>{{ item.subTitle }}</text></view
                >
                <view class="text-gray">
                  {{ item.warranty || "" }}
                </view>
                <view class="flex-container margin-top">
                  <view class="text-price" style="color: #136169"
                    ><text>{{ item.salePrice }}</text></view
                  >
                  <button
                    v-if="!item.selected"
                    class="cu-btn cuIcon icon-add"
                    style="font-weight: 900; height: 50rpx; width: 50rpx"
                    @click="addShopping(index, true)"
                  >
                    <text class="cuIcon-add"></text>
                  </button>
                  <button
                    v-else
                    class="cu-btn cuIcon icon-move"
                    style="font-weight: 900; height: 50rpx; width: 50rpx"
                    @click="addShopping(index, false)"
                  >
                    <text class="cuIcon-move"></text>
                  </button>
                </view>
              </view>
            </view>
          </form>
        </view>
        <view
          v-else
          class="padding margin-bottom-sm round-card"
          style="margin-top: 200rpx"
        >
          <view
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 370rpx;
            "
          >
            <image
              style="width: 100%"
              src="../../static/maintenance/null.png"
            ></image>
            <view style="color: #d9d9d9">暂无数据</view>
          </view>
        </view>

        <view style="height: 80rpx"></view>
      </scroll-view>
    </view>

    <view
      class="btn-csh"
      style="bottom: 170rpx; right: 50rpx; z-index: 101"
      @click="callPhone"
    >
      <image
        src="../../static/maintenance/csh.png"
        style="width: 70rpx; height: 70rpx"
      ></image>
    </view>

    <view class="btn-bottom" style="z-index: 9999">
      <view class="round-left" style="position: sticky; bottom: 0">
        <view
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
          @tap="
            () => {
              if (selectedCount != 0) showDetail = !showDetail;
            }
          "
        >
          <view style="position: relative; z-index: 100">
            <view
              v-if="selectedCount"
              class="cu-tag badge"
              style="font-size: 20rpx; z-index: 999"
            >
              {{ selectedCount }}</view
            >
            <image style="width: 40px; height: 40px" :src="imageIcon"></image>
          </view>
          <view style="flex-direction: column; align-items: center; width: 70%">
            <view style="color: #ffffff">
              预估费用： {{ totalSalePrice.toFixed(2) }}
              <text
                style="
                  margin-left: 10rpx;
                  text-decoration: line-through;
                  color: #767676;
                  font-size: 12px;
                "
                >{{ totalPrice }}</text
              >
            </view>
            <view style="color: #04d4c6"> 免费预约 修好付款 </view>
          </view>
        </view>
      </view>

      <view
        class="round-right center-button"
        :style="
          selectedCount == 0
            ? 'background-color:#C6C6C6 !important'
            : 'background-color:#04D4C6 !important'
        "
      >
        <button
          class="cu-btn block lg submit-button"
          @click="navigateOrderSuccess"
          :style="
            selectedCount == 0
              ? 'background-color:#C6C6C6 !important'
              : 'background-color:#04D4C6 !important'
          "
        >
          <text>{{ selectedCount == 0 ? "未选方案" : "预约下单" }}</text>
        </button>
      </view>
    </view>
    <!-- 购物详情底部 -->
    <view class="cu-modal bottom-modal" :class="showDetail ? 'show' : ''">
      <view class="cu-dialog">
        <view style="height: 700rpx; opacity: 0" @click="showDetail = false">
        </view>
        <view
          class="cu-bar bg-white"
          style="
            border-radius: 30rpx 30rpx 0rpx 0rpx;
            border-bottom: 2rpx solid #ededed;
          "
        >
          <view class="action text-black" style="font-weight: bold"
            >已选方案</view
          >
        </view>
        <!-- <view style="height: 1rpx; background-color: #ededed"></view> -->
        <view class="padding-xl bg-white" style="margin-top: -60rpx">
          <view v-for="item in selectedList" :key="item.id">
            <view
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 60rpx;
              "
            >
              <view style="color: #333333; font-weight: bold">
                {{ item.title || item.subTitle }}
              </view>
              <view style="display: flex">
                <view
                  class="text-price"
                  style="font-size: 30rpx; color: #136169"
                >
                  <text>{{ item.salePrice }}</text>
                </view>
                <button
                  class="cu-btn cuIcon icon-move"
                  style="
                    font-weight: 900;
                    height: 40rpx;
                    width: 40rpx;
                    margin-left: 40rpx;
                  "
                  @click="addShopping(index, false, item.id)"
                >
                  <text class="cuIcon-move"></text>
                </button>
              </view>
            </view>
          </view>
          <view style="height: 150rpx"></view>
        </view>
      </view>
    </view>

    <!-- <view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 底部窗口
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="bottomModal">Bottom</button>
			</view>
		</view> -->
  </view>
</template>

<script>
import { mapState } from "vuex"; //引入mapState
import { deepClone } from "../../utils/debounce";
export default {
  data() {
    return {
      isCallFresh: false,
      list: [],
      imageIcon: require("@/static/images/shopcart.png"),
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      loaded: false,
      phone: {
        title: "苹果",
        name: "iphone12ProMax",
        id: "",
      },
      goodsList: [],
      currentGoodId: "",
      forkMaintenance: [],
      showNull: true,
      showDetail: false,
      // 倒排索引数据
      goodsMapIndex: {},
    };
  },
  onLoad(option) {
    // 获取维修参数
    // alert(option)
    if (Object.keys(option).length > 0) {
      const navigateParams = JSON.parse(decodeURIComponent(option.phone));
      navigateParams["title"] = option.title || option.name;
      this.phone = navigateParams;
      this.getMaintanceList(this.phone.id);
    }
  },
  onShow() {
    // 获取跳转接口带来的id
    const maintenance = uni.getStorageSync("maintenance");
    if (maintenance && maintenance !== "") {
      let navigateParams = JSON.parse(maintenance);
      if (navigateParams.gotoValue.indexOf(",") != -1) {
        this.phone.id = navigateParams.gotoValue.split(",")[1];
        this.tabCur = navigateParams.gotoValue.split(",")[2] || undefined;
        // alert(this.option.id)
        // alert(this.tabCur)
        this.getMaintanceList(this.phone.id);
        this.getGoods(this.tabCur);
      }
    } else {
      let back = uni.getStorageSync("back");
      if (!back) {
        this.initLitsCount();
      }
      if (!this.isCallFresh && (back == undefined || !back)) {
        console.log("excute1:");
        this.initLitsCount();
      }
      if (selectedCount == 0) {
        this.initLitsCount();
      }
    }
  },
  onReady() {
    uni.hideLoading();
  },
  computed: mapState({
    // 从state中拿到数据
    maintenanceList: (state) => state.goods.maintenanceList,
    gmPhone: (state) => state.user.gmPhone,
    selectedList() {
      return this.maintenanceList.filter((item) => item.selected === true);
    },
    selectedCount() {
      return this.maintenanceList.filter((item) => item.selected === true)
        .length;
    },
    totalPrice() {
      let list = this.maintenanceList.filter((item) => item.selected === true);
      let total = 0;
      for (let item in list) {
        total += list[item].price;
      }
      return total;
    },
    totalSalePrice() {
      let list = this.maintenanceList.filter((item) => item.selected === true);
      let totalSale = 0;
      for (let item in list) {
        totalSale += list[item].salePrice;
      }
      return totalSale;
    },
  }),
  methods: {
    initLitsCount() {
      //重置菜单状态和购物车
      this.getGoods(this.list[0].id);
      // 更新购物车状态
      let resultArray = deepClone(this.list);
      this.list = resultArray.map((item) => {
        return {
          ...item,
          count: 0,
        };
      });
      this.forkMaintenance = [];
      this.isCallFresh = false;
      uni.setStorageSync("back", true);
    },
    getMaintanceList(id) {
      uni.showLoading({
        title: "加载中...",
        mask: true,
      });
      this.$request({
        url: "/phoneReparisServer/service/rest/login.customerService/collection/getCategoryTwo",
        methods: "POST",
        data: {
          categoryId: id,
        },
      })
        .then((res) => {
          console.log(res);
          this.list = res;
          this.phone.groupCnName = this.list[0].parentGroupCnName;
          this.phone.name = this.list[0].parentName;
          // 获取第一个四级信息
          // if(this.list >)
          if (!this.tabCur) this.tabCur = this.list[0].id;
          this.getGoods(this.tabCur);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    callPhone() {
      console.log("callPhone");
      this.isCallFresh = true;
      uni.makePhoneCall({
        phoneNumber: this.gmPhone,
      });
    },
    backPhoneModel() {
      // 清空购物车
      this.$store.dispatch("shoppingTrigger", {
        key: "maintenanceList",
        value: [],
      });
      uni.switchTab({
        url: "../phoneModel/phoneModel",
      });
    },
    navigateOrderSuccess() {
      // 判断本地购物车是否有数据 有数据则跳转
      let selectedFlag = false;
      for (let good of this.maintenanceList) {
        if (good.selected) selectedFlag = true;
      }

      if (selectedFlag) {
        // 获取选择本地商品
        let list = this.maintenanceList.filter(
          (item) => item.selected === true
        );
        // 获取所有商品
        let goodsIds = [];
        let goodsCount = [];
        if (list.length > 0) {
          list.forEach((element) => {
            goodsIds.push(element.id);
            goodsCount.push(1);
          });
        }
        // alert(JSON.stringify(list));
        // 上传购物车
        this.$request({
          url: "/phoneReparisServer/service/rest/login.shoppingCart/collection/addShopCartByGoodsIds",
          methods: "POST",
          data: {
            goodsId: goodsIds.join(","),
            count: goodsCount.join(","),
          },
        })
          .then((res) => {
            console.log("addShopCartByGoodsIds" + JSON.stringify(res));
            uni.setStorageSync("maintenance", undefined);
            uni.navigateTo({
              url: "../reserve/reserve",
            });
            // this.orderDetail = res
          })
          .catch((e) => {
            console.log(e);
          });
      } else
        uni.showModal({
          content: "目前没有选择方案,请选择再下单～",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定');
            } else if (res.cancel) {
              // console.log('用户点击取消');
            }
          },
        });
    },

    addShopping(index, status, goodsId = undefined) {
      // deepcopy
      let coptList = [];
      let indexGoods = this.tabCur;

      if (goodsId) {
        // 更新购物车状态
        let resultArray = deepClone(this.maintenanceList);
        resultArray = resultArray.map((item) => {
          return {
            ...item,
            selected: item.id == goodsId ? status : item.selected,
          };
        });
        this.$store.dispatch("shoppingTrigger", {
          key: "maintenanceList",
          value: resultArray,
        });
      }

      for (const key in this.forkMaintenance) {
        if (!goodsId) {
          coptList.push({
            ...this.forkMaintenance[key],
            selected:
              key == index ? status : this.forkMaintenance[key].selected,
          });
        } else {
          coptList.push({
            ...this.forkMaintenance[key],
            selected:
              this.forkMaintenance[key].id == goodsId
                ? status
                : this.forkMaintenance[key].selected,
          });
        }
        this.goodsMapIndex[this.forkMaintenance[key].id] = this.tabCur;

        // alert(JSON.stringify(this.goodsMapIndex));
        if (goodsId) {
          indexGoods = this.goodsMapIndex[goodsId];
        }
        // 增加并更新数据
        const copyList = deepClone(this.list);
        for (const listIndex in copyList) {
          if (copyList[listIndex].id == indexGoods) {
            copyList[listIndex].count
              ? (copyList[listIndex].count += status ? 1 : -1)
              : (copyList[listIndex].count = status ? 1 : 0);
          }
        }
        this.$nextTick(() => {
          this.list = copyList;
        });
      }

      // 判断是否重复 重复的话则删除 下一步再添加
      this.forkMaintenance = this.judgeRepeat(
        this.maintenanceList,
        coptList,
        true
      );
    },
    TabSelect(e) {
      this.tabCur = e.currentTarget.dataset.item.id;
      this.mainCur = e.currentTarget.dataset.item.id;
      this.verticalNavTop = (e.currentTarget.dataset.item.index - 1) * 50;
      this.currentGoodId = e.currentTarget.dataset.item.id;
      this.getGoods(this.currentGoodId);
    },
    judgeRepeat(Old, New, isCover = true) {
      let resuleArray = JSON.parse(JSON.stringify(Old));
      let showForkData = JSON.parse(JSON.stringify(New));
      // 如果Old不存在则覆盖并返回
      console.log("全局状态是否为0", resuleArray.length === 0);
      if (resuleArray.length === 0) {
        resuleArray = Array.isArray(showForkData)
          ? resuleArray.concat(showForkData)
          : [showForkData];
        console.log("全局更新后的值", resuleArray);
        this.$store.dispatch("shoppingTrigger", {
          key: "maintenanceList",
          value: resuleArray,
        });
        return resuleArray;
      }
      console.log("showForkDatashowForkData", Array.isArray(showForkData));
      if (Array.isArray(showForkData)) {
        // 首先判断如果全局里面没有当前goods则增加 合并两个对象数组并去重
        let midArray = [...resuleArray, ...showForkData];
        //根据id去重
        let map = new Map();
        for (let item of midArray) {
          if (!map.has(item.id)) {
            map.set(item.id, item);
          }
        }
        resuleArray = [...map.values()];
        for (let oValueIndex in resuleArray) {
          for (let nValueIndex in showForkData) {
            if (resuleArray[oValueIndex].id === showForkData[nValueIndex].id) {
              if (isCover) {
                console.log("覆盖原始数据");
                // 删除旧数据
                resuleArray.splice(oValueIndex, 1);
                // 增加增加新数据
                resuleArray.push(showForkData[nValueIndex]);
                console.log("覆盖原始数据value", resuleArray);
              } else {
                console.log("取值判断");
                //不覆盖的话则取出本地购物车的商品状态
                // console.log('更新前对比',showForkData[nValueIndex])
                if (
                  showForkData[nValueIndex].selected !==
                  resuleArray[oValueIndex].selected
                ) {
                  console.log("不相等则替换数据");
                  showForkData[nValueIndex] = resuleArray[oValueIndex];
                }
              }
            }
          }
        }
      } else {
        for (let index in resuleArray) {
          if (resuleArray[index].id === showForkData.id) {
            if (isCover) {
              // 删除旧数据
              resuleArray.splice(index, 1);
              // 增加增加新数据
              resuleArray.push(showForkData);
            } else {
              //不覆盖的话则取出本地购物车的商品状态
              showForkData = resuleArray[index];
            }
          }
        }
      }
      // 同步本地购物车
      this.$store.dispatch("shoppingTrigger", {
        key: "maintenanceList",
        value: resuleArray,
      });
      return Array.isArray(showForkData) ? showForkData : [showForkData];
    },
    getGoods(id) {
      uni.showLoading({
        title: "加载中",
      });
      this.goodsList = [];
      this.$request({
        url: "/phoneReparisServer/service/rest/login.customerService/collection/getAllServiceGoods",
        methods: "POST",
        data: {
          page: 1,
          rows: 20,
          categoryId: id,
        },
      }).then((res) => {
        uni.hideLoading();
        // mockshuju
        if (res.length === 0) {
          this.showNull = true;
          return;
        }
        this.showNull = false;
        this.goodsList = res;
        if (this.goodsList.length > 0)
          this.goodsList = this.goodsList.map((element) => {
            return {
              ...element,
              selected: false,
            };
          });
        this.forkMaintenance = this.judgeRepeat(
          this.maintenanceList,
          this.goodsList,
          false
        );
        // 如果购物车里面本地存在数据则拿购物车的数据 不更新数据
        const selectGood = uni.getStorageSync("selectGood");
        let index = undefined;
        // 如果存在商品则循环
        if (selectGood)
          for (let key in this.forkMaintenance) {
            if (this.forkMaintenance[key].id == selectGood) {
              index = key;
            }
          }
        setTimeout(() => {
          if (index != undefined) {
            this.addShopping(index, true);
            this.showDetail = true;
          }
          uni.setStorageSync("selectGood", undefined);
        });
      });
    },
  },
};
</script>


<style>
.container {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
}

.VerticalNav.nav {
  width: 35%;
  white-space: initial;
}

.VerticalNav.nav .nav-item {
  position: relative;
  width: 100%;
  text-align: center;
  background-color: #d9d9d9;
  color: #a6a6a6;
  border: none;
  height: 60rpx;
  /* position: relative; */
}

.VerticalNav.nav .nav-item.cur {
  background-color: #04d4c6;
  color: #ffffff;
}

.VerticalNav {
  background-color: #fafafa;
  border-radius: 8px;
  text-align: center;
}

.VerticalNav.nav .nav-item.cur::after {
  /* content: ""; */
  width: 8upx;
  height: 50rpx;
  /* border-radius: 10upx 0 0 10upx; */
  /* position: absolute; */
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  margin: auto;
}

.nav-item {
  border-radius: 8px;
  width: 80% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  line-height: 50rpx;
}

.category-one {
  font-size: 1.2rem;
}

.category-two {
  font-size: 0.9rem;
}

.text-title {
  font-size: 36rpx;
}

.category-three {
}

.change-phone {
  color: #04d4c6;
  text-decoration-line: underline;
}

.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
}

.round-card {
  border-radius: 8px;
}

.flex-container {
  width: 100%;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
}

.flex-vertical {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.text-left {
  height: 13%;
}

.center-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-add {
  background-color: #04d4c6 !important;
}

.cuIcon-add,
.cuIcon-move {
  color: #ffffff;
}

.icon-move {
  background-color: #dd1717 !important;
}

.text-gray {
  color: #a6a6a6;
}

.text-price {
  font-size: 40rpx;
  font-weight: 500;
}

.btn-csh {
  position: fixed;
  bottom: 170rpx;
  display: flex;
}

.btn-bottom {
  position: fixed;
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  bottom: 50rpx;
  text-align: center;
  display: flex;
}

.submit-button {
  color: #ffffff;
  margin-top: 1px;
  margin-right: 12px;
}

.round-left {
  width: 60%;
  height: 46px;
  border-top-left-radius: 23px;
  border-bottom-left-radius: 23px;
  background-color: #002b38;
  text-align: left;
}

.round-right {
  width: 40%;
  height: 46px;
  background-color: #04d4c6;
  border-top-right-radius: 23px;
  border-bottom-right-radius: 23px;
}
</style>
