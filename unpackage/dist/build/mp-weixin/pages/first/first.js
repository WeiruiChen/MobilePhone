(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/first/first","pages/navBar/navBar"],{"3fdb":function(e,t,n){"use strict";n.r(t);var r=n("7f93"),o=n("5621");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("6b71");var a,c=n("f0c5"),s=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=s.exports},5621:function(e,t,n){"use strict";n.r(t);var r=n("e188"),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},"5e1c":function(e,t,n){"use strict";(function(e){n("88ec");r(n("66fd"));var t=r(n("3fdb"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},6486:function(e,t,n){},"6b71":function(e,t,n){"use strict";var r=n("6486"),o=n.n(r);o.a},"7f93":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"88c2":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement,r=(e._self._c,e.isActive&&"first"==e.type?n("a558"):null),o=e.isActive&&"first"==e.type?null:n("5eeb"),i=e.isActive&&"phoneModel"==e.type?n("a44f"):null,a=e.isActive&&"phoneModel"==e.type?null:n("95a2"),c=e.isActive&&"mine"==e.type?n("d679"):null,s=e.isActive&&"mine"==e.type?null:n("d433");e.$mp.data=Object.assign({},{$root:{m0:r,m1:o,m2:i,m3:a,m4:c,m5:s}})},i=[]},d282:function(e,t,n){"use strict";n.r(t);var r=n("d972"),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},d972:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:["isActive","type"],methods:{onClickHandler:function(t,n){t||e.navigateTo({url:"../"+n+"/"+n})}}};t.default=n}).call(this,n("543d")["default"])},e188:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("26cb");n("f3c2");function o(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=i(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){s=!0,a=e},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw a}}}}function i(e,t){if(e){if("string"===typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var c={data:function(){return{gridCol:4,gridBorder:!1,preferentialList:[{cuIcon:n("6ad3"),name:"免费预约"},{cuIcon:n("bfba"),name:"上门取件"},{cuIcon:n("0a36"),name:"服务直播"},{cuIcon:n("f1ca"),name:"设备验收"},{cuIcon:n("098d"),name:"付款取件"}],dotStyle:!1,cardCur:0,cshPhone:"获取失败",swiperList:[],salesTimeList:[],serviceProfitList:[],cuIconList:[{}]}},computed:(0,r.mapState)({loginName:function(e){return e.user.loginName},cityId:function(e){return e.user.cityId},imageUrl:function(e){return e.user.imageBaseUrl}}),onLoad:function(){this.getUserData()},methods:{onClickHandler:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r={panelMy:"/pages/mine/mine",createOrder:"/pages/orderList/orderList",pageAddress:"/pages/allAddress/allAddress"},o={ClientPage:function(){e.navigateTo({url:r[t.gotoValue]})},Category:function(){n>3?e.navigateTo({url:"../maintenanceList/maintenanceList"}):e.navigateTo({url:"../phoneModel/phoneModel?category="+encodeURIComponent(JSON.stringify(t))})},Goods:function(){console.log(JSON.stringify(t)),e.navigateTo({url:"../reserve/reserve?goods="+encodeURIComponent(JSON.stringify(t))})}};o[t.gotoType]()},cardSwiper:function(e){this.cardCur=e.detail.current},getFastClick:function(){var e=this;this.$request({url:"/phoneReparisServer/service/rest/nologin.homeService/collection/getFastClick",methods:"POST",data:{}}).then((function(t){e.cuIconList=t,console.log("resres",t)})).catch((function(e){console.log("error",e)}))},getCSHText:function(){var e=this;this.$request({url:"/phoneReparisServer/service/rest/nologin.locationService/collection/getDeliveryAddressList",methods:"POST"}).then((function(t){e.cshPhone=t[0].phone,e.$store.dispatch("actionTrigger",{key:"gmPhone",value:e.cshPhone})})).catch((function(e){console.log("getDeliveryAddressList",e)}))},getHomeBannerData:function(){var e=this;this.$request({url:"/phoneReparisServer/service/rest/nologin.homeService/collection/getHomeBanner",methods:"POST",data:{rows:6,page:1}}).then((function(t){var n,r=o(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;"One"===i["typeSetting"]&&(e.swiperList=i.itemList),"Six"===i["typeSetting"]&&(e.salesTimeList=i.itemList),"Two"===i["typeSetting"]&&(e.serviceProfitList=i.itemList)}}catch(a){r.e(a)}finally{r.f()}})).catch((function(e){console.log("getHomeBanner",e)}))},getUserData:function(){var t=this;e.showLoading({title:"加载中"}),this.$request({url:"/phoneReparisServer/service/rest/nologin.customer.login/collection/login",methods:"POST",data:{openId:"opfA81LO4KG84eBUeulJ0WmvK198",loginType:"openId"}}).then((function(n){var r=n;t.$store.dispatch("actionTrigger",{key:"cityId",value:r["cityId"]||""}),t.$store.dispatch("actionTrigger",{key:"gender",value:r["gender"]||""}),t.$store.dispatch("actionTrigger",{key:"deviceId",value:r["deviceId"]||""}),t.$store.dispatch("actionTrigger",{key:"openId",value:r["openId"]||""}),t.$store.dispatch("actionTrigger",{key:"loginName",value:r["loginName"]||""}),t.$store.dispatch("actionTrigger",{key:"sessionID",value:r["sessionID"]||""}),t.getHomeBannerData(),t.getFastClick(),t.getCSHText(),e.hideLoading()})).catch((function(e){console.log("error",e)}))}}};t.default=c}).call(this,n("543d")["default"])},f3c2:function(e,t,n){"use strict";n.r(t);var r=n("88c2"),o=n("d282");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);var a,c=n("f0c5"),s=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);t["default"]=s.exports}},[["5e1c","common/runtime","common/vendor"]]]);