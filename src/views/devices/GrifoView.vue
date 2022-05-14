<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name = "Grifo"
          image = "tap"
          on = "Abierto"
          off = "Cerrado"
          class = "ma-auto align-center justify-center"
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
                    :items = "unidades" >
          </v-select>
        </v-card>
      </v-row>
      <v-row
          class="my-10  align-center justify-center"
      >
        <SliderMM
            title="Cantidad"
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
      <v-row no-gutters
             class="align-center justify-center">
      <btn-device
          image-off="icons/64/tap_drop-bw.png"
          image-on="icons/64/tap_drop-color.png"
      >
        Dispensar
      </btn-device>
      </v-row>
    </template>
  </device-generic>

</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";
import HelpD from "@/components/accesories/helpD";

export default {
  name: "GrifoView",
  components: {HelpD, BtnDevice, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    unidades:[ 'Litro', 'Decilitro', 'Centilitro', 'Mililitro' ],
  }),
  methods: {

  }
}
</script>

<style scoped>

</style>