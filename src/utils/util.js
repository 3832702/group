import Vue from 'vue'
import store from "@/store/index.js"

export const toLoad = function({ el = '#app', cb }) {
    //可滚动容器的高度
  let innerHeight = window.document.querySelector(el).clientHeight;
  //屏幕尺寸高度
  let outerHeight = window.document.documentElement.clientHeight;
  //可滚动容器超出当前窗口显示范围的高度
  let scrollTop = window.document.documentElement.scrollTop || window.document.body.scrollTop;

  if (innerHeight <= (outerHeight + scrollTop)) {
      typeof cb === 'function' && cb();
  }
}

/**
 * [description 获取unionid]
 * @return {[type]} [description]
 */
export const getUnionid = function() {
  const { $local: { fetch } } = Vue.prototype;

  let data = fetch('unionid')
  let { unionid } = data ? JSON.parse(data): { unionid: '' };

  return unionid
}

/**
 * [description 获取地址id]
 * @return {[type]} [description]
 */
export const getAreaId = async function() {
  try {
    let { dispatch, state: { area_id } } = store;

    if (!area_id) {
      await dispatch('changeAreaId')
    }

    return Promise.resolve(store.state.area_id)
  }catch(err) {
    console.log(err)
  }
}

/**
 * [isFinished 计算瀑布流中的finished]
 * @return {[type]} [description]
 */
export const isFinished = function(data, length = 6) {
  return (!data.length || data.length < length) ? true : false
}


/* eslint-disable */
/**
 * [cityHandler 经纬度解析成城市]
 * @param  {[String]} latitude  [纬度]
 * @param  {[String]} longitude [经度]
 * @return {[type]}           [description]
 */
export const cityHandler = function({ latitude, longitude }) {
  return new Promise((resolve) => {
    const cs = new qq.maps.CityService({
      complete: res => {
        const { detail: { detail } } = res;
        const city = detail.split(',')[1]
        resolve(city);
      }
    });
    cs.searchCityByLatLng(new qq.maps.LatLng(latitude, longitude));
  })
}

/* eslint-enable */

/**
 * [domain 更改封面图类型]
 * @type {String}
 */
export const goodsCoverChange = function(data) {

  if (Array.isArray(data)) {
    return data[0]
  }

  if (typeof data === 'string') {
    return data;
  }

  return null;
}

/**
 * [提示]
 * @param  {[Object]} content  [组件实例]
 * @param  {[String]} message  [提示语]
 * @param  {[String]} duration [展示时间]
 * @return {[type]}          [description]
 */
export const hintChange = function(content, { message, duration }) {
  return new Promise((resolve) => {
    content.$toast({
      duration,
      message,
      forbidClick: true,
      // mask: true,
      onClose() { resolve() }
    })
  })
}


/**
 * [domain 域名]
 * @type {String}
 */
export const domain = 'https://tuan.nineopen.com/home';
