<template>
  <main>
    <soundcloud-searchbar v-once/>
    <soundcloud-categories v-once />
    <soundcloud-track-card :track="currentTrack" />
    <soundcloud-track-controls :track="currentTrack" />
  </main>

</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import SoundcloudTrackCard from '~/components/layout-1/Soundcloud-Track-Card'
import SoundcloudTrackControls from '~/components/layout-1/Soundcloud-Track-Controls'
import SoundcloudSearchbar from '~/components/layout-1/Soundcloud-Searchbar'
import SoundcloudCategories from '~/components/layout-1/Soundcloud-Categories'

export default {
  computed: {
    ...mapState('soundcloud', ['tracks', 'trackNumber']),
    ...mapGetters('soundcloud', ['currentTrack']),
  },
  components: {
    SoundcloudTrackCard,
    SoundcloudTrackControls,
    SoundcloudSearchbar,
    SoundcloudCategories,
  },
  async mounted() {
    // soundcloud is only available on the browser
    if (process.browser) {
      window.onNuxtReady(async () => {
        // if it's not in local storage, we fetch the data
        this.initialize()
        if (this.tracks.length) {
          await this.playCurrentTrack()
          this.pause()
        } else {
          console.log('fetch')
          this.getTracks({
            q: 'silence marshmello',
            limit: 10,
          })
        }
      })
    }
  },
  methods: {
    ...mapActions('soundcloud', [
      'getTracks',
      'initialize',
      'playCurrentTrack',
      'pause',
    ]),
  },
}
</script>

<style lang="stylus" scoped>
main {
  display: grid;
  grid-template-areas: '. searchbar .' 'categories categories categories' '. card .' 'controls controls controls';
  grid-template-columns: minmax(6vw, 1fr) 4fr minmax(6vw, 1fr);
  grid-template-rows: max-content auto 1fr max-content;
  justify-content: center;
  min-height: 100vh;
  overflow hidden
}

#soundcloud-searchbar {
  grid-area: searchbar;
}

#categories {
  grid-area: categories;
  margin-top: 1rem;
}

#soundcloud-track-card {
  align-self: end;
  grid-area: card;
  margin: 0 auto;
}

#soundcloud-track-controls {
  align-self: end;
  grid-area: controls;
  margin-top: 1rem;
}
</style>

<style>
body {
  background: linear-gradient(45deg, #c0392b 0%, #9b59b6 68%);
  background: #eaeeee;
}
</style>
