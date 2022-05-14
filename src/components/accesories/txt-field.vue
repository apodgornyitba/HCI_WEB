<template>
  <container-with-hint
      :hint="this.hint"
  >
      <v-text-field
          v-bind="$attrs"
          :label="this.label"
          outlined
          clearable
          hide-details
      />
  </container-with-hint>
</template>

<script>
import ContainerWithHint from "@/components/accesories/ContainerWithHint";

export default {
  name: "txt-field",
  components: {ContainerWithHint},
  props: {
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String,
      required: true
    },
  },
}
</script>

<style scoped>

</style>