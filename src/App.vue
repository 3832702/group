<template>
  <router-view></router-view>
</template>

<script>
import { hideMenuItems, sdkConfig } from "@/utils/employ-jssdk.js"
import { domain } from "@/utils/util.js"

export default {
  name: 'app',
  data() {
    return {
      is_refresh: false,
      formIsRefresh: false
    }
  },
  watch: {
    $route(to) {
      this.$toast.clear();
      const { meta: { jsApiList, is_close, is_share } } = to;
      this.readySdkConfig(jsApiList, is_close, is_share, to.name);
    }
  },
  methods: {
    async readySdkConfig(jsApiList, is_close, is_share, fnName) {
      try {
        let list = is_share ? []: ['hideMenuItems'];

        if (Array.isArray(jsApiList)) {
            list = [...list, ...jsApiList]
        }

        if (is_close) {
          return;
        }

        await sdkConfig(`${domain}${this.$route.fullPath}`, this.$iosFullPath, list, this.$wx)
        this.$shareFn[fnName] && this.$shareFn[fnName]()
        if (!is_share) {
          hideMenuItems(this.$wx)
        }
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
[v-cloak] {
    display: none !important;
}

#box-subwrap {
  width: 100vw;
  height: 100vh;
  overflow:hidden;
  overflow-y:auto;
  -webkit-overflow-scrolling: touch;
}
/*
.van-loading {
  width: auto;
  height: auto;
  padding:40px 0;
} */

#box-subwrap::-webkit-scrollbar{ width:0;height:1px;display: none;}
#box-subwrap::-webkit-scrollbar-thumb{display:none}


</style>
