<template>
  <div>
    <soundcloud-track genre="electronic"></soundcloud-track>
    <soundcloud-track genre="pop"></soundcloud-track>
  </div>
</template>


<script>
import SoundcloudTrack from '~/components/Soundcloud-Track.vue'

export default {
  components: {
    'soundcloud-track': SoundcloudTrack
  }
}
</script>

