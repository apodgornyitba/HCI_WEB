<template>
  <v-card-text
      class="ma-2 pa-0 text-p"
  >
  <v-slider
      v-model="slider"
      class="align-center"
      :max="(this.max) ? this.max : this.maxDefault"
      :min="(this.min) ? this.min : this.minDefault"
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
    max: Number,
    min: Number,
  },
  data() {
    return {
      minDefault: 0,
      maxDefault: 100,
      slider: 0,
    }
  }
}
</script>

<style scoped>

</style>