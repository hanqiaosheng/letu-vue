<template>
  <header class="top-searchbar flex-box">
    <div class="back"  v-if="goBack" @click="$router.go(-1)">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="searchbar-con" v-if="searchKey">
      <search-bar></search-bar>
    </div>
    <div style="flex: 1" v-if="headTitle">
    <section class="title-head ellipsis">
      {{headTitle}}
    </section>
    </div>
    <slot name="list"></slot>
    <slot name="cartEdit"></slot>
    <slot name="jifenrule"></slot>
    <!-- </transition> -->
  </header>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import searchBar from '../searchBar/searchBar'
  import * as getData from '../../service/getData'
  export default {
    data () {
      return {

      }
    },
    created () {


    },
    props: ['searchKey', 'headTitle', 'goBack'],
    computed: {
      ...mapState([
        'userInfo',
        'activeCityOnce',
        'showLoading',
      ])
    },

    methods:{
      ...mapActions([
        'getUserInfo'
      ]),
      ...mapMutations([
        'SAVE_ACTIVECITY'
      ]),
      /*getUserInfo () {
        this.$store.commit('getUserInfo')
      }*/
    },
    components: {
      searchBar
    },
  }
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .top-searchbar{
    position: relative;
    z-index: 200;
    height: .86rem;
    background-color: #fff;
    border-bottom:1px solid #dfdfdf;
    .back{
      padding: 0.1rem 0.2rem;
      i{
        @include sc(.28rem,#878787)
      }
    }
    .searchbar-con{
      flex: 1;
      margin:0 .1rem;
    }
    .title-head{
      @include center;
      width: 50%;
      text-align: center;
      @include sc(0.30rem, #282828);
      text-align: center;
    }
  }
</style>
