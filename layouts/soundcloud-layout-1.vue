<template>
  <div id="wrapper">
    <soundcloud-searchbar></soundcloud-searchbar>
    <soundcloud-track-card v-if="trackNumber>=0" :track="tracks[trackNumber]"></soundcloud-track-card>
    <soundcloud-track-controls v-if="trackNumber>=0" :tracks="tracks"></soundcloud-track-controls>
    <!-- <button @click="$store.commit('soundcloud/removeTrack', 1)"></button> -->
  </div>

</template>


<script>
import SoundcloudTrackCard from '~/components/layout-1/Soundcloud-Track-Card'
import SoundcloudTrackControls from '~/components/layout-1/Soundcloud-Track-Controls'
import SoundcloudSearchbar from '~/components/layout-1/Soundcloud-Searchbar'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('soundcloud', ['tracks', 'trackNumber'])
  },
  components: {
    SoundcloudTrackCard,
    SoundcloudTrackControls,
    SoundcloudSearchbar
  },
  async mounted() {
    // soundcloud is only available on the browser
    if (process.browser) {
      this.initialize()
      this.getTracks({
        q: 'marshmello moving on',
        limit: 10
      })
    }
  },
  methods: {
    ...mapActions('soundcloud', ['getTracks', 'initialize'])
  }
}
</script>

<style lang="stylus" scoped>
#wrapper
  // align-content flex-end
  display grid
  grid-template-areas '. searchbar .' '. card .' 'controls controls controls'
  grid-template-columns minmax(6vw, 1fr) 4fr minmax(6vw, 1fr)
  grid-template-rows max-content auto max-content
  jusify-items center
  justify-content center
  min-height 100vh

#soundcloud-searchbar
  grid-area searchbar

#soundcloud-track-card
  align-self end
  grid-area card
  margin 0 auto

#soundcloud-track-controls
  align-self end
  grid-area controls
</style>

<style>
body {
  background: linear-gradient(45deg, #c0392b 0%, #9b59b6 68%);
  background: #eaeeee;
}
</style>
