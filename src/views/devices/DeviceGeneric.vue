<template>
  <v-app>
    <header-true-view>
      <v-row
          no-gutters
          class="mt-16"
      >
        <v-row
            no-gutters
            class="device-generic--left-pane"
        >
          <slot name="left-pane"></slot>
        </v-row>

        <v-row
            no-gutters
            class="device-generic--middle-pane"
        >
          <slot name="middle-pane"></slot>
        </v-row>

        <v-row
            no-gutters
            class="device-generic--right-pane"
        >
          <slot name="right-pane"></slot>
        </v-row>
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
