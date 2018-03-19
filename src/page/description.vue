<template>
  <div class="warp page1" >
    <div class="main-box">
      <scroller ref="my_scroller">
        <div class="detail">
          <div class="detailbox" v-if="detail" v-html="detail.discountPackageDetail">
<!--            <div class="item">
              <div class="label">预订时间</div>
              <p>当天8点前可预订当日票</p>
            </div>
            <div class="item">
              <div class="label">取票时间</div>
              <p>8:30-16:00（换票时间） </p>
            </div>
            <div class="item">
              <div class="label">退改规则</div>
              <p>本产品支持取消，但不支持部分退订  </p>
              <p>如需取消订单，请登录全域账户中申请取消 </p>
              <p class="danger">超出使用日期30天后申请取消，收取100（30天内）</p>
            </div>-->
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
        detail:null
      }
    },
    activated(){
      getData.packageContent(this.$route.params.id).then(res => {
        this.detail = res.data.data.discountPackage
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
    padding: .35rem .25rem;
  }
  .detailbox{
    .item{
      padding-left: .20rem;
      margin-top: .2rem;
      .label{
        margin-bottom: .1rem;
        @include sc(.25rem,#4b4b4b);
        position: relative;
        &:before{
          content: '';
          position: absolute;
          width: .1rem;
          height: .1rem;
          border-radius: 50%;
          background-color: $green;
          @include ct();
          left:-.2rem;
        }
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
