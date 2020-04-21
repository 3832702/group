<template lang="html">
  <div v-if="type == 1" :class="$style.btnwrap">
    <div :class="$style.btn">
      <div @click="examineGroup" :class="$style.confirm">查看拼团</div>
    </div>
  </div>
  <div v-else-if="type == 2" :class="$style.btnwrap">
    <div :class="$style.btn">
      <template v-if="info.is_send == 0">
        <div v-if="info.code" @click="showCode" :class="$style.confirm">查看安全码</div>
        <router-link tag="div" :to="{ name: 'Schedule', query: { send_id: info.send_id } }" :class="$style.confirm">查看物流订单</router-link>
      </template>
      <template v-else>
        <div @click="createCode" :class="$style.confirm">生成取货码</div>
        <div v-if="info.is_send == 1" @click="courseHandler" :class="$style.confirm">查看路线</div>
      </template>
    </div>
  </div>
  <div v-else-if="type == 4 && info.is_sales_return" :class="$style.btnwrap">
    <div :class="$style.btn">
      <div @click="refundHandler" :class="$style.cancel">申请退货</div>
    </div>
  </div>
  <div v-else-if="type == 5 && is_return == 0" :class="$style.btnwrap">
    <div :class="$style.btn">
      <div @click="affirmRefundHandler" :class="$style.cancel">扫码退货</div>
    </div>
  </div>
</template>

<script>
import { domain } from "@/utils/util.js";

export default {
  props: {
    type: {
      type: Number,
      default: 1
    },
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    is_return: {
      type: Number,
      default: null
    }
  },
  methods: {
    /**
     * [showCode 弹出二维码]
     * @return {[type]} [description]
     */
    showCode() {
      this.$emit('show-code', {  })
    },

    /**
     * [createCode 生成取货码]
     * @return {[type]} [description]
     */
    createCode() {
      this.$emit('create-code', {  })
    },

    /**
     * [examineGroup 查看拼团]
     * @return {[type]} [description]
     */
    examineGroup() {
      const { info: { group_id } } = this;
      this.$router.push({ name: 'Single', query: { group_id } })
    },

    /**
     * [courseHandler 路线规划]
     * @return {[type]} [description]
     */
    courseHandler() {
      const {
        info: {
          location:{ latitude, longitude },
          sign
        },
        $route: { fullPath }
      } = this;

      window.location.href = `
        https://apis.map.qq.com/tools/routeplan/eword=${sign}
        &epointx=${longitude}
        &epointy=${latitude}
        &transport=3
        ?referer=yichenghaodian
        &key=DOZBZ-2NAHX-F234E-TYIOQ-HQ3YQ-R7BTG
        &backurl=${fullPath}
      `

      // window.location.href = `
      //   https://apis.map.qq.com/tools/routeplan/epointx=${epointx}
      //   &epointy=${epointy}
      //   &spointx=${spointx}
      //   &spointy=${spointy}
      //   &eword=${eword}
      //   ?referer=yichenghaodian
      //   &key=DOZBZ-2NAHX-F234E-TYIOQ-HQ3YQ-R7BTG
      //   &backurl=https://tuan.nineopen.com/send1/receiving
      // `
    },

    /**
     * [refundHandler 申请退货]
     * @return {[type]} [description]
     */
    refundHandler() {
      this.$emit('refund-handler', {})
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

.btnwrap {
  width: 100%;
  height: 100px;
}

.btn {
  width:100%;
  height: 100px;
  background:#fff;
  position:fixed;
  left:0;
  bottom:0;
  @include list(row);
  justify-content:flex-end;
  align-items:center;
  box-sizing:border-box;
  padding:0 20px;

  .cancel {
    height: 60px;
    padding:0 24px;
    box-sizing:border-box;
    @include border($bg: #e0e0e0, $direction: all)
    font-size: 26px;
    color:#898989;
    @include list(row);
    align-items:center;
    margin-right: 20px;
    border-radius:30px;
  }

  .confirm {
    height: 60px;
    padding:0 24px;
    background:  -webkit-linear-gradient(left, #f02828 , #db1919); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f02828 , #db1919); /* 标准的语法 */
    color:#fff;
    font-size: 26px;
    line-height: 60px;
    margin-right: 20px;
    border-radius: 30px;
  }
}
</style>
