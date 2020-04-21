import { goodsCoverChange } from "@/utils/util.js"
import Vue from 'vue'
import Local from "@/utils/local.js"
import VueLazyload from 'vue-lazyload'
import Wx from '@/utils/jssdk.js'

const CoverChange = {
  install() {
    Vue.prototype.$coverChange = goodsCoverChange
  }
}

Vue.prototype.$shareFn = {}

Vue.use(VueLazyload)
Vue.use(CoverChange) // 更改封面图类型
Vue.use(Local); // cookie操作
Vue.use(Wx); // 微信jssdk
