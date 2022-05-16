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
    </template>
  </device-generic>
</template>

<script>

import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import HelpD from "@/components/accesories/helpD";
import {mapState, mapActions} from "vuex";

export default {
  name: "PersianaView",
  components: {HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    blinds: {
      id: "eb5e87892a3dfd81",
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
    stateChange(active) {
      if(!active){
        this.closeBlinds();
      } else {
        this.openBlinds();
      }
      this.deviceOn = active;

      if (active === false) {
        this.$refs.sliderPosition.setSliderValue(0);
      } else {
        this.$refs.sliderPosition.setSliderValue(this.position);
      }
    },
    sliderStateChange(value) {
      if (value > 0) {
        this.$refs.devComponent.setStatus(true);
        this.position = this.$refs.sliderPosition.getValue();
      } else {
        this.$refs.devComponent.setStatus(false);
      }
    }
  },

}
</script>

<style>

</style>