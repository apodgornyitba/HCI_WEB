<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Puerta"
          image="door"
          on = "Abierto"
          off = "Cerrado"
          class="ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
    <v-row
        no-gutters
        class="align-center justify-center"
    >
      <btn-device
          image-off="icons/64/lock_closed-bw.png"
          image-on="icons/64/lock_closed-color.png"
      >
        Bloquear
      </btn-device>

      <btn-device
          image-off="icons/64/lock_open-bw.png"
          image-on="icons/64/lock_open-color.png"
      >
        Desbloquear
      </btn-device>
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Para mayor seguridad bloquear la puerta después de cerrala'"
        />
      </v-row>
    </template>

  </device-generic>
</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";
import HelpD from "@/components/accesories/helpD";

export default {
  name: "PuertaView",
  components: {HelpD, BtnDevice, DeviceGeneric, DeviceComponent}

}

</script>

<style scoped>

</style>