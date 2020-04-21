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
      lat: this.sublat, // 纬度
      lng: this.sublng, // 经度
      searchService: null, // 搜索
      scale: ''
    }
  },
  mounted() {
    this.getMap();
    this.getMarker();
    //this.dragendHandler();
    this.boundsChangedHandler();
    this.zoomChangedHandler();
  },
  props: {
    sublat: {
      type: [String, Number],
      default: '' // 纬度
    },
    sublng: {
      type: [String, Number],
      default: ''// 经度
    },
    isRange: {
      type: Boolean,
      default: true
    },
    ruleCityList: {
      type: Array,
      default() {
        return []
      }
    },
    originLat: {
      type: Number,
      default: 0
    },
    originLng: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 0
    }
  },
  computed: {
    position() {
      return [this.lat, this.lng];
    }
  },
  watch: {
    position(to, from) {
      if (to.join('') != from.join('')) {
        this.getMarker();
        //this.dragendHandler();
      }
    },
    sublat() {
      this.lat = this.sublat;
      this.lng = this.sublng;
      this.map.panTo(new qq.maps.LatLng(...this.position))
    },
    originLat(to) {
      if (to) {
        this.setCircle();
      }
    }
  },
  methods: {

    /**
     * [getMap 获取对象实例]
     * @return {[type]} [description]
     */
    getMap() {
      this.map = new qq.maps.Map(this.$refs.map,{
          center: new qq.maps.LatLng(...this.position),
          zoom: 16,
          mapZoomType: 'CENTER',
          panControl: true,
          zoomControl: false,
          disableDoubleClickZoom:true
      });

      var dpr = window.devicePixelRatio || 1;
      this.$refs.map.style.transform = `scale(${dpr})`
    },

    /**
     * [getMarker 获取地图标记]
     * @return {[type]} [description]
     */
    getMarker() {
      if (this.marker) {
        this.marker.setPosition(new qq.maps.LatLng(...this.position));
        return;
      }

      this.marker = new qq.maps.Marker({
        position: new qq.maps.LatLng(...this.position),
        draggable: false,
        map: this.map
      });
    },

    /**
     * [setCircle 设置范围]
     */
    setCircle() {
      const { originLat, originLng, map, radius } = this;
      new qq.maps.Circle({
        center: new qq.maps.LatLng(originLat,originLng),
        map,
        radius,
        strokeColor: new qq.maps.Color(0,15,255,0),
        fillColor: new qq.maps.Color(0,15,255,0.07),
        strokeWeight:2
      })
    },

    /**
     * [dragendHandler 拖动地图标记结束]
     * @return {[type]} [description]
     */
    dragendHandler() {
      qq.maps.event.addListener(this.marker, 'dragend', res => {

        ({ latLng: { lat: this.lat, lng: this.lng } } = res)
        this.map.panTo(new qq.maps.LatLng(...this.position))
      })
    },

    /**
     * [boundsChangedHandler 拖动地图时更改标记点位置]
     * @return {[type]} [description]
     */
    boundsChangedHandler() {
      qq.maps.event.addListener(this.map, 'dragend', async () => {
        if (!this.isRange) {
          this.$emit('range-block-change', { isRangeBlock: false })
          return;
        }

        let lat, lng;
        ({ lat: this.lat, lng: this.lng, lat, lng } = this.map.getCenter())

        try {
          const detail = await this.cityHandler({ latitude: lat, longitude: lng })
          const city =  detail.split(',')[1];
          let index = 0;

          this.ruleCityList.forEach(item => {
            if ( city.indexOf(item.city) !== -1) {
              index++;
            }
          })

          if (index) {
            this.locationChange()
          } else {
            this.$emit('range-block-change', { isRangeBlock: false })
          }
        }catch(err) {
          console.log(err)
        }

      })
    },

    /**
     * [cityHandler 经纬度解析成城市]
     * @param  {[String]} latitude  [纬度]
     * @param  {[String]} longitude [经度]
     * @return {[type]}           [description]
     */
    cityHandler({ latitude, longitude }) {
      return new Promise((resolve) => {
        const cs = new qq.maps.CityService({
          complete: res => {
            const { detail: { detail } } = res;
            resolve(detail);
          }
        });
        cs.searchCityByLatLng(new qq.maps.LatLng(latitude, longitude));
      })
    },

    /**
     * [searchServiceHandler 点击地图缩放]
     * @return {[type]} [description]
     */
    zoomChangedHandler() {
      qq.maps.event.addListener(this.map, 'zoom_changed', () => {
        ({ lat: this.lat, lng: this.lng } = this.map.getCenter())
        this.locationChange()
      })
    },

    /**
     * [res 经纬度发生改变]
     * @type {[type]}
     */
    locationChange() {
      this.$emit('location-change', { location: this.position })
    }
  }
}
</script>

<style lang="scss" module>
.map {
  width: 100%;
  height: 504px;
}
</style>
