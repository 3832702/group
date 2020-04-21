<template lang="html">
<div id="location">
  <div ref="location">
    <Search
      :city="city"
      @write-change="writeChange"
      @keyword-change="keywordChange"
      :isParentWrite="isParentWrite"
      @submit-change="submitChange"
      @change-currcity="changeCurrCity"
      @range-block-change="rangeBlockChange"
      :isRange="isRange"
    >
    </Search>
    <Map
      @location-change="locationChange"
      :sublat="lat"
      :sublng="lng"
      :radius="radius"
      :isRange="isRange"
      :ruleCityList="ruleCityList"
      @range-block-change="rangeBlockChange"
      :originLat="originLat"
      :originLng="originLng"
    >
    </Map>
  </div>
  <List
    :listHeight="listHeight"
    @map-change="mapChange"
    :nearby="nearby"
    :isRange="isRange"
    @range-block-change="rangeBlockChange"
  >
  </List>
  <SearchList
    v-show="!isWrite"
    :city="city"
    :searchList="searchList"
    @update-change="updateChange"
  >
  </SearchList>
  <transition name="city">
    <Citylist
      :city="city"
      :locationCity="locationCity"
      :ruleCityList="ruleCityList"
      v-if="isSearchCity"
      @change-currcity="changeCurrCity"
    >
    </Citylist>
  </transition>
  <Hint @cancel-change="cancelChange" @confirm-change="confirmChange" v-if="!isRangeBlock">
    <template v-slot:text>
      <p class="map-hint-text">您所在的城市未开通</p>
      <p class="map-hint-text">切换至已开通城市进行选择</p>
    </template>
  </Hint>
</div>
</template>
<script>
import Search from "@/components/shopping/location/search.vue";
import Map from "@/components/shopping/location/map.vue";
import List from "@/components/shopping/location/list.vue";
import SearchList from "@/components/shopping/location/searchlist.vue"
import Citylist from "@/components/shopping/location/citylist.vue"
import Hint from "@/components/shopping/location/hint.vue"

import { locationNearby, cityList, mapSure } from "@/server/index.js"
import { getLocation, sdkConfig, hideMenuItems } from "@/utils/employ-jssdk.js"
import { domain } from "@/utils/util.js"
import { mapMutations } from "vuex"
import { original, modification } from "@/utils/remdom.js"

let qq = window.qq;

