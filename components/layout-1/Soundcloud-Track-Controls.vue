// TODO: replace span with i tag
<template>
  <section id="soundcloud-track-controls">
    <span class="previous">
      <i class="fa fa-backward" aria-hidden="true" @click="playPreviousTrack()"></i>
    </span>
    <span class="current">
      <i class="fa" :class="track.playing ? 'fa-pause':'fa-play'" aria-hidden="true" @click="togglePlay()"></i>
    </span>
    <span class="next">
      <i class="fa fa-forward" aria-hidden="true" @click="playNextTrack()"></i>
    </span>

    <span class="loop">
      <i class="fa fa-retweet" @click="toggleLoop()" :class="{active:loop}"></i>
    </span>
  </section>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('soundcloud', ['track']),
    ...mapState('soundcloud', ['loop'])
  },
  methods: {
    ...mapActions('soundcloud', [
      'playNextTrack',
      'playPreviousTrack',
      'togglePlay'
    ]),
    ...mapMutations('soundcloud', ['toggleLoop'])
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
  text-align center
  width 4rem

i
  color #fff
  cursor pointer
  display inline-block
  font-size 1.5rem
  user-select none

.loop .active
  color #1abc9c
</style>
