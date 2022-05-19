<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name="Lampara"
          image="lamp"
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
          <v-sheet
              :color="getColor()"
              elevation="2"
              height="150"
              outlined
              shaped
              width="110"
          ></v-sheet>
        </v-row>
        <v-row
            class="my-10  align-center justify-center"
        >
          <SliderMM
              ref="sliderPosition"
              title="Intensidad"
              @change="sliderStateChange"/>
        </v-row>
        <v-row class="justify-center">
            <btn-device
                :disabled="!deviceOn"
                :disable-border="!deviceOn"
                ref="btnSetBrightness"
                @click="callSetBrightness"
            >
              <v-icon>mdi-plus-thick</v-icon>
              DEFINIR INTENSIDAD
            </btn-device>
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Eliga la intensidad y el color de la luz'"
        />
      </v-row>
      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <v-container fluid>
          <v-row>
            <v-col
                v-for="(color, index) in Color"
                :key="index"
                cols="3"
            >
              <v-card outlined tile max-width="58px">
                <v-btn
                    elevation="0"
                    :disabled="!deviceOn"
                    fab
                    tile
                    medium
                    @click="setColor( color.desc )"
                    :color=" color.desc "
                />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </template>
  </device-generic>

</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import HelpD from "@/components/accesories/helpD";
import {mapActions, mapState} from "vuex";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "LamparaView",
  components: { BtnDevice, HelpD, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
    deviceOn: false,
    position: 0,
    previousPosition: 0,
    Color: [
      {desc: '#ECEFF1'},
      {desc: '#FAFAFA'},
      {desc: '#FFF9C4'},
      {desc: '#E0F7FA'},
      {desc: '#FFF176'},
      {desc: '#FFE082'},
      {desc: '#FFFFFF'},
      {desc: '#FFEBEE'}
    ],
    color: '#000000',
    lamp: {
      id: "5f267650584de307",
      name: "my lamp",
      type: {
        id: "go46xmbqeomjrsjr",
        name: "lamp",
        powerUsage: 15,
      },
    },
    result: null,
    controller: null,
  }),
  methods: {
    ...mapActions("lamp", {
      $modifyLamp: "modify",
      $turnOnLamp: "turnOn",
      $turnOffLamp: "turnOff",
      $setColorLamp: "setColor",
      $setBrightnessLamp: "setBrightness",
    }),
    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async turnOnLamp() {
      try {
        await this.$turnOnLamp(this.lamp)
      } catch (e) {
        this.setResult(e);
      }
    },
    async turnOffLamp() {
      try {
        await this.$turnOffLamp(this.lamp);
      } catch (e) {
        this.setResult(e);
      }
    },
    async setColorLamp(body) {
      try {
        await this.$setColorLamp([this.lamp, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    setColor(color) {
      if(this.color !== color) {
        this.color = color;
        this.setColorLamp([this.color]);
      }
    },
    async setBrightnessLamp(body) {
      try {
        await this.$setBrightnessLamp([this.lamp, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetBrightness(){
      if (this.position !== this.previousPosition) {
        this.setBrightnessLamp([this.position]);
      }
      this.previousPosition = this.position;
    },
    getColor() {
      if (!this.deviceOn) {
        return '#000000'
      }
      return this.color;
    },
    stateChange(active) {
      if (!active) {
          this.turnOffLamp(this.lamp);

      } else {
          this.turnOnLamp(this.lamp);
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
        this.deviceOn = true;

        if (this.on_off === false) {
          this.turnOnLamp(this.lamp);
        }
      } else {
        this.$refs.devComponent.setStatus(false);
        this.deviceOn = false;
        if (this.on_off === true) {
          this.turnOffLamp(this.lamp);
        }
      }
    }
  },
  computed: {
    ...mapState("lamp", {
      on_off: (state) => state.on_off,
    }),
  }
}
</script>

<style scoped>

</style>