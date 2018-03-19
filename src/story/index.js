import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}
const state = {
  activeLocation:JSON.parse(getStore('activeLocation')) || [120.1747,30.33467],//当经纬度
  locationCity:getStore('locationCity')||"杭州",//定位城市
  locationCitycode:getStore('locationCitycode')||"0571",//定位城市CODE
  city:getStore('city')||"杭州", //当前城市
  citycode:getStore('citycode')||"0571", //当前城市CODE

  platform:getStore('platform')||'h5',//平台

  showAlert:false,
  alertMessage:'提示',
  alertFn:()=>{},

  title:'',
  href:'',
  norequiresAuth:'',

  searchKey:getStore('searchKey')||'',//搜索信息

  position:{},//之前页面位置
  arrPageName:'index',//当前页面NAME











}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
