import * as getData from '../service/getData'
import * as types from './mutation-types.js'

import store from '../story/'



// export default {

//   async getCartlist({
//     commit,
//     state
//   }) {
//     let res = await getData.shoppingCartNum();
//     commit(types.SAVE_CARTLIST, res.shoppingCartNum)
//   }

// }
function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }
      return step("next");
    });
  };
}

export default {

  getCartlist({
    commit,
    state
  }) {
    return _asyncToGenerator(function* () {
      let res = yield getData.shoppingCartNum();
      commit(types.SAVE_CARTLIST, res.shoppingCartNum);
    })();
  }

};