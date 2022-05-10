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
            <v-container fluid>
              <v-row>
                <v-col
                    v-for="(color, index) in Color"
                    :key="index"
                    cols="4"
                >
                  <v-btn
                      outlined
                      tile
                      large
                      fab
                      elevation="0"
                      x-large
                      :color="color.desc"
                  >
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
   <SliderMM
   title="Intensidad"/>
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
    { desc: 'Red' },
    { desc: 'Yellow' },
    { desc: 'Pink' },
    { desc: 'Blue'}
      ],
  })
}
</script>

<style scoped>

</style>