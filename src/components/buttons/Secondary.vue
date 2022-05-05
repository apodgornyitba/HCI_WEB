<template>
    <btn-generic
        :title="`${this.title}`"
        :image="`${this.image}`"
        width="220"
        color="primary darken-1"
        eclass="btn-secondary text--lighten-1"
    />
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