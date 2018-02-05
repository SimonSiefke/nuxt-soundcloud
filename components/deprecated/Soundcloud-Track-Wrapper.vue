<template>
  <div class="soundcloud-wrapper">
    <soundcloud-track v-if="tracks.length>0" :track="tracks[0]"></soundcloud-track>
    <soundcloud-track v-if="tracks.length>0" :track="tracks[1]"></soundcloud-track>
    <soundcloud-track-sidebar v-if="tracks.length>0" :tracks="tracks"></soundcloud-track-sidebar>
  </div>

</template>


<script>
import { mapGetters, mapState } from 'vuex'
import SoundcloudTrack from './Soundcloud-Track'
import SoundcloudTrackSidebar from './Soundcloud-Track-Sidebar-2'
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
    SoundcloudTrack,
    SoundcloudTrackSidebar
  },
  computed: {
    ...mapGetters('soundcloud', ['currentTrack']),
    ...mapState('soundcloud', ['tracks', 'trackNumber'])
  },
  async created() {
    // soundcloud is only available on the browser
    if (process.browser) {
      this.getTracks()
    }
  },
  methods: {
    async getTracks() {
      const rawData = await Soundcloud.get('/tracks', {
        genres: ['electronic', 'dance', 'pop'],
        limit: 5
      })

      const newTracks = rawData.map((track, index) => ({
        id: track.id,
        cover: track.artwork_url
          ? track.artwork_url.replace('large', 'crop')
          : '',
        name: track.title,
        duration: track.duration,
        love: track.likes_count,
        link: track.permalink_url,
        genre: track.genre,
        userAvatar: track.user.avatar_url,
        userLink: track.user.permalink_url,
        userName: track.user.username,
        playing: false,
        index
      }))
      this.$store.commit('soundcloud/setTracks', newTracks)
    }
  }
}
</script>

<style lang="stylus" scoped>
// .soundcloud-wrapper {
//   display: grid;
//   align-items: flex-start;
//   // grid-template-columns: 1fr;
//   // min-height: 120vh;
//   background: #c0392b;
//   background: linear-gradient(45deg, #c0392b 0%, #9b59b6 68%);
// }
</style>
