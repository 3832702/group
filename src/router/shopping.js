const NewMy = () => import(/* webpackChunkName: "group-8" */ "@/pages/shopping/new-my/index")
const NewHome = () => import(/* webpackChunkName: "group-5" */ "@/pages/shopping/new-home/index")
const Order = () => import(/* webpackChunkName: "group-1" */ "@/pages/shopping/order/index")
const Goods = () => import(/* webpackChunkName: "group-10" */ "@/pages/shopping/goods/index")
const Single = () => import(/* webpackChunkName: "group-13" */ "@/pages/shopping/single/index")
const Confirm = () => import(/* webpackChunkName: "group-11" */ "@/pages/shopping/confirm/index")
const OrderInfo = () => import(/* webpackChunkName: "group-2" */ "@/pages/shopping/order-info/index")
const Address = () => import(/* webpackChunkName: "group-2" */ "@/pages/shopping/address/index")
const AddAddress = () => import(/* webpackChunkName: "group-2" */ "@/pages/shopping/add-address/index")
const Focus = () => import(/* webpackChunkName: "group-2" */ "@/pages/shopping/focus/index")
const Collection = () => import(/* webpackChunkName: "group-2" */ "@/pages/shopping/collection/index")
const Browse = () => import(/* webpackChunkName: "group-3" */ "@/pages/shopping/browse/index")
const Location = () => import(/* webpackChunkName: "group-3" */ "@/pages/shopping/location/index")
const BlackList = () => import(/* webpackChunkName: "group-3" */ "@/pages/shopping/black-list/index")
const SingleList = () => import(/* webpackChunkName: "group-3" */ "@/pages/shopping/single-list/index")
const SearchList = () => import(/* webpackChunkName: "group-3" */ "@/pages/shopping/search-list/index")
const Demo = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/demo/index")
const Earnings = () => import(/* webpackChunkName: "group-4" */ "@/pages/earnings/index")
const DrawMoney = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/draw-money/index")
const MoneyList = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/money-list/index")
const Help = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/help/index")
const Share = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/share/index")
const HotSales = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/hot-sales/index")
const RecommendedSales = () => import(/* webpackChunkName: "group-4" */ "@/pages/shopping/recommended-sales/index")
const NewSales = () => import(/* webpackChunkName: "group-6" */ "@/pages/shopping/new-sales/index")
const Greenhand = () => import(/* webpackChunkName: "group-8" */ "@/pages/shopping/greenhand/index")
const GreenhandList = () => import(/* webpackChunkName: "group-8" */ "@/pages/shopping/greenhand-list/index")
const GreenhandArticle = () => import(/* webpackChunkName: "group-8" */ "@/pages/shopping/greenhand-article/index")
const Schedule = () => import(/* webpackChunkName: "group-6" */ "@/pages/shopping/schedule/index")
const NewStore = () => import(/* webpackChunkName: "group-7" */ "@/pages/shopping/new-store/index")
const Recruit = () => import(/* webpackChunkName: "group-7" */ "@/pages/shopping/recruit/index")
const Complaint = () => import(/* webpackChunkName: "group-17" */ "@/pages/shopping/complaint/index")

