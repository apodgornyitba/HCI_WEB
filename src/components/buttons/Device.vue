<template>
  <btn-generic
      :image="getImage()"
      :extra-classes="this.componentClass.join(' ')"
      @click="toggleStatus"
      height="110"
      width="110"
      color="quaternary base"
  >
    <slot></slot>
  </btn-generic>
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-device",
  props: {
    'imageOff': String,
    'imageOn': String,
    disableBorder: Boolean,
    forceBorder: Boolean,
  },
  data() {
    return {
      componentClass: ['btn-device', 'text--base'],
      isActivated: false
    }
  },
  methods: {
    getImage() {
      /* Try to get an existing image; fallback to an empty path */
      function validImage(primary, backup) {
        if (primary) {
          return primary;
        } else if (backup) {
          return backup;
        }
        return '';
      }

      const on = validImage(this.imageOn, this.imageOff);
      const off = validImage(this.imageOff, this.imageOn);

      return (this.isActivated) ? on : off;
    },
    toggleStatus() {
      this.isActivated = !this.isActivated;

      if (!this.disableBorder && (this.forceBorder || this.isActivated)) {
        this.componentClass.push('btn--active');
      } else {
        this.componentClass = this.componentClass.filter(e => e !== 'btn--active');
      }
    }
  },
  components: {btnGeneric}
}
</script>

<style>

</style>