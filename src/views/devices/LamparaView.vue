<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          name="Lampara"
          image="lamp"
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
             ref="sliderPosition"
         title="Intensidad"
         @change="sliderStateChange" />
      </v-row>
      </v-container>
    </template>

      <template v-slot:right-pane>
        <v-row class="justify-end mr-5">
          <help-d
              :message="'Eliga la intensidad y el color de la luz'"
          />
        </v-row>
        <v-row
            no-gutters
            class="align-center justify-center"
        >
          <v-container fluid>
            <v-row>
              <v-col
                  v-for="(color, index) in Color"
                  :key="index"
                  cols="3"
              >
                <v-card outlined tile max-width="58px">
                <v-btn
                    elevation="0"
                    :disabled="!deviceOn"
                    fab
                    tile
                    medium
                    @click="setColor( color.desc )"
                    :color = " color.desc "
                />
                </v-card>
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
import HelpD from "@/components/accesories/helpD";

export default {
  name: "LamparaView",
  components: {HelpD, SliderMM, DeviceGeneric, DeviceComponent},
  data: () => ({
    deviceOn: false,
    position: 0,
        Color: [
    { desc: 'blue-grey lighten-5' },
    { desc: 'grey lighten-5' },
    { desc: 'yellow lighten-4' },
    { desc: 'cyan lighten-5'},
    { desc: 'yellow lighten-2'},
    { desc: 'amber lighten-3'},
          { desc: 'white' },
          { desc: 'red lighten-5' }
    ],
    color: 'black'
  }),
  methods: {
    setColor(color) {
      this.color = color;
    },
    getColor() {
      if (!this.deviceOn)  {
        return 'black'
      }
      return this.color;
    },
    stateChange(active) {
      this.deviceOn = active;

      if (active === false) {
        this.$refs.sliderPosition.setSliderValue(0);
      } else {
        this.$refs.sliderPosition.setSliderValue(this.position);
      }
    },
    sliderStateChange(value) {
      if (value > 0) {
        this.$refs.devComponent.setStatus(true);
        this.position = this.$refs.sliderPosition.getValue();
        this.deviceOn = true;
      } else {
        this.$refs.devComponent.setStatus(false);
        this.deviceOn = false;
      }
    }
  },

}
</script>

<style scoped>

</style>