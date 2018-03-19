<template>
  <div class="warp page1" >

    <div class="main-box main-box2">
      <scroller ref="my_scroller" :on-refresh="refresh" :on-infinite="infinite">
        <div class="top-bar flex-box">
          <router-link tag="div" to="/selectCity" class="local">
            {{city}}
            <i class="iconfont icon-xiala"></i>
          </router-link>
          <v-searchbar class="bar"></v-searchbar>
        </div>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-container2">
          <swiper-slide class="flex-box" v-for="(item,index) in bannerList" :key="index">
            <img :src="item.bannerImageUrl" :alt="item.bannerName">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <div class="flex-box main-bar">
          <div class="li" @click="openUrl('/html/watchbike.html')" v-if="platform=='h5'">
            <i class="iconfont icon-saoyisao"></i>
            去骑行
          </div>
          <div class="li" @click="isappFn" v-else>
            <i class="iconfont icon-saoyisao"></i>
            去骑行
          </div>
          <div @click = "openUrl('#/strategy')" class="li">
            <i class="iconfont icon-gonglve" style="font-size: .48rem;"></i>
            骑游攻略
          </div>
          <div @click = "openUrl('#/cardBag')" class="li">
            <i class="iconfont icon-qiabao"></i>
            我的卡包
          </div>
        </div>
        <div class="mainlist">
          <div class="tit">
            <img src="../assets/images/maint.png" alt="">
          </div>
          <ul>
            <li @click = "openUrl('#/proDetail/'+item.scenicSpotId)" class="item" v-for="(item,index) in scenicSpotList" :key="index">
              <img class="bg" :src="item.scenicSpotImage" v-if="item.scenicSpotImage">
              <img class="bg" src="../assets/images/mainlist.png" v-else>
              <div class="info">
                <div class="d1">{{item.scenicSpotName}} | <span class="tag" v-for="tag in item.scenicSpotTag.split(',')">{{tag}}</span></div>
                <div class="d2"><i class="iconfont icon-dingwei"></i>{{item.city.cityName}} · {{item.scenicSpotDistance.toFixed(0)}}km</div>
                <div class="d3"><b>¥{{item.ticketPrice}}</b>起</div>
              </div>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <v-footer></v-footer>
    <transition name="showlist">
      <section v-show="buybox" class="buybox">
        <div class="close" @click="togger"><i class="iconfont icon-guanbi"></i></div>
        <div class="con">
          <p>{{alertMessage}}</p>
          <p>点击查看详情继续完成</p>
        </div>
        <div class="btn" @click="buybox=false;openUrl('/html/watchbike.html')"  v-if="platform=='h5'">查看详情</div>
        <div class="btn" @click="buybox=false;isappFn2()" v-else>查看详情</div>
      </section>
    </transition>
    <transition name="showcover">
      <div @click="togger" class="back_cover" style="z-index: 1000" v-show="buybox"></div>
    </transition>
  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import * as mobile from '../config/mUtils'
  import {mapState, mapMutations,mapActions} from 'vuex'
  export default {
    data () {
      return {
        buybox:false,
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          paginationClickable: true,
          autoplay : 4000,
          initialSlide :1,
          autoplayDisableOnInteraction : false,
        },
        alertMessage:'您有尚未结束的订单',
        bannerList: [],
        scenicSpotList:[],
        pageIndex: 1,
        totalPage: 1,
        res:null,
      }
    },
    activated(){
      getData.getUser().then(res => {

        this.res = res
        if(res.data.user && 0 != res.data.user.userState){
          if(null==res.data.bikeRentInfo.rentEndtime){
            this.alertMessage='您有租赁尚未结束'
            this.buybox = true
          }else{
            this.alertMessage='您有订单尚未支付'
            this.buybox = true
          }
        }
      })

      this.changeBanner()
    },
    mounted () {
      /*if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((res) => { alert(JSON.stringify(res)) }, (res) => { console.log(res) })
      }*/

    },
    components: {

    },
    computed: {
      ...mapState([
        'activeLocation',
        'city',
        'citycode',
        'platform'
      ])
    },
    methods: {
      open(){
      	window.location.href='/#/selectCity'
      },
      isappFn(){
      	if(this.platform == 'iOS'){
          window.webkit.messageHandlers.saoyisao.postMessage({body:'saoyisao'});
        }else if(this.platform == 'android'){
          window.android.saoyisao()
        }

      },
      isappFn2(){
        if(this.platform == 'iOS'){
          window.webkit.messageHandlers.checkDetail.postMessage({body:'checkDetail'});
        }else if(this.platform == 'android'){
          window.android.checkDetail()
        }else if(this.platform == 'h5'){
          if(this.alertMessage=='您有租赁尚未结束'){
            window.location.href=path+"/html/bikeUsing.html?rentId="+this.res.data.bikeRentInfo.rentInfoId+"&bikeState="+this.res.data.bike.bikeState;
          }else{
            window.location.href=path+"/html/bikeEnd.html?rentId="+this.res.data.bikeRentInfo.rentInfoId;
          }
        }

      },
      togger(){
        this.buybox=!this.buybox
      },
      refresh (done) {
        getData.scenicList(1,this.citycode,this.activeLocation[0],this.activeLocation[1]).then(res => {
          this.scenicSpotList = res.data.data.scenicSpotList
          this.totalPage = res.data.data.totalPage
          this.pageIndex = 2
          done()
        })
      },
      infinite (done) {
        if (this.pageIndex > this.totalPage) {
          done(true)
          return
        }
        getData.scenicList(this.pageIndex,this.citycode,this.activeLocation[0],this.activeLocation[1]).then(res => {
          this.scenicSpotList = this.scenicSpotList.concat(res.data.data.scenicSpotList)
          this.totalPage = res.data.data.totalPage
          this.pageIndex++
          done()
        })
      },
      changeBanner(){
        getData.bannerList(this.citycode).then(res => {
          this.bannerList = res.data.data.bannerList
        })
      }

    },
    watch:{
      citycode(){
      	this.changeBanner()
        this.refresh(()=>{this.$refs.my_scroller.scrollTo(0,0)})
      }
    },
    filters:{

    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .top-bar{
    padding: 0 .3rem;
    position:absolute;
    width: 100%;
    z-index: 99;
    top:1.4rem;
    .local{
      margin-right: .2rem;
      @include sc(.28rem,#fff);
      i{
        @include sc(.28rem,#fff)
      }
    }
    .bar{
      flex: 1;
    }
  }

.main-bar{
  width: 100%;
  background-color: #fff;
  height: 1.82rem;
  .li{

    flex: 1;
    text-align: center;

    @include sc(.27rem,#4d4d4d);
    &:nth-child(1){
      color:$green ;
      i{
        color:$green ;
      }
    }
    &:nth-child(2){
      i{
        position: relative;
        top:.04rem;
      }
    }
    i{
      height: .7rem;
      @include sc(.6rem,#333631);
      margin-bottom: .05rem;
      display: block;
    }
  }
}
  .mainlist{
    background-color: #fff;
    padding: .18rem;
    margin-top: .18rem;
    .tit{
      text-align: center;
      padding: .1rem 0;
      img{
        width: 2.12rem;
      }
    }
    .item{
      background-color: #eee;
      width: 100%;
      height: 2.27rem;
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      margin-top: .18rem;
      .bg{
        width: 100%;
        height: 100%;
      }
      .info{
        position: absolute;
        bottom: 0;
        left:0;
        z-index: 1;
        width: 100%;
        padding: .14rem .32rem;
        div{
          color: #fff;
          font-size: .27rem;
          line-height: 1.5;
        }
        .d1{
          .tag{
            display: inline-block;
            background-color: rgba(255,255,255,.8);
            border-radius: 2px;
            @include sc(.25rem,#353833);
            padding: .0rem .09rem;
            margin: 0 .08rem;
          }
        }
        .d2{
          i{
            @include sc(.33rem,#fff);
            margin-right: .08rem;
          }
        }
        .d3{
          position: absolute;
          right: .32rem;
          bottom: .17rem;
          b{
            font-size: .36rem;
            color: #fff;
            font-weight: 400;
          }
        }
      }
    }
  }
  .buybox {
    border-radius: 5px;
    margin-top: -.5rem;
    width: 4.28rem;
    @include center();
    padding: .43rem .68rem;
    background-color: #fff;
    z-index: 1001;
    text-align: center;
    .close{
      position: absolute;
      @include cl();
      bottom:-.9rem;
      i{
        @include sc(.55rem,#fff)
      }
    }
    .con{
      @include sc(.256rem,#393939);
      line-height: 1.8;
      margin-bottom: .3rem;
    }
    .btn{
      margin: 0 auto;
      width: 1.58rem;
      height: 0.48rem;
      background-color: #69b076;
      font-size: 0.25rem;
      color: #fff;
      line-height: .48rem;
      border-radius: .24rem;
      text-align: center;
      position: relative;
      &:after{
        content: '';
        @include wh(1.64rem,.54rem);
        @include center();
        border: 1px solid $green;
        border-radius: .27rem;
      }
    }


  }

</style>
