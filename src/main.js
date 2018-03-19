// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'f08316066bbed1f168a371a9368ca524',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geolocation']
});



import './config/rem'
import * as mobile from './config/mUtils'
import store from './story/'
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import components from './components/'
import global from './config/vueglobal'
import * as getData from './service/getData'
import {path} from './config/env'
Vue.use(global);

store.state.platform = (mobile.getQueryString('platform') || '').slice(0,-1) //获取地址栏平台
mobile.setStore('platform',store.state.platform)

window.setCookie=(res) => { //安卓端设置COOKIE方法
  mobile.setCookie('token', res)
}

Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key])
})

router.beforeEach((to,from,next)=>{
  mobile.setMetaTitle(to.meta.title)

  const title = to.meta.title
  const href = window.location.href
  const norequiresAuth = to.meta.norequiresAuth ? 0 : 1
  store.state.title = title
  store.state.href = href
  store.state.norequiresAuth = norequiresAuth

  if(store.state.platform=='iOS' && !to.meta.nopush){//页面跳转里调用各平台push方法
    if(from.name==null ){
      next(true)
    }else{
      next(false)
      window.webkit.messageHandlers.push.postMessage({title:title,href:href,norequiresAuth:norequiresAuth});
    }
  }
  if(store.state.platform=='android' && !to.meta.nopush){
    if(from.name==null ){
      next(true)
    }else{
      window.android.push(title,href,norequiresAuth)
      next(false)

    }
  }

  if(store.state.platform=='h5' || to.meta.nopush || store.state.platform==''){
    if(!to.matched.some(record => record.meta.norequiresAuth)){
      getData.getUser().then(res => {
        if(null == res.data.user){
          mobile.toast('登录中...')
          //mobile.toast(path + '/index/goIndex.action?tourl=' + to.path)
          window.location.href = path + '/index/goIndex.action?tourl=' + to.path
        }else if(!res.data.user.userTel){
          window.location.href = path + '/html/regist.html'
        }else if(!res.data.user.userIdcard){
          window.location.href = path + '/html/realName.html'
        }else{
          next(true)
        }
      })
    }else{
      next(true)
    }

  }




})

Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
