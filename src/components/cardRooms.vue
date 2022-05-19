<template>
  <container-horizontal
      title="Ambientes"
  >
    <v-row
        v-if="rooms.length > 0"
        class="align-center justify-space-around"
    >
      <btn-device
          v-for="room in rooms"
          :key="room.id"
          :image-off="`icons/64/${room.meta.image}-bw.png`"
          :image-on="`icons/64/${room.meta.image}-color.png`"
          class="my-3 mx-1 pa-0"
          :path="`/roomScreen/${room.id}`"
      >
        {{ room.name }}
      </btn-device>
    </v-row>

    <div v-else>
      <v-card-text
          class="d-flex flex-wrap align-center justify-center text-center text-body-1"
      >
        Todavía no agregaste ningún ambiente.
      </v-card-text>
    </div>
  </container-horizontal>

</template>

<script>
import BtnDevice from "@/components/buttons/Device";
import ContainerHorizontal from "@/components/containers/ContainerHorizontal";
import {mapActions, mapState} from "vuex";

export default {
  name: "cardHomes",
  components: {
    BtnDevice,
    ContainerHorizontal
  },

  data: () =>({
    intervalID: null,
    routePath: '',
  }),

  computed: {
    ...mapState("room", {
      rooms: (state) => state.rooms,
      path: (state) => state.path,
    }),
  },

  mounted() {
    /* Llamada antes del loop */
    this.getAllRooms();

    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllRooms();
      if (!this.routePath || this.$route.path !== this.routePath) {
        clearInterval(this.intervalID);
      }
    }, 5000);
  },

  methods: {
    ...mapActions("room", {
      $getAllRooms: "getAll",
      $getRoomPath: "getRoomPath",
    }),

    /* API */
    async getAllRooms() {
      try {
        this.controller = new AbortController();
        await this.$getAllRooms(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load rooms due to: ", e);
      }
    },
  }
}
</script>

<style scoped>

</style>