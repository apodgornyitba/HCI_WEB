<template>
  <v-app>
    <header-true-view>
      <v-row
          no-gutters
          class="ma-10 pa-10"
      >
        <v-col
            no-gutters
            class="device-generic--left-pane"
        >
          <slot name="left-pane"></slot>
        </v-col>

        <v-col
            no-gutters
            class="device-generic--middle-pane"
        >
          <slot name="middle-pane"></slot>
        </v-col>

        <v-col
            no-gutters
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

<style lang="scss" scoped>
/* device-generic--left-pane */
/* device-generic--middle-pane */
/* device-generic--right-pane */

/*
.device-generic--container {
  display: flex;
  flex-direction: column;
}
*/

</style>