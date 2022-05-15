<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name="Puerta"
          image="door"
          on="Abierto"
          off="Cerrado"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row
          no-gutters
          class="align-center justify-end"
      >
        <v-col>
          <container-with-hint
              :hint="lockHint()"
          >
            <btn-device
                :disabled="deviceOn"
                ref="btnLockMode"
                image-off="icons/64/lock_closed-bw.png"
                image-on="icons/64/lock_closed-color.png"
                @click="clickLockMode"
            >
              Bloquear
            </btn-device>

            <btn-device
                :disabled="deviceOn"
                ref="btnUnlockMode"
                image-off="icons/64/lock_open-bw.png"
                image-on="icons/64/lock_open-color.png"
                @click="clickUnlockMode"
            >
              Desbloquear
            </btn-device>
          </container-with-hint>
        </v-col>
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
import ContainerWithHint from "@/components/accesories/ContainerWithHint";

export default {
  name: "PuertaView",
  components: {ContainerWithHint, HelpD, BtnDevice, DeviceGeneric, DeviceComponent},
  data: () => ({
    deviceOn: false,
    locked: true,
  }),
  methods: {
    stateChange(active) {
      if (this.locked) {
        if (active) {
          this.$refs.devComponent.setErrorStatus(true);
        } else {
          this.$refs.devComponent.setErrorStatus(false);
        }

        this.$refs.devComponent.setStatus(false);
      } else {
        this.$refs.devComponent.setErrorStatus(false);
        this.deviceOn = active;
      }
    },
    clickLockMode(isActive, e) {
      this.locked = true;

      this.$refs.btnUnlockMode.setActive(false, e);
    },
    clickUnlockMode(isActive, e) {
      this.locked = false;

      this.$refs.btnLockMode.setActive(false, e);
    },

    lockHint() {
      if (this.locked) {
        return "Desbloqueá la puerta para poder abrirla.";
      }
      return "";
    },
  }
}

</script>

<style scoped>

</style>