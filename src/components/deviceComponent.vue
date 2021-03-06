<template>
  <v-container
      class="pa-4"
  >
    <v-row
        class="justify-center align-center mx-4"
    >
      <v-spacer/>
      <h2
          class="text-center"
      >
        {{ getDeviceNameById() }}
      </h2>

      <v-spacer/>

      <v-tooltip right>
        <template v-slot:activator="{on, attrs}">
          <v-btn
              @click="toggleFavorite"
              elevation="0"
              icon
              v-bind="attrs"
              v-on="on"
              style="color: black"
              :loading="loading || waitingForApi"
          >
            <v-icon
                v-if="!favorite"
                large
            >
              mdi-star-outline
            </v-icon>

            <v-icon
                v-else
                large
                style="color: #FDD835"
            >
              mdi-star
            </v-icon>
          </v-btn>
        </template>
        <span>Añadir a Favoritos</span>
      </v-tooltip>
    </v-row>
    <v-row
        class="align-center justify-center"
    >
      <v-img
          v-if="this.image"
          :src="getStateImage()"
          :max-height="getImageSize()['height']"
          :max-width="getImageSize()['width']"
          class="mt-3 mb-0 pa-0"
      />
    </v-row>

    <v-row
        class="align-center justify-space-around"
    >
      <h2> {{ getState() }} </h2>

      <v-switch
          v-if="showSwitch && !alwaysActive"

          ref="componentSwitch"

          v-model="active"

          hide-details
          color="primary"
          inset
          class="ma-0 pa-0"

          :readonly="loading || waitingForApi"
          :loading="loading || waitingForApi"

          @change="stateChange"
      >
      </v-switch>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "deviceComponent",

  props: {
    'name': String,
    'image': String,
    'on': String,
    'off': String,
    'alwaysActive': Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
    showSwitch: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      width: 400,
      height: 400,
      active: false,
      favorite: false,

      waitingForApi: false,
      intervalID: null,
      routePath: '',
    }
  },

  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },

  mounted() {
    /* Llamada antes del loop */
    this.getAllDevices().then(this.getDeviceState);

    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllDevices().then(this.getDeviceState);
      if (!this.routePath || this.$route.path !== this.routePath) {
        clearInterval(this.intervalID);
      }
    }, 10000);
  },

  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
      $modifyDevice: "modify",
    }),

    waitForExternalApi(value) {
      this.waitingForApi = value;
    },

    getDeviceNameById() {
      const device = this.devices.find(device => device.id === this.name);

      if (device) {
        return device.name;
      }

      return 'Dispositivo';
    },

    getImageSize() {
      const size = 0.5 * Math.min(this.height, this.width);
      return {
        'width': size,
        'height': size
      }
    },
    created() {
      if (this.$attrs['width']) {
        this.width = parseFloat(this.$attrs['width']);
      }
      if (this.$attrs['height']) {
        this.height = parseFloat(this.$attrs['height']);
      }
    },
    getStateImage() {
      if (!this.image) {
        return '';
      }

      if (this.active || this.alwaysActive) {
        return require(`@/assets/icons/256/${this.image}-color.png`);
      }
      return require(`@/assets/icons/256/${this.image}-bw.png`);
    },
    getState() {
      if (!this.image) {
        return '';
      }

      if (this.active || this.alwaysActive) {
        return (this.on) ? this.on : "Encendido";
      }
      return (this.off) ? this.off : "Apagado";
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      this.setDeviceAsFavorite();
    },
    stateChange(status) {
      this.$emit('change', status);
    },

    setStatus(status) {
      this.active = status;
    },

    getDeviceState() {
      const device = this.devices.find(device => device.id === this.name);

      if (device) {
        this.waitingForApi = true;
        this.favorite = device.meta.favorite;

        if (device.state.status) {
          switch (device.state.status) {
            case 'on':      /* Fallthrough */
            case 'opened':
            case 'open':
            case 'active':
            case 'playing':
              this.active = true;
              break;
            default:
              this.active = false;
              break;
          }
        }
        this.waitingForApi = false;
      }
    },

    /* API */
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load rooms due to: ", e);
      }
    },

    async setDeviceAsFavorite() {
      if (this.waitingForApi) {
        return;
      }

      let device = this.devices.find(device => device.id === this.name);

      device.meta.favorite = this.favorite;
      delete device['type'];
      delete device['state'];

      this.waitingForApi = true;
      try {
        this.controller = new AbortController();
        await this.$modifyDevice(device, this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load device due to: ", e);
      }

      this.waitingForApi = false;
    }
  },
}
</script>

<style scoped>

</style>