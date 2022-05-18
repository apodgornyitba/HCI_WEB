<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name="Grifo"
          image="tap"
          on="Abierto"
          off="Cerrado"
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
        <btn-device
            :disabled="deviceOn"
            :disable-border="deviceOn"
            ref="btnDispensar"
            image-off="icons/64/tap_drop-bw.png"
            image-on="icons/64/tap_drop-color.png"
            @click="callDispense()"

        >
        DISPENSAR
        </btn-device>

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
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "GrifoView",
  components: {BtnDevice, HelpD, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    unidades: ['ml', 'cl', 'dl', 'l', 'dal', 'hl', 'kl' ],
    unit: 'l',
    //FIX: DEBE OBTENER UN GRIFO DE LAS LISTA DE LOS AGREGADOS
    faucet: {
      id: "665f29102a302fcd",
      name: "faucet1",
      type: {
        id: "dbrlsh7o5sn8ur4i",
        name: "faucet",
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

  computed: {
    ...mapState("faucet", {
      on_off: (state) => state.on_off,
      unitType: (state) => state.unitType,
    }),
  },

  methods: {
    ...mapActions("faucet", {
      $modifyFaucet: "modify",
      $openFaucet: "open",
      $closeFaucet: "close",
      $dispenseFaucet: "dispense",
    }),
    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async openFaucet() {
      try {
        await this.$openFaucet(this.faucet);
      } catch (e) {
        this.setResult(e);
      }
    },
    async closeFaucet() {
      try {
        await this.$closeFaucet(this.faucet);
      } catch (e) {
        this.setResult(e);
      }
    },
    async dispenseFaucet(body) {
      try {
        await this.$dispenseFaucet([this.faucet, body]);
      } catch (e) {
        this.setResult(e);
      }

    },
    callDispense(){
      this.dispenseFaucet([this.position, this.unit]);
      this.dispenseOn = true;
      this.stateChange(true);
      this.$refs.devComponent.setStatus(true);
    },
    stateChange(active) {
      if (!active) {
        this.closeFaucet();
        this.dispenseOn = false;
      } else if(!this.dispenseOn) {
        this.openFaucet();
      }
      this.deviceOn = active;

      if (active === false) {
        this.$refs.sliderPosition.setSliderValue(0);
      } else {
        this.$refs.sliderPosition.setSliderValue(this.position);
      }
    },
    /*sliderStateChange(value) {
      if (value > 0) {
        this.$refs.devComponent.setStatus(true);
        this.position = this.$refs.sliderPosition.getValue();
        this.deviceOn = true;
      } else {
        this.$refs.devComponent.setStatus(false);
        this.deviceOn = false;
      }
    } @change="sliderStateChange"*/
  },
}
</script>

<style scoped>

</style>