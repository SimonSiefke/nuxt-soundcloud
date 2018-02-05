<template>
  <div class="wrapper">
    <h1>{{tracks.length}}</h1>

    <!-- <soundcloud-track genre="electronic"></soundcloud-track> -->
    <!-- <soundcloud-track genre="pop"></soundcloud-track> -->

    <div id="card">
      <img :src="tracks[trackNumber].cover" style="margin-bottom: 4rem;width: 60vmin;border-radius: 50%" alt="">
      <div class="info">
        <h3 class="username">{{tracks[trackNumber].userName}}</h3>
        <h4 class="trackname">{{tracks[trackNumber].name}}</h4>
      </div>
      <!-- <img :src="tracks[trackNumber].userAvatar" alt="" style="border-radius:50%;position:absolute;bottom:0;right:0;"> -->
    </div>
    <div id="sidebar">
      <!-- <ul class="circles">
        <li class="circle-wrapper" v-for="(track, index) in tracks.slice(0,Math.min(visibleCircles, tracks.length))" :key="index">
          <div class="circle" :style="{'background-image':`url('${track.userAvatar}')`}" @click="track.playing ? pause() : play(track)">
            {{index}}
            <i class="fa" :class="track.playing ? 'fa-pause':'fa-play'" aria-hidden="true"></i>
          </div>
        </li>

      </ul> -->

      <div class="controls">
        <div class="content">
          <span>prev</span>
          <span @click="tracks[trackNumber].playing ? pause(): play(tracks[trackNumber])">
            <i class="fa" :class="tracks[trackNumber].playing ? 'fa-pause':'fa-play'" aria-hidden="true"></i>
          </span>
          <span>next</span>
          <!-- {{this.tracks}} -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SoundcloudTrackWrapper from '~/components/Soundcloud-Track-Light.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    'soundcloud-track': SoundcloudTrackWrapper
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
  props: {
    tracks: {
      type: Array,
      required: true
    },
    trackNumber: { type: Number, required: true }
  },
  data() {
    return {
      visibleCircles: 3
    }
  },
  methods: {
    ...mapActions('soundcloud', ['play', 'pause']),

    curveFunction(x) {
      return x ** 2
    }
  }
}
</script>


<style lang="stylus" scoped>
#card {
  position: relative;
}

$small-circle-width = 8vmin;
$big-circle-width = 30vmin;

* {
  margin: 0;
  padding: 0;
}

#sidebar {
  display: flex;
}

for num in 1 .. 12 {
  li:nth-of-type({num}) {
    transform: 'rotate(%sdeg)' % ((num + 3 - 1) * 360 / 12);
    transform-origin: 0 50%;

    .circle {
      transform: 'rotate(%sdeg)' % (-1 * (num + 3 - 1) * 360 / 12);
    }
  }
}

ul.circles {
  position: relative;
  transform: 'translateY(%s)' % (-1 * $big-circle-width + $small-circle-width / 2);
  z-index: 2;
}

li.circle-wrapper {
  position: absolute;
  width: $big-circle-width;
  height: $small-circle-width;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.circle {
  background: #000000;
  width: $small-circle-width;
  height: @width;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 25px;
  position: absolute;
  transition: all 1s;
  z-index: 1;
  background-size: cover;
}

.wrapper {
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  background: crimson;
  width: 100%;
  bottom: 0;
  flex-direction: column;
  overflow: hidden;
}

.controls {
  color: #ffffff;
  height: $small-circle-width;
  padding-left: (@height / 2);
  background: #000000;
  display: flex;
  border-bottom-right-radius: (@height / 2);
  border-top-right-radius: (@height / 2);

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;

    >span {
      padding: 10px;
    }

    i {
      width: 30px;
      height: 30px;
    }
  }
}
</style>



<style>
body {
  margin: 0;
}
</style>
