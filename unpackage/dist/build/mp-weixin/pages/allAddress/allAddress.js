(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/allAddress/allAddress"],{"06d9":function(e,t,s){"use strict";s.r(t);var n=s("58ad"),o=s.n(n);for(var r in n)"default"!==r&&function(e){s.d(t,e,(function(){return n[e]}))}(r);t["default"]=o.a},1032:function(e,t,s){"use strict";var n;s.d(t,"b",(function(){return o})),s.d(t,"c",(function(){return r})),s.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"58ad":function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s={data:function(){return{addressList:[]}},onLoad:function(){this.getAddList()},methods:{getAddList:function(){var e=this;this.$request({url:"/phoneReparisServer/service/rest/login.customer.addressService/collection/getAddressList",methods:"GET"}).then((function(t){console.log("addressList:"+JSON.stringify(t)),e.addressList=t})).catch((function(e){console.log("addressList",e)}))},addAddress:function(){e.navigateTo({url:"../editAddress/editAddress"})},editAddress:function(t){console.log("item"+t),e.navigateTo({url:"../editAddress/editAddress?param="+encodeURIComponent(JSON.stringify(t))})},setDefaultAddress:function(t){t.isDefault=!0;var s=this;e.showModal({content:"确认设置默认",success:function(n){n.confirm?(s.$request({url:"/phoneReparisServer/service/rest/login.customer.addressService/collection/setAddressById",methods:"POST",data:t}).then((function(e){console.log("setDefaultAddress:"+JSON.stringify(e))})).catch((function(t){console.log("setDefaultAddress",t),e.showToast({title:"设置失败",icon:"none"})})),e.redirectTo({url:"../allAddress/allAddress"}),e.showToast({title:"设置成功",icon:"none"})):n.cancel&&e.showToast({title:"取消设置",icon:"none"})}})},deleteAddress:function(t){var s=this;e.showModal({content:"确认删除地址",success:function(n){n.confirm?(s.$request({url:"/phoneReparisServer/service/rest/login.customer.addressService/collection/delAddress",methods:"POST",data:{id:t.id}}).then((function(e){console.log("setDefaultAddress:"+JSON.stringify(e))})).catch((function(t){console.log("setDefaultAddress",t),e.showToast({title:"删除失败",icon:"none"})})),e.redirectTo({url:"../allAddress/allAddress"})):n.cancel&&e.showToast({title:"取消删除",icon:"none"})}})}}};t.default=s}).call(this,s("543d")["default"])},"735b":function(e,t,s){"use strict";s.r(t);var n=s("1032"),o=s("06d9");for(var r in o)"default"!==r&&function(e){s.d(t,e,(function(){return o[e]}))}(r);s("ff73");var d,i=s("f0c5"),c=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);t["default"]=c.exports},a79b:function(e,t,s){"use strict";(function(e){s("88ec");n(s("66fd"));var t=n(s("735b"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("543d")["createPage"])},b7bb:function(e,t,s){},ff73:function(e,t,s){"use strict";var n=s("b7bb"),o=s.n(n);o.a}},[["a79b","common/runtime","common/vendor"]]]);