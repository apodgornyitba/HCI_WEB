<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Horno"
          image="oven"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-container
          class="align-center justify-space-around"
      >
        <v-row no-gutters
               class="align-center justify-center">
        <v-col no-gutters>
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnAbajoMode"
            image-off="icons/64/oven_mode_down-bw.png"
            image-on="icons/64/oven_mode_down-color.png"
            @click="clickAbajoMode"
        >
          Abajo
        </btn-device>
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnConvencionalMode"
            image-off="icons/64/oven_mode_common-bw.png"
            image-on="icons/64/oven_mode_common-color.png"
            @click="clickConvencionalMode"
        >
          Convencional
        </btn-device>
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnArribaMode"
            image-off="icons/64/oven_mode_up-bw.png"
            image-on="icons/64/oven_mode_up-color.png"
            @click="clickArribaMode"
        >
          Arriba
        </btn-device>
      </v-col>
      <v-col no-gutters>
        <v-card
            outlined
            max-width="250"
            style="margin-bottom: 50px"
        >
          <v-card-actions>
            <v-col>
              <btn-device
                  :disabled="!deviceOn"
                  :disable-border="!deviceOn"
                  ref="btnGrillMode"
                  image-off="icons/64/grill-bw.png"
                  image-on="icons/64/grill-color.png"
                  @click="clickGrillMode"
              >
                Grill
              </btn-device>
            </v-col>
            <v-col>
              <v-row>
              <p>{{ getState1() }}</p>
              </v-row>
              <v-switch
                  v-model="switchState1"
                  color="primary"
                  inset
                  :disabled="!modeOn1"
              >
              </v-switch>
            </v-col>
          </v-card-actions>
        </v-card>
        <v-card
            outlined
            max-width="250"
        >
          <v-card-actions >
            <v-col >
              <btn-device
                  :disabled="!deviceOn"
                  :disable-border="!deviceOn"
                  ref="btnConvectorMode"
                  image-off="icons/64/convector-bw.png"
                  image-on="icons/64/convector-color.png"
                  @click="clickConvectorMode"
              >
                Convector
              </btn-device>
            </v-col>
            <v-col>
              <v-row>
                <p>{{ getState2() }}</p>
              </v-row>
              <v-switch
                  v-model="switchState2"
                  color="primary"
                  inset
                  :disabled="!modeOn2"
              >
              </v-switch>
            </v-col>
          </v-card-actions>
        </v-card>
        </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5 mb-10">
        <help-d
            :message="'Utilize los botones para cambiar los distintos modos del horno y los switchs para utilizarlo con función económica o convencional'"
        />
      </v-row>
      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <SliderMM
            title="Temperatura (°C)"
            min = "90"
            max = "230"
            :disabled="!deviceOn"
        />
      </v-row>
    </template>


  </device-generic>
</template>

<script>

import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import BtnDevice from "@/components/buttons/Device";
import HelpD from "@/components/accesories/helpD";

export default {
  name: "HornoView",
  components: {HelpD, BtnDevice, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
    deviceOn: false,
    modeOn1: false,
    modeOn2: false,
    switchState1: false,
    switchState2: false,
  }),
  methods: {
    getState1() {
      if (this.switchState1) {
        return "Completo";
      }
      return "Económico";
    },
    getState2() {
      if (this.switchState2) {
        return "Convencional";
      }

      return "Económico";
    },
    stateChange(active) {
      this.deviceOn = active;
    },
    clickArribaMode(isActive, e) {
      this.$refs.btnAbajoMode.setActive(false, e);
      this.$refs.btnConvencionalMode.setActive(false, e);
    },
    clickAbajoMode(isActive, e) {
      this.$refs.btnArribaMode.setActive(false, e);
      this.$refs.btnConvencionalMode.setActive(false, e);
    },
    clickConvencionalMode(isActive, e) {
      this.$refs.btnArribaMode.setActive(false, e);
      this.$refs.btnAbajoMode.setActive(false, e);
    },
    clickGrillMode(isActive, e) {
      this.$refs.btnConvectorMode.setActive(false, e);
      this.modeOn1 = true;
      this.modeOn2 = false;
    },
    clickConvectorMode(isActive, e) {
      this.$refs.btnGrillMode.setActive(false, e);
      this.modeOn2 = true;
      this.modeOn1 = false;
    },
  },
}
</script>

<style scoped>

</style>