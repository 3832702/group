<template lang="html">
<div @click="codeChange" :class="$style.core_wrap">
  <div @click.stop="" :class="$style.code">
    <p>
      订单号: {{ order_id }}
    </p>
    <template v-if="false">
      <div :class="$style.box">
        <p>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555306697001&di=5424c946c487b84bbb6dabdbbb0d8cae&imgtype=0&src=http%3A%2F%2Fpic8.nipic.com%2F20100723%2F5155800_110432110070_2.jpg" alt="">
        </p>
        <h4>新疆阿克苏冰糖心苹果4.5kg原箱果径80mm以上水果</h4>
      </div>
      <div :class="$style.btn">二级镖师已接镖</div>
    </template>
    <template v-else>
      <div ref="yard" :class="$style.yard">
        <canvas :class="$style.canvas" ref="canvas" id="canvas"></canvas>
      </div>
      <div :class="$style.btn">请等待扫码</div>
    </template>
  </div>
</div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  props: {
    order_id: {
      type: String,
      default: ""
    },
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    const { $refs: { canvas, yard }, details: { unionid }, order_id } = this;
    let h = parseInt(getComputedStyle(yard).height)

    let data = `${unionid},${order_id}`

    QRCode.toCanvas(canvas, data, {
      width: h, //宽
      height: h, //高
      margin:2, //留白
    }, (error) => {
      if(error) {
        console.log(error)
      } else {
        console.log('success')
      }
    })
  },
  methods: {
    /**
     * [codeChange 关闭弹窗]
     * @return {[type]} [description]
     */
    codeChange() {
      this.$emit('code-change', { status: false })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.core_wrap {
  width: 100vw;
  height: 100vh;
  background:rgba(0,0,0,.1);
  position:fixed;
  left:0;
  top:0;
  z-index:111111;
  .code {
    width: 572px;
    height: 512px;
    position:absolute;
    background:#fff;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -50%);
    border-radius:10px;

    >p {
      width: 100%;
      height: 88px;
      @include border($bg: #f4f4f4, $direction: bottom)
      box-sizing:border-box;
      padding:0 20px;
      font-size: 28px;
      line-height: 88px;
    }

    .box {
      width: 100%;
      height: 332px;
      @include list;
      align-items:center;
      justify-content:center;
      >p {
        width: 181px;
        height: 181px;
        border-radius: 4px;
        box-sizing:border-box;
        padding:0 4px;
        @include border($bg: #ededed, $direction: all)
        margin-bottom: 32px;
        overflow:hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit:cover;
        }
      }

      >h4 {
        width: 80%;
        margin:0 auto;
        font-size: 26px;
        line-height: 32px;
        height: 64px;
        text-align:center;
      }
    }

    .yard {
      width: 332px;
      height: 332px;
      margin:0 auto;

      .canvas {
        width: 332px;
        height: 332px
      }
    }

    .btn {
      width: 100%;
      height: 90px;
      box-sizing:border-box;
      @include border($bg: #f4f4f4, $direction: top)
      color:#009bfd;
      font-size: 28px;
      line-height: 88px;
      text-align:center;
    }
  }
}
</style>
