
<template>

  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <div class="navbar navbar-dark bg-inverse navbar-fixed-top">
      <div class="nav-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            <strong>Vue</strong> SoundCloud</a>
          <div class="form-inline pull-xs-right">
            <div class="input-group">
              <input class="form-control" type="text" v-model="query" placeholder="Search">
              <span class="input-group-btn">
                <button type="button" @click="doQuery()" class="btn btn-success-outline">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="container flex-container">
          <a class="nav-link" href="#" @click="doQuery('rock', 'tags')">Rock</a>
          <a class="nav-link" href="#" @click="doQuery('pop', 'tags')">Pop</a>
          <a class="nav-link" href="#" @click="doQuery('jpop', 'tags')">Jpop</a>
          <a class="nav-link" href="#" @click="doQuery('kpop', 'tags')">Kpop</a>
          <a class="nav-link" href="#" @click="doQuery('progressive', 'tags')">Progressive</a>
          <a class="nav-link" href="#" @click="doQuery('chill', 'tags')">Chill</a>
          <a class="nav-link" href="#" @click="doQuery('chiptunes', 'tags')">Chiptunes</a>
          <a class="nav-link" href="#" @click="doQuery('house', 'tags')">House</a>
          <a class="nav-link" href="#" @click="doQuery('dubstep', 'tags')">Dubstep</a>
        </div>
      </div>
    </div>

    <!--<audio :src="streamUrl"></audio>-->

    <div class="container">
      <div class="row" v-if="tracks">
        <div v-for="(track, index) of tracks" :key="index">
          <div class="col-xs-12 col-md-6 col-lg-4 col-xl-3">

            <div class="card" style="overflow: hidden;">

              <div class="artwork" @click="play(track.id)" :style="{ backgroundImage: 'url(' + track.artwork_url_500 + ')' }">
                <div class="play-status">
                  <i class="fa fa-4x fa-play" v-show="!isPlayed"></i>
                  <i class="fa fa-4x fa-pause" v-show="isPlayed"></i>
                </div>
              </div>

              <div class="card-text" style="background: #fafafa;">
                <div class="row">
                  <div class="col-xs-3">
                    <img :src="track.user.avatar_url" :alt="track.title" class="img-fluid" />
                  </div>
                  <div class="col-xs-9">
                    <div class="row">
                      <a href="#" @click="doQuery(track.user.permalink)" style="width: 1800px; display: inline-block;">
                        <small>#{{ track.title }}</small>
                      </a>
                    </div>
                    <div class="row">
                      <a href="#" @click="doQuery(track.user.permalink)">
                        <small>{{ track.user.username }}</small>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const SC_CLIENT_ID = 'nEUgbh6lRJ7mvPdBvWrL33FaKJJGtxFt'
// TODO external clientid
// const clientID = 'nEUgbh6lRJ7mvPdBvWrL33FaKJJGtxFt'
let SC
// let audio
if (process.browser) {
  SC = require('soundcloud')
  // Soundcloud.initialize({
  // client_id: clientID
  // })
}

export default {
  data() {
    return {
      query: '',
      id: '',
      isPlayed: false,
      player: null
    }
  },
  computed: {
    tracks() {
      return this.$store.state.soundcloud.tracks
    },
    ...mapGetters('soundcloud', ['currentTrack'])
  },

  mounted: function() {
    SC.initialize({
      client_id: SC_CLIENT_ID
    })
    this.doQuery('odesza')
  },

  methods: {
    doQuery(query, queryType) {
      const options = {
        limit: 120
      }

      if (queryType === 'tags') {
        options.tags = query
      } else {
        options.q = query
      }

      SC.get('/tracks', options).then(tracks => {
        for (let track of tracks) {
          track.artwork_url_500 = 'http://placehold.it/500?text=No+Artwork'
          track.artwork_url_300 = 'http://placehold.it/300?text=No+Artwork'

          if (track.artwork_url) {
            track.artwork_url_500 = track.artwork_url.replace(
              'large',
              't500x500'
            )
            track.artwork_url_300 = track.artwork_url.replace(
              'large',
              't300x300'
            )
          }
        }
        this.$store.commit('soundcloud/setTracks', tracks)
        // console.log(this.$store.getters['soundcloud/currentTrack'])
        // console.log(this.currentTrack)
      })
    },

    async play(id) {
      console.log(id)
      if (this.player && this.player.isPlaying()) {
        this.player.pause()
        this.isPlayed = false
      } else {
        if (id !== this.id) {
          this.id = id
          this.player = await SC.stream(`/tracks/${this.id}`)
          this.player.play()
          this.isPlayed = true
        }
      }
    }
  }
}
</script>

<style>
body {
  padding: 140px 0 40px;
}

a.nav-link {
  /*color: black !important;*/
}

.navbar {
  padding: 0;
}

.nav-top {
  padding: 10px 0;
  background: #373a3c;
}

.nav-bottom {
  padding: 0;
  background: #e3e6e3;
}

.nav-bottom .flex-container {
  display: flex;
}

.nav-bottom a.nav-link {
  padding: 10px 0;
  text-align: center;
  display: inline-flex;
  flex-grow: 100;
  color: #373a3c !important;
  justify-content: center;
  flex-direction: column;
  border-bottom: 4px solid transparent;
}

.nav-bottom a.nav-link:hover {
  background: #373a3c;
  color: white !important;
  border-bottom: 4px solid #899137;
}

.card a {
  color: lightslategrey;
}

.artwork {
  height: 200px;
  background-image: url('http://placehold.it/500?text=No+Artwork');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.play-status {
  height: 100%;
  color: white;
  display: none;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.artwork:hover .play-status {
  display: flex;
}
</style>
