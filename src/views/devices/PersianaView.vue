<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          :name="$route.params.deviceId"
          image="curtain"
          on="Abierto"
          off="Cerrado"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>

      <v-row no-gutters
             class="align-center justify-center">
        <SliderMM
            ref="sliderPosition"
            title="Posicion"
            @change="sliderStateChange"
        />
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Elija en que posición abrir la persiana'"
        />
      </v-row>
      <v-row class="justify-center ">
        <btn-primary
            :disabled="deviceOn"
            :disable-border="deviceOn"
            ref="btnSetLevel"
            @click="callSetLevel"
        >
          <v-card-text>
          Definir nivel
          </v-card-text>
        </btn-primary>

      </v-row>
    </template>
  </device-generic>
</template>

<script>

import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import HelpD from "@/components/accesories/helpD";
import {mapState, mapActions} from "vuex";
import BtnPrimary from "@/components/buttons/Primary";

export default {
  name: "PersianaView",
  components: {BtnPrimary, HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    blinds: {
      id: '',
      name: '',
      type: {
        id:'',
        name: '',
        powerUsage: 350,
      },
    },
    result: null,
    controller: null,
    deviceOn: false,
    position: 0,
    previousPosition: 0,
  }),
  //FIX: guarda el state en la api pero no se me mantiene la parte visual --> el switch no se mantiene
  mounted() {
    this.getAllDevices().then(this.getDeviceState);
  },
  computed:{
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
    ...mapState("blinds", {
      on_off: (state) => state.on_off,
    }),
  },
  methods: {
    ...mapActions("blinds", {
      $modifyBlinds: "modify",
      $openBlinds: "open",
      $closeBlinds: "close",
      $setLevelBlinds: "setLevel",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    getDeviceState() {
      this.blinds = this.devices.filter(e => e.id === this.$route.params.deviceId)[0];

      this.position = this.blinds.state['level'];
      this.previousPosition = this.position;
      this.$refs.sliderPosition.setSliderValue(this.position);
    },

    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async openBlinds() {
      try {
        await this.$openBlinds(this.blinds)
      } catch (e) {
        this.setResult(e);
      }
    },
    async closeBlinds() {
      try {
        await this.$closeBlinds(this.blinds)
      } catch (e) {
        this.setResult(e);
      }
    },
    async setLevelBlinds(body) {
      try {
        await this.$setLevelBlinds([this.blinds, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetLevel() {
      if (this.position !== this.previousPosition) {
        this.setLevelBlinds([this.position]);
      }
      this.previousPosition = this.position;
    },
    stateChange(active) {
      if (!active) {
        this.closeBlinds();
      } else {
        this.openBlinds();
      }
      this.deviceOn = active;

      // if (active === false) {
      //   this.$refs.sliderPosition.setSliderValue(0);
      // } else {
      //   this.$refs.sliderPosition.setSliderValue(this.position);
      // }
    },
    sliderStateChange() {
      // if (value > 0) {
      //   this.$refs.devComponent.setStatus(true);
      this.position = this.$refs.sliderPosition.getValue();
      // } else {
      //   this.$refs.devComponent.setStatus(false);
      // }
    },
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  }
}
</script>

<style>

</style>