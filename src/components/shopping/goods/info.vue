<template lang="html">
  <div :class="$style.info">
    <!-- <img :src="details.goods_cover" alt=""> -->
    <Banner :banner_list="details.goods_cover"></Banner>
    <div :class="$style.goods">
      <p>
        <span>{{ details.goods_group_price }}</span>
        <span></span>
        <span>已拼{{ details.goods_count ? details.goods_count.sell_count: 0 }}件</span>
      </p>
      <h4>
        <span :class="$style.title">{{ details.goods_name }}</span>
        <p v-if="details.genre === 1" :class="[$style.ico, $style.person]">
          <span>拼人团</span>
        </p>
        <p v-else :class="[$style.ico, $style.goods]">
          <span>拼货团</span>
        </p>
      </h4>
      <div :class="$style.more">
        全场包邮 · 同城6小时到家 · {{ sendType }}
      </div>
    </div>
    <div @click="shareHandler" :class="$style.share"></div>
  </div>
</template>

<script>
import Banner from "./banner.vue";
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {
          details: {}
        }
      }
    }
  },
  computed: {
    sendType() {
      const { details: { is_send } } = this;

      if (is_send == 0) {
        return '镖师配送'
      } else if (is_send == 1) {
        return '用户自提'
      } else {
        return '商家配送'
      }
    }
  },
  components: {
    Banner
  },
  methods:{
    shareHandler() {
      this.$emit('share-handler', {})
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.info {
  width: 100%;
  background:#fff;
  margin-bottom: 20px;
  position:relative;

  >img {
    width: 100%;
    height: 750px;
  }

  .share {
    width: 60px;
    height: 60px;
    position:absolute;
    right: 40px;
    top: 20px;
    background:url('@/assets/share2.png') no-repeat;
    background-size: cover;
    z-index: 9999999999999;
  }

  .goods {
    width: 100%;
    overflow:hidden;

    >p {
      width: 100%;
      box-sizing:border-box;
      height: 90px;
      padding:0 26px;
      align-items:center;
      @include list(row);
      span {
        &:nth-of-type(1) {
          font-size: 36px;
          color:#e14549;
          height: 36px;
          margin-right: 20px;
          font-weight:500;

          &:before {
            content: "￥";
            font-size: 26px;
          }
        }
        &:nth-of-type(2) {
          font-size: 26px;
          color:#999999;
          text-decoration:line-through;
        }
        &:nth-of-type(3) {
          font-size: 26px;
          color:#999999;
          margin-left: auto;
        }
      }
    }

    >h4 {
      width: 100%;
      box-sizing:border-box;
      padding:0 26px;
      max-height: 88px;
      font-size: 30px;
      margin-bottom:15px;
      color:#000;
      line-height:normal;
      display: table;
      position:relative;

      .title {
        display: table-cell;
        vertical-align: middle;
        @include multiline-truncation;
        line-height: 44px;
        text-indent: 87px;
      }

      .ico {
        position:absolute;
        left:20px;
        top:5px;
        width: 82px;
        height: 26px;
        background:#32c873;
        display:table;
        text-align:center;
        line-height:normal;
        border-radius:4px;
        >span {
          display:table-cell;
          vertical-align:middle;
          font-size: 22px;
          color:#fff;
        }
      }

      .goods {
        background:#e51815;
      }
    }

    .more {
      width: 100%;
      height: 70px;
      @include border($bg: #ccc, $direction: top)
      font-size: 26px;
      color:#999999;
      @include list(row);
      align-items:center;
      box-sizing:border-box;
      justify-content:space-between;;
      padding:0 26px;

      &:after {
        content: " ";
        @include leftArrow($width: 10px,$bg:#979797);

      }
    }
  }
}
</style>
