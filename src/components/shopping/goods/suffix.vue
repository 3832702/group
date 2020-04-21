<template lang="html">
  <div :class="$style.suffix">
    <dl v-for="(item, index) in content" :key="index">
      <dt>{{ item.name }}</dt>
      <dd v-for="(subitem, subindex) in item.content" :key="subindex">{{ subitem }}</dd>
    </dl>
  </div>
</template>

<script>
const content = [
  {
    name: "物流配送时间",
    content: ["镖师的配送时间段为8:00—20:00 （成团后6小时内送到家是在镖师工作时间段范围内，请注意下单时间，特殊情况请在下单时做好备注。"]
  },
  {
    name: "关于配送",
    content: ["（1）水果蔬菜在运输的过程中会有小部分的水分蒸发流失，重量会有5%左右的损耗，请您谅解", "（2）为了保障客户的权益，签收时请当面核对产品无误后再告知签收安全码，如由他人代为验收，则视为选购商品无任何问题。", "（3）不同版本的商品会存在细微的差别（包括批次号、产品包装、外观细节等），若商家未能及时更新，请您谅解。图片仅供参考，以收到实物为准。"]
  },
  {
    name: "售后服务",
    content: ["消费者如遇到退换货等问题，可以直接与下单的门店沟通，享受同城100%的售后服务。"]
  }
];

export default {
  data() {
    return {
      content
    }
  }
}
</script>

<style lang="scss" module>
.suffix {
  width: 100%;
  padding:10px 0;
  background:#fff;
  padding-bottom:120px;

  dl {
    width: 100%;
    box-sizing:border-box;
    padding:0 26px;
    dt {
      font-size: 24px;
      line-height: 60px;
      position:relative;
      &:after {
        content: " ";
        width:6px;
        height: 6px;
        border-radius:50%;
        position:absolute;
        left: -12px;
        top: 27px;
        background:#fb6264;
      }
    }

    dd {
      font-size: 22px;
      line-height: 32px;
      color:#bababa;
      margin-bottom: 5px;
    }
  }
}
</style>
