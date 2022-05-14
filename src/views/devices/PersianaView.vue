<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name = "Persiana"
          image = "curtain"
          on = "Abierto"
          off = "Cerrado"
          class = "ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>

      <v-row no-gutters
             class="align-center justify-center">
        <SliderMM
          title="Posicion"
          :disabled="!deviceOn"
        />
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Eliga en que posición abrir la persiana'"
        />
      </v-row>
    </template>
  </device-generic>
</template>

<script>

import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import HelpD from "@/components/accesories/helpD";
export default {
  name: "PersianaView",
  components: {HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    deviceOn: false,
  }),
  methods: {
    stateChange(active) {
      this.deviceOn = active;
    },
  },

}
</script>

<style>

</style>