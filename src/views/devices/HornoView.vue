<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          :name="$route.params.deviceId"
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
                  <v-card>
                    <v-select label="Estado"
                              v-model="grillState"
                              :items="grillStatus"
                              :disabled="!deviceOn"
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
            @change="sliderStateChange"
        />
      </v-row>
      <v-row class="justify-center">
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnSetTemperature"
            @click="callSetTemperature"
        >
          <v-icon>mdi-thermometer-plus</v-icon>
          DEFINIR TEMPERATURA
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
  name: "HornoView",
  components: {HelpD, BtnDevice, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({

    grillStatus: ['eco', 'large', 'off' ],
    grillState: 'eco',
    previousGrill: 'eco',
    convectorStatus: ['eco', 'normal', 'off' ],
    convectorState: 'off',
    previousConvector: 'off',
    heatMode: 'conventional',
    deviceOn: false,
    position: 90,
    previousPosition: 90,
    modeOn1: false,
    modeOn2: false,
    switchState1: false,
    switchState2: false,
    oven: {
      id: "232e4e72736e42c4",
      name: "my oven",
      type: {
        id: "im77xxyulpegfmv8",
        name: "oven",
        powerUsage: 1225,
      },
    },
    result: null,
    controller: null,
  }),
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
    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async turnOnOven() {
      try {
        await this.$turnOnOven(this.oven);
      } catch (e) {
        this.setResult(e);
      }
    },
    async turnOffOven() {
      try {
        await this.$turnOffOven(this.oven);
      } catch (e) {
        this.setResult(e);
      }
    },
    async setTemperature(body) {
      try {
        await this.$setTemperatureOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetTemperature(){
      if(this.position !== this.previousPosition) {
        this.setTemperature([this.position]);
      }
      this.previousPosition = this.position;
    },
    async setHeat(body) {
      try {
        await this.$setHeatOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }
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
      try {
        await this.$setConvectionOven([this.oven, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetConvection(mode){
      this.setConvection([mode])
    },
    stateChange(active) {
      if (!active) {
        this.turnOffOven(this.oven);
      } else {
        this.turnOnOven(this.oven);
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
  },
}
</script>

<style scoped>

</style>