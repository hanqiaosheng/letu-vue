<template>
  <div class="warp page1" >
    <div class="tab flex-box">
      <div class="item" :class="{active:logType==1}" @click="changetype(1)"><i class="iconfont icon-jinru"></i>消费明细</div>
      <div class="item" :class="{active:logType==2}" @click="changetype(2)"><i class="iconfont icon-jinru"></i>充值明细</div>
    </div>
    <div class="main-box">
      <scroller ref="my_scroller" :on-refresh="refresh" :on-infinite="infinite">
        <div class="g-items" v-for="(item,index) in moneyLogList" :key="index">
          <div class="g-item flex-box g-item-top" >
            <div class="con green">{{item.moneyLogOpreateId | logfilter}}</div>
            <div class="right">{{new Date(item.moneyLogCreateTime).format('MM-dd hh:mm:ss')}}</div>
          </div>
          <div class="itembox">
            <div class="g-item flex-box">
              <div class="con">金额</div><div class="right green">{{item.moneyLogDeposit}}元</div>
            </div>
            <div class="g-item flex-box">
              <div class="con">方式</div><div class="right">{{item.moneyLogOpreateId | opreatefilter}}</div>
            </div>
            <div class="g-item flex-box">
              <div class="con">类型</div><div class="right">{{item.moneyLogStreamType | streamfilter}}</div>
            </div>
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
        pageIndex: 1,
        totalPage: 1,
        moneyLogList:[],
        logType:1,

      }
    },
    activated(){

    },
    mounted () {
    },
    components: {

    },

    computed: {
    },
    methods: {
      refresh (done) {
        getData.userDetail(1,this.logType).then(res => {
          this.moneyLogList = res.data.data.moneyLogList
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
        getData.userDetail(this.pageIndex,this.logType).then(res => {
          this.moneyLogList = this.moneyLogList.concat(res.data.data.moneyLogList)
          this.totalPage = res.data.data.totalPage
          this.pageIndex++
          done()
        })
      },
      changetype(type){
      	this.logType = type;
        this.refresh(()=>{this.$refs.my_scroller.scrollTo(0,0)})
      }

    },
    watch:{

    },
    filters:{
      opreatefilter(val){
        switch (val){
          case 1:
            return '微信支付'
            break
          case 2:
            return '游客消费'
            break
          case 3:
            return '会员消费'
            break
          case 4:
            return '预付款退款'
            break
          case 5:
            return '后台充值'
            break
          case 6:
            return '支付宝支付'
            break
          default:
            return '微信支付'
        }
      },
      streamfilter(val){
        switch (val){
          case 1:
            return '骑行消费'
            break
          case 2:
            return '退款'
            break
          case 3:
            return '预付款补充'
            break
          case 4:
            return '余额充值'
            break
          default:
            return '骑行消费'
        }
      },
      logfilter(val){
        switch (val){
          case 1:
            return '充值'
            break
          case 2:
            return '消费'
            break
          case 3:
            return '消费'
            break
          case 4:
            return '退款'
            break
          case 5:
            return '充值'
            break
          case 6:
            return '充值'
            break
          default:
            return '充值'
        }
      }
    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .tab{
    background-color: #fff;
    padding: .33rem .35rem;
    .item{
      flex:1;
      text-align: center;
      border:1px solid #e3e3e3;
      border-radius: 5px;
      padding: .15rem;
      margin-right: .65rem;
      &:last-child{
        margin-right: 0;
      }
      &.active{
        border-color: #65c449;
        color: #65c449;
        i{
          color: #65c449;
        }
      }

      @include sc(.24rem,#707070);
      i{
        @include sc(.30rem,#d4d4d4);
        margin-right: .14rem;
        transform: rotate(90deg);
        display: inline-block;
      }
    }
  }
  .g-items{
    &:first-child{
      margin-top: .25rem;
    }
    margin-bottom: .25rem;
    border:0;
    .itembox{
      padding: .1rem 0;
    }
    .g-item{
      border-bottom: none;
      padding: .10rem .30rem;
      &.g-item-top{
        padding: .28rem .3rem;
        border-bottom: 1px solid #eeeeee;
      }
      .green{
        color: #65c449 !important;
      }
      .con{
        @include sc(.26rem,#707070);
      }
      .right{
        @include sc(.26rem,#c1c1c1);
      }
    }
  }


</style>
