<template>
  <v-row
      no-gutters
      :class="classes.row"
  >
    <slot/>
    <v-card-text
        v-if="this.hint"
        :class="classes.text"
        style="width: fit-content;"
    >
      {{ this.hint }}
    </v-card-text>
  </v-row>
</template>

<script>
export default {
  name: "ContainerWithHint",
  props: {
    hint: String,
  },
  computed: {
    classes: () => ({
      row: {
        'justify-center': true,
        'align-center': true,
      },
      text: {
        'ma-0': true,
        'pa-0': true,
        'my-3': true,
        'text-center': true,
        'txt--text': true,
        'text-subtitle-2': true,
        'text--darken-1': true,
      }
    }),
  }
}
</script>

<style scoped>

</style>