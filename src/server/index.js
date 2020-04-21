import { post, fetch, put, remove } from "@/fetch/index.js";
import { getUnionid, getAreaId } from "@/utils/util.js"

/**
 * [description 防抖]
 * @param  {[Number]} delay [延迟时间  毫秒]
 * @param  {Function} cb    [要执行的回调]
 * @return {[type]}         [description]
 */
export const debounce = function(delay, cb) {

  window.clearTimeout(cb.timer)
  cb.timer = window.setTimeout(() => {
    cb()
  }, delay)
}

/**
 * [description 节流]
 * @param  {[Number]} wait [延迟时间 毫秒]
 * @param  {Function} func    [要执行的回调]
 * @return {[type]}         [description]
 */
export const throttling = function throttle(wait, func) {
    let timeout, context, args;
    let previous = 0;

    let later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    let throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}

/**
 * [授权弹窗]
 * @param  {[String]} path [页面重定向的路径]
 */
export const authorization = function(path) {
  return post('wx/url', { url: path })
}

/**
 * [登录]
 * @param  {[String]} code [登录所需code]
 */
export const login = function({ code }) {
  return post('wx/login', { code })
}

/**
 * [分类列表]
 */
export const cateList = function() {
  return post('api/cate_list')
}

/**
 * [获取首页分类id]
 * @param  {[String]} area_id [地区id]
 * @param  {[Number]} page    [分页]
 * @param  {[String]} cate_id [分类id]
 * @return {[type]}         [description]
 */
export const homeCateList = async function({ area_id, page, cate_id }) {
  area_id = area_id ? area_id : await getAreaId();
  return fetch('goods/home_cate_list', { area_id, page, cate_id })
}

/**
 * [获取jssdk配置项]
 * @param  {[String]} path [应用页面的url]
 */
export const jssdkConfig = function(path) {
  return post('wx/config', path)
}

/**
 * [获取城市列表]
 */
export const cityList = function() {
  return post('api/city', {})
}

/**
 * [关注，收藏，浏览,黑名单数量统计]
 * @return {[type]} [description]
 */
export const countHandler = function(unionid = getUnionid()) {
  return fetch('count/count', { }, { unionid })
}

/**
 * [关注，收藏，浏览,黑名单数量统计]
 * @return {[type]} [description]
 */
export const groupWebDown = function(group_id) {
  return put('group/group_web_down', { group_id })
}

/**
 * [description 热销-推荐-新品]
 * @param  {[String]} area_id [地区id]
 * @param  {[Number]} page [分页]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} type [1热销  2推荐 3新品]
 * @return {[type]} [description]
 */
export const homeGoodsList = async function({ area_id, page, unionid = getUnionid(), type }) {
  area_id = area_id ? area_id : await getAreaId();
  return fetch('goods/home_goods_list', { area_id, page, type }, { unionid })
}

/**
 * [获取手机验证码]
 * @param  {[String]} phone [手机号]
 */
export const sendCode = function({ phone }) {
  return post('api/send_code', { phone })
}

/**
 * [获取手机验证码 提现获取]
 * @param  {[String]} phone [手机号]
 */
export const sendsCode = function({ phone }) {
  return post('api/sends_code', { phone })
}

/**
 * [验证验证码]
 * @param  {[String]} code [待验证的验证码]
 * @return {[type]}      [description]
 */
export const checkCode = function({ code }) {
  return post('api/check_code', { code })
}


/**
 * [统一支付]
 * @param  {[String]}  fee    [交易金额（支付单位：分）]
 * @param  {[Object]}  attach [附加数据 { goods_id, group_id } ]
 * @param  {[String]} openid [用户openid]
 * @return {[type]}        [description]
 */
export const pay = function({ fee, openid, attach }) {
  return post('pay/pay', { fee, openid, attach })
}

/**
 * [pois查询]
 * @param  {[String]} location [要查询的经纬度格式 "lat,lng"]
 * @return {[type]}          [description]
 */
