<template lang="html">
<div :class="$style.strategy">
  <div :class="$style.head">
    <h4>使用攻略</h4>
    <span>查看更多</span>
  </div>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <p>
        <img :src="item.ico" alt="">
      </p>
      <div :class="$style.info">
        <h4>{{ item.title }}</h4>
        <p><span>{{ item.cite }}</span></p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          ico: 'http://5b0988e595225.cdn.sohucs.com/images/20170826/b6fc1b92d3384f7f96a0e7a7e073d579.jpeg',
          title: '1号前，怎么还款，1号出账单后，自动还款如何避免失败',
          cite: '栏目一'
        },
        {
          ico: 'http://5b0988e595225.cdn.sohucs.com/images/20170826/b6fc1b92d3384f7f96a0e7a7e073d579.jpeg',
          title: '1号前，怎么还款，1号出账单后，自动还款如何避免失败',
          cite: '栏目一'
        },
        {
          ico: 'http://5b0988e595225.cdn.sohucs.com/images/20170826/b6fc1b92d3384f7f96a0e7a7e073d579.jpeg',
          title: '1号前，怎么还款，1号出账单后，自动还款如何避免失败',
          cite: '栏目一'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.strategy {
  width: 100%;

  .head {
    width: 100%;
    height: 90px;
    box-sizing:border-box;
    padding: 0 30px;
    @include list(row);
    align-items: center;
    justify-content:space-between;
    position:relative;
    >h4 {
      width: 50%;
      font-size: 30px;
    }

    >span {
      width: 30%;
      height: 100%;
      font-size: 26px;
      @include list(row);
      align-items:center;
      justify-content:flex-end;

      &:after {
        content: " ";
        @include leftArrow($width:12px, $bg: #ccc,$rotate:rotate(-45deg));
        margin-left: 10px;
      }
    }
  }

  ul {
    width: 100%;

    >li {
      width: 100%;
      height: 130px;
      @include list(row);
      box-sizing:border-box;
      padding:0 30px;
      align-items:center;
      justify-content:space-between;
      margin-bottom: 20px;

      >p {
        width: 130px;
        height: 130px;
        @include list(row);
        align-items:center;
        justify-content:center;

        >img {
          width: 126px;
          height: 126px;
        }
      }

      .info {
        width: 530px;
        height: 100%;
        @include list;
        justify-content:space-between;

        h4 {
          height: 84px;
          line-height: 32px;
          font-size: 30px;
          @include multiline-truncation;
        }

        >p {
          width: 100%;
          height: 40px;
          display:table;
          line-height:normal;

          >span {
            font-size: 24px;
            display:table-cell;
            vertical-align:middle;
            line-height: 32px;
            color:#8f8f8f;
          }
        }
      }
    }
  }
}
</style>
