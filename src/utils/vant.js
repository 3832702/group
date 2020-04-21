import Vue from 'vue'

import { Field, Step, Steps, NoticeBar, Dialog, Tab, Tabs, Toast, SwipeCell, Button, Popup, PullRefresh, List } from 'vant';

const D = {
  install() {

    function DialogWrap(options) {
      return new Promise((resolve, reject) => {
        Dialog.confirm({
          ...options
        }).then((e) => {
          // on confirm
          if (e === 'confirm') {
            resolve('confirm')
          }
        }).catch((e) => {
          // on cancel
          if (e === 'cancel') {
            resolve('cancel')
          } else {
            reject(e)
          }
        });
      })
    }

    Vue.prototype.$Dialog = DialogWrap
  }
}

const DialogVant = {
  install() {
    Vue.prototype.$DialogVant = Dialog
  }
}


/**
 * [toastLoading 加载]
 * @type {Object}
 */
const toastLoading = {
  install() {
    function toastLoadingWrap (message="加载中") {
      return Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message
      });
    }

    Vue.prototype.$toastLoading = toastLoadingWrap
  }
}

Vue.use(Step).use(Steps).use(NoticeBar).use(D).use(Toast).use(toastLoading).use(SwipeCell).use(Field).use(Button).use(Popup).use(PullRefresh).use(List).use(Tab).use(Tabs).use(DialogVant);
