<template>
  <div class="warp page1 page-all">
    <v-header :goBack="true" headTitle="城市选择"></v-header>
    <div class="main-box main-box3 scroll">
      <scroller ref="my_scroller_local">
        <div class="citybox">
          <div class="subtit">当前定位城市</div>
          <div class="list">
            <div class="btns btns-primary" @click="setcity(locationCitycode)">{{locationCity}}</div>
          </div>
          <div class="subtit subtit2 flex-box" v-if="selectCityHistory.length"><div class="con">历史选择</div><i @click="delectSelectCityHistory()" class="iconfont icon-shanchu"></i></div>
          <div class="list">
            <div class="btns btns-default" v-for="item in selectCityHistory" @click="setcity(item.split('-')[0])">{{item.split('-')[1]}}</div>
          </div>
        </div>
        <div class="cityitem" v-for="item in selectCitys">
          <div class="tit">{{item.initial}}</div>
          <div class="g-items">
            <div class="g-item flex-box" v-for="subitem in item.data" @click="setcity(subitem.cityCode)">
              <div class="con">
                {{subitem.city}}
              </div>
            </div>
          </div>
        </div>


      </scroller>
      <section class="guide-wipe flex-box">
        <section class="list-guide" @touchstart="touchMove($event)" @touchmove="touchMove($event)" @touchend="touchEnd()" ref="guide_CH">
          <dl>

            <dd :class="{active:activeCH==item.initial}" v-for="item in selectCitys">{{item.initial}}<transition name="showcover"><div v-show="activeCHshow&&activeCH==item.initial" class="tag">{{item.initial}}</div></transition></dd>
          </dl>
        </section>
      </section>
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
        scrollY:2,
        activeCH:'A',
        activeCHshow:false,
        selectCityHistory:[],
        selectCitys:[{
          initial:'B',
          data:[{
            city:'保定',
            lng:'115.48',
            lat:'38.85',
            cityCode:'0312'
          }]
        },{
          initial:'H',
          data:[{
            city:'杭州',
            lng:'120.19',
            lat:'30.26',
            cityCode:'0571'
          },{
            city:'湖州',
            lng:'120.1',
            lat:'30.86',
            cityCode:'0572'
          },{
            city:'黄山',
            lng:'118.33',
            lat:'29.71',
            cityCode:'0559'
          }]
        },{
          initial:'J',
          data:[{
            city:'嘉兴',
            lng:'120.76',
            lat:'30.77',
            cityCode:'0573'
          }]
        },{
          initial:'L',
          data:[{
            city:'丽水',
            lng:'119.92',
            lat:'28.45',
            cityCode:'0578'
          }]
        },{
          initial:'N',
          data:[{
            city:'宁波',
            lng:'120.56',
            lat:'28.01',
            cityCode:'0574'
          }]
        },{
          initial:'Q',
          data:[{
            city:'衢州',
            lng:'118.88',
            lat:'28.97',
            cityCode:'0570'
          }]
        },{
          initial:'S',
          data:[{
            city:'绍兴',
            lng:'120.58',
            lat:'30.01',
            cityCode:'0575'
          },{
            city:'上饶',
            lng:'117.97',
            lat:'28.47',
            cityCode:'0793'
          }]
        },{
          initial:'T',
          data:[{
            city:'台州',
            lng:'120.03',
            lat:'29.15',
            cityCode:'0576'
          }]
        },{
          initial:'W',
          data:[{
            city:'温州',
            lng:'120.65',
            lat:'28.01',
            cityCode:'0577'
          }]
        },{
          initial:'X',
          data:[{
            city:'上饶',
            lng:'117.97',
            lat:'28.47',
            cityCode:'0793'
          }]
        },{
          initial:'Y',
          data:[{
            city:'烟台',
            lng:'121.24',
            lat:'37.32',
            cityCode:'0535'
          }]
        }]


      }
    },

    mounted () {
      var _this=this
      var int=self.setInterval("clock()",50)

      window.clock=function(){
        if(typeof _this.$refs.my_scroller_local =='undefined'){
          clearInterval(int)
          return
        }
        _this.scrollY=_this.$refs.my_scroller_local.getPosition().top
      }
      this.activeCH = this.selectCitys[0].initial

      this.getSelectCityHistory()

    },
    components: {
    },

    computed: {
      ...mapState([
        'activeLocation',
        'locationCity',
        'locationCitycode'
      ])
    },
    methods: {
      ...mapMutations([
      	'SET_LOCATION'
      ]),
      setcity(cityCode){
      	let item={}
      	this.selectCitys.forEach((items) => {
      		items.data.forEach((subitems) =>{
      			if(cityCode==subitems.cityCode){
      				item = subitems
            }
          })
        })
        if(Object.keys(item).length==0){
      		mobile.toast(city+'暂未开通')
          return
        }
        this.SET_LOCATION({city:item.city,lng:item.lng,lat:item.lat,citycode:item.cityCode})
        this.setSelectCityHistory(item.cityCode+'-'+item.city)
        window.history.go(-1)
      },
      setSelectCityHistory(key){
        if(key==''){
          return
        }
        let keys=mobile.getStore('selectCityHistory')||''
        let keysarr=keys.split(',')
        keysarr.forEach((item)=>{
          keysarr.remove(key)
        })
        if(keysarr.length==10){
          keysarr.pop()
        }
        if(keys==''||keysarr.length==0){
          keys=key
        }else{
          keys=key+','+keysarr.join(',')
        }
        mobile.setStore('selectCityHistory',keys)

      },
      getSelectCityHistory(){
        let key=mobile.getStore('selectCityHistory')
        if(key){
          this.selectCityHistory = key.split(',')
        }else{
          this.selectCityHistory = []
        }
      },
      delectSelectCityHistory(){
        mobile.removeStore('selectCityHistory')
        this.getSelectCityHistory()
      },
      startThing(val){
        var _this=this
        this.$nextTick(() =>{ //滚动到通讯录分组的地方
          const listArray = this.$refs.my_scroller_local.$el.getElementsByClassName("tit");
          for(let i =0; i<listArray.length; i++){
            if(listArray[i].innerText==val){
              _this.activeCH=val

              if (navigator.vibrate) {//添加震动
                navigator.vibrate(30);
              }

              _this.$refs.my_scroller_local.scrollTo(0,listArray[i].offsetTop)
            }

          }

        })
      },
      touchMove(e){
        this.activeCHshow=true
        var _this=this
        const listArray = this.$refs.guide_CH.getElementsByTagName('dd')
        for(let i =0; i<listArray.length; i++){
          if(e.targetTouches[0].pageY>=listArray[listArray.length-1].offsetTop){
            _this.startThing(listArray[listArray.length-1].innerText)
            return
          }
          if(listArray[i].offsetTop<=e.targetTouches[0].pageY&&e.targetTouches[0].pageY<listArray[i+1].offsetTop){
            _this.startThing(listArray[i].innerText)
            return
          }

        }
      },
      touchEnd(){
        setTimeout(()=>{this.activeCHshow=false},400)
      }

    },
    watch:{
      scrollY(top){
        var _this=this
        const listArray = this.$refs.my_scroller_local.$el.getElementsByClassName("tit");
        for(let i =0; i<listArray.length; i++){
          if(top>=listArray[listArray.length-1].offsetTop){
            _this.activeCH=listArray[listArray.length-1].innerText
            return
          }
          if((listArray[i].offsetTop<=top&&top <listArray[i+1].offsetTop) ){
            _this.activeCH=listArray[i].innerText
            return
          }


        }
      }
    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .tit{
    margin: .05rem .2rem;
    text-transform:Uppercase;
    @include sc(.30rem,#8e8e93);
  }
  .g-items{
    margin-bottom: 0;
    .g-item{
      .img{
        margin-right: .27rem;
        width: .73rem;
        height: .73rem;
        overflow: hidden;
        background-color: #f6f6f6;
        img{
          width: 100%;
        }
      }
      .con{
        font-size: .29rem;
      }
      .info{
        @include sc(.29rem,#c21515);
        margin-left: .2rem;
      }
    }
  }
  .guide-wipe{
    position: fixed;
    width: .8rem;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 99999;

    .list-guide{


      dd{
        @include sc(.26rem,#555555);
        width: .8rem;
        text-align: center;
        padding-bottom: .05rem;
        font-family: Arial,Hiragino Sans GB,Microsoft Yahei,Helvetica Neue,Helvetica,sans-serif!important;
        position: relative;
        &.active{
          color: #fff;

          &:after{
            position: absolute;
            content: '';
            width: .32rem;
            height: .32rem;
            @include center();
            z-index: -1;
            border-radius: 50%;
            margin-top: -.04rem;
            background-color: #0bb20c;
          }
        }
        .tag{
          position: absolute;
          background-color: #c9c9c9;
          width: .8rem;
          height:.8rem;
          line-height: .8rem;
          @include sc(.4rem,#fff);
          font-family: Arial,Hiragino Sans GB,Microsoft Yahei,Helvetica Neue,Helvetica,sans-serif!important;
          left:-1.4rem;
          top:-.26rem;
          border-radius: 50%;
          &:before{
            position:absolute;
            content:"\00a0";
            display:inline-block;
            width:0;
            height:0;
            border-width:.33rem 0 .33rem .38rem;
            border-style:solid;
            border-color:transparent transparent transparent #c9c9c9;
            right: -.2rem;
            top:50%;
            margin-top: -.324rem;

          }
        }
      }
    }
  }
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
          @include sc(.35rem,#4b4b4b);
          margin-right: .7rem;
        }
      }
    }
    .list{
      .btns{
        margin-bottom: .1rem;
      }
    }

  }

</style>
