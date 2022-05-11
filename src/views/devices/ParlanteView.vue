<template>

  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          name="Parlante"
          image="speaker"
          class="ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="align-center justify-center">
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
        <v-card>
         <v-list>
          <!-- LISTA DE REPRODUCCION IMPLEMENTADA A MEDIAS -->
           <v-list-item
               v-for="(song, index) in Songs "
               :key="index"
           >
            <v-list-item-action>
              <v-btn
                text
              >
                {{ song.title }} - {{ song.author }}
              </v-btn>

            </v-list-item-action>
           </v-list-item>
         </v-list>
        </v-card>

        <v-card
          min-width="180"
        >
          <v-list >
            <v-list-group
              :value="false"
            >
              <template v-slot:activator>
                <v-list-item-title> Géneros</v-list-item-title>
              </template>
              <v-list-item
                  v-for="(genre, index) in Genres"
                  :key="index"
              >
                <v-list-item-action>
                  <v-btn
                    text
                  >
                    {{ genre.title }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
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

  data: () => ({
    Songs: [
      { title: 'Cancion1', author: 'A' },
      { title: 'Cancion2', author: 'B' },
      { title: 'Cancion3', author: 'C' },
      { title: 'Cancion4', author: 'D' },
    ],
    Genres:[
      {title: 'Rock'},
      {title: 'Pop'},
      {title: 'Rap'},
      {title: 'Clasica'},
      {title: 'Reggaeton'},

    ],
  }),
}
</script>

<style>

</style>