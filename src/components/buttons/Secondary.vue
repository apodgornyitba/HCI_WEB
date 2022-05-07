<template>
  <btn-generic
      :image="(this.image) ? this.image : ''"
      width="220"
      color="primary darken-1"
      extra-classes="btn-secondary text--lighten-1"
  >
    <slot></slot>
  </btn-generic>
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-secondary",
  props: {
    'title': String,
    'image': String,
  },
  methods: {},
  components: {btnGeneric}
}
</script>

<style>
.btnPrimary > span {
  flex-direction: column !important;
}
</style>