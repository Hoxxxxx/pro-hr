import * as types from './mutation-types'
const mutations = {
  [types.SAVE_USER_INFO](state, val) {
    state.userInfo = val
    sessionStorage.setItem('userInfo',JSON.stringify(val))
  }
}
export default mutations