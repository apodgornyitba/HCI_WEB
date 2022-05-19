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

          :ref="`btn-room-${room.id}`"

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

  data: () => ({
    waitingForApi: false,
    intervalID: null,
    routePath: '',
  }),

  computed: {
    ...mapState("room", {
      rooms: (state) => state.rooms,
      path: (state) => state.path,
    }),
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },

  mounted() {
    /* Llamada antes del loop */
    this.getAllRooms()
        .then(this.getAllDevices)
        .then(this.getRoomState);

    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllRooms()
          .then(this.getAllDevices)
          .then(this.getRoomState);
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

    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),


    getDeviceState(roomId) {
      const devices = this.devices.filter(e => e.meta.room === roomId);

      for (const device of devices) {
        if (device.state.status) {
          switch (device.state.status) {
            case 'on':      /* Fallthrough */
            case 'opened':
            case 'open':
            case 'active':
            case 'playing':
              return true;
            default:
              break;
          }
        }
      }

      return false;
    },

    getRoomState() {
      if (this.waitingForApi) {
        return;
      }
      for (const room of this.rooms) {
        this.waitingForApi = true;

        try {
          const hasDeviceOn = this.getDeviceState(room.id);

          if (room.id && this.$refs[`btn-room-${room.id}`]
            && this.$refs[`btn-room-${room.id}`][0].setActive) {
            if (hasDeviceOn) {
              this.$refs[`btn-room-${room.id}`][0].setActive(true);
            } else {
              this.$refs[`btn-room-${room.id}`][0].setActive(false);
            }
          }
        } catch (e) {
          console.error("Se ha ignorado un error:", e);
        }
      }

      this.waitingForApi = false;
    },

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
}
</script>

<style scoped>

</style>