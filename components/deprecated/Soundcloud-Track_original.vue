<template>
  <section class="soundcloud-track">
    <div class="row">
      <div class="inner">
        <div v-if="loading" class="loading">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
        <div class="player" :class="{loaded: !loading}">
          <div class="cover">
            <div class="inner" :style="{'background-image': `url('${track.cover}')`}">
              <div class="overlay"></div>
              <div class="loved">
                <i class="fa fa-heart" aria-hidden="true"></i> {{track.love}}</div>
              <div class="genre">
                <i class="fa fa-music" aria-hidden="true"></i> {{track.genre}}</div>
              <div class="controls" @click="playing ? trackPause():trackPlay()">
                <span v-if="trackAmount>1" class="prev" @click.stop="trackPrev()">
                  <i class="fa fa-backward" aria-hidden="true"></i>
                </span>
                <span class="play">
                  <i class="fa" :class="playing ? 'fa-pause':'fa-play'" aria-hidden="true"></i>
                </span>
                <span v-if="trackAmount>1" class="next" @click.stop="trackNext()">
                  <i class="fa fa-forward" aria-hidden="true"></i>
                </span>
              </div>
              <div class="waves"></div>
            </div>
            <!-- end inner -->
          </div>
          <!-- end cover -->

          <div class="user-avatar">
            <a :href="track.userLink" target="_blank" rel="noopener noreferrer">
              <img :src="track.userAvatar" :alt="track.userName">
            </a>
          </div>

          <div class="info">
            <p>
              <a class="userName" :href="track.userLink" target="_blank" rel="noopener noreferrer">{{track.userName}} </a>
              <br>
              <a class="trackName" :href="track.link" target="_blank" rel="noopener noreferrer">{{track.name}}
              </a>
            </p>
          </div>

        </div>
        <!-- end player -->

      </div>
    </div>
  </section>
</template>


