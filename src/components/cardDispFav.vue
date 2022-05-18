<template>
  <container-horizontal
      title="Dispositivos Favoritos"
  >
    <div
        v-if="devices && devices.length > 0"
        class="d-flex flex-wrap flex-row align-center justify-space-around"
    >
    <template v-for="dev in this.devices">
      <btn-device
          :key="dev.id"
          :image-off="`icons/64/${dev.meta.image}-bw.png`"
          :image-on="`icons/64/${dev.meta.image}-color.png`"
          class="my-3 mx-1 pa-0"
      >
        {{ dev.name }}
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
  name: "cardDispFav",
  components: {
    BtnDevice,
    ContainerHorizontal
  },
  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },
  mounted() {
    this.getAllDevices();
  },
  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  }
  //FIX: TODOS LOS DIPOSITIVOS QUE TENGAN EL FLAG DE FAVORITOS
}
</script>

<style scoped>

</style>