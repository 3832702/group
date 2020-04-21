<template lang="html">
<div class="goods_status" :class="$style.status">
  <van-steps v-if="active != 4 && active != 2" :description="description" :active="newActive" active-color="#d80a0d">
    <van-step v-for="(item, index) in statusList" :key="index">{{ item }}</van-step>
  </van-steps>
  <template v-else-if="active == 4">
    <span>退货状态: {{ salesStatus[is_return] && salesStatus[is_return].title }}</span>
    <p>{{ salesStatus[is_return] && salesStatus[is_return].content }}</p>
  </template>
  <template v-else-if="active == 2">
    <span>拼团失败</span>
    <p>该团已失败(货款预计三个工作日到达账户)</p>
  </template>
</div>
</template>

<script>
const status = [
  "拼团中",
  "配送中",
  "拼团成功"
]

const status1 = [
  "拼团中",
  "取货中",
  "拼团成功"
]

const sendStatus = {
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
  0: {
    title: '退货中',
    content: '退货申请已提交，等待掌柜确认'
  },
  1: {
    title: '已退货',
    content: '当前订单已退货'
  },
  2: {
    title: '已拒绝',
    content: '掌柜已拒绝您的退货申请'
  }
}

export default {
  props: {
    active: {
      type: Number,
      default: -1
    },
    send2_state: {
      type: Number,
      default: null
    },
    is_return: {
      type: Number,
      default: null
    },
    is_send: {
      type: Number,
      default: -1
    }
  },
  computed: {
    /**
     * [description 当前状态]
     * @return {[type]} [description]
     */
    description() {
      const { status, newActive } = this;
      let str = `当前状态: ${status[newActive]}`;

      str = this.is_send == 0 ? str : `当前状态: 等待上门自提`;

      return str
    },
    newActive() {
      let { active } = this;

      return active == 3 ? 2: active
    },
    statusList() {
      if (this.is_send == 0) {
        return status
      } else if (this.is_send == 1) {
        return status1
      } else if (this.is_send == 2) {
        return status
      }else {
        return {}
      }
    }
  },
  data() {
    return {
      status,
      sendStatus,
      salesStatus
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.status {
  width: 93%;
  background:#fff;
  margin:0 auto;
  //background: -webkit-linear-gradient(left, #ff5d8d, #ff68c1); /* Safari 5.1 - 6.0 */
  background: linear-gradient(to right, #fb6264, #fd7173); /* 标准的语法 */
  border-radius:10px;
  margin-top:20px;
  margin-bottom:20px;

  span {
    width: 100%;
    height: 88px;
    line-height: 88px;
    box-sizing:border-box;
    padding:0 20px;
    font-size: 30px;
    color:#fff;
  }

  p {
    width: 486px;
    line-height: 40px;
    font-size: 24px;
    color:#fff;
    padding-left: 20px;
    padding-bottom: 20px;
  }
}

</style>

<style lang="scss">
// .goods_status {
//   .van-steps {
//     border-radius:4px;
//     background: linear-gradient(to right, #fb6264, #fd7173); /* 标准的语法 */
//   }
//
//   .van-step {
//     font-size: 24px;
//     .van-step__title {
//       font-size: 24px;
//     }
//   }
//
//   .van-step__circle-container {
//     background: linear-gradient(to right, #fb6264, #fd7173); /* 标准的语法 */
//   }
//
//   .van-step__title {
//     color:#fff;
//   }
//
//   .van-steps__desc {
//     font-size: 24px;
//   }
//
//   .van-step--finish {
//     .van-step__line, .van-step__circle {
//       background:#ff5486;
//     }
//   }
// }

.goods_status .van-step--horizontal.van-step--process .van-step__circle-container {
  top: 60px;
}

.goods_status .van-step--horizontal.van-step--process .van-icon {
  font-size: 20px;
}

.goods_status {
  .van-steps {
    border-radius:10px;
  }
}
</style>
