<template lang="html">
<div class="store" :class="$style.slider">
  <div :class="$style.head">
    大家都在拼
  </div>
  <hSlider :class="$style.sli" :swiperOption="swiperOption" :sliderData="banner_list">
    <template slot-scope="slotProps">
			<router-link :class="$style.bgwrap" :to="{ name: 'Goods', query: { goods_id: slotProps.itemData.goods_id } }" tag="div">
				<img :class="$style.img" :src="$coverChange(slotProps.itemData.goods_cover)">
        <div :class="$style.info">
          <p>{{ slotProps.itemData.goods_name }}</p>
          <div>
            <span>{{ slotProps.itemData.goods_group_price }}</span>
            <p>
              <img src="http://pic.qqtn.com/up/2018-2/15182299864456678.jpg" alt="">
            </p>
          </div>
        </div>
			</router-link>
		</template>
    <div slot="pagination"></div>
  </hSlider>
</div>
</template>

<script>
import hSlider from "@/public/common/slider.vue"
export default {
  props: {
    banner_list: {
			type: Array,
			default() {
				return []
			}
		},
    swiperOption: {
      type: Object,
      default() {
				return {
          slidesPerView: 'auto',
          spaceBetween: 0,
          freeMode: true
				}
			}
    }
  },
  components: {
    hSlider
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.slider {
  width: 100%;
  background:#fff;
  padding-bottom:20px;
  margin-bottom: 10px;
  .head {
    width: 100%;
    height: 80px;
    font-size: 28px;
    @include list(row);
    align-items:center;
    box-sizing:border-box;
    padding:0 20px;
  }

  .sli {
    .bgwrap {
      width: 200px;
      height: 288px;
      @include border($bg: #f8f8f8, $direction: all)
      box-sizing:border-box;

      .info {
        width: 100%;

        >p {
          width: 100%;
          height: 46px;
          line-height: 46px;
          box-sizing:border-box;
          padding:0 10px;
          @include truncation;
          font-size: 24px;
        }

        >div {
          width: 100%;
          height: 38px;
          @include list(row);
          align-items:center;
          justify-content:space-between;
          box-sizing:border-box;
          padding:0 10px;

          >span {
            color:#e62625;
            font-size: 26px;
            &:before {
              content: "￥";
              font-size: 24px;
            }
          }

          >p {
            width: 20px;
            height: 20px;
            border-radius:50%;
            overflow:hidden;
            img {
              width: 100%;
              height: 100%;
              border-radius:50%;
              object-fit:cover;
            }
          }
        }
      }
    }

    img {
      width: 200px;
      height: 200px;
      overflow:hidden;
      object-fit:cover;
    }
  }
}
</style>

<style>
.store .swiper-slide {
    width: 200px;
    margin-left: 20px;
    overflow:hidden;
  }
</style>
