<template>
  <btn-generic
      v-bind="$attrs"
      :class="classes"
      :width="this.width ? this.width : 220"
      :height="this.height ? this.height : 64"
      :image="(this.image) ? this.image : ''"
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
  computed: {
    classes() {
      return {
        'btn-primary': true,
        'text--lighten-1': true,
      }
    }
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