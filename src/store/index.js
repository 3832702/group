import Actions from "@/store/actions.js"
import Getters from "@/store/getters.js"
import Mutations from "@/store/mutations.js"

import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    city: {}, // 当前城市
    consignee: {}, // 收货人信息
    locatingCityObj: {}, // 定位城市
    area_id: 0, // 地区
    details: {}, // 用户信息
    searchText: '', // 要搜索的值
    lately: [], // 最近搜索
    orderIndex: 1, // 订单列表索引
    skipnum: 0, // 跳转后缀
  },
  actions: Actions,
  getters: Getters,
  mutations: Mutations
})
