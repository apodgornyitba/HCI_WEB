<template>

  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          name="Parlante"
          image="speaker"
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
         <v-btn-toggle
             mandatory
         >
           <v-btn
               :disabled="!deviceOn"
               @click="previousSongSpeaker"
           >
             <v-icon>mdi-step-backward</v-icon>
           </v-btn >
           <v-btn
               :disabled="!deviceOn"
               @click="pauseSpeaker"
           >
             <v-icon>mdi-pause</v-icon>
           </v-btn>
           <v-btn
               :disabled="!deviceOn"
               @click="playSpeaker"
           >
             <v-icon>mdi-play</v-icon>
           </v-btn >
           <v-btn
               :disabled="!deviceOn"
               @click="stopSpeaker"
           >
             <v-icon>mdi-stop</v-icon>
           </v-btn>
           <v-btn
               :disabled="!deviceOn"
               @click="nextSongSpeaker"
           >
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
          :disabled="!deviceOn"
        />
      </v-row>
      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Decida a que volumen escuchar su gènero de música favorito'"
        />
      </v-row>
      <v-container
          class="align-center justify-space-around"
      >
        <v-row class="my-10 align-center justify-center">
          <v-card
              min-width="300"
          >
            <v-select label = "GÉNERO MUSICAL"
                      :items = "genres"
                      :disabled="!deviceOn">
            </v-select>
          </v-card>
        </v-row>
        <v-row
            class="my-10 align-center justify-center"
        >
          <v-card
              min-width="300"
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
                  <v-btn :disabled="!deviceOn"
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
import HelpD from "@/components/accesories/helpD";
import {mapActions} from "vuex";
export default {
  name: "ParlanteView",
  components: {HelpD, DeviceGeneric, SliderMM, DeviceComponent},

  data: () => ({
    songs: [
      {title: '', author: ''},
        //LISTA DE CANCIONES DE LA API
    ],
    genres: ['Rock', 'Pop',  'Rap', 'Clasica', 'Reggaeton' ],
      /*REVISAR SI LA LISTA ESTA EN L API*/
    speaker: {
      id: "90157d133d766e61",
      name: "my speaker",
      type: {
        id: "c89b94e8581855bc",
        name: "speaker",
        powerUsage: 20,
      },
    },
    deviceOn: false,
    result: null,
    controller: null,
  }),
  methods: {
    ...mapActions("speaker", {
      $modifySpeaker: "modify",
      $playSpeaker: "play",
      $pauseSpeaker: "pause",
      $stopSpeaker: "stop",
      $resumeSpeaker: "resume",
      $nextSongSpeaker: "nextSong",
      $previousSongSpeaker: "previousSong",
      $setVolumeSpeaker: "setVolume",
      $setGenreSpeaker: "setGenre",
      $getPlaylistSpeaker: "getPlaylist",

    }),
    setResult(result){
      this.result = JSON.stringify(result, null, 2);
    },
    async playSpeaker(){
      try{
        await this.$playSpeaker(this.speaker);
      } catch (e){
        this.setResult(e);
      }
    },
    async pauseSpeaker(){
      try{
        await this.$pauseSpeaker(this.speaker);
      } catch (e){
        this.setResult(e);
      }
    },
    async stopSpeaker(){
      try{
        await this.$stopSpeaker(this.speaker);
      } catch (e){
        this.setResult(e);
      }
    },
    async resumeSpeaker(){
      try{
        await this.$resumeSpeaker(this.speaker);
      } catch (e){
        this.setResult(e);
      }
    },
    async nextSongSpeaker(){
      try{
        await this.$nextSongSpeaker(this.speaker);
      } catch (e){
        this.setResult(e);
      }
    },
    async previousSongSpeaker(){
      try{
        await this.$previousSongSpeaker(this.speaker);
      } catch (e){
        this.setResult(e);
      }
    },
    stateChange(active) {
      this.deviceOn = active;
    },
  },
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