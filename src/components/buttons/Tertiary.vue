<template>
  <btn-generic
      height="55"
      width="165"
      color="quaternary darken-1"
      extra-classes="btn-tertiary text--lighten-1"
  >
    <slot></slot>
  </btn-generic>
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-tertiary",
  props: {
    'title': String,
  },
  components: {btnGeneric}
}
</script>

<style scoped>

</style>