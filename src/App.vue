<template>
  <div id="app" :class="$store.state.platform">
    <!--<transition name="router-fade" mode="out-in" v-if="!$route.meta.nokeepAlive">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </transition>
    <transition  name="router-fade" v-else>
        <router-view></router-view>
    </transition>-->
    <keep-alive v-if="!$route.meta.nokeepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>


    <!--<el-amap vid="amap" :zoom="16" :plugin="plugin" style="display: none" class="amap">-->

    <!-- </el-amap> -->
    <transition name="showalert">
      <v-alerttip v-if="showAlert"  @sureTip="$store.state.alertFn();$store.state.showAlert = false;">
        <div class="con" slot="info">
          <p class="tit">{{alertMessage}}</p>
        </div>
      </v-alerttip>
    </transition>

  </div>
</template>

<script>
  import * as mobile from './config/mUtils'
  import * as getData from './service/getData'
  import {mapState, mapMutations,mapActions} from 'vuex'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  import wx from 'weixin-js-sdk'
  export default {
    name: 'app',
    data(){
      let self = this;
      return{
        lng:'',
        lat:'',
        add:'',
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {

              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.$nextTick();

                }
              });


            }
          }
        }]
      }
    },
    mounted () {

      let self = this;
      let url = window.location.href
      getData.jsApi(url).then(res => {  //配置微信API
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, //// 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名，见附录1
          jsApiList: [
            'openLocation',
            'getLocation'
          ]
        });
      })


      window.getLocation=function(lng,lat){//供iOS,android调用
        self.lng = lng
        self.lat = lat
      }

      wx.ready(function() {//微信调用
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            self.lng = res.longitude; // 纬度，浮点数，范围为90 ~ -90
            self.lat = res.latitude; // 经度，浮点数，范围为180 ~ -180。
          },
          cancel: function (res) {
            mobile.toast('定位已取消！')
          },
          fail: function () {
            mobile.toast('定位失败！')
          }
        });
      })
    },
    computed: {
      ...mapState([
        'activeCity',
        'activeLocation',
        'showAlert',
        'alertMessage'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_LOCATION',
        'SET_LOCATIONCITY'
      ]),
      appShow () {
        const { PAGE_START_TIME } = window
        const END_TIME = new Date().getTime() // 结束时间
        const diffTime = END_TIME - PAGE_START_TIME
        const timer = setTimeout(() => {
          clearTimeout(timer)
          document.querySelector('.app-loading').className += ' app-loading-hide'
        }, diffTime > 2000 ? 0 : 2000 - diffTime)
      }
    },
    watch:{
      lng(){
        let self = this;
        lazyAMapApiLoaderInstance.load().then(() => {
          AMap.service('AMap.Geocoder',function(){//回调函数
            //实例化Geocoder
            var geocoder = new AMap.Geocoder({
              city: "010"//城市，默认：“全国”
            });
            geocoder.getAddress([self.lng,self.lat],function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                //获得了有效的地址信息:
                var city;
                city = `${result.regeocode.addressComponent.city}-${result.regeocode.addressComponent.district}-${result.regeocode.addressComponent.neighborhood}`
                var citys = '杭州'
                if(result.regeocode.addressComponent&&result.regeocode.addressComponent.city)(
                  citys=result.regeocode.addressComponent.city.replace("市","")
                )
                self.SET_LOCATION({locationCity:citys,city:citys,add:city,lng:self.lng,lat:self.lat,citycode:result.regeocode.addressComponent.citycode})
                self.SET_LOCATIONCITY({locationCity:citys,locationCitycode:result.regeocode.addressComponent.citycode})
              }else{
                mobile.toast('获取定位地址失败！')
              }
            })
          })
        });
      }
    }
  }

</script>

<style lang="scss">
  @import 'assets/css/base';
  @import 'assets/css/swiper-3.4.2.min.css';
  @import 'assets/font/iconfont.css';
  .amap{
    position: absolute;
    width: 100%; height: 100%;
    z-index: 500;
  }
  /*.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }*/
</style>

