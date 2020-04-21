<template lang="html">
  <List :userinfo="userinfo"></List>
</template>

<script>
import List from "@/components/shopping/address/list"
import { mapState, mapActions } from "vuex"

export default {
  components: {
    List
  },
  data() {
    return {

    }
  },
  created() {
    this.initDetails(true)
  },
  computed: {
    ...mapState({ userinfo: "details" })
  },
  methods: {
    ...mapActions(['initDetails'])
  }
}
</script>

<style lang="scss" module>
</style>
