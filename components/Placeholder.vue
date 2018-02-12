<template>
  <no-ssr>
    <div :style="styleObject">
      loading
    </div>
  </no-ssr>
</template>


<script>
export default {
  computed: {
    styleObject() {
      return {
        // width: this.width,
        // height: this.height,
        // background: this.color,
        // maxWidth: '100%',
      }
    },
  },
}
</script>


