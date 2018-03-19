<template>
  <form class="index-searchbox flex-box" action>
    <input type="search" placeholder="请输入景点..." v-model="searchVal" @keydown.enter.prevent="searchTarget">
    <i class="iconfont icon-guanbi" @click.prevent="searchRemove" v-if="searchVal.length"></i>
    <i class="iconfont icon-sousuo1" @click.prevent="searchTarget" v-else></i>
  </form>
</template>
<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import * as mobile from '../../config/mUtils'
  export default {
    data () {
      return {
        searchVal: ''
      }
    },
    activated () {
    },
    computed: {
      ...mapState([
        'platform'
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
        if (this.platform == 'h5') {
          this.openUrl('#/search')
        } else {
          mobile.toast('努力查询中...')
          setTimeout(() => {
            this.openUrl('#/search')
          }, 1000)
        }
      }
    },
    watch:{
    }
  }

</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .index-searchbox{
    background-color: rgba(255,255,255,.7); padding: .1rem .2rem; border-radius: .3rem;

    display: flex;
    input{  background: none;font-size: .23rem;flex: 1; color: #919191}
    i{
      @include wh(.5rem,auto);
      text-align: right;
      display: block;
      @include sc(.35rem,#333631)
    }
  }

</style>
