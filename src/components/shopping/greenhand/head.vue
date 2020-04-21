<template lang="html">
<div :class="$style.headWrap">
  <div :class="$style.head">
    <h4>HI, 欢迎来到壹城好店</h4>
    <p>现已为你挑选出如下内容</p>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.headWrap {
  width: 100%;
  height: 180px;
}

.head {
  width: 100%;
  height: 180px;
  background:linear-gradient(to right, #de2425, #cd1b1b);
  @include list;
  justify-content: flex-end;
  box-sizing:border-box;
  padding:20px;
  color:#fff;
  margin-bottom: 40px;
  position:fixed;
  left:0;
  top:0;
  z-index: 11;

  >h4 {
    width: 100%;
    height: 34px;
    margin-bottom:20px;
    font-size: 34px;
  }

  p {
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 28px;
  }
}

</style>
