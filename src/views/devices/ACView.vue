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
            ref="btnVentiladorMode"
            image-off="icons/64/fan-bw.png"
            image-on="icons/64/fan-color.png"
            @click="clickVentiladorMode"
        >
          Ventilador
        </btn-device>

        <btn-device
            :disabled="!deviceOn"
            ref="btnFrioMode"
            image-off="icons/64/snowflake-bw.png"
            image-on="icons/64/snowflake-color.png"
            @click="clickFrioMode"
        >
          Frio
        </btn-device>

        <btn-device
            :disabled="!deviceOn"
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
            :disabled="!deviceOn"
            @click="toggleStatus"
            :image-on="getState()"
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

export default {
  name: "ACView",
  components: {HelpD, BtnDevice, SliderMM, DeviceComponent, DeviceGeneric},
  data: () => ({
    ver:['Automatico', '22º', '45º', '67º', '90º'   ],
    hor:['Automatico', '-90º', '-45º', '0', '45º', '90º'   ],
    state: "auto",
    deviceOn: false,
  }),
  methods:{
    toggleStatus(){
      switch (this.state) {
        case "auto":
          this.state = "25"
          break
        case "25":
          this.state = "50"
          break
        case "50":
          this.state = "75"
          break
        case "75":
          this.state = "100"
          break
        case "100":
          this.state = "auto"
          break
      }

    },
    getState(){
      return `icons/64/fan_level_${ this.state }-color.png`
    },
    stateChange(active) {
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