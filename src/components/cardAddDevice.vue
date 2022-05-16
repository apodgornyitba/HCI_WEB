<template>
  <btn-device
      ref="btnDevice"
      v-bind="$attrs"
      disable-border
      :image-off="`icons/64/${this.image}-bw.png`"
      :image-on="`icons/64/${this.image}-color.png`"
      class="ma-3 pa-0"
      @click="clickHandler"
  >
    {{ this.name }}
  </btn-device>
</template>

<script>

import BtnDevice from "@/components/buttons/Device";

export default {
  name: "cardAddDevice",
  components: {BtnDevice},
  props: {
    'name': String,
    'image': String,
  },

  methods: {
    clickHandler(active, e) {
      this.$emit('click', {active: active, event: e});
    },

    setActive(value) {
      this.$refs.btnDevice.setActive(value);
    }
  }
}
</script>

<style scoped>

</style>