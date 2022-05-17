<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name="Persiana"
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
        <!--    CAMBIAR ICONO      -->
        <btn-device
            :disabled="deviceOn"
            :disable-border="deviceOn"
            ref="btnSetLevel"
            image-off="icons/64/tap_drop-bw.png"
            image-on="icons/64/tap_drop-color.png"
            @click="callSetLevel"
        >
          DEFINIR NIVEL
        </btn-device>

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
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "PersianaView",
  components: {BtnDevice, HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    //FIX: pasarle una cortina
    blinds: {
      id: "231fb6f6c7a8756c",
      name: "my blinds",
      type: {
        id: "eu0v2xgprrhhg41g",
        name : "blinds",
        powerUsage: 350,
      },
    },
    result: null,
    controller: null,
    deviceOn: false,
    position: 0,
  }),
  computed:{
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
    setResult(result){
      this.result = JSON.stringify(result, null, 2);
    },
    async openBlinds(){
      try{
        await this.$openBlinds(this.blinds)
      }catch (e){
        this.setResult(e);
      }
    },
    async closeBlinds(){
      try{
        await this.$closeBlinds(this.blinds)
      }catch (e){
        this.setResult(e);
      }
    },
    async setLevelBlinds(body){
      try{
        await this.$setLevelBlinds([this.blinds, body]);
      }catch (e){
        this.setResult(e);
      }
    },
    callSetLevel(){
      this.setLevelBlinds([this.position]);
    },
    stateChange(active) {
      if(!active){
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
    }
  },

}
</script>

<style>

</style>