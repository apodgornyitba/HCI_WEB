<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name="Persiana"
          image="curtain"
          on="Abierto"
          off="Cerrado"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>

      <v-row no-gutters
             class="align-center justify-center">
        <SliderMM
            ref="sliderPosition"
            title="Posicion"
            @change="sliderStateChange"
        />
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Elija en que posición abrir la persiana'"
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
    position: 0,
  }),
  methods: {
    stateChange(active) {
      this.deviceOn = active;

      if (active === false) {
        this.$refs.sliderPosition.setSliderValue(0);
      } else {
        this.$refs.sliderPosition.setSliderValue(this.position);
      }
    },
    sliderStateChange(value) {
      if (value > 0) {
        this.$refs.devComponent.setStatus(true);
        this.position = this.$refs.sliderPosition.getValue();
      } else {
        this.$refs.devComponent.setStatus(false);
      }
    }
  },

}
</script>

<style>

</style>