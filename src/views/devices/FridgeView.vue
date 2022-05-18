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
            ref="fridgePosition"
            :max="8"
            :min="2"
            @change="temperatureFridgeStatus"
        />
      </v-row>
      <v-row class="justify-center">
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnSetFridgeTemperature"
            @click="callSetTemperature"
        >
          <v-icon>mdi-thermometer-plus</v-icon>
          DEFINIR TEMPERATURA HELADERA
        </btn-device>
      </v-row>
      <v-row
          class="my-10 align-center justify-center"
      >
        <SliderMM
            :disabled="!deviceOn"
            title="Temperatura Freezer (°C)"
            ref="freezerPosition"
            :max="-8"
            :min="-20"
            @change="temperatureFreezerStatus"
        />
      </v-row>
      <v-row class="justify-center">
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnSetFreezerTemperature"
            @click="callSetFreezerTemperature"
        >
          <v-icon>mdi-thermometer-plus</v-icon>
          DEFINIR TEMPERATURA FREEZER
        </btn-device>
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
    fridgePosition: 2,
    freezerPosition: -8,
    fridge: {
      id: "e82b46925d2bccdd",
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
    async setTemperatureFridge(body) {
      try {
        await this.$setTemperatureFridge([this.fridge, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetTemperature() {
      this.setTemperatureFridge([this.fridgePosition]);
    },
    async setFreezerTemperatureFridge(body) {
      try {
        await this.$setFreezerTemperatureFridge([this.fridge, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetFreezerTemperature(){
      this.setFreezerTemperatureFridge([this.freezerPosition]);
    },
    async setModeFridge(body) {
      try {
        await this.$setModeFridge([this.fridge, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetMode(mode){
      this.setModeFridge([mode]);
    },
    stateChange(active) {
      this.deviceOn = active;
    },
    temperatureFridgeStatus(){
      this.fridgePosition = this.$refs.fridgePosition.getValue();
    },
    temperatureFreezerStatus(){
      this.freezerPosition = this.$refs.freezerPosition.getValue();
    },
    clickPartyMode(isActive, e) {
      this.callSetMode('party');
      this.$refs.btnNormalMode.setActive(false, e);
      this.$refs.btnVacationMode.setActive(false, e);
    },
    clickNormalMode(isActive, e) {
      this.callSetMode('default');
      this.$refs.btnPartyMode.setActive(false, e);
      this.$refs.btnVacationMode.setActive(false, e);
    },
    clickVacationMode(isActive, e) {
      this.callSetMode('vacation');
      this.$refs.btnPartyMode.setActive(false, e);
      this.$refs.btnNormalMode.setActive(false, e);
    },
  },
}
</script>

<style scoped>

</style>
