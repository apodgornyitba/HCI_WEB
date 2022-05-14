<template>
  <btn-generic
      height="55"
      width="165"
      color="quaternary darken-1"
      extra-classes="btn-tertiary text--lighten-1"
      v-bind="$attrs"
      @click="click"
  >
    <slot></slot>
  </btn-generic>
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  components: {btnGeneric},
  name: "btn-tertiary",
  props: {
    'title': String,
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    },
  }
}
</script>

<style scoped>

</style>