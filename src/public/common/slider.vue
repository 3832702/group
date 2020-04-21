<template>
<div :class="[cname]">
	<swiper :options="swiperOption">
		<swiper-slide v-for="item in sliderData" :key="item.id">
			<slot :itemData="item"></slot>
		</swiper-slide>
		<div class="swiper-pagination"  slot="pagination"></div>
	</swiper>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	props: {
		cname: {
			type: String,
			default: ''
		},
    sliderData: {
      type: Array,
      default() {
        return []
      }
    },
		swiperOption: {
      type: Object,
      default() {
				return {
					loop: true,
					autoplay: true,
				}
			}
    }
	},
	components: {
		swiper,
		swiperSlide
	},
	data () {
		return {

		}
  }
}
</script>

<style lang="css">
	@import '~swiper/dist/css/swiper.css';
</style>
