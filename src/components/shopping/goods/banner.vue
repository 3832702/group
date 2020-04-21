<template lang="html">
  <Slider cname="slider" :swiperOption="swiperOption" :class="$style.slider" :sliderData="banner_list">
    <template slot-scope="slotProps">
      <div :class="$style.bgwrap" tag="div">
        <img :class="$style.img" :src="slotProps.itemData">
      </div>
    </template>
  </Slider>
</template>

<script>
import Slider from '@/public/common/slider.vue'
export default {
  props: {
		banner_list: {
			type: Array,
			default() {
				return []
			}
		}
  },
  components: {
		Slider
	},
  data() {
    return {
      swiperOption: { loop: true }
    }
  }
}
</script>

<style lang="scss" module>
.slider {
  height:750px;
  overflow:hidden;

  .bgwrap {
    height:750px;
    overflow:hidden;
  }
  .img {
    width: 750px;
    height:750px;
    overflow:hidden;
    object-fit:cover;
  }
}
</style>
