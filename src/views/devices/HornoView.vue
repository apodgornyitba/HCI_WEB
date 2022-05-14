<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Horno"
          image="oven"
          class="ma-auto align-center justify-center"
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
            image-off="icons/64/oven_mode_down-bw.png"
            image-on="icons/64/oven_mode_down-color.png"
        >
          Abajo
        </btn-device>
        <btn-device
            image-off="icons/64/oven_mode_common-bw.png"
            image-on="icons/64/oven_mode_common-color.png"
        >
          Convencional
        </btn-device>
        <btn-device
            image-off="icons/64/oven_mode_up-bw.png"
            image-on="icons/64/oven_mode_up-color.png"
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
                  image-off="icons/64/grill-bw.png"
                  image-on="icons/64/grill-color.png"
              >
                Grill
              </btn-device>
            </v-col>
            <v-col>
              <v-row>
              <p>{{ getState1() }}</p>
              </v-row>
              <v-switch
                  v-model="switchState1"
                  color="primary"
                  inset
              >
              </v-switch>
            </v-col>
          </v-card-actions>
        </v-card>
        <v-card
            outlined
            max-width="250"
        >
          <v-card-actions>
            <v-col >
              <btn-device
                  image-off="icons/64/convector-bw.png"
                  image-on="icons/64/convector-color.png"
              >
                Convector
              </btn-device>
            </v-col>
            <v-col>
              <v-row>
                <p>{{ getState2() }}</p>
              </v-row>
              <v-switch
                  v-model="switchState2"
                  color="primary"
                  inset
              >
              </v-switch>
            </v-col>
          </v-card-actions>
        </v-card>
        </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <SliderMM
            title="Temperatura (°C)"
            min = "90"
            max = "230"
        />
      </v-row>
    </template>


  </device-generic>
</template>

<script>

import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "HornoView",
  components: {BtnDevice, SliderMM, DeviceGeneric, DeviceComponent},
  data: function () {
    return {
      switchState1: false,
      switchState2: false
    }
  },
  methods: {
    getState1() {
      if (this.switchState1) {
        return "Completo";
      }
      return "Economico";
    },
    getState2() {
      if (this.switchState2) {
        return "Convencional";
      }

      return "Economico";
    }
  }
}
</script>

<style scoped>

</style>