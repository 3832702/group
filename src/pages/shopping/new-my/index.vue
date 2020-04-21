<template lang="html">
<div :class="$style.my">
  <Head :info="info"></Head>
  <Correlation :info="info"></Correlation>
  <NewFooter></NewFooter>
</div>
</template>

<script>
import Head from "@/components/shopping/new-my/head.vue"
import Correlation from "@/components/shopping/new-my/correlation.vue"
import NewFooter from "@/public/common/new-footer.vue"

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Head,
    Correlation,
    NewFooter
  },
  computed: {
    ...mapState({ info: 'details'})
  },
  created() {
    this.initDetails()
  },
  methods: {
    ...mapActions(['initDetails']),
  }
}
</script>


<style lang="scss" module>
.my {
  min-height: 100vh;
  background:#fff;
}
</style>
