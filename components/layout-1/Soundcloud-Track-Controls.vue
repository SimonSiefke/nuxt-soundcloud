<template>
  <section id="soundcloud-track-controls">
    <span class="previous" @click="playPreviousTrack()">
      <i class="fa fa-backward" aria-hidden="true"></i>
    </span>
    <span class="current" @click="togglePlay()">
      <i class="fa" :class="track.playing ? 'fa-pause':'fa-play'" aria-hidden="true"></i>
    </span>
    <span class="next" @click="playNextTrack()">
      <i class="fa fa-forward" aria-hidden="true"></i>
    </span>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('soundcloud', ['track'])
  },
  methods: {
    ...mapActions('soundcloud', [
      'playNextTrack',
      'playPreviousTrack',
      'togglePlay'
    ])
  }
}
</script>
<style lang="stylus" scoped>
#soundcloud-track-controls
  background #50607a
  display flex
  justify-content center
  margin-top 20px
  padding 1rem 0

span
  color #fff
  cursor pointer
  display flex
  font-size 1.5rem
  justify-content center
  user-select none
  width 4rem
</style>
