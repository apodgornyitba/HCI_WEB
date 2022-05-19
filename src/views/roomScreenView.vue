<template>
  <div>
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
    <v-row
        no-gutters
        class="align-center justify-end"
    >
            <v-col v-if="rooms">
              <cardDispRoom
                  :name="this.name"
                  :roomid="this.roomid"
              />
            </v-col>
    </v-row>
  </div>
</template>

<script>

import cardDispRoom from "@/components/cardDispRoom";
import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/containers/FloatingContainer";
import {mapActions, mapState} from "vuex";
import {Room} from "@/api/room";

export default {
  name: "roomScreenView",
  components: {FloatingContainer, cardDispRoom, HelpButton},
  props: {
    mypath: {
      type: String,
      require: true,
    }
  },
  computed: {
    ...mapState("room", {
      rooms: (state) => state.rooms,
      path: (state) => state.path,
    }),
  },
  mounted() {
    this.getAllRooms();
  },
  methods: {
    ...mapActions("room", {
      $getAllRooms: "getAll",
    }),
    destination() {
      if (!this.rooms) {
        return;
      }
      let roomsshow = new Room();
      roomsshow = this.rooms.find(path => path.name === this.path);
      this.name = roomsshow.name.toString();
      console.log("name in destination: ", this.name);
      this.roomid = roomsshow.id.toString();
      console.log("id in destination: ", this.roomid);

    },
    async getAllRooms() {
      try {
        this.controller = new AbortController();
        await this.$getAllRooms(this.controller);
        this.controller = null;
        this.destination();
      } catch (e) {
        console.error("Could not load rooms due to: ", e);
      }
    },

  },
  data() {
    return {
      name: '',
      roomid: '',
    }
  },
}
</script>

<style scoped>
</style>