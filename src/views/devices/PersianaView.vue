<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name = "Persiana"
          image = "curtain"
          on = "Abierto"
          off = "Cerrado"
          class = "ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="align-center justify-center">
        <SliderMM
          title="Posicion"
        />
      </v-row>
    </template>

    <template v-slot:right-pane/>
  </device-generic>
</template>

<script>

import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
export default {
  name: "PersianaView",
  components: {DeviceGeneric, SliderMM, DeviceComponent},

}
</script>

<style>

</style>