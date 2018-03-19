<template>
  <div class="warp page1" >
    <div class="main-box">

      <scroller ref="my_scroller" :on-refresh="refresh" :on-infinite="infinite">
        <ul class="list">
          <li @click = "openUrl('#/ticketDetail/'+item.utTicketId)" v-for="(item,index) in ticketList" :key="index">
            <div class="d1 flex-box">
              <i class="iconfont icon-piao left"></i>
              <div class="tit ellipsis">{{item.ticket.ticketName}}</div>
              <div class="right">检票二维码 <i class="iconfont icon-jinru"></i></div>
            </div>
            <div class="d2">有效期：{{new Date(item.ticket.ticketValidityStartTime).format('yyyy.MM.dd')}}-{{new Date(item.ticket.ticketValidityEndTime).format('yyyy.MM.dd')}}</div>
          </li>

        </ul>
        <div class="nodata" v-if="ticketList.length==0">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nonedata"></use>
          </svg>
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
        ticketList:[],
        pageIndex: 1,
        totalPage: 1
      }
    },
    activated(){

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
      refresh (done) {
        getData.userTicket(1).then(res => {
          this.ticketList = res.data.data.ticketList
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
        getData.userTicket(this.pageIndex).then(res => {
          this.ticketList = this.ticketList.concat(res.data.data.ticketList)
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
    padding: 0 .2rem;
    li{
      margin-top: .2rem;
      background-color: #fff;
      border-radius: 5px;
      border:1px solid #dadada;
      padding: .3rem;
      .d1{
        margin-bottom: .25rem;
        .left{
          @include sc(.40rem,$green);
          margin-right: .18rem;
        }
        .tit{
          flex: 1;
          @include sc(.28rem,#4b4b4b);
          margin-right: .18rem;
        }
        .right{
          @include sc(.25rem,$green);
          i{
            @include sc(.32rem,$green);
          }
        }
      }
      .d2{
        @include sc(.24rem,#97969b);
      }
    }

  }



</style>
