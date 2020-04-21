<template lang="html">
<div @click="modeHide" :class="$style.store">
  <h4 :class="$style.head">
    {{ details.goods && details.goods.sign }}
  </h4>
  <div v-if="details.goods" :class="$style.goods">
    <img :src="$coverChange(details.goods.goods_cover)" alt="">
    <div :class="$style.info">
      <h4><span>{{ details.goods.goods_name }}</span></h4>
      <div :class="$style.more">
        <span>{{ price }}</span>
        <div>
          <p @click="calculateHandler(0)" name="button">-</p>
          <span type="text">{{ num }}</span>
          <p @click="calculateHandler(1)" name="button">+</p>
        </div>
      </div>
    </div>
  </div>

  <div :class="$style.mode">
    <span>支付方式</span>
    <dl style="z-index:112;">
      <dt>微信支付</dt>
      <!-- <dt @click.stop="modeHandler">{{ paymentMode }}</dt>
      <dd @click.stop="searchModeHandler('微信支付')" v-if="isMoreHide">微信支付</dd>
      <dd @click.stop="searchModeHandler('余额支付')" v-if="isMoreHide">余额支付</dd> -->
    </dl>
  </div>

  <!--<div :class="$style.distribution">
    <span>配送服务</span>
    <span :class="$style.dart">镖师配送</span>
  </div>
-->
  <div :class="$style.mode">
    <span>配送服务</span>
    <dl>
      <dt>{{ sendTitle }}</dt>
      <!-- <dt @click.stop="distributionHandler">{{ distributionMode }}</dt>
      <dd @click.stop="searchDistributionHandler('镖师配送')" v-if="isDistributionHide">镖师配送</dd>
      <dd @click.stop="searchDistributionHandler('上门自取')" v-if="isDistributionHide">上门自取</dd> -->
    </dl>
  </div>

  <div :class="$style.distribution">
    <span>店铺备注</span>
    <input v-model="message" placeholder="选填,给掌柜留言" maxlength="30" :class="$style.note" type="text">
  </div>

