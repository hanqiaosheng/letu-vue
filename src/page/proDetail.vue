<template>
  <div class="warp page1" >

    <div class="main-box0">
      <scroller ref="my_scroller" v-if="detail">
   <!--     <div class="back-side" style="top: .47rem;" @click="$router.go(-1)"><i class="iconfont icon-fanhui"></i></div>-->
        <div class="imgbox flex-box">
          <img :src="detail.scenicSpot.scenicSpotDetailImage" alt="">
        </div>
        <div class="g-items">
          <div @click = "openUrl('#/proLocaltion?lat='+detail.scenicSpot.scenicSpotLat+'&lng='+detail.scenicSpot.scenicSpotLng+'&add='+detail.scenicSpot.scenicSpotName)" class="g-item flex-box">
            <i class="iconfont icon-dingwei left"></i><div class="con">{{detail.scenicSpot.scenicSpotName}}</div><i class="iconfont righticon icon-qianjin"></i>
          </div>
          <div @click = "openUrl('#/descriptionGuide/'+detail.scenicSpot.scenicSpotId)" class="g-item flex-box">
            <i class="iconfont icon-shijian left"></i><div class="con ellipsis">开放时间：{{detail.scenicSpot.scenicSpotOpenTime}}</div><i class="iconfont righticon icon-qianjin"></i>
          </div>
        </div>
        <div class="detailbox">
          <div class="tab flex-box">
            <div class="item" :class="{active:!activeShow}" @click="toggle">购买套餐</div>
            <div class="item" :class="{active:activeShow}" @click="toggle">景点介绍</div>
          </div>
          <div class="info" v-show="!activeShow">
            <ul>
              <li class="flex-box" v-for="(item,index) in detail.discountPackage">
                <div class="con">
                  <div class="tit ellipsis">{{item.discountPackageName}}</div>
                  <div class="tagbox">
                    <span>网上支付</span>
                    <span class="tag-info" :class="{'tag-warning':index==1}"  v-for="(tag,index) in item.discountPackageTag.split(',')">{{tag}}</span>
                  </div>
                  <div class="d3 flex-box"><i class="iconfont icon-dui"></i><div class="sub" v-if="!item.discountPackageBuyLimit">当天可购买</div><div class="sub" v-else>需要提前{{item.discountPackageBuyLimit}}天购买</div><div @click = "openUrl('#/description/'+item.discountPackageId)"  class="more">详细说明<i class="iconfont righticon icon-qianjin"></i></div></div>

                </div>
                <div class="cont">
                  <s class="d1"><small>¥</small>{{item.discountPackagePrice}}</s>
                  <div class="d2"><small>¥</small>{{item.discountPackagePreferentialPrice}}</div>
                  <div class="btn btn-disabled">立即预定</div>
                </div>
              </li>
              <!--<li class="flex-box">
                <div class="con">
                  <div class="tit ellipsis">门票+骑行+当季水果免费品尝</div>
                  <div class="tagbox">
                    <span>网上支付</span>
                    <span class="tag-info">优惠券</span>
                    <span class="tag-warning">不可退</span>
                  </div>
                  <div class="d3 flex-box"><i class="iconfont icon-dui"></i><div class="sub">需要提前2天购买</div><router-link to="/description" class="more">详细说明<i class="iconfont righticon icon-qianjin"></i></router-link></div>

                </div>
                <div class="cont">
                  <s class="d1"><small>¥</small>70</s>
                  <div class="d2"><small>¥</small>65</div>
                  <div class="btn">立即预定</div>
                </div>
              </li>-->
            </ul>
          </div>
          <div class="info2 news-info" v-show="activeShow" v-html="detail.scenicSpot.scenicSpotContent">

          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import * as mobile from '../config/mUtils'
  import {mapState, mapMutations,mapActions} from 'vuex'
  export default {
    data () {
      return {
      	activeShow:0,
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          paginationClickable: true,
          autoplay: 2000,
          initialSlide: 1,
          autoplayDisableOnInteraction: false,
        },
        detail: null
      }
    },
    activated(){
      getData.scenicDetail(1,this.$route.params.id).then(res => {
        this.detail = res.data.data
      })
    },
    deactivated: function () {

    },
    mounted () {

    },
    components: {

    },

    computed: {
    },
    methods: {
      toggle(){
      	this.activeShow=!this.activeShow
      }

    },
    watch:{

    },
    filters:{

    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';

  .icon-dingwei{
    position: relative;
    top:-0.04rem;
  }
  .imgbox{
    height: 3.42rem;
    overflow: hidden;
    background-color: #eee;
    img{
      width: 100%;
    }
  }

  .detailbox{
    margin-top: .18rem;
    background-color: #fff;
    .tab{
      border-bottom: 1px solid #f3f3f3;
      .item{
        margin: 0 .32rem;
        text-align: center;
        flex: 1;
        padding: .25rem;
        @include sc(.29rem,#333631);
        border-bottom: 2px solid #fff;
        &.active{
          color: $green;
          border-bottom: 2px solid $green;
        }
      }
    }
    .info{
      li{
        padding: .32rem;
        align-items: flex-start;
        border-bottom: 1px solid #ededed;
        .con{
          flex: 1;
          margin-right: .4rem;
          width: 3.74rem;
          .tit{
            @include sc(.28rem,#333631);
            margin-bottom: .2rem;
          }

          .tagbox{
            margin-bottom: .35rem;
          }
          .d3{
            .icon-dui{
              @include sc(.25rem,#909faf);
              margin-right: .1rem;
            }
            .sub{
              flex: 1;
            }
            .more{
              @include sc(.24rem,#97969b);
              i{
                margin-left: .05rem;
                @include sc(.24rem,#97969b);
              }
            }
          }
        }
        .cont{
          text-align: right;
          .d1{
            @include sc(.26rem,#929292);
            padding-top: .03rem;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          }
          .d2{
            @include sc(.42rem,$green);
            margin: .14rem 0;
            small{
              font-size: .36rem;
              margin-right: .03rem;
            }
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          }
          .btn{
            display: inline-block;
            padding: .12rem .15rem;
            background-color: $green;
            @include sc(.262rem,#fff);
            border-radius: 5px;
            &.btn-disabled{
              background-color: #cdd4cf;
            }
          }
        }
      }
    }
  }

</style>
