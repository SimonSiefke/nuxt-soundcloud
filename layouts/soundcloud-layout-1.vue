<template>
  <div id="wrapper">
    <soundcloud-track-card v-if="trackNumber>=0" :track="tracks[trackNumber]"></soundcloud-track-card>
    <soundcloud-track-controls v-if="trackNumber>=0" :tracks="tracks"></soundcloud-track-controls>
  </div>

</template>


<script>
import SoundcloudTrackCard from '~/components/layout-1/Soundcloud-Track-Card'
import SoundcloudTrackControls from '~/components/layout-1/Soundcloud-Track-Controls'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('soundcloud', ['tracks', 'trackNumber'])
  },
  components: {
    SoundcloudTrackCard,
    SoundcloudTrackControls
  },
  async created() {
    // soundcloud is only available on the browser
    if (process.browser) {
      this.getTracks({
        genres: ['electronic', 'dance', 'pop'],
        limit: 10
      })
    }
  },
  methods: {
    ...mapActions('soundcloud', ['getTracks'])
  }
}
</script>

<style lang="stylus" scoped>
#wrapper {
  min-height: 100vh;
  display: grid;
  justify-content: center;
  jusify-items: center;
  align-content: flex-end;
  grid-template-columns: minmax(6vw, 1fr) 4fr minmax(6vw, 1fr);
  grid-template-areas: '. card .' 'controls controls controls';
}

#soundcloud-track-card {
  grid-area: card;
  margin: 0 auto;
}

#soundcloud-track-controls {
  grid-area: controls;
}
</style>

<style>
body {
  background: linear-gradient(45deg, #c0392b 0%, #9b59b6 68%);
}
</style>
