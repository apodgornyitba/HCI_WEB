<template>
  <v-card-text
      class="ma-2 pa-0 text-p"
  >
  <v-slider
      v-model="slider"
      class="align-center"
      :max="max"
      :min="min"
      hide-details
  >
    <template v-slot:append>
      <v-text-field
          v-model="slider"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
      ></v-text-field>
    </template>
  </v-slider>
    {{ this.title }}
  </v-card-text>
</template>

<script>
export default {
  name: "SliderMM",
  props: {
    'title': String,
  },
  data() {
    return {
      min: 0,
      max: 100,
      slider: 40,
    }
  }
}
</script>

<style scoped>

</style>