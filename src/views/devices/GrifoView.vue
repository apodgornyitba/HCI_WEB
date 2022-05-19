<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          :name="$route.params.deviceId"
          :loading="waitingForApi"
          image="tap"
          on="Abierto"
          off="Cerrado"
          :grifo-dispense="dispenseOn"
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
          <v-card
              min-width="300"
          >
            <v-select label="Unidad"
                      v-model="unit"
                      :items="unidades"
                      :disabled="deviceOn"
            >
            </v-select>
          </v-card>
        </v-row>
        <v-row
            class="my-10  align-center justify-center"
        >
          <SliderMM
              ref="sliderPosition"
              title="Cantidad"
              :disabled="deviceOn"
              :loading="waitingForApi"
              @change="sliderStateChange"
          />
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Elija la intensidad con la que desa dispensar el agua'"
        />
      </v-row>
      <v-row class="justify-center ">
        <btn-primary
            :disabled="deviceOn"
            :disable-border="deviceOn"
            ref="btnDispensar"
            @click="callDispense()"

        >
          <v-card-text>
            DISPENSAR
          </v-card-text>
        </btn-primary>

      </v-row>
    </template>
  </device-generic>

</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceComponent from "@/components/deviceComponent";
import HelpD from "@/components/accesories/helpD";
import {mapState, mapActions} from "vuex";
import BtnPrimary from "@/components/buttons/Primary";

export default {
  name: "GrifoView",
  components: {BtnPrimary, HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    waitingForApi: true,
    intervalID: null,
    routePath: '',


    unidades: ['ml', 'cl', 'dl', 'l', 'dal', 'hl', 'kl'],
    unit: 'l',
    faucet: {
      id: '',
      name: '',
      type: {
        id: '',
        name: '',
        powerUsage: 15,
      },
    },
    result: null,
    controller: null,
    deviceOn: false,
    dispenseOn: false,
    body: null,
    position: 0,
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

  computed: {
    ...mapState("faucet", {
      on_off: (state) => state.on_off,
      unitType: (state) => state.unitType,
    }),
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },

  methods: {
    ...mapActions("faucet", {
      $modifyFaucet: "modify",
      $openFaucet: "open",
      $closeFaucet: "close",
      $dispenseFaucet: "dispense",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),
    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    getDeviceState() {
      this.faucet = this.devices.filter(e => e.id === this.$route.params.deviceId)[0];

      if (this.faucet) {
        this.waitingForApi = true;

        if (this.faucet.state['status'] === 'opened') {
          this.deviceOn = true;
          this.$refs.devComponent.setStatus(this.deviceOn);
          if (this.faucet.state['quantity']) {

            this.position = this.faucet.state['quantity'] - this.faucet.state['dispensedQuantity'];
            this.previousPosition = this.position;
            this.$refs.sliderPosition.setSliderValue(this.position);

            this.unit = this.faucet.state['unit'];
          }
        } else if (this.faucet.state['status'] === 'closed') {
          this.deviceOn = false;
          this.$refs.devComponent.setStatus(this.deviceOn);
        }
      }
      this.waitingForApi = false;
    },
    async openFaucet() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$openFaucet(this.faucet);
      } catch (e) {
        this.setResult(e);
      }

      this.$refs.devComponent.waitForExternalApi(false);
      this.waitingForApi = false;
    },

    async closeFaucet() {
      if (this.waitingForApi) {
        return;
      }
      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$closeFaucet(this.faucet);
      } catch (e) {
        this.setResult(e);
      }

      this.waitingForApi = false;
      this.$refs.devComponent.waitForExternalApi(false);
    },
    async dispenseFaucet(body) {
      if (this.waitingForApi) {
        return;
      }
      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$dispenseFaucet([this.faucet, body]);
      } catch (e) {
        this.setResult(e);
      }

      this.waitingForApi = false;
      this.$refs.devComponent.waitForExternalApi(false);
    },
    callDispense() {
      this.dispenseFaucet([this.position, this.unit]);
      this.dispenseOn = true;
      this.stateChange(true);
    },
    stateChange(active) {
      if (!active) {
        this.closeFaucet();
        this.dispenseOn = false;
      } else if (active && !this.dispenseOn) {
        this.openFaucet();
      }
      this.deviceOn = active;
    },
    sliderStateChange() {
      this.position = this.$refs.sliderPosition.getValue();
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
}
</script>

<style scoped>

</style>