<template>
  <div class="warp page1" v-if="defail">
    <div class="mapbox" style="height:calc(100vh - 3.51rem); position: relative;">
    <el-amap :vid="'amap-vue'" class="amap-wrapper" :zoom="zoom" :center="center" style="height:calc(100vh - 3.51rem);"  v-if="mapshow">

      <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :strokeColor="polyline.strokeColor" :events="polyline.events"></el-amap-polyline>
      <el-amap-marker v-for="(marker,index) in markers" :animation="marker.animation" :position="marker.position" :offset="marker.offset" :icon="marker.icon" :key="index"></el-amap-marker>
    </el-amap>
    </div>
    <div class="user-pho">
      <div class="img flex-box"><img :src="defail.user.userProfileImage" alt=""></div>
    </div>
    <ul class="list flex-box">
      <li><p class="p1">{{defail.distance | filter}}</p><p class="p2">骑行距离</p></li>
      <li><p class="p1">{{((defail.bikeRentInfo.rentEndtime-defail.bikeRentInfo.rentStarttime)/60000).toFixed(2)}}分</p><p class="p2">骑行时长</p></li>
      <li><p class="p1">{{defail.bike.bikeCode}}</p><p class="p2">车辆编号</p></li>
    </ul>
    <div class="time">

      <span class="info">
        <svg class="icon" style="width: .30rem; height: .30rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3844"><path d="M1024 512c0-282.624-229.376-512-512-512s-512 229.376-512 512 229.376 512 512 512c113.152 0 221.184-36.864 309.248-103.936a24.4736 24.4736 0 1 0-29.696-38.912c-79.872 60.928-177.152 94.208-280.064 94.208-256 0-463.36-207.36-463.36-463.36s207.36-463.36 463.36-463.36S975.36 256 975.36 512c0 94.72-28.672 185.344-80.896 261.632-7.68 11.264-4.608 26.112 6.144 33.792 11.264 7.68 26.112 4.608 33.792-6.144C992.256 716.8 1024 616.448 1024 512z m-536.576 97.28c0 13.312 10.752 24.576 24.576 24.576s24.576-10.752 24.576-24.576v-365.568c0-13.312-10.752-24.576-24.576-24.576s-24.576 10.752-24.576 24.576V609.28z m-5.632-137.728c-8.704-10.24-24.064-11.264-34.304-2.048s-11.264 24.064-2.048 34.304l170.496 195.072c8.704 10.24 24.064 11.264 34.304 2.048 10.24-8.704 11.264-24.064 2.048-34.304l-170.496-195.072z" fill="#65bd20" p-id="3845"></path></svg>
        {{new Date(defail.bikeRentInfo.rentStarttime).format('yyyy-MM-dd hh:mm:ss')}}
      </span>
    </div>
    <div class="bar flex-box" v-if="$route.query.share">
      <img src="../assets/images/bike.png" alt="">
      <div class="info">
        <div class="d1">全域骑游</div>
        <div class="d2">智能骑游单车</div>
      </div>
      <div class="btn" @click="download">立即下载</div>
    </div>

  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  export default {
    data () {
      return {
        defail:null,
        mapshow:false,
        zoom: 17,
        center: [121.5389385, 31.21515044],
        markers: [
          {
            animation:'AMAP_ANIMATION_DROP',
            offset:[-15,-45],
            icon:'http://otdrbrr5x.bkt.clouddn.com/start2.png',
            position: [120.16169, 30.326534],
          },{
            animation:'AMAP_ANIMATION_DROP',
            offset:[-15,-45],
            icon:'http://otdrbrr5x.bkt.clouddn.com/end2.png',
            position: [120.16169, 30.326534],
          }
        ],
        polyline: {
          path: [[120.16169, 30.326534]],
          strokeColor:'#50bb44',
          editable: false
        }
      }
    },
    activated(){

    },
    deactivated: function () {

    },
    mounted () {
      setTimeout(()=>{this.mapshow=true},200)
      var _this=this
      getData.getPointJson(this.$route.query.rentInfoId).then(res => {
        _this.defail = res.data.data
        let arr=[]
        if(res.data.data.jsonArray.length==0){
          arr.push([_this.defail.bikeRentInfo.rentStartlng,_this.defail.bikeRentInfo.rentStartlat])
          arr.push([_this.defail.bikeRentInfo.rentEndlng,_this.defail.bikeRentInfo.rentEndlat])
        }else{
          res.data.data.jsonArray.forEach((item)=>{
            arr.push([item.longitude,item.latitude])
          })
        }
        _this.polyline.path = arr
        _this.center = arr[arr.length-1]
        _this.markers[0].position = arr[0]
        _this.markers[1].position = arr[arr.length-1]

      })
    },
    components: {

    },

    computed: {
    },
    methods: {
      download(){
        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qs.letubicycle"
      }


    },
    watch:{

    },
    filters:{
      filter(val){
        if(val){
          if(val>=1000){
            return  `${(val/1000).toFixed(2)}km`
          }else{
            return `${val}m`
          }
        }else{
          return `0m`
        }
      }
    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .amap-wrapper {
    width: 6.4rem;


  }
  .user-pho{
    height: 1.1rem;
    background-color: #fff;
    position: relative;
    .img{
      position: absolute;
      left:50%;
      margin-left: -0.65rem;
      top:-.58rem;
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      background-color: #ccc;
      border:2px solid #fff;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
  .list{
    padding: .3rem 0;
    li{
      flex: 1;
      text-align: center;
      .p1{
        @include sc(.28rem,#4c4c4c);
        margin-bottom: .04rem;
      }
      .p2{
        @include sc(.25rem,#707070)
      }
    }
  }
  .bar{
    padding: 0 .2rem;
    height: 1.05rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    img{
      width: .72rem;
      height: .72rem;
      border: 1px solid #cccccc;
      border-radius: 5px;
      margin-right: .14rem;
    }
    .info{
      flex: 1;
      .d1{
        @include sc(.26rem,#000);
        margin-bottom: .02rem;
      }
    }
    .btn{
      width: 1.55rem;
      height: .6rem;
      line-height: .6rem;
      background-color: #65bd20;
      @include sc(.26rem,#fff);
      text-align: center;
      border-radius: 4px;
    }
  }
  .time{
    padding: 0 .2rem;
    height: 1.05rem;
    line-height: 1.05rem;
    width: 100%;
    background-color: #fff;
    text-align: center;
    .info{
      position: relative;
      display: inline-block;
      font-size: .25rem;
      svg{
        position: absolute;
        left: -.4rem;
        top:50%;
        margin-top: -.13rem;

      }
    }
  }

</style>
