<template lang="html">
<div :class="$style.head">
  <div :class="$style.bg"></div>
  <div :class="$style.header">
    <img :src="shopDetails.head_url" alt="">
  </div>
  <div :class="$style.info">
    <div :class="$style.user">{{ shopDetails.sign }}</div>
    <div :class="$style.more">
      <p> <span>{{ shopDetails.level }}掌柜</span> </p>
    </div>
    <div :class="$style.desc">
      <p>{{ '已拼' + shopDetails.sell_count + '件' }} | {{ shopDetails.colonel_count + '件商品正在拼团中' }}</p>
    </div>
    <div :class="$style.btn">
      <template v-if="!shopDetails.is_black">
        <p @click="focusControl(true)" v-if="!shopDetails.is_focus" :class="$style.f28b8c"><i></i>关注</p>
        <p @click="focusControl(false)" v-else :class="[$style.f28b8c, $style.focus]"><i></i>已关注</p>
      </template>
      <p v-else :class="[$style.bebebe, $style.focus]">关注</p>
      <p @click="shareHandler" :class="[$style.f28b8c, $style.share]"><i></i>分享</p>
      <p @click="blackHandler(true)" v-if="!shopDetails.is_black" :class="$style.bebebe"><i></i>拉黑</p>
      <p @click="blackHandler(false)" v-else :class="$style.bebebe"><i></i>已拉黑</p>
    </div>
  </div>
</div>
</template>

<script>

import { focusControl, debounce, blackControl, blackDelControl } from "@/server/index.js";

import { judgeLogin } from "@/utils/login.js"
import { mapState } from "vuex"
export default {
  props: {
    shopDetails: {
      type: Object,
      default(){
        return {}
      }
    },
    shop_id: {
      type: Number,
      default: 0
    },
    skip: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      status: null, // 关注状态
      status1: true, // 拉黑
    }
  },
  computed: {
    ...mapState(['skipnum'])
  },
  watch: {
    skip(to) {
      const { shop_id } = this;

      if (to == 1) {
        this.focusControl(true)
      } else if(to == 2) {
        // this.blackHandler(true)
      }
    }
  },
  methods: {
    /**
     * [focusControl 关注]
     * @return {[type]} [description]
     */
    focusControl(status) {
      this.status = status;
      //debounce(300, this.focusControlHandler)
      this.focusControlHandler()
    },

    /**
     * [focusControlHandler 点击关注]
     * @param  {[Boolean]} status [关注与取消]
     * @return {[type]}        [description]
     */
    async focusControlHandler() {
      this.$route.matched[0].meta.is_login = true;

      let skip = this.$route.fullPath + '&skip=1'
      judgeLogin(this.$route, this.$route, () => {
        debounce(300, this.focusHandler)
      }, this, skip)
    },

    /**
     * [focusHandler 关注]
     * @return {Promise} [description]
     */
    async focusHandler() {
      const { shop_id, status } = this;
      try{
        if (status) {
          await focusControl({ type: 1, value: shop_id })
          this.$emit('change-focus', { is_focus: 1 })
        } else {
          await focusControl({ type: 3, value: shop_id })
          this.$emit('change-focus', { is_focus: 0 })
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [blackHandler 点击拉黑]
     * @return {Promise} [description]
     */
    async blackHandler(status) {

      let skip = this.$route.fullPath + '&skip=2'
      this.$route.matched[0].meta.is_login = true;
      this.status1 = status
      judgeLogin(this.$route, this.$route, () => {
        debounce(300, this.blackControl)
      }, this, skip)
    },

    /**
     * [blackControl 点击拉黑]
     * @param  {[Boolean]} status [拉黑与取消]
     * @return {[type]}        [description]
     */
    async blackControl(status) {
      const { shop_id, status1 } = this;

      try{
        if (status1) {
          const res = await this.$Dialog({ message: '是否拉黑该掌柜' });
          if (res === 'confirm') {
            await blackControl({ type: 1, value: shop_id })
            this.$emit('change-black', { is_black: 1 })
          }
        } else {
          const res = await this.$Dialog({ message: '是否取消拉黑该掌柜' });
          if (res === 'confirm') {
            await blackDelControl({ type: 1, value: shop_id })
            this.$emit('change-black', { is_black: 0 })
          }
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [shareHandler 分享]
     * @return {[type]} [description]
     */
    shareHandler() {
      this.$emit('share-handler', {})
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.head {
  width: 100%;
  height: 390px;
  background:#fff;
  position:relative;
  margin-bottom: 10px;

  .bg {
    width: 100%;
    height: 116px;
    background:url('@/assets/store_bg.png') no-repeat;
    background-size: cover;
    position:absolute;
    left:0;
    top:0;
  }

  .header {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background:#fff;
    position:absolute;
    top: 30px;
    left: 50%;
    margin-left: -60px;
    box-shadow: 0 5px 8px rgba(0,0,0,.15);
    @include list(row);
    justify-content:center;
    align-items:center;
    >img {
      width: 112px;
      height: 112px;
      border-radius:50%;
      object-fit:cover;
    }
  }

  .info {
    width: 100%;
    padding-top: 150px;

    .user {
      width: 100%;
      height: 52px;
      font-size: 30px;
      @include list(row);
      align-items:center;
      justify-content:center;
    }

    .more {
      width: 100%;
      height: 40px;
      @include list(row);
      align-items:center;
      justify-content:center;

      >p {
        width: 120px;
        height: 32px;
        background:#c7b199;
        font-size: 24px;
        display:table;
        text-align:center;
        overflow:hidden;
        border-radius: 16px;
        line-height:normal;
        color:#fff;
        >span {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }

    .desc {
      width: 100%;
      height: 46px;
      display:table;

      p {
        width: 100%;
        display:table-cell;
        line-height: 46px;
        vertical-align:middle;
        font-size: 24px;
        color:#4c4c4c;
        text-align:center;
      }
    }

    .btn {
      width: 100%;
      height: 68px;
      @include list(row);
      align-items:center;
      justify-content:center;

      >p {
        width: 146px;
        height: 52px;
        box-sizing:border-box;
        @include border($bg: transparent, $direction: all);
        font-size: 24px;
        @include list(row);
        justify-content:center;
        align-items:center;
        border-radius: 8px;
        margin:0 8px;
        line-height: 52px;

        >i {
          width: 24px;
          height: 24px;
          background:url('@/assets/store_focus.png') no-repeat;
          background-size: cover;
          margin-right: 10px;
        }
      }

      .f28b8c {
        border-color:#f28b8c;
        color:#f28b8c;
      }


      .share {
        >i {
          background:url('@/assets/store_share.png') no-repeat;
          background-size: cover;
        }
      }

      .bebebe {
        border-color:#bebebe;
        color:#bebebe;
        >i {
          background:url('@/assets/store_del.png') no-repeat;
          background-size: cover;
        }
      }

      .focus {
        >i {
          background:url('@/assets/store_focus1.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>
