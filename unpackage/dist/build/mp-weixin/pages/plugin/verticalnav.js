(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/plugin/verticalnav"],{"183b":function(t,i,n){"use strict";n.r(i);var e=n("cbdf"),a=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(i,t,(function(){return e[t]}))}(r);i["default"]=a.a},"44d0":function(t,i,n){"use strict";var e=n("d9da"),a=n.n(e);a.a},"5d0b":function(t,i,n){"use strict";n.r(i);var e=n("621b"),a=n("183b");for(var r in a)"default"!==r&&function(t){n.d(i,t,(function(){return a[t]}))}(r);n("44d0");var o,u=n("f0c5"),c=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],o);i["default"]=c.exports},"621b":function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return r})),n.d(i,"a",(function(){return e}));var a=function(){var t=this,i=t.$createElement;t._self._c},r=[]},c3fc:function(t,i,n){"use strict";(function(t){n("629e");e(n("66fd"));var i=e(n("5d0b"));function e(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,n("543d")["createPage"])},cbdf:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{list:[],tabCur:0,mainCur:0,verticalNavTop:0,load:!0}},onLoad:function(){t.showLoading({title:"加载中...",mask:!0});for(var i=[{}],n=0;n<26;n++)i[n]={},i[n].name=String.fromCharCode(65+n),i[n].id=n;this.list=i,this.listCur=i[0]},onReady:function(){t.hideLoading()},methods:{TabSelect:function(t){this.tabCur=t.currentTarget.dataset.id,this.mainCur=t.currentTarget.dataset.id,this.verticalNavTop=50*(t.currentTarget.dataset.id-1)},VerticalMain:function(i){var n=this,e=0;if(this.load){for(var a=function(i){var a=t.createSelectorQuery().select("#main-"+n.list[i].id);a.fields({size:!0},(function(t){n.list[i].top=e,e+=t.height,n.list[i].bottom=e})).exec()},r=0;r<this.list.length;r++)a(r);this.load=!1}for(var o=i.detail.scrollTop+10,u=0;u<this.list.length;u++)if(o>this.list[u].top&&o<this.list[u].bottom)return this.verticalNavTop=50*(this.list[u].id-1),this.tabCur=this.list[u].id,console.log(o),!1}}};i.default=n}).call(this,n("543d")["default"])},d9da:function(t,i,n){}},[["c3fc","common/runtime","common/vendor"]]]);