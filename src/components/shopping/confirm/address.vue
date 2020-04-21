<template lang="html">
    <router-link
      v-if="details.address && details.address.home_address"
      :class="$style.address"
      :to="{ name: 'Address' }"
      tag="div"
    >
      <p>{{ details.address.nickname }}&nbsp;{{ details.address.phone }}</p>
      <p>{{ details.address.home_address }}</p>
    </router-link>
    <router-link
      v-else
      :to="{ name: 'Address' }"
      tag="div"
      :class="$style.empty"
    >
      !&nbsp;&nbsp;请填写收货地址
    </router-link>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.address {
  width: 100%;
  height: 130px;
  background:#fff;
  @include list;
  justify-content:center;
  box-sizing:border-box;
  padding:0 20px;
  position:relative;
  margin-bottom:30px;

  >p {
    width:88%;
    height: 42px;
    line-height: 42px;

    &:nth-of-type(1) {
      font-size: 26px;
      font-weight:bold;
    }

    &:nth-of-type(2) {
      font-size: 26px;
      @include truncation;
    }
  }

  &:after {
    content: " ";
    @include leftArrow($width:14px, $bg: #cacaca,$rotate:rotate(-45deg));
    position:absolute;
    right:30px;
    top: 60px;
  }

  &:before {
    content: " ";
    width: 100%;
    height: 10px;
    background:url("@/assets/address_bg.png") no-repeat #fff;
    position:absolute;
    left:0;
    bottom:-10px;
  }
}

.empty {
  width: 100%;
  height: 102px;
  background:#fff;
  @include list(row);
  box-sizing:border-box;
  padding:0 20px;
  font-size:28px;
  align-items:center;
  justify-content:space-between;
  margin-bottom:30px;

  &:after {
    content: " ";
    @include leftArrow($bg:#cbcbcb,$width:12px);
  }
}
</style>
