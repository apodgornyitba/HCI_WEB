<template>
  <device-generic>

    <template v-slot:left-pane>

      <device-component
        name="AC"
        image="ac"
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
            :max = "38"
            :min = "18"
        />
      </v-row>

    </template>

    <template v-slot:right-pane>

      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <v-col>
        <btn-device
            image-off="icons/64/fan-bw.png"
            image-on="icons/64/fan-color.png"
        >
          Ventilador
        </btn-device>

        <btn-device
            image-off="icons/64/snowflake-bw.png"
            image-on="icons/64/snowflake-color.png"
        >
          Frio
        </btn-device>

        <btn-device
            image-off="icons/64/fire-bw.png"
            image-on="icons/64/fire-color.png"
        >
          Calor
        </btn-device>
        </v-col>
        <v-col>
        <btn-device
            image-off="icons/64/fan-bw.png"
            image-on="icons/64/fan-color.png"
        >
          Dir. aspas 45°
        </btn-device>

        <btn-device
            image-off="icons/64/fan-bw.png"
            image-on="icons/64/fan-color.png"
        >
          Dir. aspas -45°
        </btn-device>

        <btn-device
            @click="toggleStatus"
            :image-on="getState()"
        >
          Intensidad
        </btn-device>
        </v-col>
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
  name: "ACView",
  components: {BtnDevice, SliderMM, DeviceComponent, DeviceGeneric}
}
</script>

<style scoped>

</style>