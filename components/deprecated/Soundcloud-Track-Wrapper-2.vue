<template>
  <div class="soundcloud-wrapper">
    <!-- <soundcloud-track v-if="tracks.length>0" :track="tracks[trackNumber]"> -->
    <!-- </soundcloud-track> -->
    <!-- <soundcloud-sidebar v-if="tracks.length>0" :tracks="tracks" :trackNumber="trackNumber"></soundcloud-sidebar> -->

    <!-- <soundcloud-track-card v-if="tracks.length>0" :track="tracks[trackNumber]"></soundcloud-track-card> -->
  </div>

</template>


<script>
// import { mapGetters, mapState } from 'vuex'
// import SoundcloudSidebar from './Soundcloud-Sidebar-main'
import SoundcloudTrackCard from './Soundcloud-Track-Card'

// TODO external clientid
const clientID = 'nEUgbh6lRJ7mvPdBvWrL33FaKJJGtxFt'
let Soundcloud
if (process.browser) {
  Soundcloud = require('soundcloud')
  Soundcloud.initialize({
    client_id: clientID
  })
}
export default {
  components: {
    SoundcloudTrackCard
  },
  computed: {
    // ...mapGetters('soundcloud', ['currentTrack']),
    // ...mapState('soundcloud', ['tracks', 'trackNumber'])
  },
  async created() {
    // soundcloud is only available on the browser
    if (process.browser) {
      this.$store.dispatch('soundcloud/getTracks', {
        genres: ['electronic', 'dance', 'pop'],
        limit: 10
      })
    }
  },
  methods: {
    async getTracks() {}
  }
}
</script>

<style lang="stylus" scoped>
</style>
