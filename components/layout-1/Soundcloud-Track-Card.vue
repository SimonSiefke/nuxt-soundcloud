<template key="22">
  <figure id="soundcloud-track-card">
    <div class="image-wrapper">
      <img v-if="track.cover" :src="track.cover" alt="">
    </div>
    <figcaption class="content">
      <h3 class="username">
        <a :href="track.userLink" target="_blank" :title="track.userName">{{track.userName | trim}}</a>
      </h3>
      <h4 class="trackname">
        <a :href="track.link" :title="track.name">{{track.name | trim}}</a>
      </h4>
    </figcaption>
  </figure>
</template>


<script>
import { mapActions } from 'vuex'

export default {
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
    track: {
      type: Object,
      required: true
    }
  },
  filters: {
    trim(string) {
      if (!string || string.length < 35) {
        return string
      }
      return string.substring(0, 35).trim() + ' ...'
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('soundcloud', ['play', 'pause'])
  }
}
</script>


<style lang="stylus" scoped>
#soundcloud-track-card {
  width: 100%;
  max-width: 450px;
  flex: 1;
  display: block;
}

.image-wrapper {
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  background: linear-gradient(60deg, #505DDB, #50607a);
  position: relative;
  overflow: hidden;
}

img {
  background: #000;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  background: #ffffff;
  margin-top: 1rem;
}

.username {
  font-size: responsive 0.7rem 1.5rem;
  font-range: 400px 1000px;
  font-weight: 700;

  &:hover {
    color: #1abc9c;
  }
}

.trackname {
  margin-top: 0.2rem;
  font-size: responsive 0.8rem 1.6rem;
  font-range: 400px 1000px;
  font-weight: 300;
  color: #888;

  &:hover {
    color: black;
  }
}
</style>


