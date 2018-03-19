<template>
  <div class="warp page1" >

    <el-amap vid="amap" ref="maps" :zoom="16" :events="events" :center="center" class="amap">
      <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :key="index"></el-amap-marker>
    </el-amap>
    <div class="bottominfo">
      <div class="d1">{{add}}</div>
      <div class="d2">{{localtion+add}}</div>
    </div>
  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import * as mobile from '../config/mUtils'
  import {mapState, mapMutations,mapActions} from 'vuex'
  export default {
    data () {
      let self = this;
      return {
      	detail:null,
        center:[],
        markers: [],
        events: {
          init(o) {
            o.getCity(result => {
              self.localtion=result.province+result.city+result.district
            })
          }
        },
        add: '',
        localtion: ''

      }
    },
    activated(){
      this.add = this.$route.query.add
      this.center = [this.$route.query.lng,this.$route.query.lat]
      this.markers=[{
        position: [this.$route.query.lng,this.$route.query.lat],
        events: {
          click: () => {
            alert('click marker');
          }
        },
        visible: true,
        draggable: false
      }]
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

    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .bottominfo{
    position: absolute;
    bottom: 0;
    padding: .3rem .2rem;
    padding-bottom: .5rem;
    background-color: #fff;
    z-index: 600;
    width: 100%;
    .d1{
      @include sc(.3rem,#444);
      margin-bottom: .05rem;
    }
    .d2{
      @include sc(.24rem,#999)
    }

  }

</style>
