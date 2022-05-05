<template>
  <btn-generic
      :title="`${this.title}`"
      :image="getImage()"
      :eclass="this.componentClass.join(' ')"
      @click="toggleStatus"
      height="110"
      width="110"
      color="quaternary base"
  />
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-device",
  props: {
    'title': String,
    'imageOff': String,
    'imageOn': String,
  },
  data() {
    return {
      componentClass: ['btn-device', 'text--base'],
      isActivated: false
    }
  },
  methods: {
    getImage() {
      return (this.isActivated)
          ? this.imageOn
          : this.imageOff;
    },
    toggleStatus() {
      this.isActivated = !this.isActivated;

      if (this.isActivated) {
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