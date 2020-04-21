<template lang="html">
  <div :class="$style.participate">
    <template v-if="details.num && !condition">
      <div :class="$style.head">
        还差<span :class="$style.d34253">{{ details.num + (details.genre == 1 ? '人' : '件')}}</span>拼购成功，剩余
        <span :class="$style.time">{{ t.day }}</span>
        <span :class="$style.time">{{ t.m }}</span>
        <span :class="$style.time">{{ t.s }}</span>
      </div>
      <ul :class="$style.list">
        <li key="888">
          <p>
            <span>团长</span>
          </p>
          <img :src="details.colonel.head_url" alt="">
        </li>
        <template v-if="details.buy.length">
          <li v-for="(item, index) in details.buy" :key="index">
            <img :src="item.headimgurl" alt="">
          </li>
        </template>
      </ul>
      <router-link :class="$style.btn" :to="{ name: 'Confirm', query: { group_id } }" tag="div">我要参团</router-link>
    </template>
    <div v-else-if="details.num <= 0 && !condition" :class="$style.success">
      该团已成功
    </div>
    <div v-else-if="condition" :class="$style.success">
      该团已过期
    </div>
    <dl>
      <dt>拼购玩法</dt>
      <dd>好友参团 ·</dd>
      <dd>&nbsp;人满发货 ·</dd>
      <dd>&nbsp;不满退款</dd>
    </dl>
  </div>
</template>

<script>
import { domain } from "@/utils/util.js"
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {}
      }
    },
    t: {
      type: Object,
      default() {
        return {}
      }
    },
    condition: {
      type: Boolean,
      default: false
    },
    group_id: {
      type: [String, Number],
      default: ""
    }
  },
  methods: {
    /**
     * [submitHandler 我要参团]
     * @return {[type]} [description]
     */
    submitHandler() {
      const { group_id } = this;
      window.location.href = `${domain}/pay?group_id=${group_id}`
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.success {
  width: 100%;
  height: 330px;
  font-size: 34px;
  line-height: 330px;
  text-align:center;
  color:#d34253;
}

.participate {
  width: 100%;
  background:#fff;
  min-height: 412px;

  .head {
    width: 100%;
    height: 80px;
    font-size: 26px;
    color:#2c2c2c;
    @include list(row);
    align-items:center;
    justify-content:center;

    .d34253 {
      color:#d34253;
    }

    .time {
      height: 40px;
      @include border($bg: #ddc2c7, $direction: all)
      border-radius:4px;
      font-size: 30px;
      padding:0 4px;
      color:#e83948;
      line-height: 36px;
      margin: 0 8px 0 10px;
      @include list(row);
      align-items: center;
    }
  }

  .list {
    width:100%;
    padding: 20px;
    box-sizing:border-box;
    @include list(row);
    justify-content:center;

    li {
      width: 80px;
      height: 80px;
      margin: 0 16px 12px;
      position:relative;

      &:before {
        content: "?";
        width: 100%;
        height: 100%;
        border:1px dotted #e9e9e9;
        box-sizing:border-box;
        position:absolute;
        left:0;
        top:0;
        border-radius:50%;
        font-size: 40px;
        text-align:center;
        line-height: 80px;
        color:#e9e9e9;
      }

      p {
        padding:0 10px;
        height: 28px;
        font-size: 24px;
        border-radius: 14px;
        background:#e53d3a;
        color:#fff;
        position:absolute;
        top:-12px;
        right:-10px;
        z-index:1;
        display: table;
        line-height:normal;

        >span {
          display: table-cell;
          vertical-align: middle;
          text-align:center;
        }
      }

      img {
        width: 100%;
        height: 100%;
        border-radius:50%;
        position:absolute;
        left:0;
        top:0;
      }
    }
  }

  .btn {
    padding:0;
    border:none;
    width: 94.5%;
    height: 90px;
    background:linear-gradient(to bottom right, #de1819, #d61a1b );
    color:#fff;
    font-size: 32px;
    text-align:center;
    line-height: 94px;
    margin:0 auto;
    border-radius:8px;
    display:block;
    margin-bottom:20px;
  }

  dl {
    width: 100%;
    height: 90px;
    box-sizing:border-box;
    padding:0 20px;
    @include list(row);
    align-items:center;
    position:relative;

    dt {
      font-size: 28px;
      margin-right:auto;
    }

    dd {
      font-size: 24px;
      color:#9b9b9b;
    }

    &:after {
      content: " ";
      @include leftArrow($width:10px, $bg: #9d9d9d,$rotate:rotate(-45deg));
      margin-left: 20px;
    }

    &:before {
      content: " ";
      height: 2px;
      background:#dbdbdb;
      position:absolute;
      left:20px;
      right:0;
      top:0;
    }
  }
}
</style>
