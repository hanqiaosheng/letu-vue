<template>
  <div class="warp page1">
    <div class="searchbox flex-box">
      <div class="searchbar">
        <form class="index-searchbox flex-box" action>
          <i class="iconfont icon-sousuo1"></i>
          <input type="search" placeholder="请输入景点..." v-model="searchVal" @keydown.enter.prevent="searchTarget">
          <i class="iconfont icon-guanbi" @click.prevent="searchRemove" :class="{green:searchVal.length}"></i>
        </form>
      </div>
    </div>
    <div class="main-box scroll">
      <scroller ref="my_scroller" :on-refresh="refresh" :on-infinite="infinite">
        <div class="citybox" v-if="hotWordList.length||searchHistory.length">
          <div class="subtit" v-if="hotWordList.length">热门搜索</div>
          <div class="list">
            <div class="btns btns-primary" v-for="(item,index) in hotWordList" @click="gosearch(item.hotWordName)">{{item.hotWordName}}</div>
          </div>
          <div class="subtit subtit2 flex-box" v-if="searchHistory.length"><div class="con">搜索历史</div><i @click="delectSearchHistory" class="iconfont icon-shanchu"></i></div>
          <div class="list">
            <div class="btns btns-default" v-for="item in searchHistory" @click="gosearch(item)">{{item}}</div>
            <!--<div class="btns btns-default">宁波</div>-->
          </div>
        </div>
        <ul class="lists">
          <li @click = "openUrl('#/proDetail/'+item.scenicSpotId)" class="flex-box" v-for="(item,index) in scenicSpotList" :key="index">
            <div class="imgbox flex-box"><img :src="item.scenicSpotImage" alt=""></div>
            <div class="con">
              <div class="tit">{{item.scenicSpotName}}</div>
              <div class="tagbox">
                <span class="tag-info" :class="{'tag-warning':index==1}"  v-for="(tag,index) in item.scenicSpotTag.split(',')">{{tag}}</span>
              </div>
              <div class="local"><i class="iconfont icon-dingwei"></i>{{item.city.cityName}} {{item.scenicSpotDistance.toFixed(0)}}km</div>
            </div>
            <div class="right">
              <div class="ranking"></div>
              <div class="count"><small>¥</small>{{item.ticketPrice}}<span>起</span></div>
            </div>
          </li>
          <!--<li class="flex-box">
            <div class="imgbox flex-box"><img src="../assets/images/banner1.png" alt=""></div>
            <div class="con">
              <div class="tit">A骑行之旅</div>
              <div class="tagbox">
                <span class="tag-info">优惠</span>
                <span class="tag-warning">骑行</span>
              </div>
              <div class="local"><i class="iconfont icon-dingwei"></i>杭州 16.8km</div>
            </div>
            <div class="right">
              <div class="ranking"></div>
              <div class="count"><small>¥</small>625<span>起</span></div>
            </div>
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
        searchVal:'',
        hotWordList:[],
        scenicSpotList:[],
        searchHistory:[],
        pageIndex: 1,
        totalPage: 1
      }
    },
    mounted () {
    	this.searchVal = this.searchKey
    	getData.hotWordList().then(res => {
        this.hotWordList =  res.data.data.hotWordList
      })
      this.setSearchHistory(this.searchVal)
      this.getSearchHistory()

    },
    components: {
    },
    computed: {
      ...mapState([
        'activeLocation',
        'city',
        'citycode',
        'searchKey'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_SEARCHKEY'
      ]),
      searchRemove () {
        this.searchVal = ''
      },
      searchTarget () {
        this.SET_SEARCHKEY(this.searchVal)
        this.refresh(()=>{this.$refs.my_scroller.scrollTo(0,0)})
        this.setSearchHistory(this.searchVal)
        this.getSearchHistory()
      },
      setSearchHistory(key){
      	if(key=='') {
      		return
        }
        let keys=mobile.getStore('searchHistory')||''
        let keysarr=keys.split(',')
        keysarr.forEach((item)=>{
          keysarr.remove(key)
        })
        if(keysarr.length == 10){
          keysarr.pop()
        }
        if(keys==''||keysarr.length==0){
          keys=key
        }else{
          keys=key+','+keysarr.join(',')
        }
        mobile.setStore('searchHistory',keys)

      },
      getSearchHistory(){
      	let key=mobile.getStore('searchHistory')
        if(key){
          this.searchHistory = key.split(',')
        }else{
          this.searchHistory = []
        }
      },
      delectSearchHistory(){
      	mobile.removeStore('searchHistory')
        this.getSearchHistory()
      },
      gosearch(key){
        this.searchVal = key
        this.searchTarget()
      },
      refresh (done) {
        getData.scenicSelect(1,this.searchVal).then(res => {
          this.scenicSpotList = res.data.data.scenicSpotList
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
        getData.scenicSelect(this.pageIndex,this.searchVal).then(res => {
          this.scenicSpotList = this.scenicSpotList.concat(res.data.data.scenicSpotList)
          this.totalPage = res.data.data.totalPage
          this.pageIndex++
          done()
        })
      }
    },
    watch:{
    }
  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .citybox{
    padding: .26rem;
    background-color: #fff;
    .subtit{
      @include sc(.26rem,#4b4b4b);
      margin-bottom: .13rem;
      &.subtit2{
        margin-top: .15rem;
        .con{
          @include sc(.26rem,#4b4b4b);
          flex: 1;
        }
        i{
          @include sc(.35rem,#4b4b4b)
        }
      }
    }
    .list{
      .btns{
        margin-bottom: .1rem;
      }
    }

  }
  .searchbox{
    margin: .17rem .2rem;
    background-color: #ffffff;
    border:1px solid #e2e2e2;
    border-radius: .5rem;
    padding: .1rem .2rem;
    .local{
      padding-right: .17rem;
      border-right: 1px solid #e9e9e9;
      margin-right: .17rem;
      .info{
        @include sc(.28rem,$green);
      }
      i{
        @include sc(.32rem,$green);
        margin-right: .1rem;
      }
    }
    .searchbar{
      flex: 1;
      input{
        flex: 1;
        &::-webkit-input-placeholder{
          @include sc(.23rem,#c1c1c1)
        }
      }
      i{
        &.green{
          color:$green;
        }
        &.icon-sousuo1{
          margin-right: .1rem;
        }
        @include sc(.3rem,#bdbdbd);
      }
    }
  }
  .lists{
    padding: 0 .15rem;
    background-color: #fff;
    li{
      padding: .3rem .23rem;
      border-bottom: 1px solid #efefef;
      &:last-child{
        border-bottom: none;
      }
      .imgbox{
        width: 1.7rem;
        height: 1.47rem;
        border-radius: 5px;
        margin-right: .2rem;
        img{
          height: 100%;
          width: auto;
        }
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
          margin-top: .28rem;
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
