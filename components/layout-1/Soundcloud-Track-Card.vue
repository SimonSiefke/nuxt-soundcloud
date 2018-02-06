<template key="22">
  <no-ssr>
    <figure id="soundcloud-track-card">
      <div class="image-wrapper">
        <img v-if="track&&track.cover" :src="track.cover" alt="">
        <pulse-loader if="ok" v-else/>
      </div>
      <figcaption class="content">
        <h3 class="username">
          <a v-if="track" :href="track.userLink" target="_blank" :title="track.userName">{{track.userName | trim}}</a>
          <placeholder v-else/>
        </h3>
        <h4 class="trackname">
          <a v-if="track" :href="track.link" :title="track.name">{{track.name | trim}}</a>
          <placeholder v-else/>
        </h4>
      </figcaption>
    </figure>
  </no-ssr>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
  },
  data() {
    return {
      trackname__color: '#888',
      username__color: '#000',
    }
  },
  props: {
    track: {
      type: Object | null,
      required: true,
    },
  },
  filters: {
    trim(string) {
      if (!string || string.length < 35) {
        return string
      }
      return string.substring(0, 35).trim() + ' ...'
    },
  },
  methods: {
    ...mapActions('soundcloud', ['play', 'pause']),
  },
}
</script>


<style lang="stylus" scoped>
// .v-spinner {
// background: blue !important;
// position: absolute;
// top: 0;
// left: 0;
// bottom: 0;
// right: 0;
// margin: auto;
// }
#soundcloud-track-card {
  display: block;
  flex: 1;
  max-width: 450px;
  width: 100%;
}

.image-wrapper {
  background: linear-gradient(60deg, #505DDB, #50607a);
  overflow: hidden;
  padding-top: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-spinner {
  // positioned in absolute center
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
}

img {
  background: #000;
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}

.content {
  align-items: center;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  // margin-top 1rem
  padding: 1rem 0;
}

.username {
  font-range: 400px 1000px;
  font-size: responsive 0.7rem 1.3rem;
  font-weight: 700;

  &:hover {
    color: #1abc9c;
  }
}

.trackname {
  color: #888;
  font-range: 400px 1000px;
  font-size: responsive 0.8rem 1.4rem;
  font-weight: 300;
  margin-top: 0.2rem;

  &:hover {
    color: black;
  }
}
</style>


