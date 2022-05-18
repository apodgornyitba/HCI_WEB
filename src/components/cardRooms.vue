<template>
  <container-horizontal
      title="Ambientes"
  >
    <div
        v-if="rooms.length > 0"
        class="d-flex flex-wrap flex-row align-center justify-space-around"
    >
    <template v-for="room in rooms">

      <btn-device
          :key="room.id"
          :image-off="`icons/64/${room.meta.image}-bw.png`"
          :image-on="`icons/64/${room.meta.image}-color.png`"
          class="my-3 mx-1 pa-0"
      >
        {{ room.name }}
      </btn-device>

    </template>
    </div>

    <div v-else>
      <v-card-text
          class="d-flex flex-wrap align-center justify-center text-center text-body-1"
      >
        Todavía no agregaste ningún dispositivo.
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