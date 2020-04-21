<template lang="html">
  <ul :class="$style.list">
    <router-link tag="li" :to="{ name: 'Goods', query: { goods_id: item.goods_id } }" v-for="(item, index) in listData" :key="item.goods_id">
      <div :class="$style.img">
        <img v-lazy="$coverChange(item.goods_cover)" alt=""/>
      </div>
      <slot :index="index"></slot>
      <div :class="$style.info">
        <h4>
          <span>{{ item.goods_name }}</span>
        </h4>
        <span v-if="item.genre === 1" :class="[$style.ico, $style.person]"></span>
        <span v-else :class="[$style.ico, $style.goods]"></span>

        <div :class="$style.more">
          <p :class="$style.line">
            <span>已拼{{ item.goods_count ? item.goods_count.sell_count: 0 }}件</span>
          </p>
          <p :class="[$style.chunk, $style['chunk' + item.is_send]]">
            <span v-if="item.is_send == 1">用户自提</span>
            <span v-else-if="item.is_send == 2">商家配送</span>
            <span v-else>镖师配送</span>
          </p>
        </div>
        <div :class="$style.price">
          <div>
            <!-- <img :class="$style.tag" src="@/assets/home_price.png"/> -->
            <p :class="$style.tag1"><span>拼团价</span></p>
            <span :class="$style.red">{{ item.goods_group_price }}</span>
          </div>
          <span>去拼团</span>
        </div>
      </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.list {
  width: 100%;

  .red {
    color:#e84445;
    font-size: 38px;
  }
  >li {
    width: 100%;
    height: 266px;
    background:#fff;
    box-sizing:border-box;
    padding: 18px 20px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    margin-bottom:10px;
    position:relative;
  }

  .img {
    width: 220px;
    height: 220px;
    object-fit:cover;
    // box-sizing:border-box;
    // box-shadow: 2px 2px 8px #f2f2f2;
    @include list(row);
    align-items:center;
    justify-content:center;
    // border-radius: 6px;
    img {

      width: 220px;
      height: 220px;
      object-fit:cover;
      // border-radius: 4px;
    }
  }

  .info {
    width: 460px;
    position:relative;
    h4 {
      width: 100%;
      height: 81px;
      line-height: 40px;
      font-size: 28px;
      text-indent: 87px;
      position:relative;
      font-weight:normal;
      margin-bottom: 12px;
      display:table;

      span {
          display:table-cell;
          line-height: 40px;
          vertical-align:middle;
          @include multiline-truncation;
      }
    }

    .ico {
      position:absolute;
      left:0;
      top:3px;
      width: 82px;
      height: 26px;
      background:#32c873;
      display:table;
      text-align:center;
      line-height:normal;
      border-radius:4px;
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

    .more {
      width: 100%;
      height: 30px;
      margin-bottom:47px;
      @include list(row);
      align-items:center;
      .line {
        height: 30px;
        display:table;
        line-height:normal;
        margin-right: 20px;
        @include border($bg: #a0a0a0, $direction: all)
        box-sizing:border-box;
        border-radius: 4px;
        >span {
          font-size: 20px;
          color:#a0a0a0;
          display:table-cell;
          vertical-align:middle;
          padding:0 6px;
        }
      }

      .chunk {
        height: 30px;
        display:table;
        @include border($bg: transparent, $direction: all)
        line-height:normal;
        border-radius: 4px;
        box-sizing:border-box;
        >span {
          font-size: 20px;
          display:table-cell;
          vertical-align:middle;
          padding:0 6px;
          border-radius: 4px;
        }
      }

      .chunk1 {
        color:#fa920f;
        background:#fff3e5;
        border-color:#fff3e5;
      }

      .chunk0 {
        color:#00a9fe;
        background:#e4f5fd;
        border-color:#e4f5fd;
      }

      .chunk2 {
        color:#ff3600;
        background:rgba(255, 54, 0, .1 );
        border-color:rgba(255, 54, 0, .1 );
      }
    }

    .price {
      width: 100%;
      height: 60px;
      @include list(row);
      align-items:center;
      justify-content: space-between;
      >div {
        height: 60px;
        @include list(row);
        align-items:flex-end;
        justify-content: space-around;
        font-size: 24px;
        font-weight:bold;
        position:relative;
        .tag {
          position:absolute;
          width: 60px;
          height: 24px;
          left:0;
          top:2px;
          margin-top:-6px;
        }

        .tag1 {
          position:absolute;
          width: 55px;
          height: 20px;
          left:0;
          top:2px;
          margin-top:-6px;
          line-height: normal;
          background:#e84445;
          color:#fff;
          font-size: 20px;
          display:table;
          border-radius: 4px;

          >span {
            font-size: 16px;
            display:table-cell;
            vertical-align:middle;
            text-align:center;
          }
        }
        .red {
          &:before {
            content: "￥";
            font-size: 24px;
            color:#e84445;
          }
        }
      }

      >span {
        width: 120px;
        height: 60px;
        @include border($bg: #e41616, $direction: all)
        box-sizing:border-box;
        @include list(row);
        align-items:center;
        justify-content:center;
        font-size: 28px;
        border-radius: 6px;
        color:#e41616;
      }
    }
  }
}
</style>
