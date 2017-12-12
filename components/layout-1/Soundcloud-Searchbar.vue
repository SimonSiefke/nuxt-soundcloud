<template>
  <form @submit.prevent="search()" id="soundcloud-searchbar">
    <input type="search" placeholder="search" v-model.lazy="searchValue">
    <button class="search">
      <i class="fa fa-search"></i>
    </button>
  </form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    ...mapActions('soundcloud', ['getTracks']),
    search() {
      const query = { q: this.searchValue }
      this.getTracks(query)

      // remove focus from input
      document.activeElement.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
$padding = 0.5rem
$height = 1.5rem

form
  background #ffffff
  color #50607a
  margin 0 auto
  max-width 20rem
  padding $padding
  position relative

  input
    border none
    color darken(@color, 80%)
    font-size $height
    height @font-size
    line-height @font-size
    margin 0
    max-width 100%

button
  background #ffffff
  border none

.search
  color #50607a
  cursor pointer
  font-size $height
  height @font-size
  line-height @font-size
  position absolute
  right $padding
  top 50%
  transform translateY(-50%)
  width @font-size
</style>

