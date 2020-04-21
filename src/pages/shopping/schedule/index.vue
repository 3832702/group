<template lang="html">
  <div>
    <Map :lat="map.goods_address && map.goods_address.latitude" :lng="map.goods_address && map.goods_address.longitude" :maps="map"></Map>
    <Order :send="send"></Order>
    <Step :send_history="send_history"></Step>
  </div>
</template>

<script>
import Map from "@/components/shopping/schedule/map.vue"
import Order from "@/components/shopping/schedule/order.vue"
import Step from "@/components/shopping/schedule/step.vue"

import { sendShow } from "@/server/index.js"

import { original, modification } from "@/utils/remdom.js"

export default {
  components: {
    Map,
    Order,
    Step
  },
  data() {
    return {
      send: {}, // 镖师信息
      send_history: [], // 物流信息
      map: {}, // 经纬度
    }
  },
  computed: {
    //send_id: this.$route.query.send_id
  },
  created() {
    this.getData();
  },
  mounted() {
    modification()
  },

  destroyed() {
    original()
  },
  methods: {
    /**
     * [getData 获取数据]
     * @return {[type]} [description]
     */
    async getData() {

      const { $route: { query: { send_id } } } = this;

      try {
        const { send, send_history, map } = await sendShow({ send_id });

        this.send = send
        this.send_history = send_history
        this.map = map
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" module>
</style>
