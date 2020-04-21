<template lang="html">
  <div :class="$style.correlation">
    <h4>工具与服务</h4>
    <ul :class="$style.entrance">
      <li
        v-for="(item, index) in entrances"
        :key="index"
        @click="clickHandler(item, index)"
      >
        <div>
          <img :src="item.ico" alt="入口图标">
        </div>
        <p>
          <span>{{ item.title }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>

const entrances = [
  {
    title: "我的钱包",
    ico: require("@/assets/my_wallet.png"),
    path: { name: "Earnings" }
  },
  {
    title: "我的地址",
    ico: require("@/assets/my_address.png"),
    path: { name: "Address" }
  },
  {
    title: "申请掌柜",
    ico: require("@/assets/my_shop.png"),
    path: 'https://tuan.nineopen.com/shop'
  },
  {
    title: "申请团长",
    ico: require("@/assets/my_colonel.png"),
    path: 'https://tuan.nineopen.com/colonel'
  },
  {
    title: "申请一级镖师",
    ico: require("@/assets/my_send1.png"),
    path: 'https://tuan.nineopen.com/send1/receiving'
  },
  {
    title: "申请二级镖师",
    ico: require("@/assets/my_send2.png"),
    path: 'https://tuan.nineopen.com/send2/receiving?v=1'
  },
  {
    title: "投诉建议",
    ico: require("@/assets/my_suggest.png"),
    path: { name: "Complaint" }
  },
  // {
  //   title: "黑名单",
  //   ico: require("@/assets/my_blacklist.png"),
  //   path: { name: "BlackList" }
  // },
  {
    title: "联系客服",
    ico: require("@/assets/my_kf.png")
  }
]

export default {
  data() {
    return {
      entrances
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.initHandler()
  },
  watch: {
    info() {
      this.initHandler()
    }
  },
  methods: {
    /**
     * [clickHandler 自定义事件  --- 被点击]
     * @param  {[Object]} obj [被点击的数据]
     * @return {[type]}     [description]
     */
    clickHandler( obj ) {

      if (!obj.path) {
        return;
      }

      if (typeof obj.path === 'string') {
        window.location.href = obj.path;
      } else {
          this.$router.push({ name: obj.path.name })
      }
    },

    /**
     * [initHandler 设置标题]
     * @return {[type]} [description]
     */
    initHandler() {
      let { info: { role }, entrances } = this;
      let colonel, express1, express2, shop;
      if (role) {
        ({ colonel, express1, express2, shop } = role)
      }


      /* eslint-disable */
      /**
       * [switch 连续判断]
       * @param  {[type]} true [description]
       * @return {[type]}      [description]
       */
      switch(true) {
          case colonel === 1:
            entrances[3].title = '团长管理'
          case express1 === 1:
            entrances[4].title = '一级镖师管理'
          case express2 === 1:
            entrances[5].title = '二级镖师管理'
          case shop === 1:
            entrances[2].title = '掌柜管理'
            break;
      }

      /* eslint-enable */
      this.entrances = [...entrances]
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.correlation {
  width: 100%;
  padding-bottom: 10px;
  background:#f2f2f2;
  >h4 {
    width: 100%;
    box-sizing:border-box;
    padding:0 20px;
    font-size: 28px;
    height: 80px;
    line-height: 80px;
    @include border($bg: #f8f8f8, $direction: bottom)
    background:#fff;
  }
}

.entrance {
  width: 100%;
  background:#fff;
  @include list(row);
  margin-bottom:20px;

  li {
    width: 25%;
    height: 200px;
    @include list;
    box-sizing:border-box;
    align-items:center;
    justify-content:center;

    div {
      width: 42px;
      height: 42px;
      @include list;
      align-items:center;
      justify-content:center;
      margin-bottom:30px;

      img {
        width: 42px;
        height: 42px;
      }
    }

    p {
      height: 38px;
      display:table;
      line-height:normal;

      span {
        text-align:center;
        font-size: 24px;
        color:#2c2c2c;
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
}
</style>
