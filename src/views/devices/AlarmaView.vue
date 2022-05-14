<template>
  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          name="Alarma"
          image="alarm"
          on = "Activado"
          off = "Desactivado"
          class="ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="align-center justify-center">
        <div style="max-width: 300px">
        <v-otp-input
            length="4"
            type="number"
        ></v-otp-input>
        </div>
        </v-row>
        <v-row
            class="my-10 align-center justify-center"
        >
        <btn-device
            image-off="icons/64/house_family-bw.png"
            image-on="icons/64/house_family-color.png"
        >
          Modo Casa
        </btn-device>
          <btn-device
              image-off="icons/64/house_heart-bw.png"
              image-on="icons/64/house_heart-color.png"
          >
            Modo Regular
          </btn-device>
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row no-gutters
             class="align-center justify-center">
        <div style="max-width: 300px">
          <v-otp-input
              length="4"
              type="number"
              plain
          ></v-otp-input>
        </div>
      </v-row>
        <v-row
            class="my-10 align-center justify-center"
        >
        <div style="max-width: 300px">
          <v-otp-input
              length="4"
              type="number"
              plain
          ></v-otp-input>
        </div>
      </v-row>
    </template>
  </device-generic>
</template>

<script>
import DeviceComponent from "@/components/deviceComponent";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "AlarmaView",
  components: {DeviceGeneric, BtnDevice ,DeviceComponent},
}
</script>

<style scoped>

</style>