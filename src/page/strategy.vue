<template>
  <div class="warp page1" >

    <div>
      <scroller ref="my_scroller" :on-refresh="refresh" :on-infinite="infinite">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-container2">
          <swiper-slide class="flex-box" v-for="(item,index) in bannerList" :key="index">
            <a>
              <img :src="item.bannerImageUrl" :alt="item.bannerName">
            </a>
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <ul class="list">
          <li @click = "openUrl('#/proDetail/'+item.scenicSpotId)" class="flex-box" v-for="(item,index) in list" :key="index">
            <div class="imgbox flex-box"><img :src="item.scenicSpotImage" alt=""></div>
            <div class="con">
              <div class="tit">{{item.scenicSpotName}}</div>
              <div class="tagbox">
                <span class="tag-info" :class="{'tag-warning':index==1}"  v-for="(tag,index) in item.scenicSpotTag.split(',')">{{tag}}</span>
              </div>
              <div class="local"><i class="iconfont icon-dingwei"></i>{{item.city.cityName}} {{item.scenicSpotDistance.toFixed(0)}}km</div>
            </div>
            <div class="right">
              <div class="ranking" :class="'ranking'+(index+1)">
                <div class="round" v-if="(index+1)<=3"></div>
                <div class="bg" v-if="(index+1)<=3">NO.{{index+1}}</div>
              </div>
              <div class="count"><small>¥</small>{{item.ticketPrice}}<span>起</span></div>
            </div>
          </li>
        </ul>
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
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          paginationClickable: true,
          autoplay : 4000,
          initialSlide :1,
          autoplayDisableOnInteraction : false,
        },
        bannerList: [],
        list:[],
        pageIndex: 1,
        totalPage: 1,
        activeLocation:[],
        citycode:null,

      }
    },
    activated(){
      this.activeLocation = JSON.parse(mobile.getStore('activeLocation'))
      this.citycode = mobile.getStore('citycode')

      getData.bannerList(this.citycode).then(res => {
        this.bannerList = res.data.data.bannerList
      })
    },
    deactivated: function () {

    },
    mounted () {
    },
    components: {

    },

    computed: {
      /*...mapState([
        'activeLocation',
        'city',
        'citycode',
        'platform'
      ])*/
    },
    methods: {
      refresh (done) {
        getData.guideList(1, this.citycode, this.activeLocation[0],this.activeLocation[1]).then(res => {
          this.list = res.data.data.scenicSpotList
          this.totalPage = res.data.data.totalPage
          this.pageIndex = 2
          done()
        })
      },
      infinite (done) {

        if(this.pageIndex > this.totalPage) {
          done(true)
          return
        }
        getData.guideList(this.pageIndex, this.citycode, this.activeLocation[0],this.activeLocation[1]).then(res => {
          this.list = this.list.concat(res.data.data.scenicSpotList)
          this.totalPage = res.data.data.totalPage
          this.pageIndex++
          done()
        })
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
  .list{
    padding: 0 .15rem;
    background-color: #fff;
    li{
      padding: .3rem .23rem;
      border-bottom: 1px solid #efefef;
      &:last-child{
        border-bottom: none;
      }
      .imgbox{
        width: 2.19rem;
        height: 1.48rem;
        border-radius: 5px;
        margin-right: .2rem;
      }
      .con{
        flex: 1;
        .tit{
          @include sc(.30rem,#333631);
          margin-bottom: .1rem;

        }
        .tagbox{
          span{
            font-size: .22rem;
            padding: 0rem .13rem;
          }
        }
        .local{
          margin-top: .15rem;
          @include sc(.24rem,#7e7e7e);
          i{
            @include sc(.26rem,#7e7e7e);
            margin-right: .05rem;
            position: relative;
            top:-.02rem;
          }

        }
      }
      .right{
        text-align: right;
        .ranking{
          position: relative;
          float: right;
          @include wh(1.03rem,1.03rem);
          .round{
            @include wh(.76rem,.76rem);
            border: 1px solid #ff6600;
            border-radius: 50%;
            @include center();
          }
          .bg{
            @include wh(1.03rem,.40rem);
            @include ct();
            background-color: #ff6600;
            text-align: center;
            @include sc(.24rem,#fff);
            line-height: .4rem;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          }
          &.ranking2{
            .round{
              border-color: $yellow;
            }
            .bg{
              background-color: $yellow;
            }
          }
          &.ranking3{
            .round{
              border-color: $green;
            }
            .bg{
              background-color: $green;
            }
          }
        }
        .count{
          @include sc(.42rem,$green);
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          small{
            margin-right: .03rem;
          }
          span{
            margin-left: .1rem;
            @include sc(.25rem,$green);
          }
        }
      }
    }

  }



</style>
