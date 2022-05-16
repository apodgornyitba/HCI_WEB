<template>
  <device-generic>
    <template v-slot:left-pane>
      <device-component
          name="Heladera"
          image="refrigerator"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row
          class="my-10 align-center justify-center"
      >
        <SliderMM
            :disabled="!deviceOn"
            title="Temperatura Heladera (°C)"
            :max="8"
            :min="2"
        />
      </v-row>
      <v-row
          class="my-10 align-center justify-center"
      >
        <SliderMM
            :disabled="!deviceOn"
            title="Temperatura Freezer (°C)"
            :max="-8"
            :min="-20"
        />
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row
          class="justify-end mr-5"
      >
        <help-d
            :message="'Setear la temperatura ideal para sus alimentos y el modo de la heladera'"
        />
      </v-row>
      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnPartyMode"
            image-off="icons/64/champagneglass-bw.png"
            image-on="icons/64/champagneglass-color.png"
            @click="clickPartyMode"
        >
          Fiesta
        </btn-device>

        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnNormalMode"
            image-off="icons/64/refrigerator_small-bw.png"
            image-on="icons/64/refrigerator_small-color.png"
            @click="clickNormalMode"
        >
          Normal
        </btn-device>

        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnVacationMode"
            image-off="icons/64/beach-bw.png"
            image-on="icons/64/beach-color.png"
            @click="clickVacationMode"
        >
          Vacaciones
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
import HelpD from "@/components/accesories/helpD";
import {mapActions} from "vuex";

export default {
  name: "FridgeView",
  components: {HelpD, BtnDevice, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
    deviceOn: false,
    fridge: {
      id: "d3bfbae3f6a5044e",
      name: "my fridge",
      type: {
        id: "rnizejqr2di0okho",
        name: "refrigerator",
        powerUsage: 90,
      },
    },
  }),
  methods: {
    ...mapActions("fridge", {
      $modifyFridge: "modify",
      $setTemperatureFridge: "setTemperature",
      $setFreezerTemperatureFridge: "setFreezerTemperature",
      $setModeFridge: "setMode",
    }),
    setResult(result){
      this.result = JSON.stringify(result, null, 2);
    },
    stateChange(active) {
      this.deviceOn = active;
    },
    clickPartyMode(isActive, e) {
      this.$refs.btnNormalMode.setActive(false, e);
      this.$refs.btnVacationMode.setActive(false, e);
    },
    clickNormalMode(isActive, e) {
      this.$refs.btnPartyMode.setActive(false, e);
      this.$refs.btnVacationMode.setActive(false, e);
    },
    clickVacationMode(isActive, e) {
      this.$refs.btnPartyMode.setActive(false, e);
      this.$refs.btnNormalMode.setActive(false, e);
    },
  },
}
</script>

<style scoped>

</style>
