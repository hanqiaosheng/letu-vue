<template>
  <div class="warp page1">
    <div class="main-box scroll">
      <scroller ref="my_scroller">
        <div class="balancecircle">
          <div class="circle-box">
            <div class="circle-top">
              <p>Blance</p>
              <span>总余额</span>
            </div>
            <div class="circle-mid">
                  <span class="num">
                    {{(detail.accountAvailableBalance+detail.accountGiveMoney).toFixed(2)}}<i>,￥</i>
                  </span>
            </div>
            <div  class="circle-bottom">
              <div @click = "openUrl('#/consumptionDetail')" class="withdrawal">明细</div>
            </div>
          </div>
        </div>
        <div class="itembox flex-box">
          <div class="item">
            <div class="d1">充值余额（元）</div>
            <div class="d2">{{detail.accountAvailableBalance.toFixed(2)}}</div>
          </div>
          <div class="item">
            <div class="d1">赠送余额（元）</div>
            <div class="d2">{{detail.accountGiveMoney.toFixed(2)}}</div>
          </div>
        </div>

      </scroller>
    </div>
    <div class="balancebtn" @click="openUrl('/html/recharge.html?gotoFlag=1')" v-if="platform=='h5'">
      立即充值
    </div>
    <div class="balancebtn" @click="isappFn" v-else>
      立即充值
    </div>
  </div>
</template>

<script>
  import * as getData from '../service/getData'
  import * as mobile from '../config/mUtils'
  import {mapState, mapMutations,mapActions} from 'vuex'
  export default{
    data () {
      return {

        pageIndex:1,
        totalPage:1,
        list:[],
        detail:null
      }
    },
    activated(){
      getData.userBalance().then(res => {
        this.detail = res.data.data.account
      })
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
          window.webkit.messageHandlers.recharge.postMessage({balance:this.detail.accountAvailableBalance+this.detail.accountGiveMoney});
        }else if(this.platform == 'android'){
          window.android.recharge(this.detail.accountAvailableBalance+this.detail.accountGiveMoney)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .balancecircle{
    margin: .7rem 0;
  }
  .main-box{
    background-color: #fff;
  }
  .alancecircle{
    @include wh(6.4rem,5.87rem);
    background: #fff;
    border-bottom: 0.02rem solid #ececec;
    padding-top: 0.43rem;
  }
  .circle-box{
    @include wh(4.98rem,4.98rem);
    margin: 0 auto;
    background: url(../assets/images/circle.jpg) no-repeat;
    background-size: 100%;
  }
  .circle-top{
    text-align: center;
    padding-top: 0.7rem;
    p{
      font-size: 0.23rem;
      font-weight: bold;
    }
    span{
      font-size: 0.26rem;
    }
  }
  .circle-mid{
    padding: 0.16rem 0.27rem 0 0.27rem;
    text-align: center;
    .num{
      @include sc(.6rem,#65c449);
      line-height:1.83rem;
      position: relative;
      i{
        @include sc(0.37rem,#65c449);
        position: absolute;
        top:-0.5rem;
        right: -0.8rem;
      }
    }
  }
  .circle-bottom{
    padding-top: 0.24rem;
    .withdrawal{
      @include wh(1.5rem,.47rem);
      @include sc(0.25rem,#65c449);
      border: #65c449 1px solid;
      margin: 0 auto;
      line-height: .4rem;
      text-align: center;
      border-radius: 0.05rem;
    }

  }

  .itembox{
    border-top: 1px solid #ececec;
    .item{
      text-align: center;
      flex: 1;
      border-right: 1px solid #ececec;
      margin-top: .12rem;
      padding: .12rem;
      &:last-child{
        border:none;
      }
      .d1{
        @include sc(.24rem,#4b4b4b);
      }
      .d2{
        @include sc(.3rem,#65c449);
        margin-top: .1rem;
        font-family:Arial, "Helvetica Neue", Helvetica, sans-serif;
      }
    }
  }
  .balancebtn{
    @include cl();
    bottom: .5rem;
    position: fixed !important;
    @include wh(2.24rem,.73rem);
    background-color: $green;
    @include sc(.23rem,#fff);
    line-height: .73rem;
    border-radius: .37rem;
    text-align: center;

    &:after{
      content: '';
      @include wh(2.32rem,.81rem);
      @include center();
      border: 1px solid $green;
      border-radius: .41rem;
    }
  }

</style>
