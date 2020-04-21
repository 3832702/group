<template>
	<div :class="$style.content">

		<div :class="$style.message_wrap">
			<p :class="$style.label">问题和意见</p>
			<van-field v-model="message" type="textarea" :placeholder="placeholder" rows="3" />
		</div>

		<div :class="$style.upload_wrap">
			<p :class="$style.label">添加图片  (选填, 提供问题截图)</p>
			<!-- <UploadImgs @news-img="GetImg" :imgList="info.img"></UploadImgs> -->
      <UploadImgs @del-pics="delPics" :storeImgList="storeImgList" @select-imgs="selectImgs"></UploadImgs>
		</div>

		<!--发布-->
		<div :class="$style.btn">
			<van-button :class='$style.complate' @click="submit">提交</van-button>
		</div>
	</div>

</template>

<script>
import UploadImgs from "@/components/shopping/complaint/multiple.vue"

import  { chooseImage, uploadImage } from "@/utils/employ-jssdk.js"
import { pictureWx } from "@/server/index.js"

export default {
  components: {
    UploadImgs
  },
  data() {
    return {
      count: 0, // 图片数量
      message: '', // 问题
      storeImgList: [], // 截图
      placeholder:'请描述您使用壹城好店时遇到的问题和意见，若功能异常，上传页面截图更快解决哦！' // 提示语
    }
  },
  methods: {
    /**
     * [selectImgs 自定义事件-----点击上传]
     * @return {[type]} [description]
     */
    async selectImgs() {
      const { count, storeImgList } = this;

      let num = count - storeImgList < 0 ? 0 : count - storeImgList;

      try {
        // 选图
        let { localIds } = await chooseImage(this.$wx, { count: num })

        // 上传
        // let mediaIds = await Promise.all(
        //   localIds.map( localId => {
        //     return uploadImage(this.$wx, { localId })
        //   } )
        // )

        let storeImgList = [];

        for (var i = 0; i < localIds.length; i++) {
          let media_id = await uploadImage(this.$wx, { localId: localIds[i] });
          let img = await pictureWx({ media_id: media_id.serverId })
          this.storeImgList = [...this.storeImgList, img ];
        }

        // 获取
        // let storeImgList = await Promise.all(
        //   mediaIds.map(item => pictureWx({ media_id: item.serverId }))
        // )

        //this.storeImgList = [...this.storeImgList, ...storeImgList ];

      }catch(err) {
        console.log(err)
      }
    },

		/**
		 * [delPics 自定义事件-----删除图片]
		 * @param  {[Number]} index [当前索引]
		 * @return {[type]}       [description]
		 */
		delPics({ index }) {
			this.storeImgList.splice(index, 1)
		}
	}
}
</script>

<style lang="scss" module>
@import "@/scss/main.scss";

.content {
	background: #fff!important;
	padding: 60px 40px;
  font-size: 26px;
	.label {
		color: #222;
	}
	.message_wrap {
		margin-bottom: 80px;
	}
	.btn {
		text-align: center;
		.complate {
			margin: 40px auto;
			width: 80%;
      height: 90px;
			font-size: 0.16rem;
			color: #fff;
			@include background;
			letter-spacing: 6px;
			border-radius: 8px;
      font-size: 30px;
		}
	}
}
</style>
