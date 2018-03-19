import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '../config/env'

const index = r => require.ensure([], () => r(require('../page/index')), 'index')
const level = r => require.ensure([], () => r(require('../page/level')), 'level')
const main = r => require.ensure([], () => r(require('../page/main')), 'main')
const proDetail = r => require.ensure([], () => r(require('../page/proDetail.vue')), 'proDetail')
const strategy = r => require.ensure([], () => r(require('../page/strategy.vue')), 'strategy')
const cardBag = r => require.ensure([], () => r(require('../page/cardBag.vue')), 'cardBag')
const ticket = r => require.ensure([], () => r(require('../page/ticket.vue')), 'ticket')
const ticketDetail = r => require.ensure([], () => r(require('../page/ticketDetail.vue')), 'ticketDetail')
const selectCity = r => require.ensure([], () => r(require('../page/selectCity.vue')), 'selectCity')
const search = r => require.ensure([], () => r(require('../page/search.vue')), 'search')
const description = r => require.ensure([], () => r(require('../page/description.vue')), 'description')
const descriptionGuide = r => require.ensure([], () => r(require('../page/descriptionGuide.vue')), 'descriptionGuide')
const consumptionDetail = r => require.ensure([], () => r(require('../page/consumptionDetail.vue')), 'consumptionDetail')
const wallet = r => require.ensure([], () => r(require('../page/wallet.vue')), 'wallet')
const mybalance = r => require.ensure([], () => r(require('../page/mybalance.vue')), 'mybalance')
const activity = r => require.ensure([], () => r(require('../page/activity.vue')), 'activity')
const user = r => require.ensure([], () => r(require('../page/user.vue')), 'user')
const proLocaltion = r => require.ensure([], () => r(require('../page/proLocaltion.vue')), 'proLocaltion')


Vue.use(Router)

export default new Router({

  mode: routerMode,
  saveScrollPosition:true,
  strict: process.env.NODE_ENV !== 'production',
  routes: [
    {
      path: '',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      meta: { norequiresAuth: true,title:'首页' ,nopush:true},
      component:main,

    },
    {
      path: '/proDetail/:id',
      name: 'proDetail',
      meta: { norequiresAuth: true,title:'产品详情'},
      component:proDetail
    },
    {
      path: '/strategy',
      name: 'strategy',
      meta: { norequiresAuth: true,title:'骑游攻略'},
      component:strategy
    },{
      path: '/cardBag',
      name: 'cardBag',
      meta: {title:'卡包' },
      component:cardBag
    },{
      path: '/ticket',
      name: 'ticket',
      meta: {title:'门票'},
      component:ticket
    },{
      path: '/ticketDetail/:id',
      name: 'ticketDetail',
      meta: {title:'取票详情' },
      component:ticketDetail
    },{
      path: '/selectCity',
      name: 'selectCity',
      meta: { norequiresAuth: true,title:'选择城市',nokeepAlive:true,nopush:true },
      component:selectCity
    },{
      path: '/search',
      name: 'search',
      meta: { norequiresAuth: true,title:'搜索',nokeepAlive:true},
      component:search
    },{
      path: '/description/:id',
      name: 'description',
      meta: { norequiresAuth: true,title:'详细说明' },
      component:description
    },{
      path: '/descriptionGuide/:id',
      name: 'descriptionGuide',
      meta: { norequiresAuth: true,title:'信息须知' },
      component:descriptionGuide
    },
    {
      path: '/index',
      name: 'index',
      meta: { norequiresAuth: true,title:'行程详情',nokeepAlive:true },
      component:index,

    },
    {
      path: '/level',
      name: 'level',
      meta: { norequiresAuth: true,title:'等级规则',nokeepAlive:true },
      component:level
    },
    {
      path: '/consumptionDetail',
      name: 'consumptionDetail',
      meta: {title:'明细' },
      component:consumptionDetail
    },
    {
      path: '/wallet',
      name: 'wallet',
      meta: { title:'我的钱包'},
      component:wallet
    },
    {
      path: '/mybalance',
      name: 'mybalance',
      meta: { title:'余额' },
      component:mybalance
    },
    {
      path: '/activity',
      name: 'activity',
      meta: { norequiresAuth: true,title:'活动中心' },
      component:activity
    },
    {
      path: '/user',
      name: 'user',
      meta: { title:'个人中心' },
      component:user
    },
    {
      path: '/proLocaltion',
      name: 'proLocaltion',
      meta: { norequiresAuth: true, title:'景点位置' },
      component:proLocaltion
    }

  ]
})
