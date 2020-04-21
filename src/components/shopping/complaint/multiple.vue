<template lang="html">
  <div :class="$style.pic_wrap">
    <template v-if="storeImgList.length">
      <span v-for="(i,k) in storeImgList" :class="$style.pic_container" :key="k">
        <img :class="$style.img" :src="i" @click="PvwImg(i)"/>
        <i :class="$style.del" @click.stop="delPics(k)"></i>
      </span>
    </template>
    <div v-else :class="$style.pic_container">
      <p :class="[$style.btns, $style.iconfont, $style.icon_xiangji1]" @click="selectImgs">
        <span :class="$style.upload">上传截图</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    storeImgList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showImg: true
    }
  },
  methods: {
    /**
     * [selectImgs 上传截图]
     * @return {[type]} [description]
     */
    selectImgs() {
      this.$emit('select-imgs', {})
    },

    /**
     * [delPics 删除图片]
     * @param  {[Number]} index [当前点击索引]
     * @return {[type]}       [description]
     */
    delPics(index) {
      this.$emit('del-pics', { index })
    }
  }
}
</script>

<style lang="scss" module>
@import "~@/scss/main.scss";

/*@include ellipsis(80%, 1);*/

.pic_wrap {
	/*width: 3rem;*/
	/*width: 72vw;*/
	margin: 24px auto 0;
	overflow: hidden;
	.pic_container {
		position: relative;
		float: left;
		/*width: 0.8rem;
		height: 0.8rem;
		margin: 0.1rem;
		*/
		width: 160px;
		height: 160px;
		margin: 20px;
		.btns {
			position: relative;
			display: inline-block;
			border-radius: 2px;
			/*width: 0.78rem;
			height: 0.78rem;
			color: #e6e6e6;
			line-height: 0.78rem;
			*/
			width: 156px;
			height: 156px;
			line-height: 24px;
			border: 1px dashed #a0a0a0;
			color: #9e9e9e;
			z-index: 999;
			font-size: 60px;
			text-align: center;
			input {
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
				/*width: 0.78rem;
				height: 0.78rem;*/
				width: 156px;
				height: 156px;
			}
		}
		.upload {
			position: absolute;
			top: 40%;
			left: 0;
      width: 100%;
			font-size: 24px;
			letter-spacing:2px;
      text-align:center;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.del {
			display: block;
			position: absolute;
			width: 36px;
			height: 36px;
			right: -1px;
			top: -1px;
			background-size: cover;
			background-image: url('@/assets/del1.png');
		}
	}
}
</style>
