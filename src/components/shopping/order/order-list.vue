<template lang="html">
  <ul v-if="listdata.length" :class="$style.orderlist">
    <li v-for="(item) in listdata" :key="item.order_id">
      <div :class="$style.head">
        <img src="@/assets/tools2.png" alt="">
        <h4>{{ item.sign }}</h4>
        <span v-if="item.send2_state">{{ status[item.send2_state] }}</span>
        <span v-else>{{ salesStatus[item.is_return] }}</span>
      </div>
      <router-link tag="div" :to="{ name: 'OrderInfo', query: { order_id: item.order_id, type } }" :class="$style.item">
        <img :src="$coverChange(item.goods_cover)" alt="">
        <div :class="$style.info">
          <div :class="$style.t">
            <h4><span>{{ item.goods_name }}</span></h4>
            <p>
              <span>￥ {{ item.goods_group_price }}</span>
              <span>× {{ item.goods_buy_num }}</span>
            </p>
          </div>
          <div :class="$style.more">
            <p>
              <span></span>
            </p>
          </div>
          <span :class="$style.total">实付: ￥ {{ item.goods_group_price * item.goods_buy_num }}</span>
        </div>
      </router-link>
      <slot :user="item"></slot>
    </li>
  </ul>
  <div :class="$style.not" v-else-if="!listdata.length && finished">
    <ul :class="$style.orderlist">
      <li>
        <div :class="$style.head">
          <img src="@/assets/tools2.png" alt="">
          <h4>壹城好店</h4>
          <span>示例</span>
        </div>
        <div :class="$style.item">
          <img src="@/assets/logo.png" alt="">
          <div :class="$style.info">
            <div :class="$style.t">
              <h4><span>社区拼团购物微商城,同城下单6小时到家 </span></h4>
              <p>
                <span>￥ 8.88</span>
                <span>× 1</span>
              </p>
            </div>
            <div :class="[$style.more, $style.more1]">
              <p>
                <span>示例</span>
              </p>
            </div>
            <span :class="$style.total">实付: ￥ 0.88</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const status = {
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
  0: "退货申请已提交",
  1: "已退货",
  2: "商家已拒绝"
}

export default {
  props: {
    listdata: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: Number,
      default: 1
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status,
      salesStatus
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.not {
  width: 100%;
  box-sizing:border-box;
}

.orderlist {
    width: 100%;
    // padding-bottom: 90px;

    >li {
      padding:20px 0 10px;
      background:#fff;
      margin-bottom: 20px;
      .head {
        width: 100%;
        height: 80px;
        box-sizing:border-box;
        padding:0 26px;
        @include list(row);
        align-items:center;

        img {
          width: 35px;
          height: 35px;
          margin-right:20px;
          object-fit:cover;
        }

        h4 {
          width: 60%;
          height: 100%;
          @include list(row);
          align-items:center;
          font-size: 30px;

          &:after {
            content: " ";
            @include leftArrow($width:10px, $bg: #808080,$rotate:rotate(-45deg));
            margin-left: 30px;
          }
        }

        span {
          font-size: 24px;
          margin-left: auto;
          color:#e04549;
        }
      }

      .item {
        padding: 20px 26px 0;
        box-sizing:border-box;
        @include list(row);
        justify-content:space-between;

        >img {
          width: 180px;
          height: 180px;
          object-fit:cover;
        }

        .info {
            width: 70%;
            @include list;

            .t {
              width: 100%;
              height: 68px;
              line-height: 34px;
              @include list(row);
              justify-content:space-between;;

              >h4 {
                width: 65%;
                height: 64px;
                font-size: 28px;
                overflow:hidden;
                line-height:normal;
                display: table;

                span {
                  display: table-cell;
                  vertical-align: middle;
                  @include multiline-truncation;
                  line-height: 32px;
                }
              }

              >p {
                width: 32%;
                height: 100%;
                font-size: 26px;
                @include list;
                span {
                  width: 100%;
                  height: 50%;
                  @include list(row);
                  justify-content:flex-end;
                  &:last-child {
                    color:#999999;
                  }
                }
              }
            }

            .more {
                height: 38px;
                margin:15px 0;
                width: 100%;
                display:block;
                font-size: 24px;
                color:#999999;

                p {
                  width: 120px;
                  height: 38px;
                  display:table;
                  line-height:normal;
                  border-radius: 19px;
                  color:#fff;
                }

                span {
                  display: table-cell;
                  vertical-align: middle;
                  text-align:center;
                }
            }

            .more1 {
              p {
                background:linear-gradient(to right, #ea2828, #d71919);
              }
            }

            .total {
              width: 100%;
              height: 52px;
              line-height: 52px;
              font-size: 26px;
              text-align:right;
            }
        }
      }
    }
}
</style>
