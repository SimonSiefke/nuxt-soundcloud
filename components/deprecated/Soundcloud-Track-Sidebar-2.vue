<template>
  <aside>
    <div class="track" v-for="(track, index) of tracks" :key="index">
      <div class="image-wrapper" @click="track.playing ? pause(): play(track)" :class="track.playing? 'active':''" :title="track.name">
        <img v-if="track.cover" :src="track.cover" :alt="`cover of '${track.name}'`" :title="track.name" :class="track.playing ? 'active':''">
        <div v-else class="circle" :class="track.playing ? 'active':''">
          <span class="unknown"></span>
        </div>
        <div class="overlay"></div>
        <span class="play">
          <i class="fa" :class="track.playing ? 'fa-pause':'fa-play'" aria-hidden="true"></i>
        </span>
      </div>
      <!-- end image wrapper -->

      <!-- <div class="content">

        <p> {{track.name}}</p>
      </div> -->
    </div>
  </aside>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    tracks: {
      type: Array
    }
  },
  created() {
    console.log(this.tracks)
  },
  methods: {
    ...mapActions('soundcloud', ['play', 'pause'])
  }
}
</script>

<style lang="stylus" scoped>
* {
  box-sizing: border-box;
}

$track-width = {
  small: 80px,
  medium: 95px,
  large: 110px
};

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

$rotation = 60deg;

aside {
  position: absolute;
  top: 0;
  transform: rotate($rotation);
  transform-origin: bottom left;
  // animation: spin 4s linear infinite;
  margin: 0 auto;
  width: 100vmax;
  display: grid;
  grid-template-columns: repeat(auto-fit, $track-width['medium']);
  grid-row-gap: 15px;
  // grid-gap: 10px;
  // margin: 0 @grid-gap;
  justify-content: space-between;
  // background: rgba(white, 0.5);
  background: rgba(#3d4551, 0.3);
  padding: 1rem 3vw;
  // @media screen and (min-width: 500px) {
  // grid-template-columns: repeat(auto-fit, $track-width['medium']);
  // }
  // @media screen and (min-width: 600px) {
  // grid-template-columns: repeat(auto-fit, $track-width['large']);
  // }
}

.track {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: 'rotate(-%s)' % $rotation;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  max-height: @max-width;
  height: @width;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;

  &:before {
    display: table;
    padding-top: 100%;
    content: '';
  }

  .overlay {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: @width;
    background: rgba(white, 0.4);
  }

  &:hover, &.active {
    .overlay {
      display: none;
    }
  }
}

// p {
// text-align: center;
// margin: 0;
// }
.circle {
  background: black;
}

img, .circle {
  position: absolute;
  top: 0;
  width: 100%;
  height: @width;
  cursor: pointer;
}

// .overlay {
// top: 0;
// left: 0;
// z-index: 3;
// position: absolute;
// width: 100%;
// height: 100%;
// background: rgba(white, 0.3);
// cursor: pointer;
// }
.play {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  color: #ffffff;
  // z-index: 4;
  cursor: pointer;
  font-size: 25px;
}
</style>
