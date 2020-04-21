<template lang="html">
  <div :class="$style.info">
    <div :class="$style.view">
      <router-link :to="{ name: 'Goods', query: { goods_id: details.goods_id } }" tag="div" :class="$style.head">
        <img :src="$coverChange(details.goods_cover)" alt="">
        <ul>
          <li :class="$style.title"><span>{{ details.goods_name }}</span></li>
          <li :class="$style.more">
            <span v-if="details.genre === 1" :class="[$style.ico, $style.person]"></span>
            <span v-else :class="[$style.ico, $style.goods]"></span>
            <span :class="$style.price">{{ details.goods_group_price }}</span>
          </li>
          <li :class="$style.origin">开团时间 : {{ details.create_time }}</li>
        </ul>
      </router-link>
      <ul :class="$style.bottom">
        <li><img src="@/assets/d.png">掌柜发货&售后</li>
        <li><img src="@/assets/d.png">三天退货</li>
        <li><img src="@/assets/d.png">{{ sendType }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
  computed: {
    sendType() {
      const { details: { is_send } } = this;

      if (is_send == 0) {
        return '镖师配送'
      } else if (is_send == 1) {
        return '用户自提'
      } else {
        return '商家配送'
      }
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.info {
  width: 100%;
  height: 400px;
  background:#fff;
  box-sizing:border-box;
  padding:20px 0;

  .view {
    width: 94.67%;
    height: 360px;
    box-sizing:border-box;
    @include border($bg: #e5e5e5, $direction: all)
    margin:0 auto;
    border-radius:4px;

    .head {
      width: 100%;
      height: 290px;
      box-sizing:border-box;
      padding:30px;
      @include list(row);
      justify-content:space-between;;

      >img {
        width: 230px;
        height: 230px;
        object-fit:cover;
      }

      ul {
        width: 59%;

        .title {
          width: 100%;
          height: 80px;
          font-size: 26px;
          margin-bottom:40px;
          line-height:normal;
          display: table;

          span {
            display: table-cell;
            vertical-align: middle;
            @include multiline-truncation;
            line-height: 40px;
          }
        }

        .more {
          width: 100%;
          height: 46px;
          @include list(row);
          align-items: center;
          color:#f0383a;
          margin-bottom:27px;

          .price {
            font-size: 34px;
            &:before {
              content: "￥";
              font-size: 26px;
            }
          }

          .ico {
            width: 82px;
            height: 26px;
            background:#32c873;
            display:table;
            text-align:center;
            line-height:normal;
            border-radius:4px;
            margin-right: 20px;
            &:after {
              content: "拼人团";
              display:table-cell;
              vertical-align:middle;
              font-size: 22px;
              color:#fff;
            }
          }

          .goods {
            background:#e51815;
            &:after {
              content: "拼货团";
            }
          }
        }

        .origin {
          width: 100%;
          height: 39px;
          line-height: 39px;
          font-size: 24px;
          color:#9b9b9b;

          span {
            text-decoration:line-through;;
          }
        }
      }
    }

    .bottom {
      width: 100%;
      height: 64px;
      background:#f7f7f7;
      @include list(row);
      box-sizing:border-box;
      padding:0 24px;
      align-items:center;
      font-size: 24px;
      color:#909090;

      li {
        margin-right: 20px;
        height:100%;
        align-items:center;
        @include list(row);
        img {
          width: 28px;
          height: 28px;
          margin-right:10px;
        }
      }
    }
  }
}
</style>
