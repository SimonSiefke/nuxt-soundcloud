<template>
  <div>
    <p v-if="true">loading</p>
    <!-- <slot v-else></slot> -->
  </div>
</template>


<script>
export default {
  props: {
    loading: {
      required: true,
    },
  },
}
</script>
