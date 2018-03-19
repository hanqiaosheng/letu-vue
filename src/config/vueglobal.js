import {path} from '../config/env'
import store from '../story/'
import * as mobile from '../config/mUtils'
export default{

  install(Vue,options)
  {
    Vue.prototype.openUrl = url => {

      if(url.indexOf('#')>=0){

        window.location.href = url
      }else{
        window.location.href = path+url
      }

    }
  }
}
