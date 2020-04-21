<template lang="html">
  <div class="">
    <div :class="$style.placeholder">

    </div>
    <div :class="$style.footer">
      <router-link
        tag="div"
        v-for="(item, index) in footers"
        :key="index"
        :to="item.path"
        :active-class="$style.active"
        @click.native="CHANGEORDERINDEX(1)"
        replace
      >
        <i></i>
        <p>
          <span>{{ item.title }}</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    footers: {
      type: Array,
      default() {
        return [
          {
            title: "首页",
            ico: require("@/assets/home_11.png"),
            icoActive: "",
            path: { name: "Home" }
          },
          {
            title: "搜索",
            ico: require("@/assets/search_12.png"),
            icoActive: "",
            path: { name: "SearchList" }
          },
          {
            title: "订单",
            ico: require("@/assets/order_11.png"),
            icoActive: "",
            path: { name: "Order" }
          },
          {
            title: "我的",
            ico: require("@/assets/my_11.png"),
            icoActive: "",
            path: { name: "Personal" }
          }
        ]
      }
    },
  },
  methods: {
    ...mapMutations(['CHANGEORDERINDEX'])
  }
}
</script>

<style lang="scss" module>
  @import "@/public/css/elements.scss";

  .placeholder {
    width: 100%;
    height: 100px;
  }

  .footer {
    width: 100%;
    height: 100px;
    background:#fff;
    @include list(row);
    position:fixed;
    left:0;
    bottom:-1px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 11111111;
    @include border($bg: #f8f8f8, $direction: top)
    >div {
      width: 25%;
      height: 100%;
      @include list;
      align-items:center;
      box-sizing:border-box;
      flex-wrap:nowrap;
      color:#333333;
      justify-content:center;
      align-items:center;
      >i {
        width: 40px;
        height: 40px;
        background:url('@/assets/home_11.png') no-repeat;
        background-size: cover;
        margin-bottom:6px;
      }

      &:nth-of-type(2) {
        i {
          background:url('@/assets/search_11.png') no-repeat;
          background-size: cover;
        }
      }

      &:nth-of-type(3) {
        i {
          background:url('@/assets/order_11.png') no-repeat;
          background-size: cover;
        }
      }

      &:nth-of-type(4) {
        i {
          background:url('@/assets/my_11.png') no-repeat;
          background-size: cover;
        }
      }

      p {
        width: 100%;
        height: 28px;
        font-size: 24px;
        text-align:center;
        display: table;
        line-height:normal;
      }
      span {
        display: table-cell;
        vertical-align: middle;
        text-align:center;
      }
    }

    .active {
      color:#fb6264;

      >i {
        background:url('@/assets/home_12.png') no-repeat;
        background-size: cover;
      }

      &:nth-of-type(2) {
        i {
          background:url('@/assets/search_12.png') no-repeat;
          background-size: cover;
        }
      }

      &:nth-of-type(3) {
        i {
          background:url('@/assets/order_12.png') no-repeat;
          background-size: cover;
        }
      }

      &:nth-of-type(4) {
        i {
          background:url('@/assets/my_12.png') no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
