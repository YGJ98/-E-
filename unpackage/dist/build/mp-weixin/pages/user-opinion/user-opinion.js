(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user-opinion/user-opinion"],{"05c8":function(t,n,e){"use strict";var a=e("affb"),u=e.n(a);u.a},4820:function(t,n,e){"use strict";e.r(n);var a=e("8a50"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a},"4a3b":function(t,n,e){"use strict";e.r(n);var a=e("9776"),u=e("4820");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("05c8");var c,r=e("f0c5"),o=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=o.exports},"8a50":function(t,n,e){"use strict";(function(t,a){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=i(e("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function c(t,n,e,a,u,i,c){try{var r=t[i](c),o=r.value}catch(s){return void e(s)}r.done?n(o):Promise.resolve(o).then(a,u)}function r(t){return function(){var n=this,e=arguments;return new Promise((function(a,u){var i=t.apply(n,e);function r(t){c(i,a,u,r,o,"next",t)}function o(t){c(i,a,u,r,o,"throw",t)}r(void 0)}))}}var o={data:function(){return{imgList:[],content:""}},methods:{add:function(){var n=this,e=3-this.imgList.length;t.chooseImage({count:e,success:function(t){var a=t.tempFilePaths;a.forEach((function(t,a){a<e&&n.imgList.push({url:t})}))}})},del:function(t){this.imgList.splice(t,1)},submit:function(){var n=this;return r(u.default.mark((function e(){var a,i,c;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=[],t.showLoading(),i=0;case 3:if(!(i<n.imgList.length)){e.next=12;break}return c=n.imgList[i].url,e.next=7,n.uploadFiles(c);case 7:c=e.sent,imageList.push(c);case 9:i++,e.next=3;break;case 12:n.feedback({content:n.content,feedbackImages:a});case 13:case"end":return e.stop()}}),e)})))()},uploadFiles:function(t){return r(u.default.mark((function n(){var e;return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,a.uploadFile({filePath:t});case 2:return e=n.sent,n.abrupt("return",e.fileID);case 4:case"end":return n.stop()}}),n)})))()},feedback:function(n){var e=n.content,a=n.feedbackImages;this.$api.feedback({content:e,feedbackImages:a}).then((function(n){t.hideLoading(),t.showToast({title:"反馈提交成功",icon:"none"}),setTimeout((function(){t.switchTab({url:"/pages/my/my"})}),2e3)})).catch((function(n){t.hideLoading(),t.showToast({title:"反馈提交失败",icon:"none"})}))}}};n.default=o}).call(this,e("543d")["default"],e("a9ff")["default"])},9776:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},i=[]},affb:function(t,n,e){},ed628:function(t,n,e){"use strict";(function(t){e("9c5f");a(e("66fd"));var n=a(e("4a3b"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["ed628","common/runtime","common/vendor"]]]);