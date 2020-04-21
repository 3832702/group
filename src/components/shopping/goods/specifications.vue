<template lang="html">
<div @touchmove.prevent="true" :class="$style.specifications">
  <div :class="$style.content">
    <div :class="$style.head">
      <img src="http://imgqn.koudaitong.com/upload_files/2014/07/19/0f1591e85e0cc16427d78e653fead4b7.jpg%21580x580.jpg" alt="">
      <p>
        <span>单买价: ￥<i>90.00</i></span>
        <span>库存量: 100</span>
      </p>
    </div>
    <div :class="$style.list">
      <dl>
        <dt>规格</dt>
        <dd :class="$style.active">红色 10件以上</dd>
        <dd>金色 单件不锈钢锁芯</dd>
        <dd>橘色 单件钢锁芯</dd>
      </dl>
    </div>
    <div :class="$style.calculate">
      <span>数量</span>
      <div>
        <button>-</button>
        <input value="1">
        <button>+</button>
      </div>
    </div>
    <div :class="$style.btn">确定</div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.specifications {
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.3);
  position:fixed;
  left:0;
  top:0;
  z-index: 111;

  .content {
    width: 100%;
    height: 960px;
    position:absolute;
    left:0;
    bottom:0;
    background:#fff;

    .head {
      width: 100%;
      height: 180px;
      box-sizing:border-box;
      padding:0 26px;
      position:relative;
      left:0;
      top: -40px;
      @include list(row);
      align-items:center;
      justify-content:space-between;

      >img {
        width: 180px;
        height: 180px;
      }

      >p {
        width: 72%;
        font-size: 24px;
        @include list;

        >span {
          width: 100%;
          &:first-child {
            height: 28px;
            line-height: 32px;
            margin-bottom:15px;
            color:#c04d48;

            i {
              font-size: 28px;
            }
          }

          &:last-child {
            height: 32px;
            line-height: 32px;
          }
        }
      }
    }

    .list {
      width: 100%;
      position:relative;
      left:0;
      top:-20px;
      dl {
        width: 100%;
        @include list(row);
        box-sizing:border-box;
        padding:0 26px;

        dt {
          width: 100%;
          height: 66px;
          box-sizing:border-box;
          line-height: 66px;
          font-size: 24px;
          color:#858585;
        }

        dd {
          padding: 0 30px;
          height: 64px;
          border:2px solid #9a9a9a;
          border-radius:10px;
          font-size: 28px;
          box-sizing:border-box;
          line-height: 60px;
          margin-right: 20px;
          margin-bottom:20px;
          color:#9a9a9a;
        }

        .active {
          border:2px solid #df4432;
          color:#df4432;
        }
      }
    }

    .calculate {
      width: 100%;
      height: 60px;
      @include list(row);
      box-sizing:border-box;
      justify-content: space-between;
      padding:0 26px;
      font-size: 24px;
      color:#858585;
      align-items:center;

      >div {
          width: 220px;
          height: 60px;
          @include list(row);

          input {
            width:100px;
            height: 100%;
            padding:0;
            border:none;
            box-sizing:border-box;
            border:1px solid #cccccc;
            text-align:center;
          }

          button {
            width: 60px;
            height: 60px;
            padding:0;
            border:none;
            background:#f3f2f8;
            box-sizing:border-box;
            border:1px solid #cccccc;

            &:first-child {
              border-right:none;
            }

            &:last-child {
              border-left:none;
            }
          }
      }
    }

    .btn {
      width: 100%;
      height: 96px;
      background:#e93b3d;
      position:absolute;
      left:0;
      bottom:0;
      line-height: 96px;
      text-align:center;
      font-size: 32px;
      color:#fff;
    }
  }
}
</style>
