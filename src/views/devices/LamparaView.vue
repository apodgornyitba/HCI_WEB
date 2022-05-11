<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Lampara"
          image="lamp"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="justify-center ma-10 pa-0">
          <v-btn
              elevation="0"
              fab
              tile
              x-large
          />
          <!-- :color = "getColor()" FALTA IMPLEMENATAR -->
      </v-row>
      <v-row no-gutters
             class="ma-10 pa-0">

         <SliderMM
         title="Intensidad"/>

      </v-row>
    </template>

      <template v-slot:right-pane>
        <v-row
            no-gutters
            class="justify-center ma-10 pa-10"
        >
          <v-container fluid>
            <v-row>
              <v-col
                  v-for="(color, index) in Color"
                  :key="index"
                  cols="4"
              >
                <v-btn
                    elevation="0"
                    fab
                    tile
                    small
                    :color = " color.desc "
                />
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

export default {
  name: "LamparaView",
  components: {SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
        Color: [
    { desc: 'red' },
    { desc: 'yellow' },
    { desc: 'pink' },
    { desc: 'blue'},
    { desc: 'orange'},
    { desc: 'purple'}
    ],
  })
  /*methods: {
    getState() {
      if (!this.image) {
        return '';
      }

      if (this.switchState) {
        return `icons/64/${this.image}-color.png`;
      }
      return `icons/64/${this.image}-bw.png`;
    }
  },*/
}
</script>

<style scoped>

</style>