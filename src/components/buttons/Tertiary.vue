<template>
  <btn-generic
      v-bind="$attrs"
      :class="classes"
      width="165"
      height="55"
      color="quaternary darken-1"
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
  computed: {
    classes() {
      return {
        'btn-tertiary': true,
        'text--lighten-1': true,
      }
    }
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