export const locationNearby = function({ location }) {
  return post('api/map', { location })
}

/**
 * [description 限制地图范围]
 * @param  {[String]} latitude  [纬度]
 * @param  {[String]} longitude [经度]
 * @param  {[String]} area_id   [地区id]
 * @return {[type]}           [description]
 */
export const mapSure = function({ latitude, longitude, area_id }) {
  return fetch('api/map_sure', { latitude, longitude, area_id })
}

/**
 * [首页列表]
 * @param  {[String]} page [分页]
 * @return {[type]}      [description]
 */
export const indexList = async function({ page, area_id }) {
  area_id = area_id ? area_id : await getAreaId();
  return fetch('goods/index_list', { page, area_id })
}

/**
 * [description 商品详情]
 * @param  {[String]} goods_id [商品id]
 * @return {[type]}          [description]0
 */
export const goodsShow = function({ goods_id, unionid = getUnionid() }) {
  return fetch('goods/goods_show', { goods_id }, { unionid })
}

/**
 * [description 商品详情内 拼团列表]
 * @param  {[String]} goods_id [商品id]
 * @return {[type]}          [description]
 */
export const groupList = function({ goods_id, page = 1 }) {
  return fetch('group/group_list', { goods_id, page })
}

/**
 * [description 拼团详情]
 * @param  {[String]} group_id [拼团id]
 * @return {[type]}          [description]
 */
export const groupShow = function({ group_id }) {
  return fetch('group/group_show', { group_id })
}

/**
 * [description 分类列表]
 * @param  {Number} [page=1] [分页]
 * @param  {[String]} area_id [地区id]
 * @param  {[Str]} cate_id  [description]
 * @return {[type]}          [description]
 */
export const referralList = async function({ page = 1, cate_id, area_id }) {
  area_id = area_id ? area_id : await getAreaId();
  return fetch('goods/referral_list', { page, cate_id, area_id })
}

/**
 * [description 提交订单]
 * @param  {[String]} unionid  [用户unionid]
 * @param  {[String]} group_id [拼团Id]
 * @return {[type]}          [description]
 */
export const orderPay = function({ unionid = getUnionid(), group_id }) {
  return fetch('order/order_pay', { group_id }, { unionid })
}

/**
 * [description 订单列表]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} type    [1=>拼团中,2=>拼团成功(配送中),3=>拼团失败,4=>拼团完成（全部确认收货）,5=>退货]
 * @param  {[Number]} page    [分页]
 * @return {[type]}         [description]
 */
export const orderUserList = function({ unionid = getUnionid(), type, page = 1 }) {
  return fetch('order/order_user_list', { type, page }, { unionid })
}

/**
 * [description 用户退货]
 * @param  {[String]} order_id [订单id]
 * @return {[type]}          [description]
 */
export const orderRefund = function({ order_id, unionid = getUnionid() }) {
  return post('order/order_refund', { order_id }, { unionid })
}

/**
 * [description 用户确认退货成功]
 * @param  {[String]} order_id [订单id]
 * @param  {[String]} shop_id  [店铺id]
 * @return {[type]}          [description]
 */
export const orderRefundSure = function({ order_id, shop_id, unionid = getUnionid() }) {
  return put('order/order_refund_sure', { order_id }, { shop_id, unionid } )
}

/**
 * [description 订单详情]
 * @param  {[String]} unionid [用户标识]
 * @param  {[String]} order_id [订单Id]
 * @return {[type]}          [description]
 */
export const orderUserShow = function({ order_id, type, unionid = getUnionid() }) {
  return fetch('order/order_user_show', { order_id, type }, { unionid })
}

/**
 * [description 退款订单详情]
 * @param  {[String]} unionid [用户标识]
 * @param  {[String]} order_id [订单Id]
 * @return {[type]}          [description]
 */
export const orderUserRefundShow = function({ order_id, unionid = getUnionid() }) {
  return fetch('order/order_user_refund_show', { order_id }, { unionid })
}

