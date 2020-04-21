<template lang="html">
<div :class="$style.head">
  <div :class="$style.tabWrap">
    <Tab @active-change="activeChange" :entrances="entrances" class="newtab" :class="$style.tab"></Tab>
  </div>
  <div :class="$style.bg"></div>
  <div :class="$style.right">
    <img src="@/assets/right.gif" alt="">
  </div>
  <Slider cname="slider" :class="$style.slider" :sliderData="banner_list">
		<template slot-scope="slotProps">
			<router-link :class="$style.bgwrap" :to="{ name: 'Recruit' }" tag="div">
				<img :class="$style.img" :src="slotProps.itemData.img">
			</router-link>
		</template>
	</Slider>
</div>
</template>

<script>
import Slider from '@/public/common/slider.vue'
import Tab from "@/components/shopping/new-home/tab.vue"

export default {
  props: {
		banner_list: {
			type: Array,
			default() {
				return [
          {
            img: require("@/assets/shuffling_15.jpg")
          },
          {
            img: require("@/assets/shuffling_14.jpg")
          },
          {
            img: require("@/assets/shuffling_13.jpg")
          }
        ]
			}
		},
    entrances: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: 0
    }
  },
	components: {
		Slider,
    Tab
	},
  methods: {
    /**
     * [activeChange 自定义事件-----tab的索引更改]
     * @param {[Number]} [当前点击的索引]
     * @return {[type]} [description]
     */
    activeChange(index) {
      this.active = index;
      this.$emit('active-change', index)
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.tabWrap {
  position:fixed;
  left:0px;
  right: 0px;
  top:0;
  z-index: 1111;
  background:url('@/assets/home_tab.png') no-repeat;
  height: 74px;
  background-size: 100% 74px;
}

.tab {
  box-sizing:border-box;
  width: 100%;
  height:100%;
}

.right {
  width: 38px;
  height: 70px;
  position: fixed;
  right: 0;
  top: -2px;
  @include list(row);
  justify-content:center;
  align-items:center;
  z-index: 1111111;
  background:#e51717;
  img {
    width: 25px;
    height: 28px;
  }
}

.head {
  width: 100%;
  height: 340px;
  background:#ffffff;
  position:relative;
  .bg {
    width: 100%;
    height: 260px;
    // background: linear-gradient(#e51717, #ce1817); /* 标准的语法 */
    // border-radius: 0 0 10% 10%;
    background:url('@/assets/home_bg.png') no-repeat;
    background-size: 100% 260px;
  }
}

.slider {
  height:260px;
  position: absolute;
  left: 20px;
  right: 20px;
  top: 80px;
  overflow:hidden;
  border-radius: 10px;
  // background: linear-gradient(#fff, #f2f2f2);

  .bgwrap {
    width: 100%;
    height: 260px;
    overflow:hidden;
    border-radius: 10px;
  }
  .img {
    width: 100%;
    height:260px;
    overflow:hidden;
    border-radius: 10px;
  }
}
</style>

<style lang="css">
	.slider .swiper-pagination-progressbar {
		top:526px;
	}
	.slider .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
		background:#ffdd00;
	}

  .newtab .van-tabs__nav {
    background:transparent;
  }

  .newtab .van-tabs__wrap {
    height: 70px;
  }

  .newtab .van-tabs__wrap:after {
      border-color:transparent;
  }

  .newtab .van-tab {
    color:#fcfffd;
    line-height: 70px;
    margin-left: -15px;
  }

  .newtab .van-tab--active {
    color:#fefdff;
  }

  .newtab .van-tabs--line {
    padding-top: 70px;
  }

  .newtab .van-tabs__line {
    background:#fcfdff;
  }

  .newtab .van-ellipsis {
    /* font-size: 26px; */
  }

</style>
