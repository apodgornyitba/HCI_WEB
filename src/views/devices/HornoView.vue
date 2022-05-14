<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Horno"
          image="oven"
          class="ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <SliderMM
            title="Temperatura (°C)"
            min = "90"
            max = "230"
        />
      </v-row>
    </template>


  </device-generic>
</template>

<script>

import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "HornoView",
  components: {BtnDevice, SliderMM, DeviceGeneric, DeviceComponent}
}
</script>

<style scoped>

</style>