<template>
  <v-text-field
      v-bind="$attrs"
      ref="txtField"
      :label="this.label"
      :hint="this.hint"
      persistent-hint
      outlined
      clearable
      @change="change"
      @update:error="updateError"
  />
</template>

<script>

export default {
  name: "txt-field",
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
  methods: {
    change(e) {
      this.$emit('change', e);
    },
    updateError(value) {
      this.$emit('update:error', value);
    }
  }
}
</script>

<style scoped>

</style>