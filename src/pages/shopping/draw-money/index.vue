<template lang="html">
  <div :class="$style.money">
    <div :class="$style.box">
      <span>提现金额</span>
      <input type="number" placeholder="0" v-model.number="money">
      <div :class="$style.more">
        注: 可提现金额为{{ balance }}元
      </div>
    </div>
    <dl :class="$style.hint">
      <dt>温馨提示:</dt>
      <dd :class="$style.emphasis">1.申请提交后请按照提示添加客服微信</dd>
      <dd>2.提现最低金额最低5元起</dd>
    </dl>
    <div @click="submitHandler" :class="$style.submit">
      申请提现
    </div>
    <!-- 验证验证码弹窗 -->
    <van-popup v-model="show">
        <p class="label">验证码校验</p >
        <van-field v-model="code" center clearable placeholder="请输入短信验证码" />
        <van-button class="btn" type="primary" @click="codeHandler">确 定</van-button>
    </van-popup>
  </div>
</template>

<script>
import { payOut, debounce, sendsCode, checkCode } from "@/server/index.js"
import { mapState } from 'vuex'
import { hintChange } from "@/utils/util.js"

export default {
  data() {
    return {
      money: '', // 提现金额
      show: false,
      code: ''
    }
  },
  computed: {
    ...mapState(['balance', 'details'])
  },
  methods: {
    /**
     * [submitHandler 申请提现]
     * @return {[type]} [description]
     */
    submitHandler() {
      debounce(300, this.submitData)
    },

    /**
     * [submitData 提交数据]
     * @return {[type]} [description]
     */
    async submitData() {
      let { money: cny_out, balance, details: { home_phone, phone } } = this;

      if (cny_out < 5) {
        hintChange(this, {message: '提现最低金额为5元', duration: 1000});
        return;
      }

      if (cny_out > Number(balance)) {
        hintChange(this, {message: '提现金额不能超过余额', duration: 1000});
        return;
      }

      if (!phone && !home_phone) {
        hintChange(this, {message: '请添加收货地址', duration: 1000});
        return;
      }

      this.show = true;
      await sendsCode({ phone: phone || home_phone })
    },

    /**
     * [codeHandler 确定提现]
     * @return {[type]} [description]
     */
    async codeHandler() {
      const { code, money: cny_out } = this;
      try {
        await checkCode({ code })
        await payOut({ cny_out: cny_out.toFixed(2) })
        this.show = false;
        this.$router.replace({ name: 'Help', query: { success: 1 } })
      }catch(err) {
        this.show = false;
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.money {
  width: 100%;

  .box {
    width: 100%;
    height: 280px;
    background:#fff;
    @include list;
    margin-bottom: 20px;
    >span {
      width: 100%;
      height: 80px;
      line-height: 80px;
      box-sizing:border-box;
      padding:0 30px;
      font-size: 28px;
    }

    input {
      width: 100%;
      border:none;
      height: 110px;
      box-sizing:border-box;
      line-height: 30px;
      font-size: 30px;
      padding: 35px 30px;
    }

    .more {
      width: 100%;
      height: 90px;
      line-height: 90px;
      font-size: 28px;
      box-sizing:border-box;
      padding:0 30px;
      @include border($bg: #f2f2f2, $direction: top)
    }
  }

  .hint {
    width: 100%;
    background:#fff;
    padding:20px 0;
    margin-bottom: 50px;
    dt {
      width: 100%;
      line-height: 80px;
      box-sizing:border-box;
      padding: 0 30px;
      height: 80px;
      font-size: 28px;
    }
    dd {
      width: 100%;
      line-height: 60px;
      height: 60px;
      font-size: 26px;
      box-sizing:border-box;
      padding: 0 30px;
    }
    .emphasis {
      color:#fb6264;
    }
  }

  .submit {
    width: 90%;
    height: 80px;
    background:#fb6264;
    border-radius:10px;
    font-size: 36px;
    line-height: 80px;
    margin:0 auto;
    text-align:center;
    color:#fff;
  }
}
</style>

<style lang="scss">
.van-popup {
    width: 615px;
    padding: 20px;
    text-align: center;
    transition: .3s;
    .label {
      margin-bottom: 24px;
      font-size: 36px;
      color: #2d2d2d;
    }
    .btn {
      margin-top: 52px;
      width: 615px;
      height: 80px;
    }
}
</style>
