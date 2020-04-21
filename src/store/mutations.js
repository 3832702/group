import {
  CHANGECITY,
  CHANGECONSIGNEE,
  CHANGELOCATIONGCITY,
  CHANGEAREAID,
  CHANGEDETAILS,
  CHANGESEARCHTEXT,
  CHANGEBALANCE,
  CHANGELATELY,
  CHANGEORDERINDEX,
  CHANGESKIP
} from "@/store/mutation-types.js"

export default {
  /**
   * [city 更改收货人地址]
   * @type {[type]}
   */
  [CHANGECITY](state, city) {
    state.city = city;
  },
  /**
   * 更改收货人信息
   */
  [CHANGECONSIGNEE](state, consignee) {
    state.consignee = consignee
  },

  /**
   * 更改定位地址
   */
  [CHANGELOCATIONGCITY](state, city) {
    state.locatingCityObj = city;
  },

  /**
   * 更改地区
   */
  [CHANGEAREAID](state, area_id) {
    state.area_id = area_id
  },

  /**
   * 更改用户信息
   */
  [CHANGEDETAILS](state, details) {
    state.details = details
  },

  /**
   * 搜索商品名称
   */
  [CHANGESEARCHTEXT](state, search) {
    state.searchText = search
  },

  /**
   * [balance 余额]
   * @type {[type]}
   */
  [CHANGEBALANCE](state, balance) {
    state.balance = balance
  },

  /**
   * 最近搜索
   */
  [CHANGELATELY](state, lately) {

    state.lately = lately
  },

  /**
   * [orderIndex 更改订单索引]
   * @type {[type]}
   */
  [CHANGEORDERINDEX](state, index) {
    state.orderIndex = index
  },

  /**
   * 更改skip
   */
  [CHANGESKIP](state, skip) {
    state.skipnum = skip
  }
}
