<template>

  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          name="Persiana"
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
      <v-container
          class="align-center justify-space-around"
      >
        <v-row class="my-10 align-center justify-center">
          <v-card
              min-width="250"
          >
            <v-list >
              <v-list-group
                  :value="false"
              >
                <template v-slot:activator>
                  <v-list-item-title> GÉNERO MUSICAL </v-list-item-title>
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
    Genres:[
      {title: 'Rock'},
      {title: 'Pop'},
      {title: 'Rap'},
      {title: 'Clasica'},
      {title: 'Reggaeton'},

    ],
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