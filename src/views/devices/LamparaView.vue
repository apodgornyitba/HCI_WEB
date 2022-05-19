<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          :name="$route.params.deviceId"
          :loading="waitingForApi"
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
          <container-with-hint
              hint="Color actual"
          >
            <v-sheet
                :color="getColor()"
                elevation="2"
                height="150"
                outlined
                shaped
                width="110"
            ></v-sheet>
          </container-with-hint>
        </v-row>
        <v-row
            class="my-10  align-center justify-center"
        >
          <SliderMM
              ref="sliderPosition"
              title="Intensidad"
              :loading="waitingForApi"
              @change="sliderStateChange"/>
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Elija la intensidad y el color de la luz'"
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
import ContainerWithHint from "@/components/containers/ContainerWithHint";

export default {
  name: "LamparaView",
  components: {ContainerWithHint, HelpD, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
    waitingForApi: false,
    intervalID: null,
    routePath: '',

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
    /* Llamada antes del loop */
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
    ...mapActions("lamp", {
      $modifyLamp: "modify",
      $turnOnLamp: "turnOn",
      $turnOffLamp: "turnOff",
      $setColorLamp: "setColor",
      $setBrightnessLamp: "setBrightness",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    getDeviceState() {
      this.lamp = this.devices.filter(e => e.id === this.$route.params.deviceId)[0];

      try {
        if (this.lamp) {
          this.waitingForApi = true;
          this.deviceOn = (this.lamp.state['status'] === 'on') ? true : false;

          this.color = '#' + this.lamp.state['color'];

          this.position = this.lamp.state['brightness'];
          this.previousPosition = this.position;

          if (this.deviceOn) {
            this.$refs.sliderPosition.setSliderValue(this.position);
          } else {
            this.$refs.sliderPosition.setSliderValue(0);
          }

          this.$refs.devComponent.setStatus(this.deviceOn);
        }
      } catch (e) {
        console.error("Error loading API information:", e);
      } finally {
        this.waitingForApi = false;
      }
      this.waitingForApi = false;
    },

    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async turnOnLamp() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$turnOnLamp(this.lamp)
      } catch (e) {
        this.setResult(e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },
    async turnOffLamp() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$turnOffLamp(this.lamp);
      } catch (e) {
        this.setResult(e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },
    async setColorLamp(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        await this.$setColorLamp([this.lamp, body]);
      } catch (e) {
        this.setResult(e);
      } finally {
        this.waitingForApi = false;
      }
    },
    setColor(color) {
      if (this.color !== color) {
        this.color = color;
        this.setColorLamp([this.color.substring(1)]);
      }
    },
    async setBrightnessLamp(body) {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        await this.$setBrightnessLamp([this.lamp, body]);
      } catch (e) {
        this.setResult(e);
      } finally {
        this.waitingForApi = false;
      }
    },

    callSetBrightness() {
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

        this.callSetBrightness();

        this.waitingForApi = false;
        this.turnOnLamp();
      } else {
        this.$refs.devComponent.setStatus(false);
        this.deviceOn = false;
        this.turnOffLamp();
      }
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
    ...mapState("lamp", {
      on_off: (state) => state.on_off,
    }),
  }
}
</script>

<style scoped>

</style>