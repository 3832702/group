<template lang="html">
  <div :class="$style.recommend">
    <div :class="$style.head"><span>更多拼单火热进行中</span></div>
    <ul>
      <router-link tag="li" :to="{ name: 'Goods', query: { goods_id: item.goods_id } }" v-for="(item, index) in recommendList" :key="index">
        <img :src="$coverChange(item.goods_cover)" alt="">
        <h4><span>{{ item.goods_name }}</span></h4>
        <p>
          <span v-if="item.genre === 1" :class="[$style.ico, $style.person]"></span>
          <span v-else :class="[$style.ico, $style.goods]"></span>
          <span :class="$style.price">{{ item.goods_group_price }}</span>
        </p>
        <!-- <span>库存: {{ item.goods_stock }}</span> -->
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    recommendList: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.recommend {
  width: 100%;
  padding-top:30px;
  .head {
    width: 100%;
    height: 80px;
    font-size: 24px;
    @include list(row);
    align-items:center;
    justify-content:center;
    position:relative;
    color:#ccc;

    &:before {
      content: " ";
      height: 2px;
      background:#ccc;
      position:absolute;
      left:120px;
      right:120px;
      top:50%;
    }

    span {
      background:#f5f5f5;
      width: 300px;
      height: 100%;
      display:block;
      position:relative;
      z-index:111;
      line-height: 80px;
      text-align:center;
      color:#a0a0a0;

      &:before {
        content: " ";
        width: 8px;
        height: 8px;
        background:#ccc;
        position:absolute;
        transform:rotate(45deg);
        left:0;
        top: 36px;
      }

      &:after {
        content: " ";
        width: 8px;
        height: 8px;
        background:#ccc;
        position:absolute;
        transform:rotate(45deg);
        right:0;
        top: 36px;
      }
    }
  }

  ul {
    width: 100%;
    box-sizing:border-box;
    padding:10px 20px 0;
    @include list(row);
    flex-wrap:wrap;

    li {
      width: 346px;
      background:#fff;
      border-radius:8px;
      @include list;
      align-items:center;
      margin-bottom:15px;
      padding-bottom:30px;
      overflow:hidden;

      &:nth-of-type(odd) {
        margin-right: 7px;
      }

      &:nth-of-type(even) {
        margin-left: 7px;
      }

      img {
        width: 346px;
        height: 346px;
        margin-bottom:24px;
        object-fit:cover;
      }

      h4 {
        width: 100%;
        height: 68px;
        box-sizing:border-box;
        padding:0 24px;
        font-size: 26px;
        margin-bottom:25px;
        line-height:normal;
        display: table;

        span {
          display: table-cell;
          vertical-align: middle;
          @include multiline-truncation;
          line-height: 34px;
        }
      }

      >p {
        width: 100%;
        height: 26px;
        box-sizing:border-box;
        padding:0 24px;
        @include list(row);
        align-items:center;
        justify-content:space-between;

        // span {
        //
        //   &:nth-of-type(1) {
        //     font-size: 22px;
        //     color:#c04653;
        //   }
        //
        //   &:nth-of-type(2) {
        //     font-size: 26px;
        //     color:#ff3248;
        //
        //     &:before {
        //       content: "￥";
        //       font-size: 22px;
        //     }
        //   }
        //
        //   &:nth-of-type(3) {
        //     color:#9b9b9b;
        //     font-size: 22px;
        //     text-decoration:line-through;
        //   }
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

      >span {
        width: 100%;
        box-sizing:border-box;
        height: 70px;
        padding:0 20px;
        line-height: 70px;
        font-size: 22px;
        color:#a5a5a5;
      }
    }
  }
}
</style>
