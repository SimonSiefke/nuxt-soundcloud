<template>
  <section id="soundcloud-track-controls">
    <span class="previous" @click="playPrevious()">
      <i class="fa fa-backward" aria-hidden="true"></i>
    </span>
    <span class="current" @click="track.playing ? pause(): play(track)">
      <i class="fa" :class="track.playing ? 'fa-pause':'fa-play'" aria-hidden="true"></i>
    </span>
    <span class="next" @click="playNext()">
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
    ...mapActions('soundcloud', ['play', 'pause', 'playNext', 'playPrevious'])
  }
}
</script>
<style lang="stylus" scoped>
#soundcloud-track-controls {
  background: #50607a;
  display: flex;
  justify-content: center;
  padding: 0.6rem 0;
  margin-top: 20px;
}

span {
  font-size: 1.5rem;
  margin: 0 1.5rem;
  cursor: pointer;
  color: #fff;
  user-select: none;
}
</style>
