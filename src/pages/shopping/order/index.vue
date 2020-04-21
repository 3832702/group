<template lang="html">
  <div key="order">
    <Tab :activeIndex="orderIndex" @tab-change="tabChange"></Tab>
    <FlowList :isNot="isNot" :finishedText="finishedText" :class="$style.van_list" :loading="loading" :finished="finished" @load-list-change="loadListChange">
      <OrderList
        :finished="finished"
        :type="orderIndex"
        :listdata="listdata"
        v-slot:default="slotProps"
        @show-code="showCode"
        @create-code="createCode"
        @refund-handler="refundHandler"
        @affirm-refund-handler="affirmRefundHandler"
      >
        <!-- <Status :data="slotProps.user" :index="type"></Status> -->
      </OrderList>
    </FlowList>
    <Code :codeData="codeData" @code-change="hideCodeChange" v-if="isCode"></Code>
    <FAoter></FAoter>
  </div>
</template>

<script>
import Tab from "@/components/shopping/order/tab.vue"
import FlowList from "@/public/common/flow-list.vue"

import FAoter from "@/public/common/new-footer.vue"
import OrderList from "@/components/shopping/order/list.vue"
// import Status from "@/components/shopping/order/status.vue"
import Code from "@/components/shopping/order/code.vue"

import { orderUserList, debounce, orderRefund, orderRefundSure } from "@/server/index.js"

import { isFinished, hintChange } from "@/utils/util.js"

import { scanQRCode } from "@/utils/employ-jssdk.js"

import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Tab,
    OrderList,
    // Status,
    FAoter,
    FlowList,
    Code
  },
  data() {
    return {
      type: 1,
      page: 1, // 分页
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完成
      finishedText: '', // 提示语句
      isNot: false, // 是否无商品
      listdata: [],
      validTimer: 259200000,
      isCode: false,
      codeData: {}, // 二维码信息
      currIndex: 0, // 当前点击index
      refundSureData: '', // 退货参数
    }
  },

  computed: {
    ...mapState(['orderIndex'])
  },

  created() {
    this.loading = true;
    this.getList()
  },

  methods: {
    ...mapMutations(['CHANGEORDERINDEX']),

    /**
     * [loadListChange 加载更多]
     * @return {Promise} [description]
     */
    async loadListChange() {
      const { loading } = this;

      if (!loading) {
        debounce(900, this.controlHandler)
      }
    },

    /**
     * [c 回调]
     * @return {[type]} [description]
     */
    controlHandler() {

      let { page, listdata } = this;

      if (listdata.length) {
        this.page = page + 1;
        this.getList();
      }
    },

    /**
     * [getList 获取订单列表]
     * @return {[type]} [description]
     */
    async getList() {
      const { orderIndex, page } = this;
      try {
        let data = await orderUserList({ type: orderIndex, page })
        if (orderIndex == 4) {
          data = this.setExpirationTime(data)
        }
        this.listdata = [...this.listdata, ...data]
        this.loading = false

        this.finished = isFinished(data, 5)
        if (!this.listdata.length) {
          this.finishedText = '该栏目下暂无数据'
          this.isNot = true;
        } else {
          this.finishedText = ''
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [setExpirationTime 设置过期时间]
     * @param {[type]} info [description]
     */
    setExpirationTime(list) {
      let newList = JSON.parse(JSON.stringify(list))

      newList.forEach(item => {
        let { create_time } = item;
        let pastTime = new Date(create_time.split('-').join('/')).getTime() + this.validTimer;
        let currTime = new Date().getTime();

        item.is_sales_return = currTime > pastTime ? 0: 1
      })

      return newList
    },

    /**
     * [tabChange 切换tab]
     * @param  {[Number]} type [type类型]
     * @return {[type]}       [description]
     */
    tabChange({ type }) {
      //this.type = type;
      this.page = 1;
      this.listdata = [];
      this.loading = true;
      this.finished = false;
      this.isNot = false;
      this.CHANGEORDERINDEX(type)
      this.getList()
    },

    /**
     * [showCode 弹出二维码]
     * @return {[type]} [description]
     */
    async showCode({ index }) {
      const { listdata } = this;
      const { code } = listdata[index];
      this.$Dialog({ title: '温馨提示', message: `该订单的安全码为【 ${code} 】` })
    },

    /**
     * [createCode 自定义事件-----一级镖师生成二维码]
     * @param  {[Number]} index [当前点击索引]
     * @return {[type]} [description]
     */
    createCode({ index }) {
      const { listdata } = this;
      this.codeData = listdata[index];
      this.isCode = true;
    },

    /**
     * [hideCodeChange 自定义事件-----隐藏code]
     * @return {[type]} [description]
     */
    hideCodeChange() {
      this.isCode = false;
    },

    /**
     * [refundHandler 自定义事件-----申请退货]
     * @return {[type]} [description]
     */
    async refundHandler({ index }) {
      this.currIndex = index;
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
     * [orderRefund 取消订单]
     * @return {[type]} [description]
     */
    async orderRefund() {
      const { currIndex, listdata } = this;
      const { order_id } = listdata[currIndex];

      try {
        await orderRefund({ order_id })
        const res = await this.$Dialog({ message: '您的退货申请已提交' });
        if (res === 'confirm') {
          this.listdata.splice(currIndex, 1)
        } else {
          this.listdata.splice(currIndex, 1)
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [affirmRefundHandler 确认退货成功]
     * @return {[type]} [description]
     */
    async affirmRefundHandler({ index }) {
      this.currIndex = index;
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
      const { listdata, currIndex } = this;
      const [shop_id, order_id] = resultStr.split(',')
      const info = listdata[currIndex]

      if (order_id === info.order_id) {
        try {
          this.refundSureData = { shop_id, order_id }
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
      const { refundSureData, listdata, currIndex } = this;
      const curr = JSON.parse(JSON.stringify(listdata[currIndex]));

      try {
        await orderRefundSure(refundSureData)
        curr.is_return = 1;
        this.splice(currIndex, 1, curr)
        await hintChange(this, {message: '退货成功', duration: 300});
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" module>
  #home {
    width: 100%;
  }

  .van_list {
    box-sizing:border-box;
    padding-top:80px;
  }
</style>

<style>
  body {
    background:#f2f2f2;
  }
</style>
