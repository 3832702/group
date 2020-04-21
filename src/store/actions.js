import { userTypeFind } from "@/server/index.js"
import Vue from "vue"

// import { getUnionid, cityHandler } from "@/utils/util.js"
// import { getLocation } from "@/utils/employ-jssdk.js"
// import { cityList } from "@/server/index.js"

export default {
  /**
   * [initDetails 获取用户信息]
   * @param  {[type]}  commit [description]
   * @param  {[type]}  state  [description]
   * @return {Promise}        [description]
   */
  async initDetails({ commit, state }, constraint) {
    if (state.details.unionid && !constraint) {
      return Promise.resolve()
    }
    const details = await userTypeFind()
    const { area_id } = details
    commit('CHANGEAREAID', area_id)
    commit('CHANGEDETAILS', details)
    //original();
    return Promise.resolve()
  },

  /**
   * [latelyHandler 设置最近搜索]
   * @param  {[type]} commit [description]
   * @param  {[type]} state  [description]
   * @return {[type]}        [description]
   */
  latelyHandler({ commit }, data) {
    const { $local: { fetch, save } } = Vue.prototype;

    let lately = fetch('lately')
    //alert(fetch('lately'))
    lately = lately ? JSON.parse(lately): [];

    if (!data) {
      commit('CHANGELATELY', lately)
      return
    }

    if (Array.isArray(data)) {
      commit('CHANGELATELY', data)
      save('lately', data)
      return;
    }

    lately = lately.some(item => item === data) ? lately: [data, ...lately]

    if (lately.length > 6) { lately.length = 6 }

    save('lately', lately)
    commit('CHANGELATELY', lately)
  },

  /**
   * [locationAreaId 获取地区id]
   * @return {[type]} [description]
   */
  async changeAreaId({ commit, state }) {
    if (state.area_id) {
      return Promise.resolve()
    }

    try {
      // let list = await cityList()
      // const { latitude, longitude } = await getLocation(Vue.prototype.$wx);
      // const city = await cityHandler({ latitude, longitude });
      // let area_id = 0;
      //
      // list.forEach(item => {
      //   if ( city.indexOf(item.city) !== -1) {
      //     area_id = item.area_id
      //   }
      // })

      // commit('CHANGEAREAID', area_id)
      commit('CHANGEAREAID', 1)
    } catch(err) {
      console.log(err)
    }
  }
}
