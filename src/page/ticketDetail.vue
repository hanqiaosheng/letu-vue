<template>
  <div class="warp page1" >
    <div class="main-box">
      <scroller ref="my_scroller">
        <div class="detail" v-if="detail">
          <div class="detailbox " :class="{disabled:detail.ticketState==1}">
          <div class="state margin30">状 态：{{detail.ticketState | filter}}</div>
          <div class="tit margin30">{{detail.ticketName}}<i class="iconfont icon-piao"></i></div>
          <div class="d1 margin30">二维码兑换</div>
          <div class="d2 margin30">将二维码出示给景区人员扫描</div>
          <img src="../assets/images/line.png" alt="" class="line">
          <div class="info">
            <div class="s1">有效期：{{new Date(detail.ticketValidityStartTime).format('yyyy.MM.dd')}}-{{new Date(detail.ticketValidityEndTime).format('yyyy.MM.dd')}}</div>
            <div class="s2">兑换码：{{detail.ticketRedeemCode}}</div>
          </div>
          <div class="decard">
            <img :src="detail.ticketRedeemImage" alt="">
          </div>
          <div class="item flex-box">
            <div class="con">
              <div class="s1">杭州龙门古镇</div>
              <div class="s2">浙江省杭州市富阳区境内浙江省杭州市富阳区境内</div>
            </div>
            <a class="right" href="tel:13588305484">
              <i class="iconfont icon-dianhua"></i>
            </a>
          </div>
          <div class="item flex-box">
            <div class="con con2">
              实付金额：
            </div>
            <div class="right right2">
              65元
            </div>
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
        detail:null
      }
    },
    activated(){
      getData.userTicketDetail(this.$route.params.id).then(res => {
        this.detail = res.data.data.ticket
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


    },
    watch:{

    },
    filters:{
      filter(val){
      	switch (val){
          case 1:
          	return '已兑换'
            break
          case 0:
          	return '未兑换'
            break
          case -1:
          	return '删除'
            break
        }
      }
    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .detail{
    padding: .2rem;
  }
  .detailbox{
    &.disabled{
      &:after{
        content: '';
        @include wh(1.11rem,1.11rem);
        display: block;
        background-image: url("../assets/images/ydh.png");
        background-size: 100% 100%;
        position: absolute;
        right:.44rem;
        top:1.7rem;
      }
      .info,.decard{
        opacity:.6;
      }
    }
    position: relative;
    background-color: #ffffff;
    border:1px solid #d8d8d8;
    border-radius: 5px;
    .margin30{margin: 0 .34rem;}
    .state{
      border-bottom:1px solid #eaeaea;
      height: .63rem;
      line-height: .63rem;
      @include sc(.23rem,#4b4b4b);
    }
    .tit{
      @include sc(.28rem,#4b4b4b);
      margin-top: .15rem;
      i{
        @include sc(.34rem,$green);
        margin-left: .2rem;
      }
    }
    .d1{
      @include sc(.24rem,$green);
      margin-top: .1rem;
    }
    .d2{
      margin-top: .1rem;
      @include sc(.24rem,#828282);
      margin-bottom: .1rem;
    }
    .line{
      width: calc(100% + 3px);
      margin: 0 -1px;

    }
    .info{
      @include wh(4.5rem,1.07rem);
      margin: 0 auto;
      background-color: #f7f7f7;
      padding:.2rem;
      border-radius: 5px;
      margin-top: .1rem;
      div{
        @include sc(.255rem, #606060);
        line-height: 1.4;

      }
    }
    .decard{
      @include wh(2.82rem,2.82rem);
      margin: 0 auto;
      margin-top: .3rem;
      margin-bottom: .45rem;
      padding: .1rem;
      border: 1px solid #dedede;
      border-radius: 5px;
      img{
        width: 100%;
      }
    }
    .item{
      padding: .10rem;
      border-top: 1px solid #eaeaea;
      .con{
        flex: 1;
        padding: .1rem .2rem;
        @include sc(.27rem,#4b4b4b);
        border-right: 1px solid #eaeaea;
        &.con2{
          padding: .2rem;
          border: none;
        }
        .s1{
          @include sc(.27rem,#4b4b4b);
          font-weight: 700;
        }
        .s2{
          @include sc(.24rem,#4b4b4b);
        }
      }
      .right{
        @include sc(.27rem,#4b4b4b);
        i{
          @include sc(.55rem,$green);
          padding: .2rem;
          padding-left: .3rem;
        }
        &.right2{
          padding-right: .2rem;
        }

      }
    }
  }


</style>
