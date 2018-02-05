<template>

  <ul id="categories">
    <li v-for="(category, index) in categories" :key="index">
      <span @click="search(category)" :class="{active: category===activeCategory}">{{category}}</span>
    </li>
  </ul>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      categories: [
        'Deep',
        'House',
        'Chill',
        'Electronic',
        'Tropical',
        'Dubstep'
      ],
      activeCategory: ''
    }
  },
  methods: {
    ...mapActions('soundcloud', ['getTracks', 'playCurrentTrack']),
    async search(category) {
      this.activeCategory = category
      const query = { q: category }
      await this.getTracks(query)
      this.playCurrentTrack()
    }
  }
}
</script>

<style lang="stylus" scoped>
$color = #888

ul
  background #ffffff
  display none
  grid-auto-columns 1fr
  grid-template-columns repeat(6, 1fr)
  height 3rem

  @media screen and (min-width: 30rem)
    display grid

li
  align-items center
  display flex
  justify-content center

span
  color $color
  cursor pointer

  &:hover, &.active
    color #1abc9c
</style>

