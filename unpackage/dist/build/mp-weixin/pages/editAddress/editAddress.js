(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/editAddress/editAddress"],{"2ce5":function(e,t,n){},"446e":function(e,t,n){"use strict";n.r(t);var s=n("abdf"),o=n("e887");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("c3b1");var a,i=n("f0c5"),d=Object(i["a"])(o["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],a);t["default"]=d.exports},abdf:function(e,t,n){"use strict";var s;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return s}));var o=function(){var e=this,t=e.$createElement;e._self._c},r=[]},b7aa:function(e,t,n){"use strict";(function(e){n("88ec");s(n("66fd"));var t=s(n("446e"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c3b1:function(e,t,n){"use strict";var s=n("2ce5"),o=n.n(s);o.a},e3a6:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{region:["广东省","广州市","海珠区"],address:{},isedit:!1,checkbox:{checked:!0,value:"1"},radio:"A"}},onLoad:function(e){if(Object.keys(e).length>0){var t=JSON.parse(decodeURIComponent(e.param));this.address=t,this.isedit=!0,console.log(t)}},methods:{RegionChange:function(e){this.region=e.detail.value},addNewAddress:function(){this.address.region=this.region,this.address.label="学校",this.address.isDefault=!1,console.log(JSON.stringify(this.address));var t="/phoneReparisServer/service/rest/login.customer.addressService/collection/addAddress";this.isedit&&(t="/phoneReparisServer/service/rest/login.customer.addressService/collection/setAddressById");var n=this;e.showModal({content:"确认提交地址",success:function(s){s.confirm?n.$request({url:t,methods:"POST",data:n.address}).then((function(t){console.log("addNewAddress:"+JSON.stringify(t)),e.navigateTo({url:"../allAddress/allAddress"}),e.showToast({title:"提交成功",icon:"none"})})).catch((function(t){console.log("addNewAddress",t),e.showToast({title:"提交失败",icon:"none"})})):s.cancel&&e.showToast({title:"取消提交",icon:"none"})}})}}};t.default=n}).call(this,n("543d")["default"])},e887:function(e,t,n){"use strict";n.r(t);var s=n("e3a6"),o=n.n(s);for(var r in s)"default"!==r&&function(e){n.d(t,e,(function(){return s[e]}))}(r);t["default"]=o.a}},[["b7aa","common/runtime","common/vendor"]]]);