<template>
  <btn-generic
      :image="(this.image) ? this.image : ''"
      width="220"
      extra-classes="btn-primary text--lighten-1"
  >
    <slot></slot>
  </btn-generic>
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-primary",
  props: {
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