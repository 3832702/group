<template lang="html">
<ul v-if="listdata.length" :class="$style.list">
  <li v-for="(item, index) in listdata" :key="index" :class="$style.item">
    <div :class="$style.head">
      <p>订单号: {{ item.order_id }}</p>
      <!-- <p :class="$style.f6323c">待发货</p> -->
      <p :class="$style.f6323c" v-if="item.send2_state">{{ status[item.send2_state] }}</p>
      <p :class="$style.f6323c" v-else>{{ salesStatus[item.is_return] }}</p>
    </div>
    <router-link
      tag="div"
      :to="{ name: 'OrderInfo', query: { order_id: item.order_id, type } }"
      :class="$style.content"
    >
      <img :src="$coverChange(item.goods_cover)" alt="">
      <div :class="$style.goods">
        <div :class="$style.t">
          <h4 :class="$style.title">
            <span>{{ item.goods_name }}</span>
          </h4>
          <p :class="$style.numinfo">
            <span>{{ item.goods_group_price }}</span>
            <span>x {{ item.goods_buy_num }}</span>
          </p>
        </div>
        <div :class="$style.c">
          <p :class="[$style.chunk, $style['chunk' + item.is_send]]">
            <span v-if="item.is_send == 1">用户自提</span>
            <span v-else-if="item.is_send == 2">商家配送</span>
            <span v-else>镖师配送</span>
          </p>
        </div>
        <div :class="$style.b">
          <p :class="$style.shop">
            <span>{{ item.sign }}</span>
          </p>
          <p :class="$style.price">实付:<span>{{ getTotalPrice(item) }}</span></p>
        </div>
      </div>
    </router-link>

    <div v-if="type == 1" :class="$style.more">
      <div @click.stop="examineGroup(item)" :class="$style.morechunk"><span>查看拼团</span></div>
    </div>
    <div v-if="type == 2" :class="$style.more">
      <template v-if="item.is_send == 0">
        <div @click.stop="showCode(index)" v-if="item.code" :class="$style.moreline"><span>查看安全码</span></div>
        <router-link tag="div" :to="{ name: 'Schedule', query: { send_id: item.send_id } }" :class="$style.morechunk"><span>查看物流</span></router-link>
      </template>
      <template v-else>
        <div @click="createCode(index)" :class="$style.morechunk"><span>生成取货码</span></div>
        <div v-if="item.is_send == 1" @click="courseHandler(index)" :class="$style.morechunk"><span>查看路线</span></div>
      </template>
    </div>
    <div v-if="type == 4 && item.is_sales_return" :class="$style.more">
      <div @click="refundHandler(index)" :class="$style.moreline"><span>申请退款</span></div>
    </div>
    <div v-if="type == 5 && item.is_return == 0" :class="$style.more">
      <div @click="affirmRefundHandler(index)" :class="$style.moreline"><span>扫码退货</span></div>
    </div>
  </li>
</ul>
<ul v-else-if="!listdata.length && finished" :class="$style.list">
  <li :class="$style.item">
    <div :class="$style.head">
      <p>订单号: 8888888888888888</p>
      <p :class="$style.f6323c">订单示例</p>
    </div>
    <div :class="$style.content">
      <img src="@/assets/logo.png" alt="">
      <div :class="$style.goods">
        <div :class="$style.t">
          <h4 :class="$style.title">
            <span>社区拼团购物微商城,同城下单6小时到家</span>
          </h4>
          <p :class="$style.numinfo">
            <span>8.88</span>
            <span>x 1</span>
          </p>
        </div>
        <div :class="$style.c">
          <p :class="[$style.chunk, $style['chunk1']]">
            <span v-if="true">用户自提</span>
            <span v-else>镖师配送</span>
          </p>
        </div>
        <div :class="$style.b">
          <p :class="$style.shop">
            <span>壹城好店平台</span>
          </p>
          <p :class="$style.price">实付:<span>8.88</span></p>
        </div>
      </div>
    </div>

    <div :class="$style.more">
      <div :class="$style.moreline"><span>示例</span></div>
      <div :class="$style.morechunk"><span>示例</span></div>
    </div>
  </li>
</ul>
</template>

<script>
const status = {
  "-1": '商家待发货',
  "0": "商家已发货",
  "1": "二级镖师已接单",
  "2": "二级镖师已取货",
  "3": "已完成",
  "39": "商家待发货",
  "40": "商家已发货",
  "41": "一级镖师已接单",
  "42": "一级镖师已取货"
}

const salesStatus = {
  0: "退货申请已提交",
  1: "已退货",
  2: "商家已拒绝"
}