export default {
  components: {
    Search,
    Map,
    List,
    SearchList,
    Citylist,
    Hint
  },
  name: 'Location',
  data() {
    return {
      windowHeight: 0, // 屏幕高度
      nodeHeight: 0, // 搜索框加地图高度
      listHeight: null, // POI列表高度
      searchHeight: null, // 搜索列表高度
      nearby: null, // 附近POI列表
      lat: '', // 纬度
      lng: '', // 经度
      isWrite: true, // 子组件input是否是输入状态
      isParentWrite: true, // 父组件input是否是输入状态---重置地图时使用
      keyword: '', // 要搜索的key值
      searchList: [], // 城市搜索周边列表
      timer: null, // 定时器
      address: {}, // 根据经纬度获取的详细地址
      city: '北京市', // 当前选择城市--- 初始化时与定位城市相同
      locationCity: "北京市", // 定位城市 --- 初始化时同当前选择城市相同
      locatingCityObj: null, // 当前信息
      isSearchCity: false, // 是否切换城市
      isRange: true, // 子组件根据isRange判断是否修改isRangeBlock的值
      isRangeBlock: true, // 提示不在城市列表中
      ruleCityList: [], // 可选择的城市列表
      area_id: '', // 城市id
      originLat: '', // 原点
      originLng: '', // 原点
      radius: 0, // 半径
      is_scope: true, // 是否超出位置
    }
  },
  async created() {
    this.readySdkConfig();
  },

  mounted() {
    modification()
    this.getListHeight();
  },

  destroyed() {
    original()
  },

  methods: {
    ...mapMutations([
      "CHANGECITY"
    ]),

    /**
     * [readySdkConfig 配置jssdk]
     * @return {[type]} [description]
     */
    async readySdkConfig() {

      const { $route: { fullPath } } = this;

      try {
        await sdkConfig(`${domain}${fullPath}`, this.$iosFullPath, ['getLocation', 'chooseWXPay', 'hideMenuItems'], this.$wx)
        hideMenuItems(this.$wx, ['menuItem:refresh'])
        const { latitude, longitude } = await getLocation(this.$wx);
        await this.cityHandler({ latitude, longitude })

        this.setCity();
        this.getNearby([latitude, longitude])
        this.getRuleCityList();
      }catch(err) {
        console.log(err)
      }
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
            this.locatingCityObj = { city: detail.split(',')[1], latitude, longitude}
            resolve();
          }
        });

        cs.searchCityByLatLng(new qq.maps.LatLng(latitude, longitude));
      })
    },

    /**
     * [setCity 获取当前城市]
     * @return {[type]} [description]
     */
    setCity() {
      const { city, longitude, latitude } = this.locatingCityObj;
      this.city = this.locationCity = city;
      this.setLocation({ lat: latitude, lng: longitude, verify: true })
    },

    /**
     * [getWindowHeight 获取屏幕高度]
     * @return {[type]} [description]
     */
    getWindowHeight() {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    },

    /**
     * [getNodeHeight 搜索框及地图的高度]
     * @return {[type]} [description]
     */
    getNodeHeight() {
      ({ location: { clientHeight: this.nodeHeight } } = this.$refs)
    },

    /**
     * [getListHeight 获取列表高度]
     * @return {[type]} [description]
     */
    getListHeight() {
      this.getWindowHeight();
      this.getNodeHeight();
      this.listHeight = { height: this.windowHeight - this.nodeHeight + 'px' };
    },

    /**
     * [setIsParentWrite 设置当前页面的搜索状态]
     * @param {Boolean} isWrite [description]
     */
    setIsParentWrite({ isWrite }) {
      this.isParentWrite = isWrite
    },

    /**
     * [setRange 设置isRange]
     * @param {Boolean} isRange [description]
     */
    setRange({ isRange }) {
      this.isRange = isRange
    },

    /**
     * [setSearchCity 设置isSearchCity]
     */
    setSearchCity({ isSearchCity }) {
      this.isSearchCity = isSearchCity
    },

    /**
     * [setLocation 设置经纬度]
     * @param {[String]} lat [纬度]
     * @param {[String]} lng [经度]
     */
    async setLocation({ lat, lng, verify }) {
      const { area_id } = this;

      if (verify) {
        this.lat = lat;
        this.lng = lng;
        this.is_scope = true;
        return true;
      }

      try {
        await mapSure({ latitude: lat, longitude: lng, area_id });
        this.lat = lat;
        this.lng = lng;
        this.is_scope = true;
        return true;
      }catch(err) {
        if (err === 'error') {
          this.dialogVant();
        }
        return false
      }
    },

    /**
     * [dialogVant 不在服务范围]
     * @return {[type]} [description]
     */
    dialogVant() {
      this.is_scope = false;
      this.$DialogVant.alert({
        title: '温馨提示',
        message: '已超出可选择范围'
      })
    },

    /**
     * [locationchange 自定义事件----经纬度更改]
     * @param  {[Array]} location [经纬度]
     * @return {[type]}          [description]
     */
    async locationChange({ location: [lat, lng] }) {

      if (await this.setLocation({ lat, lng })) {
        this.getNearby([lat, lng]);
      }
    },

    /**
     * [updateChange 重置地图]
     * @param  {[Object]} address [当前点击的地址信息]
     * @return {[type]}         [description]
     */
    async updateChange({ address }) {
      const { latLng: { lat, lng } } = address;
      this.setIsParentWrite({ isWrite: true })

      if (await this.setLocation({ lat, lng })) {
        this.getNearby([lat, lng]);
      }

      this.is_scope = true;
    },

    /**
     * [mapChange 自定义事件----更改地图]
     * @param  {[Array]} location [经纬度]
     * @return {[type]}          [description]
     */
    mapChange({ location, address }) {
      ([this.lat, this.lng] = location)
      this.address = address
    },

    /**
     * [writeChange 自定义事件----更改输入状态]
     * @param  {Boolean} isWrite [输入状态的值]
     * @return {[type]}          [description]
     */
    writeChange({ isWrite }) {
      this.isWrite = isWrite;
      this.setIsParentWrite({ isWrite })

      if (isWrite) {
        this.searchList = [];
      }
    },

    /**
     * [changeCurrCity 自定义事件----更改当前城市]
     * @param  {[String]} city [更改后的城市名]
     * @param  {[Boolean]} isSearchCity [控制是否显示城市列表]
     * @return {[type]}      [description]
     */
    changeCurrCity({ city, isSearchCity, lat, lng }) {
      if (typeof city !== 'undefined') {
        this.city = city;
        this.setLocation({ lat, lng, verify: true });
        this.getNearby([lat, lng]);
        this.setRange({ isRange: true })
      }

      this.setSearchCity({ isSearchCity })
    },

    /**
     * [submitChange 自定义事件----点击确定按钮]
     * @return {[type]} [description]
     */
    submitChange() {

      const { is_scope } = this;

      if (!is_scope) {
        this.dialogVant();
        return;
      }

      setTimeout(() => {
        let address = null;

        if (this.address.address == null) {
          address = this.nearby.result
          address.title = this.nearby.result.formatted_addresses.recommend
        } else {
          address = this.address
        }

        address.ad_info.location = address.location

        this.ruleCityList.forEach(item => {
          if ( this.city.indexOf(item.city) !== -1) {
            address.area_id = item.area_id
          }
        })

        this.CHANGECITY(address)
        this.$router.back()
      }, 16)
    },

    /**
     * [keywordChange 自定义事件----keyword发生改变]
     * @param  {[String]} keyword [输入的关键字]
     * @return {[type]}         [description]
     */
    keywordChange({ keyword }) {
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        this.getSearchList({ keyword, region: this.city, pageIndex: 0 })
      }, 100)
    },

    /**
     * [cancelChange 自定义事件----提示不在服务范围内  点击取消]
     * @return {[type]} [description]
     */
    cancelChange() {
      this.rangeBlockChange({ isRangeBlock: true })
    },

    /**
     * [confirmChange 自定义事件-----提示不在服务范围内 点击切换]
     * @return {[type]} [description]
     */
    confirmChange() {
      this.setRange({ isRange: true })
      this.rangeBlockChange({ isRangeBlock: true })
      this.setSearchCity({ isSearchCity: true })
    },

    /**
     * [rangeBlockChange 自定义事件-----操作提示服务范围]
     * @return {[type]} [description]
     */
    rangeBlockChange({ isRangeBlock }) {
      this.isRangeBlock = isRangeBlock;
    },

    /**
     * [getSearchList 获取搜索列表]
     * @param  {[String]} pageIndex [分页]
     * @param  {[String]} region    [范围]
     * @param  {[String]} keyword   [要搜索的值]
     * @return {[type]}           [description]
     */
    getSearchList({ pageIndex, region, keyword } ) {
      const searchService = new qq.maps.SearchService({
        complete:({ detail: { pois } }) => {
          if (keyword) {
            this.searchList = pois;
          } else {
            this.searchList = [];
          }
        },
        error:(err) => {
          console.log(err)
          this.searchList = [];
        }
      })

      searchService.setLocation(region);
        //设置搜索页码
      searchService.setPageIndex(pageIndex);
        //设置每页的结果数
      searchService.setPageCapacity(20);
        //根据输入的关键字在搜索范围内检索
      searchService.search(keyword);
    },

    /**
     * [getNearby 获取附近地标]
     * @return {[Array]} [description]
     */
    async getNearby(location) {
      this.address = {};
      try {
        this.nearby = await locationNearby({ location: location.join(',') })
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [getRuleCityList 获取已开通城市列表]
     * @return {Promise} [description]
     */
    async getRuleCityList() {
      try {
        this.ruleCityList = await cityList();

        if (!this.ruleCityList.some(item => this.city.indexOf(item.city) !== -1)) {
          this.setRange({ isRange: false })
          this.rangeBlockChange({ isRangeBlock: false })
        }

        const currArray = this.ruleCityList.filter(item => this.city.indexOf(item.city) !== -1);
        const { area_id, lat, lng, radius } = currArray[0];

        this.ruleCityList = currArray;

        this.area_id = area_id;
        this.originLat = lat;
        this.originLng = lng;
        this.radius = Number(radius)*1000
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
#location {
    width: 100vw;
    height: 100vh;
    background:#fff;
}

.city-enter-active, .city-leave-active {
  transition: .6s;
}
.city-enter, .city-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%)
}

.map-hint-head {
  font-size: 26px;
}

.map-hint-text {
  font-size: 32px;
  color:#000;
  line-height: 50px;
  text-align:center;
}
</style>
