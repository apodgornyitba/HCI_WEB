<template>
  <device-generic>

    <template v-slot:left-pane>

      <device-component
        name="AC"
        image="ac"
        class="ma-auto align-center justify-center"
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
                      :items = "hor" >
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
                    :items = "ver" >
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
        />
        </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>

      <v-row
          no-gutters
          class="align-center justify-center"
      >
        <btn-device
            image-off="icons/64/fan-bw.png"
            image-on="icons/64/fan-color.png"
        >
          Ventilador
        </btn-device>

        <btn-device
            image-off="icons/64/snowflake-bw.png"
            image-on="icons/64/snowflake-color.png"
        >
          Frio
        </btn-device>

        <btn-device
            image-off="icons/64/fire-bw.png"
            image-on="icons/64/fire-color.png"
        >
          Calor
        </btn-device>
      </v-row>
        <v-row
            class="my-10 align-center justify-center"
        >
        <btn-device
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

export default {
  name: "ACView",
  components: {BtnDevice, SliderMM, DeviceComponent, DeviceGeneric},
  data: () => ({
    ver:['Automatico', '22º', '45º', '67º', '90º'   ],
    hor:['Automatico', '-90º', '-45º', '0', '45º', '90º'   ],
    state: "auto"
  }),
  methods:{
    toggleStatus(){
      console.log("toggle");
      switch (this.state) {
        case "auto":
          console.log("case auto");
          this.state = "25"
          break
        case "25":
          console.log("case 25");
          this.state = "50"
          break
        case "50":
          console.log("case 50");
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
    }
  }
}
</script>

<style scoped>

</style>