<template>
  <device-generic>

    <template v-slot:left-pane>

      <device-component
        name="AC"
        image="ac"
        class="ma-auto align-center justify-center"
        @change="stateChange"
      />

    </template>

    <template v-slot:middle-pane>
      <v-container
          class="align-center justify-space-around"
      >
      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <v-col
            no-gutters
            class="align-center justify-center"
        >
          <v-card
              max-width="300"
          >
            <v-select label = "Direccion horizontal de las aspas"
                      :items = "hor"
                      :disabled="!deviceOn">
            </v-select>
          </v-card>
          </v-col>
          <v-col
              no-gutters
              class="align-center justify-center"
          >
            <v-card
                max-width="300"
            >
          <v-select label = "Dirección vertical de las aspas"
                    :items = "ver"
                    :disabled="!deviceOn">
          </v-select>
          </v-card>
          </v-col>
      </v-row>
        <v-row
            class="align-center justify-center"
        >
        <SliderMM
            title="Temperatura (°C)"
            :max = "38"
            :min = "18"
            :disabled="!deviceOn"
        />
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>

      <v-row class="justify-end mr-5">
        <help-d
          :message="'Eliga la configuración ideal para su aire acondicionado'"
        />
      </v-row>

      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnVentiladorMode"
            image-off="icons/64/fan-bw.png"
            image-on="icons/64/fan-color.png"
            @click="clickVentiladorMode"
        >
          Ventilador
        </btn-device>

        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnFrioMode"
            image-off="icons/64/snowflake-bw.png"
            image-on="icons/64/snowflake-color.png"
            @click="clickFrioMode"
        >
          Frio
        </btn-device>

        <btn-device
            :disabled="!deviceOn"
            :disable-border="!deviceOn"
            ref="btnCalorMode"
            image-off="icons/64/fire-bw.png"
            image-on="icons/64/fire-color.png"
            @click="clickCalorMode"
        >
          Calor
        </btn-device>
      </v-row>
        <v-row
            class="my-10 align-center justify-center"
        >
        <btn-device
            ref="btnIntensity"
            :image-on="getState()"
            :disabled="!deviceOn"
            :disable-border="!deviceOn || state === 'auto'"
            manually-disabled
            @click="toggleStatus"
        >
          Intensidad
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
  name: "ACView",
  components: {HelpD, BtnDevice, SliderMM, DeviceComponent, DeviceGeneric},
  data: () => ({
    ver:['Automatico', '22º', '45º', '67º', '90º'   ],
    hor:['Automatico', '-90º', '-45º', '0', '45º', '90º'   ],
    state: "auto",
    deviceOn: false,
    ac: {
      id: "c6e21e5ab8d7ac28",
      name: "my ac",
      type: {
        id: "li6cbv5sdlatti0j",
        name: "ac",
        powerUsage: 1600,
      },
    },
    result: null,
    controller: null,
  }),
  methods:{
    ...mapActions("ac", {
      $modifyAC: "modify",
      $turnOnAC: "turnOn",
      $turnOffAC: "turnOff",
      $setTemperatureAC: "setTemperature",
      $setModeAC: "setMode",
      $setVerticalSwingAC: "setVerticalSwing",
      $setHorizontalSwingAC: "setHorizontalSwing",
      $setFanSpeedAC: "setFanSpeed",
    }),
    setResult(result){
      this.result = JSON.stringify(result, null, 2);
    },
    async turnOnAC(){
      try{
        await this.$turnOnAC(this.ac)
      }catch (e){
        this.setResult(e);
      }
    },
    async turnOffAC(){
      try{
        await this.$turnOffAC(this.ac)
      }catch (e){
        this.setResult(e);
      }
    },
    toggleStatus(){
      this.$refs.btnIntensity.setActive(true);

      switch (this.state) {
        case "auto":
          this.state = "25";
          break;
        case "25":
          this.state = "50";
          break;
        case "50":
          this.state = "75";
          break;
        case "75":
          this.state = "100";
          break;
        case "100":
          this.state = "auto";
          break;
        default:
          this.state = "auto";
      }
    },
    getState(){
      return `icons/64/fan_level_${ this.state }-color.png`
    },
    stateChange(active) {
      if(!active){
        this.turnOffAC(this.ac);
      }else{
        this.turnOnAC(this.ac);
      }
      this.deviceOn = active;
    },
    clickFrioMode(isActive, e) {
      this.$refs.btnCalorMode.setActive(false, e);
      this.$refs.btnVentiladorMode.setActive(false, e);
    },
    clickCalorMode(isActive, e) {
      this.$refs.btnFrioMode.setActive(false, e);
      this.$refs.btnVentiladorMode.setActive(false, e);
    },
    clickVentiladorMode(isActive, e) {
      this.$refs.btnFrioMode.setActive(false, e);
      this.$refs.btnCalorMode.setActive(false, e);
    },
  }
}
</script>

<style scoped>

</style>