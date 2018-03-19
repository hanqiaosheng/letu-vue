<template>
  <div class="warp page1" >
    <div class="main-box">
      <scroller ref="my_scroller">
        <div class="detail">
          <div class="detailbox" v-if="detail">

           <div class="item">
              <div class="label">景区开放时间</div>
              <p>{{detail.scenicSpotOpenTime}}</p>
              <p>此门票下单后2小时生效，如当天游玩敬请注意游玩时 间，须知晓！</p>
            </div>
            <div class="item">
              <div class="label">特殊人群政策</div>
              <p>{{detail.scenicSpotPolicy}}</p>
            </div>
            <div class="item">
              <div class="label">预订提醒</div>
              <p>{{detail.scenicSpotMsg}}</p>
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
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          paginationClickable: true,
          autoplay : 2000,
          initialSlide :1,
          autoplayDisableOnInteraction : false,
        },
        detail: null
      }
    },
    activated(){
      getData.scenicMsg(this.$route.params.id).then(res => {
        this.detail = res.data.data.scenicSpot
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

    }

  }

</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .detail{
    padding: .25rem;
  }
  .detailbox{

    .item{
      margin-top: .3rem;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: .3rem;
      .label{
        margin-bottom: .1rem;
        @include sc(.25rem,#4b4b4b);
        position: relative;
      }
      p{
        @include sc(.23rem,#97969b);
        line-height: 1.8;
        &.danger{
          color: $green;
        }
      }
    }
  }


</style>
