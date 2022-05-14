<template>
  <btn-generic
      :image="getImage()"
      :extra-classes="this.componentClass.join(' ')"
      @click="click"
      :height="this.height"
      :width="this.width"
      color="quaternary base"
      v-bind="$attrs"
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
    small: Boolean,
  },
  data() {
    return {
      componentClass: ['btn-device', 'text--base'],
      isActivated: false,
      width: 110,
      height: 110,
    }
  },
  created() {
    if (this.small) {
      this.height *= 0.75;
      this.width *= 0.75;
    }
  },
  methods: {
    click(e) {
      this.$emit('click', e);
      return this.toggleStatus()
    },
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