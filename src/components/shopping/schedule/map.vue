<template lang="html">
  <div :class="$style.map" ref="map"></div>
</template>

<script>
let qq = window.qq;
export default {
  data() {
    return {
      map: null, // 地图实例
      marker: null, // 地图标记
    }
  },
  mounted() {
    this.getMap();
  },
  props: {
    lat: {
      type: [String, Number],
      default: '' // 纬度
    },
    lng: {
      type: [String, Number],
      default: ''// 经度
    },
    maps: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    position() {
      return [this.lat, this.lng];
    }
  },
  watch: {
    lat() {
      this.getMap();
    }
  },
  methods: {

    /**
     * [getMap 获取对象实例]
     * @return {[type]} [description]
     */
    getMap() {

      if (!this.position[0]) {
        return;
      }

      if (this.map) {
        this.getMarker();
        return;
      }

      this.map = new qq.maps.Map(this.$refs.map,{
          center: new qq.maps.LatLng(...this.position),
          zoom: 13,
          mapZoomType: 'CENTER',
          panControl: true,
          zoomControl: false,
          disableDoubleClickZoom:true
      });

      this.getMarker();
    },

    /**
     * [getMarker 获取地图标记]
     * @return {[type]} [description]
     */
    getMarker() {
      const { maps: { home_address: { latitude, longitude } } } = this;
      if (this.marker) {
        this.marker.setPosition(new qq.maps.LatLng(...this.position));
        return;
      }

      this.marker = new qq.maps.Marker({
        position: new qq.maps.LatLng(...this.position),
        draggable: false,
        map: this.map
      });

      this.marker2 = new qq.maps.Marker({
        position: new qq.maps.LatLng(...[latitude, longitude]),
        draggable: false,
        map: this.map
      });
    }
  }
}
</script>

<style lang="scss" module>
.map {
  width: 100%;
  height: 658px;
  margin-bottom:20px;
}
</style>
