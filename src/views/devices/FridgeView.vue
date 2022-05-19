<template>
  <device-generic>
    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          :name="$route.params.deviceId"
          :always-active="true"
          :loading="waitingForApi"
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
            :loading="waitingForApi"
            title="Temperatura Heladera (°C)"
            ref="fridgePosition"
            :max="8"
            :min="2"
            @change="temperatureFridgeStatus"
        />
      </v-row>
      <v-row class="justify-center">
        <btn-primary
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            :loading="waitingForApi"
            ref="btnSetFridgeTemperature"
            @click="callSetTemperature"
        >
          <v-card-text>
            Definir temperatura heladera
          </v-card-text>
        </btn-primary>
      </v-row>
      <v-row
          class="my-10 align-center justify-center"
      >
        <SliderMM
            :disabled="!deviceOn"
            :loading="waitingForApi"
            title="Temperatura Freezer (°C)"
            ref="freezerPosition"
            :max="-8"
            :min="-20"
            @change="temperatureFreezerStatus"
        />
      </v-row>
      <v-row class="justify-center">
        <btn-primary
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            :loading="waitingForApi"
            ref="btnSetFreezerTemperature"
            @click="callSetFreezerTemperature"
        >
          <v-card-text>
            Definir temperatura freezer
          </v-card-text>
        </btn-primary>
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
            :loading="waitingForApi"
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
            :loading="waitingForApi"
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
            :loading="waitingForApi"
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
import {mapActions, mapState} from "vuex";
import BtnPrimary from "@/components/buttons/Primary";

export default {
  name: "FridgeView",
  components: {BtnPrimary, HelpD, BtnDevice, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
    waitingForApi: true,
    intervalID: null,
    routePath: '',

    deviceOn: true,
    fridgePosition: 2,
    previousFridgePosition: 2,
    freezerPosition: -8,
    previousFreezerPosition: -8,
    fridge: {
      id: '',
      name: '',
      type: {
        id: '',
        name: '',
      },
    },
  }),

  mounted(){
    this.getAllDevices().then(this.getDeviceState);

    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllDevices().then(this.getDeviceState);
      if (!this.routePath || this.$route.path !== this.routePath) {
        clearInterval(this.intervalID);
      }
    }, 5000);
  },

  methods: {
    ...mapActions("fridge", {
      $modifyFridge: "modify",
      $setTemperatureFridge: "setTemperature",
      $setFreezerTemperatureFridge: "setFreezerTemperature",
      $setModeFridge: "setMode",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    getDeviceState(){
      this.fridge = this.devices.filter(e => e.id === this.$route.params.deviceId)[0];

      if(!this.fridge){
        return;
      }
      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);

        this.fridgePosition = this.fridge.state['temperature'];
        this.previousFridgePosition = this.fridgePosition;
        this.$refs.fridgePosition.setSliderValue(this.fridgePosition);

        this.freezerPosition = this.fridge.state['freezerTemperature'];
        this.previousFreezerPosition = this.freezerPosition;
        this.$refs.freezerPosition.setSliderValue(this.freezerPosition);
      } catch (e){
        console.error("Error while getting device state. Moving on anyway.", e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },

    setResult(result){
      this.result = JSON.stringify(result, null, 2);
    },
    async setTemperatureFridge(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$setTemperatureFridge([this.fridge, body]);
      }  catch (e) {
        this.setResult(e);
        console.error("Error opening door:", e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },
    callSetTemperature() {
      if (this.fridgePosition !== this.previousFridgePosition) {
        this.setTemperatureFridge([this.fridgePosition]);
      }

      this.previousFridgePosition = this.fridgePosition;
    },
    async setFreezerTemperatureFridge(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$setFreezerTemperatureFridge([this.fridge, body]);
      }  catch (e) {
        this.setResult(e);
        console.error("Error opening door:", e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },
    callSetFreezerTemperature(){
      if (this.freezerPosition !== this.previousFreezerPosition) {
        this.setFreezerTemperatureFridge([this.freezerPosition]);
      }
      this.previousFreezerPosition = this.freezerPosition;
    },
    async setModeFridge(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$setModeFridge([this.fridge, body]);
      }  catch (e) {
        this.setResult(e);
        console.error("Error opening door:", e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
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
    async getAllDevices(){
      try{
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
          console.error("Could not load devices due to: ", e);
      }
    },
  },

  computed:{
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },
}
</script>

<style scoped>

</style>
