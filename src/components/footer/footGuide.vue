<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress({path: '/main'})" class="guide_item" :class="active('main') ?'active':''">
        	<i class="iconfont icon-shouye"></i>
          <span>首页</span>
        </section>
        <section @click = "gotoAddress({path: '/activity'})" class="guide_item" :class="active('activity')?'active':''">
          <i class="iconfont icon-qihang-copy" style="font-size: .48rem;"></i>
          <span>活动中心</span>
        </section>
        <section @click = "gotoAddress({path: '/user'})" class="guide_item" :class="active('user')?'active':''">
          <i class="iconfont icon-wode"></i>
          <span>个人中心</span>
        </section>
    </section>
</template>

<script>
    import {mapState , mapMutations , mapActions} from 'vuex'
    export default {
    	data(){
            return{
            }
        },
        created(){
        },
        activated(){

        },
        mounted(){

        },
        computed: {


        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	},
          active(page){
        	  return this.$route.path.indexOf(page) !== -1
          }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../assets/css/mixin';

    #foot_guide{
        background-color: #f7f7f7;
        position: absolute;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 0.90rem);
        display: flex;
        border-top: 1px solid #e4e4e4;
        //box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
      position: relative;
      .iconfont{
        display: block;
        color: #727272;
        @include wh(1.5rem, .44rem);
        margin-top: .07rem;
        font-size: .45rem;
      }
      span{
        @include sc(.18rem, #464646);
        line-height: .32rem;
      }
      &.active{
        .iconfont{
          color: $green;
        }
        span{
          color: $green;
        }
      }

    }

</style>
