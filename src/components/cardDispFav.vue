<template>
  <container-horizontal
      title="Dispositivos Favoritos"
  >
    <v-row
        v-if="favorites && favorites.length > 0"
        class="align-center justify-space-around"
    >
      <template v-for="dev in this.favorites">
        <btn-device
            :key="dev.id"
            :image-off="`icons/64/${dev.meta.image}-bw.png`"
            :image-on="`icons/64/${dev.meta.image}-color.png`"
            class="my-3 mx-1 pa-0"
        >
          {{ dev.name }}
        </btn-device>
      </template>
    </v-row>

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
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "cardDispFav",
  components: {
    BtnDevice,
    ContainerHorizontal
  },
  data() {
    return {
      favorites: [],
    }
  },
  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
    ...mapGetters("device", [
      "favoriteDevices",
    ]),
  },
  mounted() {
    this.getAllDevices();
  },
  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),


    /* API */
    getFavorites() {
      if (!this.devices) {
        return;
      }
      this.favorites = this.favoriteDevices;
    },
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;

        this.getFavorites();
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  }
}
</script>

<style scoped>

</style>