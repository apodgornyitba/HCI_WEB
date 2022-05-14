<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
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
            title="Cantidad"
            :disabled="!deviceOn"
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
  }),
  methods: {
    stateChange(active) {
      this.deviceOn = active;
    },
  },
}
</script>

<style scoped>

</style>