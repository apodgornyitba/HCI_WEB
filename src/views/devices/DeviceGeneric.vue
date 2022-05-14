<template>
  <v-app>
    <header-true-view>
      <v-row
          no-gutters
          class="mt-16 justify-center align-center"
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
    </header-true-view>
  </v-app>
</template>

<script>
import HeaderTrueView from "@/views/headerTrueView";

export default {
  name: "DeviceGeneric",
  components: {HeaderTrueView}
}
</script>

<style scoped>

</style>
