<template>
      <v-row
          no-gutters
          class="justify-center align-center"
      >
        <v-col
            no-gutters
            cols="3"
            class="device-generic--left-pane"
        >
          <slot name="left-pane"></slot>
        </v-col>

        <v-col
            no-gutters
            cols="5"
            class="device-generic--middle-pane"
        >
          <slot name="middle-pane"></slot>
        </v-col>

        <v-col
            no-gutters
            cols="4"
            class="device-generic--right-pane"
        >
          <slot name="right-pane"></slot>
        </v-col>
      </v-row>
</template>

<script>
export default {
  name: "DeviceGeneric",
  components: {}
}
</script>

<style scoped>

</style>
