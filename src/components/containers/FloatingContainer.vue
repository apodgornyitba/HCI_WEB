<template>
  <v-row no-gutters
         :class="classes"
  >
    <slot/>
  </v-row>
</template>

<script>
export default {
  name: "FloatingContainer",
  computed: {
    classes: () => (
        ['floating-container', 'align-center', 'justify-end']
    ),
  },
}
</script>

<style lang="scss" scoped>
.floating-container {
  position: absolute;
  top: 5px;
  right: 30px;
}
</style>