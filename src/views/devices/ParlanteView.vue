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
      <v-container
          class="align-center justify-space-around"
      >
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
      </v-row>
        <v-row
            class="my-10  align-center justify-center"
        >
        <SliderMM
          title="Volumen"
          :max="10"
        />
      </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-container
          class="align-center justify-space-around"
      >
        <v-row class="my-10 align-center justify-center">
          <v-card
              min-width="300"
          >
            <v-select label = "GENERO MUSICAL"
                      :items = "genres" >
            </v-select>
          </v-card>
        </v-row>
        <v-row
            class="my-10 align-center justify-center"
        >
          <v-card
              min-width="250"
              outlined
          >
          <v-virtual-scroll
              :items="items"
              :item-height="50"
              height="240"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-list-item-action>
                  <v-btn
                      text
                  >
                    {{ item.song }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-virtual-scroll>
          </v-card>
        </v-row>
      </v-container>
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
    songs: [
      {title: '', author: ''},
        //LISTA DE CANCIONES DE LA API
    ],
    genres: ['Rock', 'Pop',  'Rap', 'Clasica', 'Reggaeton' ],
      /*REVISAR SI LA LISTA ESTA EN L API*/
  }),
  computed: {
    items () {
      return Array.from({ length: this.songs.length }, (_, i) => {
        const title = this.songs[i].title
        const author = this.songs[i].author

        return {
          song: `${title} - ${author}`,
        }
      })
    },
  }
}
</script>

<style>

</style>