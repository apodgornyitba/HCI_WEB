<template>
    <btn-generic
        :title="`${this.title}`"
        height="55"
        width="165"
        color="quaternary darken-1"
        eclass="btn-tertiary text--lighten-1"
    />
</template>

<script>
import btnGeneric from "@/components/buttons/Generic";

export default {
  name: "btn-tertiary",
  props: {
    'title': String,
  },
  components: {btnGeneric}
}
</script>

<style scoped>

</style>