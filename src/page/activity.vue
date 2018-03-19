<template>
  <div class="warp page1" >
    <div class="main-box main-box2">
      <scroller ref="my_scroller" :on-refresh="refresh" :on-infinite="infinite">
        <ul class="list">
          <li v-for="(item,index) in activityList">
            <a :href="item.activityUrl" target="_blank">
            <div class="time">{{new Date(item.activityCreateTime).format('yyyy-MM-dd hh:mm')}}</div>
            <div class="con">
              <div class="imgbox flex-box">
                <img :src="item.activityImage" alt="">
              </div>
              <div class="tit">{{item.activityName}}</div>
              <div class="info" v-html="item.activityInstruction"></div>
            </div>
            </a>
          </li>
        </ul>
      </scroller>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import * as mobile from '../config/mUtils'
  import {mapState, mapMutations,mapActions} from 'vuex'
  export default {
    data () {
      return {
        activityList:[],
        pageIndex: 1,
        totalPage: 1
      }
    },
    activated(){

    },
    mounted () {

    },
    components: {

    },
    computed: {
      ...mapState([
        'activeLocation',
        'city',
        'citycode'
      ])
    },
    methods: {
      refresh (done) {
        getData.activityListApp(1,this.citycode).then(res => {
          this.activityList = res.data.data.activityList
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
        getData.activityListApp(this.pageIndex,this.citycode).then(res => {
          this.activityList = this.activityList.concat(res.data.data.activityList)
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
  .main-box{
    background-color: #fff;
  }
  .list{
    li{
      padding:0 .28rem;
      margin-top: .25rem;
      .con{
        border:1px solid #e1e1e1;
        border-radius: 5px;
        overflow: hidden;
        padding-bottom: .2rem;
      }
      .imgbox{
        @include wh(100%,2.95rem);
        overflow: hidden;
        background-color: #eee;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .time{
        text-align: center;
        @include sc(.19rem,#b4b4ba);
        margin-bottom: .15rem;
      }
      .tit{
        margin: .2rem;
        @include sc(.256rem,#646471);
      }
      .info{
        margin: 0 .2rem;
        @include sc(.239rem,#aeaeae);
      }

    }
  }


</style>
