<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          :name="$route.params.deviceId"
          :loading="waitingForApi"
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
                :loading="waitingForApi"
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
                :loading="waitingForApi"
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
                :loading="waitingForApi"
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
                      :loading="waitingForApi"
                      ref="btnGrillMode"
                      image-off="icons/64/grill-bw.png"
                      image-on="icons/64/grill-color.png"
                      @click="clickGrillMode"
                  >
                    Grill
                  </btn-device>
                </v-col>
                <v-col>
                  <v-card>
                    <v-select label="Estado"
                              v-model="grillState"
                              :items="grillStatus"
                              :disabled="!deviceOn"
                              :loading="waitingForApi"
                    >
                    </v-select>
                  </v-card>
                </v-col>
              </v-card-actions>
            </v-card>
            <v-card
                outlined
                max-width="250"
            >
              <v-card-actions>
                <v-col>
                  <btn-device
                      :disabled="!deviceOn"
                      :disable-border="!deviceOn"
                      :loading="waitingForApi"
                      ref="btnConvectorMode"
                      image-off="icons/64/convector-bw.png"
                      image-on="icons/64/convector-color.png"
                      @click="clickConvectorMode"
                  >
                    Convector
                  </btn-device>
                </v-col>
                <v-col>
                  <v-card>
                    <v-select label="Estado"
                              v-model="convectorState"
                              :items="convectorStatus"
                              :disabled="!deviceOn"
                              :loading="waitingForApi"
                    >
                    </v-select>
                  </v-card>
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
            ref="sliderPosition"
            :min="90"
            :max="230"
            :disabled="!deviceOn"
            :loading="waitingForApi"
            @change="sliderStateChange"
        />
      </v-row>
      <v-row class="justify-center">
        <btn-primary
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            :loading="waitingForApi"
            ref="btnSetTemperature"
            @click="callSetTemperature"
        >
          <v-card-text>
            Definir temperatura
          </v-card-text>
        </btn-primary>
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
  name: "HornoView",
  components: {BtnPrimary, HelpD, BtnDevice, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({

    waitingForApi: true,
    intervalID: null,
    routePath: '',

    grillStatus: ['eco', 'large', 'off' ],
    grillState: '',
    previousGrill: '',
    convectorStatus: ['eco', 'normal', 'off' ],
    convectorState: '',
    previousConvector: '',
    heatMode: '',
    deviceOn: false,
    position: 90,
    previousPosition: 90,
    oven: {
      id: '',
      name: '',
      type: {
        id: '',
        name: '',
      },
    },
    result: null,
    controller: null,
  }),

  mounted() {
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
    ...mapActions("oven", {
      $modifyOven: "modify",
      $turnOnOven: "turnOn",
      $turnOffOven: "turnOff",
      $setTemperatureOven: "setTemperature",
      $setHeatOven: "setHeat",
      $setGrillOven: "setGrill",
      $setConvectionOven: "setConvection",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    getDeviceState() {
      this.oven = this.devices.filter(e => e.id === this.$route.params.deviceId)[0];

      if(this.oven) {
        this.waitingForApi = true;

        this.position = this.oven.state['temperature'];
        this.previousPosition = this.position;
        this.$refs.sliderPosition.setSliderValue(this.position);

        this.grillState = this.oven.state['grill'];
        this.previousGrill = this.grillState;
        if (this.grillState === 'off') {
          this.$refs.btnGrillMode.setActive(false);
        } else if (this.grillState === 'eco' || this.grillState === 'large') {
          this.$refs.btnGrillMode.setActive(true);
        }

        this.convectorState = this.oven.state['convection'];
        this.previousConvector = this.convectorState;
        if (this.convectorState === 'off') {
          this.$refs.btnConvectorMode.setActive(false);
        } else if (this.convectorState === 'eco' || this.convectorState === 'normal') {
          this.$refs.btnConvectorMode.setActive(true);
        }

        this.heatMode = this.oven.state['heat'];

        if (this.heatMode === 'top') {
          this.$refs.btnArribaMode.setActive(true);
        } else if (this.heatMode === 'bottom') {
          this.$refs.btnAbajoMode.setActive(true);
        } else if (this.heatMode === 'conventional') {
          this.$refs.btnConvencionalMode.setActive(true);
        }

        if (this.oven.state['status'] === 'on') {
          this.deviceOn = true;
        } else if (this.oven.state['status'] === 'off') {
          this.deviceOn = false;
        }
      }
      this.waitingForApi = false;
    },

    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async turnOnOven() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$turnOnOven(this.oven);
      } catch (e) {
        this.setResult(e);
      }

      this.$refs.devComponent.waitForExternalApi(false);
      this.waitingForApi = false;
    },
    async turnOffOven() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$turnOffOven(this.oven);
      } catch (e) {
        this.setResult(e);
      }
      this.$refs.devComponent.waitForExternalApi(false);
      this.waitingForApi = false;
    },
    async setTemperature(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$setTemperatureOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }

      this.$refs.devComponent.waitForExternalApi(false);
      this.waitingForApi = false;
    },
    callSetTemperature(){
      if(this.position !== this.previousPosition) {
        this.setTemperature([this.position]);
      }
      this.previousPosition = this.position;
    },
    async setHeat(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$setHeatOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }
      this.$refs.devComponent.waitForExternalApi(false);
      this.waitingForApi = false;
    },
    callSetHeat(mode){
      this.setHeat([mode]);
    },
    async setGrill(body) {
      try {
        await this.$setGrillOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetGrill(mode){
      this.setGrill([mode]);
    },
    async setConvection(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$setConvectionOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }
      this.$refs.devComponent.waitForExternalApi(false);
      this.waitingForApi = false;
    },
    callSetConvection(mode){
      this.setConvection([mode])
    },
    stateChange(active) {
      if (!active) {
        this.turnOffOven(this.oven);
        this.$refs.devComponent.setStatus(false);
      } else {
        this.turnOnOven(this.oven);
        this.$refs.devComponent.setStatus(true);

      }
      this.deviceOn = active;
    },
    sliderStateChange() {
      this.position = this.$refs.sliderPosition.getValue();
    },
    clickArribaMode(isActive, e) {
      if(this.heatMode !== 'top') {
        this.callSetHeat('top');
        this.heatMode = 'top'
      }
      this.$refs.btnAbajoMode.setActive(false, e);
      this.$refs.btnConvencionalMode.setActive(false, e);
    },
    clickAbajoMode(isActive, e) {
      if(this.heatMode !== 'bottom') {
        this.callSetHeat('bottom');
        this.heatMode = 'bottom';
      }
      this.$refs.btnArribaMode.setActive(false, e);
      this.$refs.btnConvencionalMode.setActive(false, e);

    },
    clickConvencionalMode(isActive, e) {
      if(this.heatMode !== 'conventional') {
        this.callSetHeat('conventional');
        this.heatMode = 'conventional';
      }
      this.$refs.btnArribaMode.setActive(false, e);
      this.$refs.btnAbajoMode.setActive(false, e);

    },
    clickGrillMode() {
      if(this.grillState !== this.previousGrill) {
        this.callSetGrill(this.grillState);
      }
      this.previousGrill = this.grillState;
    },
    clickConvectorMode() {
      if(this.convectorState !== this.previousConvector) {
        this.callSetConvection(this.convectorState);
      }
      this.previousConvector = this.convectorState;
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
  },
  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
    ...mapState("oven", {
      on_off: (state) => state.on_off,
    }),
  }
}
</script>

<style scoped>

</style>