/**
 * [description 获取用户信息]
 * @param  {[Number]} type    [0=>普通用户,1=>掌柜,2=>团长,3一级镖师,4二级镖师]
 * @param  {[String]} unionid [用户标识]
 * @return {[type]}         [description]
 */
export const userTypeFind = function({ type = 0, unionid = getUnionid() } = {}) {
  return fetch('home/user_type_find', { type }, { unionid })
}

/**
 * [description]
 * @param  {[String]} unionid [个人标识]
 * @param  {[Number]} type    [0=>普通用户,1=>掌柜,2=>团长,3一级镖师,4二级镖师]
 * @param  {[Object]} array   [要修改的字段]
 * @return {[type]}         [description]
 */
export const userTypeUpdate = function({ unionid = getUnionid(), type, array }) {
  return put('home/user_type_update', { type, array }, { unionid } )
}

/**
 * [description 修改收货地址]
 * @param  {[String]} unionid      [用户标识]
 * @param  {[String]} latitude     [纬度]
 * @param  {[String]} longitude    [经度]
 * @param  {[String]} home_address [收货地址]
 * @param  {[String]} area_id      [地区id]
 * @param  {[String]} home_phone   [收货手机号]
 * @param  {[String]} home_name   [收货姓名]
 * @return {[type]}              [description]
 */
export const homeAddressUpdate = async function({ unionid = getUnionid(), latitude, longitude, home_address, area_id, home_phone, home_name }) {
  area_id = area_id ? area_id : await getAreaId();
  return put('home/home_address_update', { latitude, longitude, home_address, area_id, home_phone, home_name }, { unionid } )
}

/**
 * [description 关注，收藏，浏览,黑名单数量统计]
 * @param  {[String]} unionid [用户标识]
 * @return {[type]}         [description]
 */
export const countList = function({ unionid = getUnionid() }) {
  return fetch('count/count', {}, { unionid })
}

/**
 * [description 点击关注和取消关注]
 * @param  {[Number]} type    [1=>关注掌柜,2=>关注团长,3=>取消关注掌柜,4=>取消关注团长]
 * @param  {[String]} unionid [用户标识]
 * @param  {[String]} value   [shop_id,colonel_id(与1，2对应)]
 * @return {[type]}         [description]
 */
export const focusControl = function({ type, unionid = getUnionid(), value }) {
  return post('count/focus', { type }, { unionid, value })
}

/**
 * [description 关注列表]
 * @param  {[Number]} type    [1=>关注掌柜,2=>关注团长]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} [page=1 }]            [分页，默认为1]
 * @return {[type]}         [description]
 */
export const focusList = function({ type, unionid = getUnionid(), page=1 }) {
  return fetch('count/focus_list', { type, page }, { unionid })
}

/**
 * [description 拉黑操作]
 * @param  {[Number]} type    [1=>掌柜,2=>团长,3=>一级镖师,4=>二级镖师]
 * @param  {[String]} unionid [用户标识]
 * @param  {[String]} value   [shop_id,colonel_id,express1_id,express2_id(与type对应)]
 * @return {[type]}         [description]
 */
export const blackControl = function({ type, unionid = getUnionid(), value }) {
  return post('count/black', { type }, { unionid, value })
}

/**
 * [description 取消拉黑]
 * @param  {[Number]} type    [1=>掌柜,2=>团长,3=>一级镖师,4=>二级镖师]
 * @param  {[String]} unionid [用户标识]
 * @param  {[String]} value   [shop_id,colonel_id,express1_id,express2_id(与type对应)]
 * @return {[type]}         [description]
 */
export const blackDelControl = function({ type, unionid = getUnionid(), value }) {
  return remove('count/black_del', { type }, { unionid, value })
}

/**
 * [description 黑名单列表]
 * @param  {[Number]} type    [1=>掌柜,2=>团长,3=>一级镖师,4=>二级镖师]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} [page=1 }]            [分页]
 * @return {[type]}         [description]
 */
