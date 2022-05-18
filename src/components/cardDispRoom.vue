<template>
  <container-noutline
      title="[AMBIENTE]"
  >
    <v-row
        v-if="roomDevices && roomDevices.length > 0"
        class="align-center justify-space-around"
    >
        <template v-for="dev in this.roomDevices">
          <card-device
              :key="dev.id"
              :name="dev.name"
              :image="dev.meta.image"
              :state1="dev.state1"
              :state2="dev.state2"
              class="my-3 mx-1 pa-0"
          />
        </template>
    </v-row>

    <div v-else>
      <v-card-text
          class="d-flex flex-wrap align-center justify-center text-center text-body-1"
      >
        Todavía no agregaste ningún dispositivo.
      </v-card-text>
    </div>
  </container-noutline>
</template>


<script>

import ContainerNoutline from "@/components/containers/ContainerNoutline";
import CardDevice from "@/components/cardDevice";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "cardDispRoom",
  components: {CardDevice, ContainerNoutline},
  data() {
    return {
      roomDevices: [],
    }
  },
  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
    ...mapGetters("device", [
      "isInRoom",
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
    getRoomDevices() {
      if (!this.devices) {
        return;
      }
      this.roomDevices = this.isInRoom("6357316943e13c9c");
    },
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
        this.getRoomDevices();
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  }
}
</script>

<style scoped>

</style>