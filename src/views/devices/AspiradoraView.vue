<template>

  <device-generic>
    <template
        v-slot:left-pane
    >
      <device-component
          name="Aspiradora"
          image="vacuumcleaner_robot"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-container
          class="align-center justify-space-around"
      >

        <v-row
            class="my-10 align-center justify-center"
        >
          <v-btn-toggle
              mandatory
          >
            <v-btn :disabled="!deviceOn || !available">
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <v-btn :disabled="!deviceOn || !available">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-row>

        <v-row
            class="my-10  align-center justify-center"
        >
          <btn-device
              :disabled="!deviceOn"
              :disable-border="!deviceOn"
              ref="btnAspirarMode"
              image-off="icons/64/vacuumcleaner-bw.png"
              image-on="icons/64/vacuumcleaner-color.png"
              @click="clickAspirarMode"
          >
            Aspirar
          </btn-device>
          <btn-device
              :disabled="!deviceOn"
              :disable-border="!deviceOn"
              ref="btnTrapearMode"
              image-off="icons/64/broom-bw.png"
              image-on="icons/64/broom-color.png"
              @click="clickTrapearMode"
          >
            Trapear
          </btn-device>
          <btn-device
              ref="btnCargarMode"
              image-off="icons/64/chargingstation-bw.png"
              image-on="icons/64/chargingstation-color.png"
              manually-disabled
              @click="clickCargarMode"
          >
            Cargar
          </btn-device>
        </v-row>

      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Eliga el modo y el ambiente de trabajo, o decida donde poner a cargarla'"
        />
      </v-row>
      <v-container
          class="align-center justify-space-around"
      >
        <v-row
            class="my-10 align-center justify-center"
        >
          <v-card
              min-width="300"
          >
            <v-select label=" Elegir zona de trabajo "
                      :items="rooms"
                      :disabled="!deviceOn"
            >
            </v-select>
          </v-card>
        </v-row>

        <v-row
            class="my-10 align-center justify-center"
        >
          <v-card
              min-width="300"
          >
            <v-select label="Elegir zona de carga"
                      :items="rooms"
            >
            </v-select>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </device-generic>
</template>

<script>

import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";
import HelpD from "@/components/accesories/helpD";

export default {
  name: "AspiradoraView",
  components: {HelpD, DeviceGeneric, BtnDevice, DeviceComponent},
  data: () => ({
    rooms: [      /*LISTA DE HABITACIONES AGREGADAS*/],
    deviceOn: false,
    available: false,
  }),
  methods: {
    stateChange(active) {
      this.deviceOn = active;
    },
    clickTrapearMode(isActive, e) {
      this.$refs.btnCargarMode.setActive(false, e);
      this.$refs.btnAspirarMode.setActive(false, e);
      this.available = true;
    },
    clickAspirarMode(isActive, e) {
      this.$refs.btnTrapearMode.setActive(false, e);
      this.$refs.btnCargarMode.setActive(false, e);
      this.available = true;
    },
    clickCargarMode(isActive, e) {
      this.$refs.btnTrapearMode.setActive(false, e);
      this.$refs.btnAspirarMode.setActive(false, e);
      this.available = false;
    },
  },
}
</script>

<style scoped>

</style>