<template>
  <div class="warp page1" >
    <div class="main-box">
      <scroller ref="my_scroller">
        <ul class="list">
          <li @click = "openUrl('#/mybalance')" class="flex-box">
            <i class="iconfont icon-yue lefticon"></i>
            <div class="label">余额</div>
            <div class="info">{{detail.account.accountAvailableBalance+detail.account.accountGiveMoney}}元</div>
            <div class="btn">去充值</div>
          </li>
          <li class="flex-box">
            <i class="iconfont icon-yufuqia lefticon"></i>
            <div class="label">预付款</div>
            <div class="info">{{detail.account.accountDeposit}}元</div>
            <div class="btn" @click="toRefund">退款</div>
          </li>
          <li class="flex-box" @click = "openUrl('#/cardBag')">
            <i class="iconfont icon-qiabao lefticon"></i>
            <div class="label">卡包</div>
            <div class="rightinfo" v-if="platform == 'h5'">0张</div>
            <div class="rightinfo" v-else>{{detail.allNum}}张</div>
            <i class="iconfont icon-qianjin righticon"></i>
          </li>
          <li class="flex-box" @click="openUrl('/html/user-invoice.html')">
            <i class="iconfont icon-fapiao lefticon"></i>
            <div class="label">发票与报销</div>
            <div class="rightinfo">{{detail.allInvoiceMoney}}元</div>
            <i class="iconfont icon-qianjin righticon"></i>
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
      	detail:null

      }
    },
    activated(){
      getData.userWallet().then(res => {
        this.detail=res.data.data
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
      toRefund(){
      	getData.toRefund().then(res => {
          mobile.toast(res.data.message)
          if(res.data.code==1){
          	this.detail.account.accountDeposit = 0
          }
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
    padding: 0 .22rem;
    li{
      background-color: #fff;
      margin-top: .27rem;
      height: 1.28rem;
      border-radius: 5px;
      border: 1px solid #dcdcdc;
      padding: .37rem;
      .lefticon{
        @include sc(.42rem,$green);
        display: inline-block;
        width: .78rem;
      }
      .label{
        @include sc(.28rem,#4b4b4b);
        margin-right: .2rem;
      }
      .info{
        @include sc(.24rem,#97969b);
        flex: 1;
      }
      .btn{
        @include wh(1.07rem,.44rem);
        background-color: $green;
        @include sc(.23rem,#fff);
        line-height: .44rem;
        border-radius: .22rem;
        text-align: center;
        position: relative;
        &:after{
          content: '';
          @include wh(1.11rem,.48rem);
          @include center();
          border: 1px solid $green;
          border-radius: .24rem;
        }
      }
      .rightinfo{
        flex: 1;
        text-align: right;
        @include sc(.26rem,$green);
        margin-right: .1rem;
      }
      .righticon{
        @include sc(.28rem,$green);
      }

    }
  }


</style>