<script>
// TODO external clientid
const clientID = 'nEUgbh6lRJ7mvPdBvWrL33FaKJJGtxFt'
let Soundcloud
/// TS_IGNORE
if (process.browser) {
  Soundcloud = require('soundcloud')
  Soundcloud.initialize({
    client_id: clientID
  })
}
export default {
  props: {
    genre: {
      type: String,
      required: true
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ]
  },
  data() {
    return {
      loading: true,
      playing: false,
      trackNumber: 0,
      tracks: [],
      player: null,
      track: {
        ID: 0,
        cover: '',
        name: '',
        duration: 0,
        love: 0,
        link: '',
        genre: '',
        userAvatar: '',
        userLink: '',
        userName: ''
      }
    }
  },
  computed: {
    trackAmount() {
      return this.tracks.length
    },
    active() {
      return this.$store.state.activeSoundcloudPlayerId === this._uid
    }
  },
  watch: {
    active(isActive) {
      if (!isActive) {
        this.trackPause()
      }
    }
  },
  async created() {
    // soundcloud is only available on the browser
    if (process.browser) {
      this.getTracks()
    }
  },
  methods: {
    async getTracks() {
      this.tracks = await Soundcloud.get('/tracks', {
        genres: this.genre
      })
      this.loading = false
      this.updatePlayer()
    },
    async updatePlayer() {
      this.track = this.makeTrack(this.tracks[this.trackNumber])
      this.player = await Soundcloud.stream(`/tracks/${this.track.ID}`)
      this.player.on('play', () => {
        this.playing = true
      })
      this.player.on('pause', () => {
        this.playing = false
      })
      this.player.on('finish', () => {
        this.playing = false
      })
    },
    makeTrack(t) {
      return {
        ID: t.id,
        cover: t.artwork_url.replace('large', 'crop'),
        name: t.title,
        duration: t.duration,
        love: t.likes_count,
        link: t.permalink_url,
        genre: t.genre,
        userAvatar: t.user.avatar_url,
        userLink: t.user.permalink_url,
        userName: t.user.username
      }
    },
    // activate this player and deactivate others
    activate() {
      this.$store.commit('activate', this._uid)
    },
    trackPlay() {
      this.activate()
      this.player.play()
    },
    trackPause() {
      this.player.pause()
    },
    trackResetTimer() {
      this.player.seek(0)
    },
    async trackNext() {
      this.trackPause()
      this.trackNumber =
        this.trackNumber === this.trackAmount - 1 ? 0 : this.trackNumber + 1
      await this.updatePlayer()

      setTimeout(() => {
        this.trackPlay()
        this.trackResetTimer()
      }, 100)
    },
    async trackPrev() {
      this.trackPause()
      this.trackNumber =
        this.trackNumber === 0 ? this.trackAmount - 1 : this.trackNumber - 1
      await this.updatePlayer()
      setTimeout(() => {
        this.trackPlay()
        this.trackResetTimer()
      }, 100)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
  background: #c0392b;
  background: linear-gradient(45deg, #c0392b 0%, #9b59b6 68%);
}

body {
  font-family: 'Open Sans', sans-serif;
}

a,
nav {
  font-family: 'Open Sans', sans-serif;
}

h1,
h2,
h3,
h4 {
  font-family: 'Open Sans', sans-serif;
}

p,
li,
ol {
  font-family: 'Open Sans', sans-serif;
}

.row {
  width: 100%;
  height: 100%;
  position: relative;
}

.row .inner {
  width: 100%;
  height: 100%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  box-sizing: border-box;
}

@media screen and (min-width: 768px) {
  .row .inner {
    padding: 40px;
  }
}

@media screen and (min-width: 1024px) {
  .row .inner {
    padding: 0;
  }
}

@keyframes wave {
  0% {
    transform: translateX(-200px) translateY(0);
  }
  50% {
    transform: translateX(-400px) translateY(50px);
  }
  100% {
    transform: translateX(-1000px) translateY(0);
  }
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.6s ease-in-out;
}
/*
.loading.closed {
  opacity: 0;
  pointer-events: none;
} */

.player {
  width: 100%;
  max-width: 400px;
  min-height: 500px;
  border-radius: 5px;
  box-shadow: 0 5px 15px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  transform: rotateX(90deg);
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s ease-in-out;
  overflow: hidden;
}

.player.loaded {
  transform: rotateX(0);
  opacity: 1;
  pointer-events: auto;
}

.player .cover {
  width: 100%;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-bottom: 5px solid #1abc9c;
  overflow: hidden;
}

.player .cover:before {
  padding-top: 100%;
  content: '';
  display: block;
}

.player .cover > * {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.player .cover .inner {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #000;
}

.player .cover .inner .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 1;
}

/* .player .cover .inner .overlay:after {
  content: '';
  position: absolute;
  width: 52px;
  height: 16px;
  bottom: 20px;
  right: 20px;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/powered_by_white.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 0.8;
  z-index: 2;
} */

.player .cover .inner .loved {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #e74c3c;
  font-size: 16px;
  font-weight: 700;
  z-index: 2;
}

.player .cover .inner .loved:hover {
  color: #ed7669;
}

.player .cover .inner .genre {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background-color: black;
  border-radius: 3px;
  font-size: 16px;
  padding: 5px 10px;
  z-index: 2;
}

.player .cover .inner .controls {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.player .cover .inner .controls span {
  font-size: 32px;
  color: white;
  margin: 0 20px;
  opacity: 1;
}

.player .cover .inner .controls span:hover {
  opacity: 0.4;
}

.player .cover .inner .controls.playing {
  opacity: 0;
}

.player .cover .inner .controls:hover {
  opacity: 1;
}

/* .player .cover .inner .waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 200px;
} */

/* .player .cover .inner .waves:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 200px;
  width: 1600px;
  transform: translateX(-200px) translateY(0);
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/main-wave.png');
  background-repeat: no-repeat;
  background-position: bottom left;
  z-index: 4;
  animation-duration: 40s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
} */

/* .player .cover .inner .waves:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 200px;
  width: 1600px;
  transform: translateX(-200px) translateY(0);
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/secundary-wave.png');
  background-repeat: no-repeat;
  background-position: bottom left;
  z-index: 3;
  animation-duration: 60s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
} */

/* .player .cover .inner .waves.animate:after,
.player .cover .inner .waves.animate:before {
  animation-name: wave;
} */

.player .user-avatar {
  width: 100%;
  height: 10px;
  position: relative;
}

.player .user-avatar img {
  width: 100px;
  height: auto;
  position: absolute;
  bottom: 0;
  left: calc(50% - 50px);
  z-index: 5;
  border: 3px solid white;
  box-sizing: border-box;
  box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.5);
}

.player .info {
  width: 100%;
  padding: 5px 20px;
  box-sizing: border-box;
  text-align: center;
}

.player .info a {
  text-decoration: none;
}

.player .info a.userName {
  font-weight: 700;
  color: black;
}

.player .info a.userName:hover {
  color: #1abc9c;
}

.player .info a.trackName {
  font-weight: 300;
  color: #999;
}

.player .info a.trackName:hover {
  color: black;
}

/* .player .wave-form {
  position: relative;
  width: 100%;
  height: 40px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  cursor: crosshair;
} */

/* .player .wave-form span.wave-overlay {
  position: absolute;
  width: 0%;
  height: 100%;
  background-color: #e74c3c;
  opacity: 0.2;
} */
</style>