export default {
  props: {
    listdata: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: Number,
      default: 1
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status,
      salesStatus
    }
  },
  methods: {
    // 计算总价
    getTotalPrice({ goods_buy_num, goods_group_price }) {
      return (parseFloat(goods_group_price) * Number(goods_buy_num)).toFixed(2)
    },

    /**
     * [examineGroup 查看拼团]
     * @return {[type]} [description]
     */
    examineGroup(item) {
      const { group_id } = item;
      this.$router.push({ name: 'Single', query: { group_id } })
    },

    /**
     * [showCode 弹出二维码]
     * @return {[type]} [description]
     */
    showCode(index) {
      this.$emit('show-code', { index })
    },

    /**
     * [createCode 生成取货码]
     * @return {[type]} [description]
     */
    createCode(index) {
      this.$emit('create-code', { index })
    },

    /**
     * [refundHandler 申请退货]
     * @return {[type]} [description]
     */
    refundHandler(index) {
      this.$emit('refund-handler', { index })
    },

    /**
     * [courseHandler 路线规划]
     * @return {[type]} [description]
     */
    courseHandler(index) {
      const { listdata, $route: { fullPath } } = this;
      const { location:{ latitude, longitude }, sign } = listdata[index];

      window.location.href = `
        https://apis.map.qq.com/tools/routeplan/eword=${sign}
        &epointx=${longitude}
        &epointy=${latitude}
        &transport=3
        ?referer=yichenghaodian
        &key=DOZBZ-2NAHX-F234E-TYIOQ-HQ3YQ-R7BTG
        &backurl=${fullPath}
      `
    },

    /**
     * [affirmRefundHandler 确认退货成功]
     * @return {[type]} [description]
     */
    affirmRefundHandler(index) {
      this.$emit('affirm-refund-handler', { index })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.list {
  width: 100%;
  .item {
    width: 100%;
    background:#ffffff;
    margin-bottom: 20px;
  }

  .head {
    width: 100%;
    height: 80px;
    @include list(row);
    justify-content: space-between;
    align-items:center;
    box-sizing:border-box;
    padding:0 20px;
    >p {
      font-size: 24px;
    }
    .f6323c {
      color: #f6323c;
    }
  }

  .content {
    width: 100%;
    height: 182px;
    box-sizing:border-box;
    padding:0 20px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    background:#fcfcfc;
    >img {
      width: 150px;
      height: 150px;
      object-fit:cover;
    }
  }

  .goods {
    width: 76.6%;
    margin-top: -6px;

    .t {
      width: 100%;
      height: 64px;
      margin-bottom: 10px;
      @include list(row);
      justify-content:space-between;
      align-items:center;
    }

    .c {
      width: 100%;
      height: 34px;
      margin-bottom: 10px;
      @include list(row);
      align-items:center;
    }

    .b {
      width: 100%;
      height: 38px;
      @include list(row);
      align-items:flex-end;
      justify-content:space-between;
    }
  }

  .title {
    width: 78%;
    height: 64px;
    display:table;
    font-size: 26px;
    line-height: 34px;
    color:#2e2e2e;
    >span {
      display:table-cell;
      vertical-align:middle;
      @include multiline-truncation;
    }
  }

  .numinfo {
    width: 21%;
    height: 64px;
    @include list;
    justify-content:center;
    span {
      height: 32px;
      font-size: 24px;
      text-align:right;

      &:first-child {
        color:#2e2e2e;
        font-size: 28px;
        &:before {
          content: "￥";
          font-size: 24px;
        }
      }

      &:last-child {
        color:#adadad;
        line-height: 40px;
      }
    }
  }

  .line {
    height: 34px;
    display:table;
    line-height:normal;
    margin-right: 20px;
    @include border($bg: #a0a0a0, $direction: all)
    box-sizing:border-box;
    border-radius: 4px;
    >span {
      font-size: 24px;
      color:#a0a0a0;
      display:table-cell;
      vertical-align:middle;
      padding:0 6px;
    }
  }

  .chunk {
    height: 34px;
    display:table;
    @include border($bg: transparent, $direction: all)
    line-height:normal;
    border-radius: 4px;
    box-sizing:border-box;
    >span {
      font-size: 20px;
      display:table-cell;
      vertical-align:middle;
      padding:0 6px;
      border-radius: 4px;
    }
  }

  .chunk1 {
    color:#fa920f;
    background:#fff3e5;
    border-color:#fff3e5;
  }

  .chunk0 {
    color:#00a9fe;
    background:#e4f5fd;
    border-color:#e4f5fd;
  }

  .chunk2 {
    color:#ff3600;
    background:rgba(255, 54, 0, .1 );
    border-color:rgba(255, 54, 0, .1 );
  }

  .shop {
    width: 250px;
    height: 34px;
    @include list(row);
    align-items:center;
    font-size: 24px;
    line-height: 34px;
    >span {
      max-width: 230px;
      @include truncation;
    }

    &:after {
      content: " ";
      @include leftArrow($width:8px, $bg: #999999,$rotate:rotate(-45deg));
    }
  }

  .price {
    font-size: 24px;
    height: 34px;
    line-height: 34px;
    @include list(row);
    align-items:center;
    >span {
      font-size: 28px;
      &:before {
        content: "￥";
        font-size: 22px;
        margin-left: 8px;
      }
    }
  }

  .more {
    width: 100%;
    height: 80px;
    @include list(row);
    align-items:center;
    justify-content:flex-end;
    box-sizing:border-box;
    padding: 0 20px;
    >div {
      margin-left: 15px;
    }
  }

  .moreline {
    height: 50px;
    padding:0 20px;
    @include border($bg: #969696, $direction: all)
    font-size: 24px;
    display:table;
    line-height:normal;
    border-radius:8px;
    >span {
      display:table-cell;
      vertical-align:middle;
    }
  }

  .morechunk {
    height: 50px;
    padding: 0 20px;
    @include border($bg: #e51717, $direction: all)
    background:#e51717;
    color:#fff;
    display:table;
    font-size: 24px;
    line-height: normal;
    border-radius:8px;
    >span {
      display:table-cell;
      vertical-align:middle;
    }
  }
}
</style>
