<template>
  <div class="warp page1" >
    <scroller ref="my_scroller">
    <div class="mapbox">
      <ul class="level-list">
        <li>
          <div class="tit"><i class="icon"><svg t="1502330425374" class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20775"><path d="M234.666667 298.666667C199.253333 298.666667 170.666667 270.08 170.666667 234.666667 170.666667 199.253333 199.253333 170.666667 234.666667 170.666667 270.08 170.666667 298.666667 199.253333 298.666667 234.666667 298.666667 270.08 270.08 298.666667 234.666667 298.666667M913.493333 494.08 529.493333 110.08C514.133333 94.72 492.8 85.333333 469.333333 85.333333L170.666667 85.333333C123.306667 85.333333 85.333333 123.306667 85.333333 170.666667L85.333333 469.333333C85.333333 492.8 94.72 514.133333 110.506667 529.493333L494.08 913.493333C509.866667 928.853333 531.2 938.666667 554.666667 938.666667 578.133333 938.666667 599.466667 928.853333 614.826667 913.493333L913.493333 614.826667C929.28 599.466667 938.666667 578.133333 938.666667 554.666667 938.666667 530.773333 928.853333 509.44 913.493333 494.08Z" p-id="20776" fill="#65c449"></path></svg></i>等级介绍</div>
          <div class="con">全域骑游针对所有用户采用积分等级制度，该制度根据用户积分得到对应等级，等级从LV0到LV8一共分为9级，对于拥有不同等级的用户，全域骑游将会给予不同程度的优惠，等级越高优惠越给力哦！</div>
        </li>
        <li>
          <div class="tit"><i class="icon"><svg t="1502330788475" class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6213"><path d="M767.829333 416.426667l-291.84 291.584a24.234667 24.234667 0 0 1-33.706666 0 23.978667 23.978667 0 0 1 0-33.621334l291.84-291.584-92.16-91.989333-293.12 292.693333a24.064 24.064 0 0 1-33.792 0 23.125333 23.125333 0 0 1-6.826667-16.725333c0-6.229333 2.133333-12.202667 6.826667-16.810667L608.426667 257.109333l-73.984-73.898666-374.528 374.272 0.341333 0.426666a27.050667 27.050667 0 0 0-5.12 8.362667L3.328 983.04a29.354667 29.354667 0 0 0 6.826667 31.146667 29.44 29.44 0 0 0 31.232 7.082666l416.938666-152.149333a25.514667 25.514667 0 0 0 8.533334-5.12l0.426666 0.512 374.357334-374.272-73.728-73.813333z m-545.706666 458.496l-72.533334-72.789334 63.573334-174.592 183.808 183.552-174.848 63.829334zM992.085333 339.882667l-116.906666 116.736c-59.989333-59.989333-199.424-199.594667-307.029334-306.944l116.906667-116.906667a107.946667 107.946667 0 0 1 152.32 0l154.794667 154.794667c41.813333 41.813333 41.813333 110.165333 0 152.32" p-id="6214" fill="#65c449"></path></svg></i>升级规则</div>
          <div class="con">用户获取积分达到升级门槛值时将会上升等级，新等级立即生效。</div>
        </li>
        <li>
          <div class="tit"><i class="icon"><svg t="1502330871418" class="icon" style="vertical-align: middle;fill: currentColor;overflow: hidden; margin-top: .02rem" viewBox="0 0 1181 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23676"><path d="M0 4.253538v76.87877h72.782769l475.608616 867.24923 73.728-2.678153L1016.359385 75.460923 1104.974769 74.043077V0h-315.864615v75.539692h83.101538l-244.184615 558.788923L315.313231 75.618462h154.781538L472.064 0z" p-id="23677" fill="#65c449"></path></svg></i>等级对应表</div>
          <div class="con">
            相应积分对应等级，具体规则如下：
            <div class="table-box">
            <table>
              <thead>
                <tr><th>积分</th><th>等级</th><th>称谓</th></tr>
              </thead>
              <tbody>
                <tr><td>0-50</td><td>LV0</td><td>不足为骑</td></tr>
                <tr><td>51-200</td><td>LV1</td><td>骑思妙想</td></tr>
                <tr><td>201-500</td><td>LV2</td><td>骑乐无穷</td></tr>
                <tr><td>501-2000</td><td>LV3</td><td>出骑制胜</td></tr>
                <tr><td>2001-4000</td><td>LV4</td><td>骑行天下</td></tr>
                <tr><td>4001-7000</td><td>LV5</td><td>旷日骑才</td></tr>
                <tr><td>7001-15000</td><td>LV6</td><td>骑天大圣</td></tr>
                <tr><td>15001-30000</td><td>LV7</td><td>我是传骑</td></tr>
                <tr><td>30001-60000</td><td>LV8</td><td>骑无止境</td></tr>
              </tbody>
            </table>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </scroller>
  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  export default {
    data () {
      return {

      }
    },
    activated(){

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
  .page1{


    background-color: #fff;

  }
  .level-list{
    li{

      padding: .40rem .1rem .40rem .62rem;
      margin: 0 .25rem;
      border-bottom: 1px solid #eee;
      &:last-child{
        border: none;
      }
      .tit{
        position: relative;
        @include sc(.26rem,#4b4b4b);
        margin-bottom: .25rem;
        i{
          position: absolute;
          left:-.6rem;
          width: .42rem;
          height: .42rem;
          border:1px solid #577172;
          border-radius: 50%;
          svg{
            width: .25rem;
            height: .25rem;
            @include center();
          }
        }
      }
      .con{
        @include sc(.24rem,#a8a8a8);
        line-height: 1.8;
        .table-box{
          margin-right: .52rem;
        }
        table{
          width: 100%;
          text-align: center;
          border-collapse: collapse;
          border-spacing: 0;
          display: table;
          margin-top: .2rem;
          th,td{
            border: 1px solid #000000;
            color: #4b4b4b;
            padding: .1rem 0;
          }

        }
      }

    }
  }

</style>
