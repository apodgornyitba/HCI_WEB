<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name = "Grifo"
          image = "tap"
          on = "Abierto"
          off = "Cerrado"
          class = "ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-container
          class="align-center justify-space-around"
      >
      <v-row no-gutters
             class="align-center justify-center">
        <v-card
            min-width="300"
        >
          <v-select label = "Unidad"
                    :items = "unidades"
                    :disabled="!deviceOn" >
          </v-select>
        </v-card>
      </v-row>
      <v-row
          class="my-10  align-center justify-center"
      >
        <SliderMM
            ref="sliderPosition"
            title="Cantidad"
            @change="sliderStateChange"
        />
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Eliga la intensidad con la que desa dispensar el agua'"
        />
      </v-row>
    </template>
  </device-generic>

</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceComponent from "@/components/deviceComponent";
import HelpD from "@/components/accesories/helpD";

export default {
  name: "GrifoView",
  components: {HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    unidades:[ 'Litro', 'Decilitro', 'Centilitro', 'Mililitro' ],
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
        this.deviceOn = true;
      } else {
        this.$refs.devComponent.setStatus(false);
        this.deviceOn = false;
      }
    }
  },
}
</script>

<style scoped>

</style>