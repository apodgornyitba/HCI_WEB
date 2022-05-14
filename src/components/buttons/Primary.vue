<template>
  <btn-generic
      :image="(this.image) ? this.image : ''"
      :height="this.height ? this.height : 64"
      :width="this.width ? this.width : 220"
      extra-classes="btn-primary text--lighten-1"
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
  name: "btn-primary",
  props: {
    'image': String,
    width: Number,
    height: Number,
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    },
  },
}
</script>

<style>
.btnPrimary > span {
  flex-direction: column !important;
}
</style>