
<template lang="html">
  <FlowList :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <!-- <van-swipe-cell v-if="list[index]" v-for="(item,index) in count" :key="index" :right-width="65"> -->
      <router-link v-for="(item,index) in list" :key="index" :to="{name: 'Goods', query: { goods_id: item.goods_id }}" tag="div" class="delete-content">
        <div class="slide-warp">
          <div class="slide-item" :data-index="index">
            <img :src="$coverChange(list[index].goods_cover)" alt="" />
            <div class="info">
              <p><span>{{ list[index].goods_name }}</span></p>
              <span>{{ list[index].collect_count ? list[index].collect_count: 1 }}人已收藏</span>
            </div>
          </div>
        </div>
      </router-link>
      <!-- <span @click.stop="clickHandler(index)" class="slide-del" style="width:65px;" slot="right">取消收藏</span> -->
    <!-- </van-swipe-cell> -->
  </FlowList>
</template>

<script>
import { goodsCollectList, debounce, collectDelControl } from "@/server/index.js"
import { isFinished } from "@/utils/util.js"

export default {
  data() {
    return {
      active: 0,
      page: 1, // 分页
      is_more: true, // 是否可以在加载
      count: 100, // 总数
      list: [],
      loading: false, //
      finished: false,
      isNot: false, // 是否显示
      finishedText: '', // 提示语
    }
  },
  created() {
    this.loading = true;
    this.getList();
  },
  methods: {
    /**
     * [loadListChange 自定义事件-----加载中]
     * @return {Promise} [description]
     */
    async loadListChange() {
      const { loading } = this;

      if (!loading) {
          debounce(1000, this.controlHandler)
      }
    },

    /**
     * [controlHandler 加载更多]
     * @return {[type]} [description]
     */
    controlHandler() {
      let { page, list } = this;

      if (list.length) {
        this.page = page + 1;
        this.getList();
      }
    },
    /**
     * [getList 获取数据]
     * @return {[type]} [description]
     */
    async getList() {
      const { page } = this;

      try {
        const list = await goodsCollectList({ page })

        this.loading = false
        this.list = [...this.list, ...list];
        this.finished = isFinished(list)

        if (!this.list.length) {
          this.finishedText = '该栏目下暂无数据'
          this.isNot = true;
        } else {
          this.finishedText = ''
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [clickHandler 点击索引]
     * @param  {[Number]} index [索引]
     * @return {[type]}       [description]
     */
    async clickHandler(index) {
      try {
        const res = await this.$Dialog({ message: '是否取消收藏' });
        if (res === 'confirm') {
          this.collectDelControl(index)
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [collectDelControl 取消商品]
     * @return {[type]} [description]
     */
    async collectDelControl(index) {
      const { list } = this;

      const { goods_id } = list[index];

      try {
        await collectDelControl({ goods_id })
        this.list.splice(index, 1)
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/public/css/elements.scss";

  .delete-content {
    overflow: hidden;
    .slide-warp {
      position: relative;
      transition: all ease .2s;
      height: 200px;
      background:#fff;

      .slide-item {
        width: 100%;
        height: 100%;
        @include border($bg: #eaeaea, $direction: bottom)
        padding:0 10px;
        box-sizing: border-box;
        @include list(row);
        justify-content:space-between;
        align-items:center;

        >img {
          width: 160px;
          height: 160px;
        }

        .info {
          width: 75.5%;
          height: 160px;
          box-sizing:border-box;
          padding-top:12px;

          p {
            max-height: 68px;
            width: 100%;
            font-size: 30px;
            line-height:normal;
            display: table;

            span {
              display: table-cell;
              vertical-align: middle;
              @include multiline-truncation;
              line-height: 34px;
            }
          }

          >span {
            height: 72px;
            line-height: 72px;
            font-size: 26px;
            color:#5d5d5d;
          }

        }
      }
    }
  }

  .slide-del {
    background: #e84747;
    color: #fff;
    height: 100%;
    font-size: 26px;
    @include list;
    z-index: 1;
    align-items:center;
    justify-content:center;
  }
</style>
