<template lang="html">
<div :class="$style.info">
  <Status :is_send="is_send" :is_return="is_return" :send2_state="send2_state" :active="type - 1"></Status>
  <Address :info="info"></Address>
  <Godos :info="info"></Godos>
  <Related :info="info"></Related>
  <Code :details="info" :order_id="order_id" @code-change="hideCodeChange" v-if="isCode"></Code>
  <Btn
    :type="type"
    :info="info"
    :is_return="is_return"
    @show-code="showCode"
    @create-code="createCode"
    @refund-handler="refundHandler"
    @affirm-refund-handler="affirmRefundHandler"
  ></Btn>
</div>
</template>

<script>
import Status from "@/components/shopping/order-info/status"
import Address from "@/components/shopping/order-info/address"
import Godos from "@/components/shopping/order-info/goods"
import Related from "@/components/shopping/order-info/related"
import Btn from "@/components/shopping/order-info/btn"
import Code from "@/components/shopping/order-info/code"

import { orderUserShow, orderRefund, debounce, orderRefundSure, orderUserRefundShow } from "@/server/index.js"
import { scanQRCode } from "@/utils/employ-jssdk.js"
import { mapMutations } from 'vuex'
import { hintChange } from "@/utils/util.js"

export default {
  components: {
    Status,
    Address,
    Godos,
    Related,
    Btn,
    Code
  },
  data() {
    return {
        order_id: "", // 订单id
        info: {}, // 用户信息
        type: 1,
        send2_state: null, // 物流状态
        is_return: null, // 退货状态
        validTimer: 259200000,
        isCode: false,
        is_send: -1
    }
  },
  created() {
    this.getGroupId();
    this.getData();
  },
  methods: {
    ...mapMutations(['CHANGEORDERINDEX']),
    /**
     * [getGroupId 获取group_id]
     * @return {[type]} [description]
     */
    getGroupId() {

      const { $route: { query: { order_id, type } } } = this;
      this.order_id = order_id
      this.type = type
      this.CHANGEORDERINDEX(type)
    },

    /**
     * [getData 获取数据]
     * @return {Promise} [description]
     */
    async getData() {
      const { order_id, type } = this;

      try {
        if (type == 5) {
          ({ is_return: this.is_return } = this.info = await orderUserRefundShow({ order_id }))
        } else {
           ({ send2_state: this.send2_state, is_send: this.is_send } = this.info = await orderUserShow({ order_id }))
          this.setExpirationTime(this.info)
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [setExpirationTime 设置过期时间]
     * @param {[type]} info [description]
     */
    setExpirationTime(info) {
      let { create_time } = info;
      let pastTime = new Date(create_time.split('-').join('/')).getTime() + this.validTimer;
      let currTime = new Date().getTime();

      info.is_sales_return = currTime > pastTime ? 0: 1
      this.info = info;
    },

    /**
     * [showCode 弹出二维码]
     * @return {[type]} [description]
     */
    async showCode() {
      const { info } = this;
      this.$Dialog({ title: '温馨提示', message: `该订单的安全码为【 ${info.code} 】` })
    },

    /**
     * [refundHandler 自定义事件-----申请退货]
     * @return {[type]} [description]
     */
    async refundHandler() {
      try {
        const res = await this.$Dialog({ message: '是否确定退货' });
        if (res === 'confirm') {
          debounce(301, this.orderRefund)
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [createCode 自定义事件-----一级镖师生成二维码]
     * @param  {[Number]} index [当前点击索引]
     * @return {[type]} [description]
     */
    createCode() {
      this.isCode = true;
    },

    /**
     * [orderRefund 取消订单]
     * @return {[type]} [description]
     */
    async orderRefund() {
      const { order_id } = this;
      try {
        await orderRefund({ order_id })
        const res = await this.$Dialog({ message: '您的退货申请已提交' });
        if (res === 'confirm') {
          this.$router.back();
        } else {
          this.$router.back();
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [affirmRefundHandler 确认退货成功]
     * @return {[type]} [description]
     */
    async affirmRefundHandler() {
      try {
        const res = await scanQRCode(this.$wx)
        this.disposeCode({ resultStr: res.resultStr })
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [disposeCode 处理扫码]
     * @param  {[Number]} index     [当前点击索引]
     * @param  {[String]} resultStr [扫码结果]
     * @return {[type]}           [description]
     */
    async disposeCode({ resultStr }) {
      const { info } = this;
      const order_id = resultStr.split(',')[1];

      if (order_id === info.order_id) {
        try {
          debounce(301, this.orderRefundSure)
        }catch(err) {
          console.log(err)
        }
      } else {
        hintChange(this, {message: '订单不符', duration: 1000})
      }
    },

    /**
     * [orderRefundSure 确认退货成功]
     * @return {[type]} [description]
     */
    async orderRefundSure() {
      const { order_id, info: { shop_id } } = this;
      try {
        await orderRefundSure({ order_id, shop_id })
        this.is_return = 1;
        await hintChange(this, {message: '退货成功', duration: 300});
      }catch(err) {
        console.log(err)
      }
    },
    /**
     * [hideCodeChange 自定义事件-----隐藏code]
     * @return {[type]} [description]
     */
    hideCodeChange() {
      this.isCode = false;
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.info {
  width: 100%;
}

</style>
