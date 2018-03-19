<template>
  <div class="warp page1" >
    <div class="main-box main-box2">
      <scroller ref="my_scroller" v-if="detail">
        <div class="user-top">
          <div class="user-pic flex-box">
            <div class="userpicbox flex-box">
              <img :src="detail.userProfileImage" v-if="detail.userProfileImage" alt="" id="userHead">
              <img src="../assets/images/bike.png" v-else alt="">
            </div>
          </div>
          <p class="p1" id="realName">{{detail.userTel}}</p>
        </div>
        <div id="myShow">

              <div class="swiper-slide tab-content-1 swiper-slide-active" >
                <div class="weui_cells weui_cells_info">
                  <a class="weui_cell" @click = "openUrl('#/wallet')">
                    <div class="weui_cell_hd">
                      <label class="weui-label"><i class="iconfont icon-iconmingchengpaixu65"></i>我的钱包</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>

                  <a class="weui_cell" href="user-wallet.html" id="wallet" style="display: none;">
                    <div class="weui_cell_hd">
                      <label class="weui-label flex-box">我的钱包</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>

                  <a class="weui_cell" @click="openUrl('/html/user-journey.html')">
                    <div class="weui_cell_hd">
                      <label class="weui-label"><i class="iconfont icon-zixingche"></i>我的行程</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>


                  <a class="weui_cell" @click="openUrl('/html/user-message.html')">
                    <div class="weui_cell_hd">
                      <label class="weui-label"><i class="iconfont icon-iconfontmark"></i>我的消息</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>

                </div>

                <div class="weui_cells weui_cells_info">
                  <a class="weui_cell" @click="openUrl('/html/user-guide.html')">
                    <div class="weui_cell_hd">
                      <label class="weui-label"><i class="iconfont icon-rectangle392oval2382"></i>用户指南</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>
                  <a class="weui_cell" @click="openUrl('/html/user-feedback.html')">
                    <div class="weui_cell_hd">
                      <label class="weui-label"><i class="iconfont icon-yonghufankui03"></i>客服中心</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>
                  <!-- <a class="weui_cell" href="user-contact.html">
                      <div class="weui_cell_hd">
                          <label class="weui-label"><i class="iconfont-yao icon2-yichang"></i>异常处理</label>
                      </div>
                      <i class="iconfont-yao icon2-yichang1" style="font-size:20px;"></i>
                  </a> -->
                  <a class="weui_cell" @click="openUrl('/html/user-insurance.html')">
                    <div class="weui_cell_hd">
                      <label class="weui-label"><i class="iconfont icon-baoxian"></i>保险申请</label>
                    </div>
                    <i class="iconfont icon-qianjin r-con"></i>
                  </a>

                </div>
              </div>

        </div>




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
        detail:null
      }
    },
    activated(){
      getData.userPage().then(res => {
        this.detail = res.data.data.user
      })
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
  .user-top{
    @include wh(100%,4rem);
    background-image: url("../assets/images/userbg.jpg");
    background-size: 100% auto;
    background-color: #ccc;
    background-position: center center;
    padding-top: 30px;
    .p1{
      font-size: 0.28rem;
      margin-top: 0.15rem;
      margin-bottom: 0.1rem;
      text-align: center;
      color: #fff;
    }
  }
  .user-pic{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin: 0 auto;
    border: 5px solid rgba(255,255,255,.8);
    position: relative;
    overflow: hidden;

  }
 .userpicbox {
   width: 1.5rem;
   height: 1.5rem;
   background-color: #ccc;
   img{
     width: 100%;
   }
  }
  .weui_cells {
    margin-top: 0.1rem;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    overflow: hidden;
    position: relative;
    overflow: hidden;
  }
  .weui_cell {
    padding: 0.25rem 0;
    margin: 0 0.15rem;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    min-height: 0.35rem;
  }
  .weui_cells_info .weui_cell_hd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .weui_cell_hd {
    display: block;
    width: 0.8rem;
    word-wrap: break-word;
    word-break: break-all;
    color: #323232;
    font-size: 0.28rem;
  }
  .weui_cell_hd i {
    width: 0.5rem;
    font-size: 0.3rem;

    display: inline-block;
    color: #c2c2c2;
  }
  .weui_cell .r-con {
    position: relative;
    color: #999;
    font-size: 0.3rem;
    height: 0.18rem;
    display: block;
    line-height: 0.2rem;
  }
</style>
