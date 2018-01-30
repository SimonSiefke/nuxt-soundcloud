<template>
  <div id="wrapper">
    <soundcloud-searchbar></soundcloud-searchbar>
    <soundcloud-categories>
    </soundcloud-categories>
    <soundcloud-track-card v-if="trackNumber>=0" :track="tracks[trackNumber]"></soundcloud-track-card>
    <soundcloud-track-controls :tracks="tracks"></soundcloud-track-controls>
    <!-- <button @click="$store.commit('soundcloud/removeTrack', 1)"></button> -->
  </div>

</template>


<script>
import { mapState, mapActions } from 'vuex'
import SoundcloudTrackCard from '~/components/layout-1/Soundcloud-Track-Card'
import SoundcloudTrackControls from '~/components/layout-1/Soundcloud-Track-Controls'
import SoundcloudSearchbar from '~/components/layout-1/Soundcloud-Searchbar'
import SoundcloudCategories from '~/components/layout-1/Soundcloud-Categories'

export default {
  computed: {
    ...mapState('soundcloud', ['tracks', 'trackNumber']),
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
            q: 'say my name mazde',
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
#wrapper {
  // align-content flex-end
  display: grid;
  grid-template-areas: '. searchbar .' 'categories categories categories' '. card .' 'controls controls controls';
  grid-template-columns: minmax(6vw, 1fr) 4fr minmax(6vw, 1fr);
  grid-template-rows: max-content auto auto max-content;
  justify-content: center;
  min-height: 100vh;
}

#soundcloud-searchbar {
  grid-area: searchbar;
}

#categories {
  margin-top: 1rem;
  grid-area: categories;
}

#soundcloud-track-card {
  align-self: end;
  grid-area: card;
  margin: 0 auto;
}

#soundcloud-track-controls {
  margin-top: 1rem;
  align-self: end;
  grid-area: controls;
}
</style>

<style>
body {
  background: linear-gradient(45deg, #c0392b 0%, #9b59b6 68%);
  background: #eaeeee;
}
</style>
