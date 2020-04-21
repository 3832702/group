<template lang="html">
<div :class="$style.citylist">
  <h4 :class="$style.currcity">
    当前选择城市: {{ city }}
  </h4>
  <dl>
    <dt>定位城市</dt>
    <dd :class="$style.curr">
      <span>{{ locationCity }}</span>
    </dd>
  </dl>
  <dl :class="$style.dredge">
    <dt>已开通城市</dt>
    <dd
      v-for="(item) in ruleCityList"
      :key="item.area_id"
      @click="changeCurrCity(item)"
    >
      {{ item.city }}
    </dd>
  </dl>
</div>
</template>

<script>
export default {
  props: {
    ruleCityList: {
      type: Array,
      defalut() {
        return []
      }
    },
    city: {
      type: String,
      default: ""
    },
    locationCity: {
      type: String,
      default: ""
    }
  },
  methods: {
    /**
     * [changeCurrCity 更改当前城市]
     * @param  {[String]} city [要切换的城市名]
     * @return {[type]}      [description]
     */
    changeCurrCity({ city, latitude: lat, longitude: lng, area_id }) {
      this.$emit('change-currcity', { city, lat, lng, isSearchCity: false, area_id })
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.citylist {
  width: 100vw;
  height: 100vh;
  background:#fff;
  position:fixed;
  left:0;
  top:0;
  z-index: 11112;

  .currcity {
    width: 100%;
    height: 88px;
    font-size: 26px;
    box-sizing:border-box;
    padding:0 30px;
    line-height: 88px;
    position:relative;
    letter-spacing: 1px;
    &:after {
      content: " ";
      height: 2px;
      background:#d9d9d9;
      position:absolute;
      left: 0;
      right:0;
      bottom:0;
    }
  }

  dl {
    width: 100%;
    background:#f4f4f4;
    box-sizing:border-box;
    padding:0 30px;
    @include list(row);
    position:relative;
    dt {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 26px;
      color:#939393;
    }

    dd {
      width: 210px;
      height: 80px;
      box-sizing:border-box;
      text-align:center;
      line-height: 80px;
      font-size: 26px;
      background:#fff;
      border:1px solid #d6d6d6;
      border-radius:5px;
      margin-right:28px;
      margin-bottom:20px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }

    .curr {
      min-width: 210px;
      padding: 0 30px;
      @include list(row);
      align-items:center;
      justify-content:center;
      &:before {
        content: " ";
        width: 32px;
        height: 32px;
        background:url("@/assets/dh.png") no-repeat;
        background-size: cover;
        margin-right: 6px;
      }
    }
  }

  .dredge {
    padding-bottom: 100px;
    &:after {
      content: "其他城市陆续开通中....";
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align:center;
      color:#9b9b9b;
      position:absolute;
      left:0;
      bottom:0;
      font-size: 24px;
      letter-spacing: 2px;
    }
  }
}
</style>
