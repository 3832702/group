import { jssdkConfig, pay } from "@/server/index.js"
import { domain } from "@/utils/util.js"

/**
 * [配置jssdk.config]
 * @param  {[String]} path [在path路径中的页面中使用]
 * @param  {[Array]} jsApiList [要使用的JS接口列表]
 * @param  {[Object]} context [jssdk实例]
 * @return {[type]}      [description]
 */
const employ = async function(path, jsApiList, context) {
  try {
    const { appId, timestamp, nonceStr, signature } = await jssdkConfig({ url: path });

    context.config({
      debug: false, // 开启调试模式
      appId, // 公众号唯一标识
      timestamp, // 签名时间戳
      nonceStr, // 签名随机串
      signature,// 签名
      jsApiList // 要使用的JS接口列表
    })

  }catch(err) {
    console.log(err)
  }
}

/**
 * [处理jssdk.config验证]
 * @param  {[String]} path      [需要使用JS-SDK的页面]
 * @param  {[Array]} jsApiList [需要使用的JS接口]
 * @param  {[Object]} context   [jssdk实例]
 * @return {[Promise]}         [jssdk接口处理决议]
 */
export const readySdkConfig = async function(path, jsApiList, context) {

  try {
    await employ(path, jsApiList, context)

    return new Promise((resolve, reject) => {
      context.ready(() => {
        resolve()
      })
      context.error((err) =>{
        reject(err)
      })
    })
  } catch(err) {
    console.log(err)
  }
}

/**
 * [处理jssdk.config验证]
 * @param  {[String]} path      [需要使用JS-SDK的页面]
 * @param  {[String]} iosPath      [需要使用JS-SDK的页面(ios)]
 * @param  {[Array]} jsApiList [需要使用的JS接口]
 * @param  {[Object]} context   [jssdk实例]
 * @return {[Promise]}         [jssdk接口处理决议]
 */
export const sdkConfig = async function(path, iosPath, jsApiList, context) {
  return new Promise(async (resolve, reject) => {
    try {
      let u = navigator.userAgent;

      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        await readySdkConfig(iosPath, jsApiList, context)
      } else {
        await readySdkConfig(path, jsApiList, context)
      }
      resolve()
    } catch(err) {
      reject(err)
    }
  })
}

/**
 * [获取地理位置]
 * @param  {[String]} path      [需要使用JS-SDK的页面]
 * @param  {[String]} connector [需要使用的JS接口]
 * @param  {[Object]} context   [jssdk实例]
 * @return {[Promise]}           [地理位置决议]
 */
export const getLocation = async function(context) {
  return new Promise((resolve, reject) => {
    context.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success(res) { resolve(res) },
      fail(err) { reject(err) }
    });
  })
}

/**
 * [拍照或从手机相册中选图]
 * @param  {[String]} path      [需要使用JS-SDK的页面]
 * @param  {[String]} connector [需要使用的JS接口]
 * @param  {[Object]} context   [jssdk实例]
 * @return {[Promise]}           [拍照或从手机相册中选图决议]
 */
export const chooseImage = async function(context, { count = 1, sizeType = ['compressed'], sourceType = ['album', 'camera'] }) {

  return new Promise((resolve, reject) => {
    context.chooseImage({
      count, // 默认9
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      sourceType, // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * [description]
 * @param  {[Object]}  context   [jssdk实例]
 * @param  {[String]}  localId  [需要上传的图片的本地ID，由chooseImage接口获得]
 * @param  {Number} [isShowProgressTips=1 }]  [默认为1，显示进度提示]
 * @return {[Object]}                        [Promise决议]
 */
export const uploadImage = async function(context, { localId, isShowProgressTips = 1 }) {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    });
  })
}

/**
 * [调起支付]
 * @param  {[String]} fee    [交易金额（支付单位：分）]
 * @param  {[String]} openid [用户openid]
 * @param  {[Object]} context   [jssdk实例]
 * @return {[type]}        [description]
 */

export const callPay = async function({fee, openid, attach}, context) {

  try {
    const { nonceStr, package: package1, paySign, signType, timeStamp } = await pay({ fee, openid, attach })

    return new Promise((resolve, reject) => {
      context.chooseWXPay({
        timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr, // 支付签名随机串，不长于 32 位
        package: package1, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign, // 支付签名
        success(res) { resolve(res) },
        fail(err) { reject(err) }
      })
    })
  } catch(err) {
    return Promise.reject(err)
  }
}

/**
 * [description 微信扫一扫]
 * @return {[type]} [description]
 */
export const scanQRCode = async function(context) {
  return new Promise((resolve, reject) => {
    context.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    });
  })
}

/**
 * [description 批量显示功能按钮接口]
 * @param  {[type]} context [description]
 * @return {[type]}         [description]
 */
export const showMenuItems = function(context) {
  return new Promise((resolve, reject) => {
    context.showMenuItems(
      {
        menuList: ['menuItem:copyUrl', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:QZone', 'menuItem:refresh'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3}
        success() {
          resolve(111)
        },
        fill() {
          reject(222)
        }
      }
    )
  })
}

/**
 * [description 批量隐藏功能按钮接口]
 * @param  {[type]} context [description]
 * @return {[type]}         [description]
 */
export const hideMenuItems = function(context, list = []) {
  let array = ['menuItem:copyUrl', 'menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:QZone']
  context.hideMenuItems({
    menuList: [...array, ...list] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  });
}

/**
 * [description 设置分享内容]
 * @param  {[type]} context [description]
 * @param  {[type]} title   [description]
 * @param  {[type]} desc    [description]
 * @param  {[type]} link    [description]
 * @param  {[type]} imgUrl  [description]
 * @return {[type]}         [description]
 */
export const updateAppMessageShareData = function(context, { title, desc, link, imgUrl }) {
  return new Promise((resolve, reject) => {
    context.updateAppMessageShareData({
        title, // 分享标题
        desc,
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
    })
  })
}

/**
 * [description 设置分享内容]
 * @param  {[type]} context [description]
 * @param  {[type]} title   [description]
 * @param  {[type]} desc    [description]
 * @param  {[type]} link    [description]
 * @param  {[type]} imgUrl  [description]
 * @return {[type]}         [description]
 */
export const updateTimelineShareData = function(context, { title, desc, link, imgUrl }) {
  return new Promise((resolve, reject) => {
    context.updateTimelineShareData({
        title, // 分享标题
        desc,
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
    })
  })
}

/**
 * [设置分享数据]
 * @param  {[Object]} content     [wx]
 * @param  {Object} shareObj [分享选项]
 * @return {[type]}             [description]
 */
export const setShareConfig = async function(content, shareObj = {
  title: '壹城好店',
  link: `${domain}/index`,
  desc: '社区拼团购物微商城,同城下单6小时到家,团长镖师皆可来兼职 ',
  imgUrl: 'https://store.nineopen.com/upload/20190529/4df2d9eb39855438687b7467cab54045.png'
}) {

  try {
    await showMenuItems(content)
    updateAppMessageShareData(content, shareObj)
    updateTimelineShareData(content, shareObj)
  }catch(err) {
    console.log(err)
  }
}
