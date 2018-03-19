<template>
  <div class="warp page1" >
    <div class="main-box">

      <scroller ref="my_scroller">
        <ul class="list">
          <li @click = "openUrl('#/ticket')" class="li1 flex-box">
            <i class="iconfont icon-piaojuyue left"></i>
            <div class="con">票（0张）</div>
            <i class="iconfont icon-jinru go"></i>
          </li>
          <li class="li2 flex-box" @click="isappFn" v-if="platform!='h5'">
            <i class="iconfont icon-qiaquan left"></i>
            <div class="con">券<span>（{{detail||0}}张）</span></div>
            <i class="iconfont icon-jinru go"></i>
          </li>
          <!--<li class="li3 flex-box">
            <i class="iconfont icon-qia1 left"></i>
            <div class="con">卡<span>（3张）</span></div>
            <i class="iconfont icon-jinru go"></i>
          </li>-->
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
          autoplay : 2000,
          initialSlide :1,
          autoplayDisableOnInteraction : false,
        },
        detail:null
      }
    },
    activated(){
      getData.cardHold().then(res => {
        this.detail = res.data.data.couponNum
      })
    },
    deactivated: function () {

    },
    mounted () {


    },
    components: {

    },

    computed: {
      ...mapState([
        'platform'
      ])
    },
    methods: {
      isappFn(){
        if(this.platform == 'iOS'){
          window.webkit.messageHandlers.myCoupons.postMessage({body:'myCoupons'});
        }else if(this.platform == 'android'){
          window.android.myCoupons()
        }

      },

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
    padding: 0 .2rem;
    li{
      padding: 0 .26rem 0 .5rem;
      margin-top: .4rem;
      @include wh(6rem,1.71rem);
      background-color: #ddd;
      border-radius: 7px;
      box-shadow: 0 5px 7px rgba(0,0,0,.2);
      &.li1{
        background-image: url("../assets/images/bag1.png");
      }
      &.li2{
        background-image: url("../assets/images/bag2.png");
      }
      &.li3{
        background-image: url("../assets/images/bag3.png");
      }
      .left{
        @include sc(.8rem,#fff);
        width: 1.14rem;
      }
      .con{
        flex: 1;
        @include sc(.30rem,#fff);
        span{
          @include sc(.30rem,#fff);
        }
      }
      .go{
        @include sc(.43rem,#fff);
      }
    }
  }



</style>
