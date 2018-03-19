import * as types from './mutation-types.js'
import * as mobile from '../config/mUtils'

import {
  setStore,
  getStore
} from '../config/mUtils'

export default {

  //设置滚动条位置
  [types.SET_POSITION](state, routeName) {
    state.arrPageName=routeName
    for(const attr in state.position){
      if(routeName==attr){
        setTimeout(()=>{state.position[attr].scroller.scrollTo(state.position[attr].pos.left,state.position[attr].pos.top)},10)
      }
    }
  },
  //设置滚动条位置
  [types.SAVE_PAGE](state,{pos, scroller}) {
    state.position[state.arrPageName]={pos:pos,scroller:scroller}
  },
  //设置当前位置
  [types.SET_LOCATION](state,{city,lng,lat,citycode}) {
    mobile.setStore('city',city)
    mobile.setStore('activeLocation',[lng,lat])
    mobile.setStore('citycode',citycode)
    state.city = city
    state.activeLocation = [lng,lat]
    state.citycode=citycode
  },
  //设置当前城市
  [types.SET_LOCATIONCITY](state,{locationCity,locationCitycode}) {
    mobile.setStore('locationCity',locationCity)
    mobile.setStore('locationCitycode',locationCitycode)
    state.locationCity = locationCity
    state.locationCitycode = locationCitycode
  },
  //记录搜索信息
  [types.SET_SEARCHKEY](state, key) {
    mobile.setStore('searchKey',key)
    state.searchKey = key
  },
}
