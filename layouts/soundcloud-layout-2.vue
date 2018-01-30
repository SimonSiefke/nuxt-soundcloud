<template>
  <h1>hi</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('soundcloud-2', ['tracks'])
  }
}
</script>

<style>

</style>
