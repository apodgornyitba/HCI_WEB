<template>
  <v-card-text
      class="ma-2 pa-0 text-p"
  >
    <v-slider
        v-bind="$attrs"
        v-model="slider"
        class="align-center"
        :max="(this.max) ? this.max : maxDefault"
        :min="(this.min) ? this.min : minDefault"
        hide-details
        @change="setFieldValue"
    >
      <template v-slot:append>
        <v-text-field
            v-model="sliderValue"
            hide-details
            single-line
            type="number"
            class="mt-0 pt-0"
            style="width: 45px"
            @change="validateSliderInput"
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
  data: () => ({
    slider: 0,
    sliderValue: 0,
    maxDefault: 100,
    minDefault: 0,
  }),
  methods: {
    getValue() {
      return this.sliderValue;
    },

    setSliderValue(v) {
      this.setFieldValue(v);
      this.validateSliderInput(v);
    },
    setFieldValue(v) {
      this.sliderValue = v;

      this.$emit('change', this.sliderValue);
    },
    validateSliderInput(val) {
      /* This nasty function makes the slider's value and text field's value be always equal */
      const max = (this.max) ? this.max : this.maxDefault;
      const min = (this.min) ? this.min : this.minDefault;

      if (val > max) {
        this.setFieldValue(max);
      } else if (val < min) {
        this.setFieldValue(min);
      }
      this.slider = this.sliderValue;

      this.$emit('change', this.sliderValue);
    },
  },
  mounted() {
    this.validateSliderInput(0);
  }
}
</script>

<style scoped>

</style>