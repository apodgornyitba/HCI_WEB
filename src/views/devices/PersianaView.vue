<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name="Parlante"
          image="speaker"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="justify-center ma-10 pa-0">
         <v-btn-toggle
             mandatory
         >
           <v-btn>
             <v-icon>mdi-step-backward</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-pause</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-play</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-stop</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-step-forward</v-icon>
           </v-btn>
         </v-btn-toggle>
        </v-row>
      <v-row>
        <SliderMM
          title="Volumen"
          max="10"
        />
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row
          no-gutters
          class="ma-10 pa-10"
      >

         <v-list >
          <!-- LISTA DE REPRODUCCION -->
         </v-list>
      </v-row>
        <v-row
            no-gutters
            class="ma-10 pa-10"
        >
          <v-list >
         <!-- LISTA DESPLEGABLE PARA CAMBIAR DE GENERO -->
          </v-list>
      </v-row>
    </template>
  </device-generic>
</template>

<script>

import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
export default {
  name: "ParlanteView",
  components: {DeviceGeneric, SliderMM, DeviceComponent},
}
</script>

<style>

</style>