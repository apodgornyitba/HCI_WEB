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
      <v-sele label = "  "
              :items = "items"
    </v-select>

        list >
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-title> Dir. Horizontal Aspas </v-list-item-title>
            </template>
            <v-list-item
                v-for="(angulo, index) in Hor"
                :key="index"
            >
              <v-list-item-action>
                <v-btn
                    text
                >
                  {{ angulo.title }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </list>
        </v-col>
          <v-col
              no-gutters
              class="align-center justify-center"
          >
        <v-list >
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-title> Dir. Vertical Aspas </v-list-item-title>
            </template>
            <v-list-item
                v-for="(angulo, index) in Ver"
                :key="index"
            >
              <v-list-item-action>
                <v-btn
                    text
                >
                  {{ angulo.title }}
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
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
    Ver:[
      {title: 'Automatico'},
      {title: '22º'},
      {title: '45º'},
      {title: '67º'},
      {title: '90º'},
],
Hor:[
      {title: 'Automatico'},
      {title: ,'-90º'},
      {title: '-45º'},
      {title: '0'},
      {title: '45º'},
      {title: '90º'},
    ],
    items: ['auto', '90'],
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