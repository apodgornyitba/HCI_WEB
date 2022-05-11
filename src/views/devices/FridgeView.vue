<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Heladera"
          image="refrigerator"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters>
        <SliderMM
            title="Temperatura Heladera (°C)"
        />

        <SliderMM
            title="Temperatura Freezer (°C)"
        />
      </v-row>
    </template>


    <template v-slot:right-pane>
      <v-row
          no-gutters
          class="justify-center"
      >
        <btn-device
            image-off="icons/64/champagneglass-bw.png"
            image-on="icons/64/champagneglass-color.png"
        >
          Modo Fiesta
        </btn-device>


        <btn-device
            image-off="icons/64/refrigerator_small-bw.png"
            image-on="icons/64/refrigerator_small-color.png"
        >
          Normal
        </btn-device>


        <btn-device
            image-off="icons/64/beach-bw.png"
            image-on="icons/64/beach-color.png"
        >
          Modo Vacaciones
        </btn-device>
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
  name: "FridgeView",
  components: {BtnDevice, SliderMM, DeviceGeneric, DeviceComponent}

}
</script>

<style scoped>

</style>