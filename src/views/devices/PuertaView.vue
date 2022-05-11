<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Puerta"
          image="door"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row
          no-gutters
          class="justify-center ma-10 pa-10"
      >
        <btn-device
            image-off="icons/64/lock-closed-bw.png"
            image-on="icons/64/lock-closed-color.png"
        >
          Bloquear
        </btn-device>

        <btn-device
            image-off="icons/64/lock-open-bw.png"
            image-on="icons/64/lock-open-color.png"
        >
          Desbloquear
        </btn-device>
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row
          no-gutters
          class="justify-center ma-10 pa-10"
      />
    </template>

  </device-generic>
</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "PuertaView",
  components: {BtnDevice, DeviceGeneric, DeviceComponent}

}
</script>

<style scoped>

</style>