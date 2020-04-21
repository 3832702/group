<template lang="html">
  <ul :class="$style.list">
    <li :class="$style.item">
      <img src="http://hbimg.b0.upaiyun.com/feb493cc9490f2f2adcce058207bf6cf700f5d8716336-Ub1Qm2_fw658" alt="">
      <div :class="$style.info">
        <p :class="$style.user">
            <span>Andy</span>
            <span>关注数: 1100</span>
        </p>
        <p :class="$style.checked">
          <i></i>
          <span>取消关注</span>
        </p>
      </div>
   </li>
  </ul>
</template>

<script>
export default {
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

  .list {
    width: 100%;
    .item {
      width: 100%;
      height: 130px;
      padding:0 20px;
      box-sizing:border-box;
      background:#fff;
      @include list(row);
      align-items:center;
      justify-content:space-between;
      position:relative;

      &:after {
          content: " ";
          height: 2px;
          background:#ebebeb;
          position:absolute;
          left:20px;
          right:20px;
          bottom:0;
      }

      &:last-child {
        &:after {
          background:transparent;
        }
      }

      >img {
        width: 100px;
        height: 100px;
        border-radius:6px;
      }

      .info {
        width: 79.8%;
        height: 100px;
        @include list(row);
        justify-content:space-between;
        .user {
          width: 410px;
          height: 100%;
          @include list;
          span {
            &:first-child {
              height: 46px;
              margin-bottom:10px;
              font-size: 28px;
            }

            &:last-child {
              height: 44px;
              font-size: 22px;
              color:#979797;
            }
          }
        }

        .checked {
          width: 120px;
          height: 100%;
          font-size: 24px;
          @include list;
          align-items:center;

          i {
            width: 50px;
            height: 50px;
            background:url("@/assets/focus1.png") no-repeat;
            background-size:cover;
            margin-bottom:10px;
          }

          span {
            width: 100%;
            height: 32px;
            line-height: 32px;
            color:#9b9b9b;
            text-align:center;
          }
        }


      }
    }
  }

</style>