export default [
  // 主页
  {
    path: "/index",
    name: "Home",
    component: NewHome,
    meta: {
      title: "壹城好店"
    }
  },
  // 主页
  {
    path: "/recruit",
    name: "Recruit",
    component: Recruit,
    meta: {
      title: "社区招募"
    }
  },
  // 订单
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      title: "我的订单",
      is_login: true,
      jsApiList: ['scanQRCode']
    }
  },
  // 个人中心
  {
    path: "/personal",
    name: "Personal",
    component: NewMy,
    meta: {
      title: '个人中心',
      is_login: true
    }
  },
  // 物流信息
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
    meta: {
      title: '物流信息',
      is_login: true
    }
  },
  // 商品详情
  {
    path: "/goods",
    name: "Goods",
    component: Goods,
    meta: {
      title: "商品详情",
      // is_login: true,
      is_share: true,
      jsApiList: ['showMenuItems', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQZone', 'onMenuShareQQ']
    }
  },

  // 参加拼单
  {
    path: "/single",
    name: "Single",
    component: Single,
    meta: {
      title: "拼单",
      is_login: true,
      is_share: true,
      jsApiList: ['showMenuItems', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQZone', 'onMenuShareQQ']
    }
  },

  // 确定订单
  {
    path: "/pay",
    name: "Confirm",
    component: Confirm,
    meta: {
      title: "提交订单",
      is_login: true,
      jsApiList: ['chooseWXPay']
    }
  },
  {
    path: "/store",
    name: "Store",
    component: NewStore,
    meta: {
      title: "商家",
      // is_login: true,
      is_share: true,
      jsApiList: ['showMenuItems', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQZone', 'onMenuShareQQ']
    }
  },
  // 订单信息
  {
    path: "/order-info",
    name: "OrderInfo",
    component: OrderInfo,
    meta: {
      title: "订单信息",
      is_login: true,
      jsApiList: ['scanQRCode']
    }
  },
  // 地址列表
  {
    path: "/address",
    name: "Address",
    component: Address,
    meta: {
      title: "地址列表",
      is_login: true
    }
  },
  // 添加地址
  {
    path: "/add-address",
    name: "AddAddress",
    component: AddAddress,
    meta: {
      title: "更改地址",
      is_login: true
    }
  },
  // 设置关注
  {
    path: "/focus",
    name: "Focus",
    component: Focus,
    meta: {
      title: '我的关注',
      is_login: true
    }
  },
  // 收藏商品
  {
    path: "/collection",
    name: "Collection",
    component: Collection,
    meta: {
      title: "我的收藏",
      is_login: true
    }
  },
  // 浏览记录
  {
    path: "/browse",
    name: "Browse",
    component: Browse,
    meta: {
      title: "我的浏览",
      is_login: true
    }
  },
  // 位置
  {
    path: '/location',
    name: "Location",
    component: Location,
    meta: {
      title: '选择位置',
      is_login: true,
      is_close: true, // 是否禁止配置
      is_refresh: true, // 不使用淘宝方案
    }
  },
  // 黑名单
  {
    path: "/blackList",
    name: "BlackList",
    component: BlackList,
    meta: {
      title: '黑名单',
      is_login: true
    }
  },
  // 拼团列表
  {
    path: "/singleList",
    name: "SingleList",
    component: SingleList,
    meta: {
      title: '拼团列表',
      is_login: true
    }
  },
  // demo
  {
      path: '/demo',
      name: "Demo",
      component: Demo,
      meta: {
        title: '分类列表'
      }
  },
  // 收益列表
  {
    path: '/earnings',
    name: 'Earnings',
    component: Earnings,
    meta: {
      title: '收益',
      is_login: true
    }
  },
  // 搜索页
  {
    path: '/search',
    name: 'SearchList',
    component: SearchList,
    meta: {
      title: '搜索',
      // is_login: true
    }
  },
  // 分享页
  {
    path: '/share',
    name: 'Share',
    component: Share,
    meta: {
      title: '分享',
      is_login: true,
      is_share: true,
      jsApiList: ['showMenuItems', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQZone', 'onMenuShareQQ']
    }
  },

  // 申请提现
  {
    path: '/money',
    name: 'DrawMoney',
    component: DrawMoney,
    meta: {
      title: '申请提现',
      is_login: true
    }
  },
  // 账单记录
  {
    path: '/record',
    name: "MoneyList",
    component: MoneyList,
    meta: {
      title: '账单记录',
      is_login: true
    }
  },
  // 提现客服
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      title: '提现客服'
    }
  },
  // 热销榜
  {
    path: '/hot',
    name: 'HotSales',
    component: HotSales,
    meta: {
      title: '热销榜',
      // is_login: true
    }
  },
  // 推荐榜
  {
    path: '/recommended',
    name: 'RecommendedSales',
    component: RecommendedSales,
    meta: {
      title: '推荐榜',
      // is_login: true
    }
  },
  // 新品
  {
    path: '/newsales',
    name: 'NewSales',
    component: NewSales,
    meta: {
      title: '新品',
      // is_login: true
    }
  },
  // 新手上路
  {
    path: '/greenhand',
    name: 'Greenhand',
    component: Greenhand,
    meta: {
      title: '新手上路',
      // is_login: true
    }
  },
  // 帮助中心-列表
  {
    path: '/greenhandlist',
    name: 'GreenhandList',
    component: GreenhandList,
    meta: {
      title: '帮助中心'
    }
  },
  // 帮助中心-文章
  {
    path: '/greenhandarticle',
    name: 'GreenhandArticle',
    component: GreenhandArticle,
    meta: {
      title: '帮助中心'
    }
  },
  // 投诉建议
  {
    path: '/complaint',
    name: "Complaint",
    component: Complaint,
    meta: {
      title: '投诉建议',
      jsApiList: ['chooseImage', 'uploadImage']
    }
  },
  {
    path: '*',
    redirect() {
      return '/index'
    },
    meta: {
      title: "壹城好店"
    }
  }
]
