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
             class="align-center justify-center">
        <v-sheet
            :color="getColor()"
            elevation="2"
            height="150"
            outlined
            shaped
            width="110"
        ></v-sheet>
      </v-row>
        <v-row
            class="my-10  align-center justify-center"
        >
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
                    @click="setColor( color.desc )"
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
    color: ''
  }),
  methods: {
    setColor(color) {
      this.color = color;
    },
    getColor() {
      return this.color;
    }
  },

}
</script>

<style scoped>

</style>