export const blackList = function({ type, unionid = getUnionid(), page = 1 }) {
  return fetch('count/black_list', { type, page }, { unionid })
}

/**
 * [description 商品收藏]
 * @param  {[String]} unionid           [用户标识]
 * @param  {[String]} goods_id          [商品id]
 * @param  {[String]} goods_name        [商品名称]
 * @param  {[String]} goods_cover       [商品封面]
 * @param  {[String]} goods_group_price [团购价]
 * @param  {[String]} goods_group_num   [团购数量]
 * @param  {[String]} genre             [拼人还是拼货]
 * @return {[type]}                   [description]
 */
export const collectControl = function({ unionid = getUnionid(), goods_id, goods_name, goods_cover, goods_group_price, goods_group_num, genre }) {
  return post('count/goods_collect', { goods_id, goods_name, goods_cover, goods_group_price, goods_group_num, genre }, { unionid })
}

/**
 * [description 取消收藏]
 * @param  {[String]} unionid  [用户标识]
 * @param  {[String]} goods_id [商品id]
 * @return {[type]}          [description]
 */
export const collectDelControl = function({ unionid = getUnionid(), goods_id }) {
  return remove('count/goods_collect_del', { goods_id }, { unionid })
}

/**
 * [description 商品收藏列表]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} [page=1 }]            [分页，默认为1]
 * @return {[type]}         [description]
 */
export const goodsCollectList = function({ unionid = getUnionid(), page = 1 }) {
  return fetch('count/goods_collect_list', { page }, { unionid })
}

/**
 * [description 添加访问记录]
 * @param  {[String]} unionid           [用户标识]
 * @param  {[String]} goods_id          [商品id]
 * @param  {[String]} goods_name        [商品名称]
 * @param  {[String]} goods_cover       [商品封面]
 * @param  {[String]} goods_group_price [团购价]
 * @param  {[String]} goods_group_num   [团购数量]
 * @param  {[String]} genre             [拼人还是拼货]
 * @return {[type]}                   [description]
 */
export const goodsSwa = function({ unionid = getUnionid(), goods_id, goods_name, goods_cover, goods_group_price, goods_group_num, genre  }) {
  return post('count/goods_swa', { goods_id, goods_name, goods_cover, goods_group_price, goods_group_num, genre }, { unionid })
}

/**
 * [description 商品浏览列表]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} page    [分页]
 * @return {[type]}         [description]
 */
export const goodsSwaList = function({ unionid = getUnionid(), page = 1}) {
  return fetch('count/goods_swa_list', { page }, { unionid })
}

/**
 * [description 添加访问掌柜记录]
 * @param  {[String]} unionid [用户标识]
 * @param  {[String]} shop_id [店铺id]
 * @return {[type]}         [description]
 */
export const shopSwa = function({ unionid = getUnionid(), shop_id }) {
  return post('count/shop_swa', {}, { unionid, shop_id })
}

/**
 * [description 访问掌柜列表]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} [page=1 }]  [分页]
 * @return {[type]}         [description]
 */
export const shopSwaList = function({ unionid = getUnionid(), page = 1 }) {
  return fetch('count/shop_swa_list', { page }, { unionid })
}

/**
 * [description 店铺头部信息]
 * @param  {[String]} shop_id [店铺id]
 * @param  {[String]} unionid [用户标识]
 * @return {[type]}         [description]
 */
export const shopHead = function({ shop_id, unionid = getUnionid() }) {
  return fetch('goods/shop_head', {}, { unionid, shop_id })
}

/**
 * [description 店铺列表]
 * @param  {[String]} shop_id [店铺id]
 * @param  {[String]} unionid [用户标识]
 * @param  {[Number]} page    [分页]
 * @param  {[Number]} type    [类型1=>推荐列表,2=>销量列表,3=>最新商品列表]
 * @return {[type]}         [description]
 */
export const shopList = function({ shop_id, unionid = getUnionid(), page = 1, type }) {
  return fetch('goods/shop_goods_list', { page, type }, { unionid, shop_id })
}

