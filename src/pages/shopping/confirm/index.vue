<template lang="html">
<div :class="$style.confirm">
  <Address :details="details"></Address>
  <Single :details="details"></Single>
  <Store @remark-change="remarkChange" :num="num" @calculate-handler="calculateHandler" :details="details"></Store>
  <Price @call-pay="callPay" :details="details" :totalPrice="totalPrice"></Price>
</div>
</template>

<script>

import Address from "@/components/shopping/confirm/address";
import Single from "@/components/shopping/confirm/single";
import Store from "@/components/shopping/confirm/store"
import Price from "@/components/shopping/confirm/price"

import { orderPay, debounce } from "@/server/index.js"
import { callPay } from "@/utils/employ-jssdk.js"

import { mapState, mapActions } from 'vuex'
import { hintChange } from "@/utils/util.js"

export default {
  components: {
    Address,
    Single,
    Store,
    Price
  },
  data() {
    return {
      details: {}, // 商品数据
      num: 1, // 商品数量
      totalPrice: 0, // 总价
      group_id: '', // 拼团id
      openid: "", //
      remark: '', // 备注信息
    }
  },

  computed: {
    ...mapState({ info: 'details'})
  },

  async created() {
    await this.initDetails()
    this.getConfirm();
  },

  methods: {
      ...mapActions(['initDetails']),
      /**
       * [getConfirm 获取订单详情]
       * @return {[type]} [description]
       */
      async getConfirm() {
        const { $route: { query: { group_id } } } = this;

        this.group_id = group_id;

        try {
          this.details = await orderPay({ group_id });

          let {
            details: {
              goods: {
                goods_stock,
                goods_id
              }
            }
          } = this

          if (goods_stock === 0) {
            const res = await this.$Dialog({ message: '该产品已抢光, 查看该商品下的其他拼团' });
            if (res === 'confirm') {
              this.$router.replace({ name: 'Goods', query: { goods_id }  })
            }
          }

          this.totalPriceHandler()
        }catch(err) {
          console.log(err)
        }
      },

      /**
       * [remarkChange 自定义事件 ----- 获取备注信息]
       * @param  {[type]} remark [description]
       * @return {[type]}        [description]
       */
      remarkChange({ remark }) {
        this.remark = remark;
        console.log('remark', remark)
      },

      /**
       * [calculateHandler 计算商品数量]
       * @param  {[Number]} status [增加还是递减  0为减  1为加]
       * @return {[type]}        [description]
       */
      async calculateHandler({ status }) {
        const {
          details: {
            goods: { genre, goods_group_num, goods_stock }
          }
        } = this;

        if (status === 0) {
          this.num = --this.num < 1 ? 1: this.num
        } else if (status === 1) {
          if (genre === 1) {
            this.setOneGroupNum();
          }else if(genre === 2) {
            this.setCargoGroupNum();
          }else {
            this.num = this.num + 1;
          }
        }
        this.totalPriceHandler();
      },

      /**
       * [setOneGroupNum 设置拼人团数量]
       */
      async setOneGroupNum() {
        const {
          details: {
            goods: { goods_stock }
          },
          num
        } = this;

        if (num < goods_stock) {
          this.num = num + 1;
        } else {
          this.num = goods_stock
          await hintChange(this, {message: `当前商品可购买数量为 ${goods_stock}`, duration: 1500});
        }
      },

      /**
       * [setCargoGroup 设置拼货团数量]
       */
      async setCargoGroupNum() {
        let {
          details: {
            goods: { goods_group_num, goods_stock },
            group: { group_residue_count }
          },
          num
        } = this;

        if (num < group_residue_count) {
          this.num = num + 1;
        } else {
          this.num = group_residue_count
          await hintChange(this, {message: `当前商品可购买数量为 ${group_residue_count}`, duration: 1500});
        }
      },

      /**
       * [getGroupNum 获取拼团剩余数量]
       * @return {[type]} [description]
       */
      getGroupNum() {
        const {
          details: {
            group: { buy }
          }
        } = this;

        let num = 0;

        if (Array.isArray(buy)) {
          buy.forEach(item => {
            num = num + item.goods_buy_num
          })
        }

        return num;
      },

      /**
       * [totalPriceHandler 计算总价]
       * @return {[type]} [description]
       */
      totalPriceHandler() {
        const { num, details: { goods: { goods_group_price } } } = this;

        this.totalPrice = goods_group_price * num;
      },

      /**
       * [callPay 调起支付]
       * @return {[type]} [description]
       */
      async callPay() {

        try {
          debounce(301, this.pa)
        }catch(err) {
          console.log(err)
        }
      },

      async pa() {
        const { info: { openid, unionid }, group_id, totalPrice, num, remark, details: { goods: { goods_id } } } = this;

        try {
          await callPay({ openid, fee: totalPrice, attach: JSON.stringify({ "goods_id" : goods_id, "group_id": group_id, "unionid" : unionid, "goods_buy_num": num, "remark": remark }) },this.$wx )
          this.$router.replace({ name: "Order" });
        }catch(err) {
          console.log(err)
        }
      }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.confirm {
  width: 100%;
}

</style>
