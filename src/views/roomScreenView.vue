<template>
  <div
      class="fill-height"
  >
    <floating-container>
      <div
          class="ma-1 pa-1"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                outlined
                style="color:black"
                large
                to="/modifyHome"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>Modificar hogar</span>
        </v-tooltip>
      </div>
      <help-button
          :message="'Se muestra el estado actual de los dipositivos del ambiente. Hacer click en un dispositivo para utilizarlo'"
          class="text-right"
      />
    </floating-container>

    <v-container>
      <v-row
          v-if="roomInformation.name"
          class="my-0 mx-auto align-center justify-center"
      >
        <h1>{{ roomInformation.name }}</h1>
      </v-row>
      <v-row
      v-if="roomInformation.image"
      class="mb-10 align-center justify-center"
      >
        <v-img
            :src="require(`@/assets/icons/128/${roomInformation.image}-color.png`)"
            max-width="64"
            max-height="64"
        />
      </v-row>

      <v-spacer/>

      <v-row
          v-if="roomInformation.devices"
          class="align-center justify-space-around"
      >
        <card-device
            v-for="device in roomInformation.devices"
            :key="device.id"
            :id="device.id"
            :typeId="device.type.id"
            :name="device.name"
            :image="device.meta.image"
            :state="device.state"
            class="my-3 mx-5 pa-0"
        />
      </v-row>

      <div v-else>
        <v-card-text
            class="d-flex flex-wrap align-center justify-center text-center text-body-1"
        >
          Todavía no agregaste ningún dispositivo.
        </v-card-text>
      </div>
    </v-container>
  </div>
</template>

<script>

import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/containers/FloatingContainer";
import CardDevice from "@/components/cardDevice";

import {mapActions, mapState} from "vuex";

export default {
  name: "roomScreenView",
  components: {CardDevice, FloatingContainer, HelpButton},
  props: {},

  data() {
    return {
      intervalID: null,
      routePath: '',

      roomInformation: {
        id: '',
        name: '',
        image: '',
        devices: [],
      },
    }
  },

  computed: {
    ...mapState("room", {
      rooms: (state) => state.rooms,
    }),
    ...mapState("device", {
      devices: (state) => state.devices,
    }),

  },
  mounted() {
    this.roomInformation.id = this.$route.params.roomId;

    /* Llamada antes del loop */
    this.getAllRooms();
    this.getAllDevices();
    this.getRoomName();
    this.getRoomImage();
    this.getRoomDevices();


    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllRooms();
      this.getAllDevices();
      this.getRoomName();
      this.getRoomImage();
      this.getRoomDevices();
      if (!this.routePath || this.$route.path !== this.routePath) {
        clearInterval(this.intervalID);
      }
    }, 5000);
  },

  methods: {
    ...mapActions("room", {
      $getAllRooms: "getAll",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    getRoomName() {
      if (!this.roomInformation.id) {
        return;
      }

      this.roomInformation.name = this.rooms.find(e => e.id === this.roomInformation.id).name;
    },


    getRoomImage() {
      if (!this.roomInformation.id) {
        return;
      }

      this.roomInformation.image = this.rooms.find(e => e.id === this.roomInformation.id).meta.image;
    },

    getRoomDevices() {
      if (!this.devices) {
        return;
      }
      this.roomInformation.devices = this.devices.filter((device) => {
        if (device.meta && device.meta.room) {
          if (device.meta.room === this.roomInformation.id) {
            return true;
          }
        }
        return false;
      });
    },

    async getAllRooms() {
      try {
        this.controller = new AbortController();
        await this.$getAllRooms(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load rooms due to: ", e);
      }
    },
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  },
}
</script>

<style scoped>
</style>