/**
 * [description 搜索商品]
 * @param  {[String]} search  [搜索值]
 * @param  {[String]} area_id [地区id]
 * @param  {[Number]} page    [分页]
 * @return {[type]}         [description]
 */
export const homeSearch = async function({ search, area_id, page = 1 }) {
  area_id = area_id ? area_id : await getAreaId();
  return fetch('goods/home_search', { search, area_id, page })
}

/**
 * [description 账单列表]
 * @param  {Number} [type=0] [账单类型0=>普通户用,1=>掌柜,2=>团长,3=>一级配送,4=>二级配送]
 * @param  {[String]} value    [与type对应的id或unionid]
 * @param  {[Number]} page     [分页]
 * @return {[type]}          [description]
 */
export const billList = function({ type = 0, value = getUnionid(), page = 1 } = {}) {
  return fetch('bill/bill_list', { type, page }, { value })
}

/**
 * [description 账单列表]
 * @param  {Number} [type=0] [账单类型0=>普通户用,1=>掌柜,2=>团长,3=>一级配送,4=>二级配送]
 * @param  {[String]} value    [与type对应的id或unionid]
 * @param  {[Number]} page     [分页]
 * @return {[type]}          [description]
 */
export const billOutList = function({ unionid = getUnionid(), page = 1 } = {}) {
  return fetch('bill/bill_out_list', { page }, { unionid })
}

/**
 * [description 申请提现]
 * @param  {[String]} cny_out             [提现金额]
 * @param  {Number} [type=1]            [类型 0=>普通户用,1=>掌柜,2=>团长,3=>一级配送,4=>二级配送]
 * @param  {[String]} [value=getUnionid(] [与 type对应的id或unionid]
 * @param  {[String]} [unionid=getUnionid(] [unionid]
 * @return {[type]}                     [description]
 */
export const payOut = function({ cny_out, type = 0, value = getUnionid(), unionid = getUnionid() } = {}) {
  return post('bill/pay_out', { cny_out, type }, { unionid, value })
}

/**
 * [description]
 * @param  {Number} [type=0]            [类型 0=>普通户用,1=>掌柜,2=>团长,3=>一级配送,4=>二级配送]
 * @param  {[String]} [value=getUnionid(] [与 type对应的id或unionid]
 * @return {[type]}                     [description]
 */
export const billCount = function({ type = 0, value = getUnionid() } = {}) {
  return fetch('bill/bill_count', { type }, { value })
}

/**
 * [description 查看物流订单详情]
 * @param  {[String]} send_id [物流订单id]
 * @return {[type]}         [description]
 */
export const sendShow = function({ send_id }) {
  return fetch('send/send_show', { send_id })
}

/**
 * [description 通过微信上传]
 * @param  {String} [web='tuan'] [项目缩写]
 * @param  {[String]} media_id     [图片media_id]
 * @return {[type]}              [description]
 */
export const pictureWx = function({ web = 'tuan', media_id }) {
  return post('https://store.nineopen.com/picture_wx', { web, media_id })
}


/**
 * [description 测试]
 * @return {[type]} [description]
 */
export const testDemo = function() {
  return fetch('group/test', {a: 1}, { "shop_id": 1 })
}

/**
 * [description 新手上路]
 * @return {[type]} [description]
 */
export const questionList = function({ page = 1, type = 0 } = {}) {
  return fetch('api/question_list', { page, type })
}

/**
 * [description 猜你喜欢]
 * @return {[type]} [description]
 */
export const questionIndexList = function() {
  return fetch('api/question_index_list')
}

/**
 * [description 获取当前商品下购买人]
 * @param  {[Number]} goods_id [商品id]
 * @return {[type]}          [description]
 */
export const groupUserList = function({ goods_id }) {
  return fetch('https://admin.nineopen.com/group/group_user_list', { goods_id })
}


export const goodsTest = function() {
  return fetch('goods/test', {'goods_id': 51}, { "unionid": undefined })
}