</div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {}
      }
    },
    num: { // 商品数量
      type: Number,
      default: 0
    }
  },
  computed: {
    price() { // 价格
      let p = this.details.goods.goods_group_price;
      return typeof p === 'number' ? p.toFixed(2) : p;
    },
    sendTitle() {
      let t = '';

      if (this.details && this.details.goods) {
        t = this.details.goods.is_send;

        if (t == 0) {
          return '镖师配送'
        } else if (t == 1) {
          return '用户自提'
        } else {
          return '商家配送'
        }
      }

    }
  },
  watch: {
    message(to) {
      this.$emit('remark-change', { remark: to })
    }
  },
  data() {
    return {
      isMoreHide: false, // 支付方式是否隐藏
      paymentMode: '微信支付', // 支付方式默认值
      isDistributionHide: false, // 配送方式是否隐藏
      distributionMode: "镖师配送", // 配送服务默认值
      message: "", // 备注
    }
  },
  methods: {
    /**
     * [modeHandler 点击显示支付方式]
     * @return {[type]} [description]
     */
    modeHandler() {
      this.isMoreHide = !this.isMoreHide;
    },

    /**
     * [lang description]
     * @type {String}
     */
    modeHide() {
      this.isMoreHide = false;
      this.isDistributionHide = false;
    },

    /**
     * [searchModeHandler 切换支付方式]
     * @param  {[String]} value [要显示的支付方式]
     * @return {[type]} [description]
     */
    searchModeHandler(value) {
      this.paymentMode = value;
      this.modeHide();
    },

    /**
     * [distributionHandler 点击配送方式]
     * @return {[type]} [description]
     */
    distributionHandler() {
      this.isDistributionHide = !this.isDistributionHide;
    },

    /**
     * [calculateHandler 增加删除商品]
     * @param  {[Number]} status [是增加商品还是删除商品  0 删除  1 增加]
     * @return {[type]}        [description]
     */
    calculateHandler(status) {
      this.$emit('calculate-handler', { status })
    },

    /**
     * [searchDistributionHandler 切换配送方式]
     * @param  {[String]} value [要显示的配送方式]
     * @return {[type]}       [description]
     */
    searchDistributionHandler(value) {
      this.distributionMode = value;
      this.modeHide();
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.store {
  width: 100%;
  background:#fff;
  margin-bottom:20px;

  .head {
    width: 100%;
    height: 80px;
    @include list(row);
    align-items:center;
    font-size: 32px;
    box-sizing:border-box;
    padding:0 20px;
    @include border($bg: #e5e5e5, $width: 2px, $direction: bottom)

    &:before {
      content: " ";
      width: 32px;
      height: 32px;
      background:url("@/assets/store.png") no-repeat;
      background-size:cover;
      margin-right:15px;
    }
  }

  .goods {
    width: 100%;
    box-sizing:border-box;
    padding:0 20px;
    @include list(row);
    justify-content:space-between;
    >img {
      width: 150px;
      height: 150px;
      align-self: center;
    }

    .info {
      width: 72%;
      padding:28px 0;

      >h4 {
        height: 80px;
        font-size: 26px;
        margin-bottom:17px;
        line-height:normal;
        display: table;

        span {
          display: table-cell;
          vertical-align: middle;
          @include multiline-truncation;
          line-height: 40px;
        }
      }

      .more {
        width: 100%;
        height: 56px;
        margin-bottom:16px;
        @include list(row);
        align-items:center;
        justify-content:space-between;
        >span {
          color:#c04f55;
          font-size: 30px;
          &:before {
            content: "￥";
            font-size: 24px;
          }
        }

        >div {
          width: 210px;
          @include list(row);
          height: 56px;
          p {
            width: 60px;
            height: 56px;
            padding:0;
            border:none;
            background:#f7f7f7;
            @include list(row);
            align-items:center;
            justify-content:center;
            font-size: 30px;
            box-sizing:border-box;
            @include border($bg: #f8f8f8, $direction: all)
          }

          span {
            width: 90px;
            padding:15px 0;
            border:none;
            text-align:center;
            box-sizing:border-box;
            font-size: 26px;

            @include border($bg: #f8f8f8, $direction: top)
            @include border($bg: #f8f8f8, $direction: bottom)
          }
        }
      }
    }

  }

  .mode {
    width: 100%;
    height: 90px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    box-sizing:border-box;
    padding:0 20px;
    position:relative;

    &:before {
      content: " ";
      height: 2px;
      position:absolute;
      top:0;
      left:20px;
      right:0;
      background:#e6e6e6;
      z-index:114;
    }

    span {
      font-size: 30px;
    }

    dl {
      min-height: 90px;
      font-size: 26px;
      width: 200px;
      position:absolute;
      right:0;
      top:0;
      background:#fff;
      @include list;
      z-index: 111;

      dt {
        width: 100%;
        height: 90px;
        line-height: 85px;
        @include list(row);
        align-items:center;
        color:#000000;
        justify-content:center;
        &:after {
          content: " ";
          @include leftArrow($width:10px, $bg: #4a9082,$rotate:rotate(45deg));
          margin:-4px 10px 0;
        }
      }

      dd {
        width: 166px;
        height: 70px;
        line-height: 70px;
        text-align:center;
        box-sizing:border-box;
        @include border($bg: #f2f2f2, $direction: all)
        border-bottom: none;

        &:last-child {
          @include border($bg: #f2f2f2, $direction: bottom)
        }
      }
    }
  }

  .not_line {
    &:before {
      background:#fff;
    }

  }

  .distribution {
    width: 100%;
    height: 90px;
    @include list(row);
    align-items:center;
    font-size: 30px;
    box-sizing:border-box;
    padding:0 20px;
    justify-content:space-between;
    position:relative;
    &:before {
      content: " ";
      height: 2px;
      position:absolute;
      top:0;
      left:20px;
      right:0;
      background:#e6e6e6;
    }

    .dart {
      font-size: 24px;
    }

    .note {
      width: 74%;
      height: 50px;
      font-size: 26px;
      line-height: 50px;
      border:none;
      padding:0 20px;
    }
  }
}
</style>
