<template>

  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          :name="$route.params.deviceId"
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
            </v-btn>
            <v-btn
                :disabled="!deviceOn"
                @click="callPauseSpeaker"
            >
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <v-btn
                :disabled="!deviceOn"
                @click="callPlaySpeaker"
            >
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn
                :disabled="!deviceOn"
                @click="callStopSpeaker"
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
              ref="volume"
              :max="10"
              :disabled="!deviceOn"
              @change="volumeState"
          />
        </v-row>
        <v-row class="justify-center">
          <btn-device
              :disabled="!deviceOn"
              :disable-border="!deviceOn"
              ref="btnSetFreezerTemperature"
              @click="callSetVolume"
          >
            <v-icon>mdi-plus-thick</v-icon>
            DEFINIR VOLUMEN
          </btn-device>
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
            <v-select label="GÉNERO MUSICAL"
                      :items="genres"
                      v-model="genre"
                      :disabled="!deviceOn"
            >

            </v-select>
          </v-card>
        </v-row>
        <v-row class="justify-center ">
          <btn-device
              :disabled="!deviceOn"
              :disable-border="!deviceOn"
              ref="btnSetGenre"
              @click="callSetGenre"

          >
            <v-icon>mdi-plus-thick</v-icon>
            DEFINIR GENERO
          </btn-device>

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
                    <v-btn
                      disabled
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
import {mapActions, mapState} from "vuex";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "ParlanteView",
  components: {BtnDevice, HelpD, DeviceGeneric, SliderMM, DeviceComponent},

  data: () => ({
    genres: ['rock','pop','latina','classical','dance','country'],
    genre: 'pop',
    previosGenre: '',
    /*REVISAR SI LA LISTA ESTA EN L API*/
    speaker: {
      id: "48edaf31e54fb1e6",
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
    volume: 5,
    previousVolume: 5,
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
    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },
    async playSpeaker() {
      try {
        await this.$playSpeaker(this.speaker);
      } catch (e) {
        this.setResult(e);
      }
    },
    callPlaySpeaker() {
      if (this.speakerStatus === 'paused') {
        this.resumeSpeaker();
      } else if (this.speakerStatus === 'stopped') {
        this.playSpeaker();
      }
    },
    async pauseSpeaker() {
      try {
        await this.$pauseSpeaker(this.speaker);
      } catch (e) {
        this.setResult(e);
      }
    },
    callPauseSpeaker(){
      if(this.speakerStatus !== 'paused' && this.speakerStatus !== 'stopped'){
        this.pauseSpeaker();
      }
    },
    async stopSpeaker() {
      try {
        await this.$stopSpeaker(this.speaker);
      } catch (e) {
        this.setResult(e);
      }
    },
    callStopSpeaker(){
      if(this.speakerStatus !== 'stopped'){
        this.stopSpeaker();
      }
    },
    async resumeSpeaker() {
      try {
        await this.$resumeSpeaker(this.speaker);
      } catch (e) {
        this.setResult(e);
      }
    },
    async nextSongSpeaker() {
      try {
        await this.$nextSongSpeaker(this.speaker);
      } catch (e) {
        this.setResult(e);
      }
    },
    async previousSongSpeaker() {
      try {
        await this.$previousSongSpeaker(this.speaker);
      } catch (e) {
        this.setResult(e);
      }
    },
    async setVolumeSpeaker(body) {
      try {
        await this.$setVolumeSpeaker([this.speaker, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetVolume() {
      if (this.volume !== this.previousVolume) {
        this.setVolumeSpeaker([this.volume]);
      }
      this.previousVolume = this.volume;
    },
    async setGenreSpeaker(body) {
      try {
        await this.$setGenreSpeaker([this.speaker, body]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callSetGenre(){
      if(this.genre !== this.previousGenre) {
        this.setGenreSpeaker([this.genre]);
      }
      this.previousGenre = this.genre;
      setTimeout(() => this.callGetPlaylist(), 1000);
    },
    async getPlaylistSpeaker() {
      try {
        await this.$getPlaylistSpeaker([this.speaker, this.result]);
      } catch (e) {
        this.setResult(e);
      }
    },
    callGetPlaylist(){
      this.getPlaylistSpeaker();
    },
    stateChange(active) {
      this.deviceOn = active;
      this.callGetPlaylist();
    },
    volumeState() {
        this.volume = this.$refs.volume.getValue();
    }
  },
  computed: {
    ...mapState("speaker", {
      speakerStatus: (state) => state.speakerStatus,
      playlist: (state) => state.playlist,
    }),
    items() {
      return Array.from({length: this.playlist.length}, (_, i) => {
        const title = this.playlist[i].title
        const artist = this.playlist[i].artist
        const album = this.playlist[i].album;

        return {
          song: `${title} - ${ album } - ${artist}`,
        }
      })
    },
  },

}
</script>

<style>

</style>