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
                  :name = "this.roomsshow.name"
                :room="this.roomsshow"
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

export default {
  name: "roomScreenView",
  components: {FloatingContainer, cardDispRoom, HelpButton},
  props: {
    mypath: {
      type: String,
      require: true,
    }
  },
  data() {
    return {
      roomsshow: [],
    }
  },
  computed: {
    ...mapState("room", {
      rooms: (state) => state.rooms,
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
      this.roomsshow = this.rooms.find(path => path.name === this.mypath);
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

  }
}
</script>

<style scoped>
</style>