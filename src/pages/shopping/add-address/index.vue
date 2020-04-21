<template lang="html">
<div>
  <List :city="city"></List>
</div>
</template>

<script>
import List from "@/components/shopping/add-address/list"
import { mapState, mapMutations } from "vuex"

export default {
  components: {
    List
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    ...mapMutations(['CHANGELOCATIONGCITY'])
  }
}
</script>
