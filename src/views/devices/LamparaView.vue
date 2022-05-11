<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-col cols="2">
          <device-component
              name="Lampara"
              image="lamp"
          />
        </v-col>
        <v-col cols="3">
          <v-btn
              elevation="0"
              fab
              tile
              x-large
              :color = "getColor()"
          />
         <SliderMM
         title="Intensidad"/>
        </v-col>
        <v-col>
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
        </v-col>
  </v-main>
  </header-true-view>
  </v-app>
</template>

<script>
import DeviceComponent from "@/components/deviceComponent";
import HeaderTrueView from "@/views/headerTrueView";
import SliderMM from "@/components/accesories/SliderMM";

export default {
  name: "LamparaView",
  components: {SliderMM, DeviceComponent, HeaderTrueView},
  data: () => ({
        Color: [
    { desc: 'red' },
    { desc: 'yellow' },
    { desc: 'pink' },
    { desc: 'blue'},
    { desc: 'orange'},
    { desc: 'purple'}
    ],
  }),
  methods: {
    getState() {
      if (!this.image) {
        return '';
      }

      if (this.switchState) {
        return `icons/64/${this.image}-color.png`;
      }
      return `icons/64/${this.image}-bw.png`;
    }
  },
}
</script>

<style scoped>

</style>