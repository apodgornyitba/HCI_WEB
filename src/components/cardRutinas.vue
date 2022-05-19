<template>
  <container-vertical
      :tabs="this.tabs"
      class="ma-2 pa-0"
  >
    <template v-slot:tab-1>
      <v-card
          v-if="routines"
          flat
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <container-with-hint
            v-for="item in routines"
            :key="item.id"

            :hint="(item.id in routineButtons) ? routineButtons[item.id].hint : ''"
        >
          <btn-primary
              class="justify-center align-center"
              small
              :loading="(item.id in routineButtons) ? routineButtons[item.id].waitingApi : false"
              :color="(item.id in routineButtons) ? routineButtons[item.id].color : ''"
              @click="routineClickHandler(item.id)"
          >

            <v-icon v-if="(item.id in routineButtons) ? routineButtons[item.id].icon : ''"> mdi-check-bold
            </v-icon>
            <div v-else> {{ item.name }}</div>

          </btn-primary>
        </container-with-hint>
      </v-card>
      <v-card
          v-else
          flat
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <v-card-text
            class="d-flex flex-wrap align-center justify-center text-center text-body-1"
        >
          Todavía no agregaste ninguna rutina.
        </v-card-text>
      </v-card>
    </template>

    <template v-slot:tab-2>
      <v-card
          v-if="devices"
          flat
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <btn-device
            v-for="item in devices"
            :key="item.id"

            :ref="`btn-all-${item.id}`"
            :image-off="`icons/64/${item.meta.image}-bw.png`"
            :image-on="`icons/64/${item.meta.image}-color.png`"
            class="justify-center align-center"
            small
            :path="`/${item.type.id}/${item.id}`"
        >
          {{ item.name }}
        </btn-device>
      </v-card>
      <v-card
          v-else
          flat
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <v-card-text
            class="d-flex flex-wrap align-center justify-center text-center text-body-1"
        >
          Todavía no agregaste ningún dispositivo.
        </v-card-text>
      </v-card>
    </template>

    <template v-slot:tab-3>
      <v-img
          max-width="250px"
          :src="require(`@/assets/Codigo_QR.png`)"
          class="ma-auto"
      />
    </template>

  </container-vertical>
</template>

<script>
import ContainerVertical from "@/components/containers/ContainerVertical";
import BtnPrimary from "@/components/buttons/Primary";
import {mapActions, mapState} from "vuex";
import BtnDevice from "@/components/buttons/Device";
import ContainerWithHint from "@/components/containers/ContainerWithHint";

export default {
  name: "cardRutinas",
  components: {ContainerWithHint, BtnDevice, BtnPrimary, ContainerVertical},
  data() {
    return {
      intervalID: null,
      routePath: '',
      waitingForApi: false, /* For buttons */

      tabs: [
        {id: 1, title: 'Rutinas', icon: 'mdi-phone', image: 'spinclock'},
        {id: 2, title: 'Dispositivos', icon: 'mdi-heart', image: 'bulb_smart'},
        {id: 3, title: 'QR mi hogar', icon: 'mdi-qrcode'},
      ],

      routineButtons: {},
    }
  },

  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),

    ...mapState("routine", {
      routines: (state) => state.routines,
    }),
  },

  mounted() {
    /* Llamada antes del loop */
    this.getAllDevices().then(this.getDeviceState);
    this.getAllRoutines().then(this.populateRoutineButtons);

    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllDevices().then(this.getDeviceState);
      this.getAllRoutines().then(this.populateRoutineButtons);
      if (!this.routePath || this.$route.path !== this.routePath) {
        clearInterval(this.intervalID);
      }
    }, 5000);
  },

  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),
    ...mapActions("routine", {
      $getAllRoutines: "getAll",
      $executeRoutine: "execute",
    }),

    populateRoutineButtons() {
      if (!this.routines) {
        return;
      }

      for (const routineIdx in this.routines) {
        this.routineButtons[this.routines[routineIdx].id] = {
          waitingApi: false,
          color: '',
          icon: false,
          hint: '',
        }
      }
    },


    getDeviceState() {
      if (this.waitingForApi) {
        return;
      }

      for (const device of this.devices) {
        this.waitingForApi = true;

        if (device.state.status) {
          switch (device.state.status) {
            case 'on':      /* Fallthrough */
            case 'opened':
            case 'open':
            case 'active':
            case 'playing':
              this.$refs[`btn-all-${device.id}`][0].setActive(true);
              break;
            default:
              this.$refs[`btn-all-${device.id}`][0].setActive(false);
              break;
          }
        }
      }

      this.waitingForApi = false;
    },

    async routineClickHandler(id) {
      if (this.routineButtons[id].waitingApi || this.routineButtons[id].color) {
        return;
      }

      this.routineButtons[id].waitingApi = true;
      try {
        this.controller = new AbortController();
        await this.$executeRoutine([this.routines.find(e => e.id === id), this.controller]);
        this.controller = null;

        this.routineButtons[id].waitingApi = false;
        this.routineButtons[id].color = 'info';
        this.routineButtons[id].icon = true;

        setTimeout(() => {
          this.routineButtons[id].icon = false;
          this.routineButtons[id].color = '';
        }, 2000);

      } catch (e) {
        console.error("Error:", e);

        this.routineButtons[id].icon = false;
        this.routineButtons[id].color = 'red';
        this.routineButtons[id].hint = 'Se ha producido un error. Vuelva a intentarlo más tarde.';

        setTimeout(() => {
          this.routineButtons[id].icon = false;
          this.routineButtons[id].color = '';
        }, 2000);
      }

    },

    /* API */
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },

    async getAllRoutines() {
      try {
        this.controller = new AbortController();
        await this.$getAllRoutines(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load routines due to: ", e);
      }
    }
  }
}
</script>

<style scoped>

</style>
