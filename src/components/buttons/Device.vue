<template>
  <btn-generic
      ref="btn"
      v-bind="$attrs"
      :class="classes"
      :width="this.width"
      :height="this.height"
      :image="getImage()"
      color="quaternary base"
      toggle
      @click="click"
  >
    <slot></slot>
  </btn-generic>
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-device",
  props: {
    disableBorder: Boolean,
    imageOn: String,
    imageOff: String,
    small: Boolean,
  },
  data() {
    return {
      width: 110,
      height: 110,
      isActive: false,
    }
  },
  computed: {
    classes() {
      return {
        'btn-device': true,
        'text--base': true,
        'btn--active': this.isActive,
      }
    }
  },
  created() {
    if (this.small) {
      this.width *= 0.75;
      this.height *= 0.75;
    }
  },
  methods: {
    click(isActive, e) {
      this.clickActions(isActive);
      this.$emit('click', isActive, e);
    },
    clickActions(isActive) {
      this.isActive = isActive;
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

      return (this.isActive) ? on : off;
    },

    setActive(value, e) {
      if (typeof (value) !== "boolean") {
        console.error("Invalid type.")
        return;
      }

      this.clickActions(value);
      this.$refs.btn.setActive(value, e);
    }
  },
  components: {btnGeneric}
}
</script>

<style>

</style>