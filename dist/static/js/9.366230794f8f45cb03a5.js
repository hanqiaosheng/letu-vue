webpackJsonp([9],{189:function(t,i,e){e(232);var n=e(4)(e(208),e(259),"data-v-18967b1c",null);t.exports=n.exports},208:function(t,i,e){"use strict";function n(t){if(t&&t.__esModule)return t;var i={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(i[e]=t[e]);return i.default=t,i}function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0});var a=e(42),r=o(a),c=e(23),s=o(c),A=e(10),l=(n(A),e(7)),d=n(l),C=e(11);i.default={data:function(){return{scrollY:2,activeCH:"A",activeCHshow:!1,selectCityHistory:[],selectCitys:[{initial:"B",data:[{city:"保定",lng:"115.48",lat:"38.85",cityCode:"0312"}]},{initial:"H",data:[{city:"杭州",lng:"120.19",lat:"30.26",cityCode:"0571"},{city:"湖州",lng:"120.1",lat:"30.86",cityCode:"0572"},{city:"黄山",lng:"118.33",lat:"29.71",cityCode:"0559"}]},{initial:"J",data:[{city:"嘉兴",lng:"120.76",lat:"30.77",cityCode:"0573"}]},{initial:"L",data:[{city:"丽水",lng:"119.92",lat:"28.45",cityCode:"0578"}]},{initial:"N",data:[{city:"宁波",lng:"120.56",lat:"28.01",cityCode:"0574"}]},{initial:"Q",data:[{city:"衢州",lng:"118.88",lat:"28.97",cityCode:"0570"}]},{initial:"S",data:[{city:"绍兴",lng:"120.58",lat:"30.01",cityCode:"0575"},{city:"上饶",lng:"117.97",lat:"28.47",cityCode:"0793"}]},{initial:"T",data:[{city:"台州",lng:"120.03",lat:"29.15",cityCode:"0576"}]},{initial:"W",data:[{city:"温州",lng:"120.65",lat:"28.01",cityCode:"0577"}]},{initial:"X",data:[{city:"上饶",lng:"117.97",lat:"28.47",cityCode:"0793"}]},{initial:"Y",data:[{city:"烟台",lng:"121.24",lat:"37.32",cityCode:"0535"}]}]}},mounted:function(){var t=this,i=self.setInterval("clock()",50);window.clock=function(){if(void 0===t.$refs.my_scroller_local)return void clearInterval(i);t.scrollY=t.$refs.my_scroller_local.getPosition().top},this.activeCH=this.selectCitys[0].initial,this.getSelectCityHistory()},components:{},computed:(0,s.default)({},(0,C.mapState)(["activeLocation","locationCity","locationCitycode"])),methods:(0,s.default)({},(0,C.mapMutations)(["SET_LOCATION"]),{setcity:function(t){var i={};if(this.selectCitys.forEach(function(e){e.data.forEach(function(e){t==e.cityCode&&(i=e)})}),0==(0,r.default)(i).length)return void d.toast(city+"暂未开通");this.SET_LOCATION({city:i.city,lng:i.lng,lat:i.lat,citycode:i.cityCode}),this.setSelectCityHistory(i.cityCode+"-"+i.city),window.history.go(-1)},setSelectCityHistory:function(t){if(""!=t){var i=d.getStore("selectCityHistory")||"",e=i.split(",");e.forEach(function(i){e.remove(t)}),10==e.length&&e.pop(),i=""==i||0==e.length?t:t+","+e.join(","),d.setStore("selectCityHistory",i)}},getSelectCityHistory:function(){var t=d.getStore("selectCityHistory");this.selectCityHistory=t?t.split(","):[]},delectSelectCityHistory:function(){d.removeStore("selectCityHistory"),this.getSelectCityHistory()},startThing:function(t){var i=this,e=this;this.$nextTick(function(){for(var n=i.$refs.my_scroller_local.$el.getElementsByClassName("tit"),o=0;o<n.length;o++)n[o].innerText==t&&(e.activeCH=t,navigator.vibrate&&navigator.vibrate(30),e.$refs.my_scroller_local.scrollTo(0,n[o].offsetTop))})},touchMove:function(t){this.activeCHshow=!0;for(var i=this,e=this.$refs.guide_CH.getElementsByTagName("dd"),n=0;n<e.length;n++){if(t.targetTouches[0].pageY>=e[e.length-1].offsetTop)return void i.startThing(e[e.length-1].innerText);if(e[n].offsetTop<=t.targetTouches[0].pageY&&t.targetTouches[0].pageY<e[n+1].offsetTop)return void i.startThing(e[n].innerText)}},touchEnd:function(){var t=this;setTimeout(function(){t.activeCHshow=!1},400)}}),watch:{scrollY:function(t){for(var i=this,e=this.$refs.my_scroller_local.$el.getElementsByClassName("tit"),n=0;n<e.length;n++){if(t>=e[e.length-1].offsetTop)return void(i.activeCH=e[e.length-1].innerText);if(e[n].offsetTop<=t&&t<e[n+1].offsetTop)return void(i.activeCH=e[n].innerText)}}}}},214:function(t,i,e){i=t.exports=e(174)(!0),i.push([t.i,'.tit[data-v-18967b1c]{margin:.05rem .2rem;text-transform:Uppercase;font-size:.3rem;color:#8e8e93}.g-items[data-v-18967b1c]{margin-bottom:0}.g-items .g-item .img[data-v-18967b1c]{margin-right:.27rem;width:.73rem;height:.73rem;overflow:hidden;background-color:#f6f6f6}.g-items .g-item .img img[data-v-18967b1c]{width:100%}.g-items .g-item .con[data-v-18967b1c]{font-size:.29rem}.g-items .g-item .info[data-v-18967b1c]{font-size:.29rem;color:#c21515;margin-left:.2rem}.guide-wipe[data-v-18967b1c]{position:fixed;width:.8rem;height:100%;top:0;right:0;z-index:99999}.guide-wipe .list-guide dd[data-v-18967b1c]{font-size:.26rem;color:#555;width:.8rem;text-align:center;padding-bottom:.05rem;font-family:Arial,Hiragino Sans GB,Microsoft Yahei,Helvetica Neue,Helvetica,sans-serif!important;position:relative}.guide-wipe .list-guide dd.active[data-v-18967b1c]{color:#fff}.guide-wipe .list-guide dd.active[data-v-18967b1c]:after{content:"";width:.32rem;height:.32rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-1;border-radius:50%;margin-top:-.04rem;background-color:#0bb20c}.guide-wipe .list-guide dd .tag[data-v-18967b1c]{position:absolute;background-color:#c9c9c9;width:.8rem;height:.8rem;line-height:.8rem;font-size:.4rem;color:#fff;font-family:Arial,Hiragino Sans GB,Microsoft Yahei,Helvetica Neue,Helvetica,sans-serif!important;left:-1.4rem;top:-.26rem;border-radius:50%}.guide-wipe .list-guide dd .tag[data-v-18967b1c]:before{position:absolute;content:"\\A0";display:inline-block;width:0;height:0;border-width:.33rem 0 .33rem .38rem;border-style:solid;border-color:transparent transparent transparent #c9c9c9;right:-.2rem;top:50%;margin-top:-.324rem}.citybox[data-v-18967b1c]{padding:.26rem;background-color:#fff}.citybox .subtit[data-v-18967b1c]{font-size:.26rem;color:#4b4b4b;margin-bottom:.13rem}.citybox .subtit.subtit2[data-v-18967b1c]{margin-top:.15rem}.citybox .subtit.subtit2 .con[data-v-18967b1c]{font-size:.26rem;color:#4b4b4b;flex:1}.citybox .subtit.subtit2 i[data-v-18967b1c]{font-size:.35rem;color:#4b4b4b;margin-right:.7rem}.citybox .list .btns[data-v-18967b1c]{margin-bottom:.1rem}',"",{version:3,sources:["C:/Users/Administrator/Desktop/letu-web/src/page/selectCity.vue"],names:[],mappings:"AACA,sBACE,oBAAqB,AACrB,yBAA0B,AAC1B,gBAAkB,AAClB,aAAe,CAChB,AACD,0BACE,eAAiB,CAClB,AACD,uCACI,oBAAqB,AACrB,aAAc,AACd,cAAe,AACf,gBAAiB,AACjB,wBAA0B,CAC7B,AACD,2CACM,UAAY,CACjB,AACD,uCACI,gBAAkB,CACrB,AACD,wCACI,iBAAmB,AACnB,cAAe,AACf,iBAAmB,CACtB,AACD,6BACE,eAAgB,AAChB,YAAa,AACb,YAAa,AACb,MAAO,AACP,QAAS,AACT,aAAe,CAChB,AACD,4CACI,iBAAmB,AACnB,WAAe,AACf,YAAa,AACb,kBAAmB,AACnB,sBAAuB,AACvB,iGAAwG,AACxG,iBAAmB,CACtB,AACD,mDACM,UAAY,CACjB,AACD,yDAEQ,WAAY,AACZ,aAAc,AACd,cAAe,AACf,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,+BAAiC,AACjC,WAAY,AACZ,kBAAmB,AACnB,mBAAoB,AACpB,wBAA0B,CACjC,AACD,iDACM,kBAAmB,AACnB,yBAA0B,AAC1B,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,gBAAkB,AAClB,WAAY,AACZ,iGAAwG,AACxG,aAAc,AACd,YAAa,AACb,iBAAmB,CACxB,AACD,wDACQ,kBAAmB,AACnB,cAAiB,AACjB,qBAAsB,AACtB,QAAS,AACT,SAAU,AACV,oCAAqC,AACrC,mBAAoB,AACpB,yDAA0D,AAC1D,aAAc,AACd,QAAS,AACT,mBAAqB,CAC5B,AACD,0BACE,eAAgB,AAChB,qBAAuB,CACxB,AACD,kCACI,iBAAmB,AACnB,cAAe,AACf,oBAAsB,CACzB,AACD,0CACM,iBAAmB,CACxB,AACD,+CACQ,iBAAmB,AACnB,cAAe,AACf,MAAQ,CACf,AACD,4CACQ,iBAAmB,AACnB,cAAe,AACf,kBAAoB,CAC3B,AACD,sCACI,mBAAqB,CACxB",file:"selectCity.vue",sourcesContent:["\n.tit[data-v-18967b1c] {\n  margin: .05rem .2rem;\n  text-transform: Uppercase;\n  font-size: 0.3rem;\n  color: #8e8e93;\n}\n.g-items[data-v-18967b1c] {\n  margin-bottom: 0;\n}\n.g-items .g-item .img[data-v-18967b1c] {\n    margin-right: .27rem;\n    width: .73rem;\n    height: .73rem;\n    overflow: hidden;\n    background-color: #f6f6f6;\n}\n.g-items .g-item .img img[data-v-18967b1c] {\n      width: 100%;\n}\n.g-items .g-item .con[data-v-18967b1c] {\n    font-size: .29rem;\n}\n.g-items .g-item .info[data-v-18967b1c] {\n    font-size: 0.29rem;\n    color: #c21515;\n    margin-left: .2rem;\n}\n.guide-wipe[data-v-18967b1c] {\n  position: fixed;\n  width: .8rem;\n  height: 100%;\n  top: 0;\n  right: 0;\n  z-index: 99999;\n}\n.guide-wipe .list-guide dd[data-v-18967b1c] {\n    font-size: 0.26rem;\n    color: #555555;\n    width: .8rem;\n    text-align: center;\n    padding-bottom: .05rem;\n    font-family: Arial, Hiragino Sans GB, Microsoft Yahei, Helvetica Neue, Helvetica, sans-serif !important;\n    position: relative;\n}\n.guide-wipe .list-guide dd.active[data-v-18967b1c] {\n      color: #fff;\n}\n.guide-wipe .list-guide dd.active[data-v-18967b1c]:after {\n        position: absolute;\n        content: '';\n        width: .32rem;\n        height: .32rem;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        z-index: -1;\n        border-radius: 50%;\n        margin-top: -.04rem;\n        background-color: #0bb20c;\n}\n.guide-wipe .list-guide dd .tag[data-v-18967b1c] {\n      position: absolute;\n      background-color: #c9c9c9;\n      width: .8rem;\n      height: .8rem;\n      line-height: .8rem;\n      font-size: 0.4rem;\n      color: #fff;\n      font-family: Arial, Hiragino Sans GB, Microsoft Yahei, Helvetica Neue, Helvetica, sans-serif !important;\n      left: -1.4rem;\n      top: -.26rem;\n      border-radius: 50%;\n}\n.guide-wipe .list-guide dd .tag[data-v-18967b1c]:before {\n        position: absolute;\n        content: \"\\00a0\";\n        display: inline-block;\n        width: 0;\n        height: 0;\n        border-width: .33rem 0 .33rem .38rem;\n        border-style: solid;\n        border-color: transparent transparent transparent #c9c9c9;\n        right: -.2rem;\n        top: 50%;\n        margin-top: -.324rem;\n}\n.citybox[data-v-18967b1c] {\n  padding: .26rem;\n  background-color: #fff;\n}\n.citybox .subtit[data-v-18967b1c] {\n    font-size: 0.26rem;\n    color: #4b4b4b;\n    margin-bottom: .13rem;\n}\n.citybox .subtit.subtit2[data-v-18967b1c] {\n      margin-top: .15rem;\n}\n.citybox .subtit.subtit2 .con[data-v-18967b1c] {\n        font-size: 0.26rem;\n        color: #4b4b4b;\n        flex: 1;\n}\n.citybox .subtit.subtit2 i[data-v-18967b1c] {\n        font-size: 0.35rem;\n        color: #4b4b4b;\n        margin-right: .7rem;\n}\n.citybox .list .btns[data-v-18967b1c] {\n    margin-bottom: .1rem;\n}\n"],sourceRoot:""}])},232:function(t,i,e){var n=e(214);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e(175)("7fa7925c",n,!0)},259:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"warp page1 page-all"},[e("v-header",{attrs:{goBack:!0,headTitle:"城市选择"}}),t._v(" "),e("div",{staticClass:"main-box main-box3 scroll"},[e("scroller",{ref:"my_scroller_local"},[e("div",{staticClass:"citybox"},[e("div",{staticClass:"subtit"},[t._v("当前定位城市")]),t._v(" "),e("div",{staticClass:"list"},[e("div",{staticClass:"btns btns-primary",on:{click:function(i){t.setcity(t.locationCitycode)}}},[t._v(t._s(t.locationCity))])]),t._v(" "),t.selectCityHistory.length?e("div",{staticClass:"subtit subtit2 flex-box"},[e("div",{staticClass:"con"},[t._v("历史选择")]),e("i",{staticClass:"iconfont icon-shanchu",on:{click:function(i){t.delectSelectCityHistory()}}})]):t._e(),t._v(" "),e("div",{staticClass:"list"},t._l(t.selectCityHistory,function(i){return e("div",{staticClass:"btns btns-default",on:{click:function(e){t.setcity(i.split("-")[0])}}},[t._v(t._s(i.split("-")[1]))])}))]),t._v(" "),t._l(t.selectCitys,function(i){return e("div",{staticClass:"cityitem"},[e("div",{staticClass:"tit"},[t._v(t._s(i.initial))]),t._v(" "),e("div",{staticClass:"g-items"},t._l(i.data,function(i){return e("div",{staticClass:"g-item flex-box",on:{click:function(e){t.setcity(i.cityCode)}}},[e("div",{staticClass:"con"},[t._v("\n              "+t._s(i.city)+"\n            ")])])}))])})],2),t._v(" "),e("section",{staticClass:"guide-wipe flex-box"},[e("section",{ref:"guide_CH",staticClass:"list-guide",on:{touchstart:function(i){t.touchMove(i)},touchmove:function(i){t.touchMove(i)},touchend:function(i){t.touchEnd()}}},[e("dl",t._l(t.selectCitys,function(i){return e("dd",{class:{active:t.activeCH==i.initial}},[t._v(t._s(i.initial)),e("transition",{attrs:{name:"showcover"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.activeCHshow&&t.activeCH==i.initial,expression:"activeCHshow&&activeCH==item.initial"}],staticClass:"tag"},[t._v(t._s(i.initial))])])],1)}))])])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=9.366230794f8f45cb03a5.js.map