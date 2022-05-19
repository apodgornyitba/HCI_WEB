<template>
  <v-card
      outlined
      max-width="250"
      :class="classes"
  >
    <v-card-actions>
      <v-col>
        <btn-device
            :image-off="getState()"
            class="my-3 mx-1 pa-0"
            disable-border
            :path="`/${typeId}/${id}`"
        >
          {{ this.name }}
        </btn-device>
      </v-col>
      <v-col
          class="d-flex flex-column align-center justify-space-between fill-height"
          style="height: 130px;"
      >
        <v-row v-if="this.state['status']"
               class="align-center justify-center"
        >
          <b>{{ translate(this.state["status"]) }}</b>
        </v-row>
        <v-row v-if="this.state['temperature']"
               class="align-center justify-center"
        >
          <b>Temp.:</b> {{ this.state["temperature"] }}
        </v-row>
        <v-row v-if="this.state['lock']"
               class="align-center justify-center"
        >
          <b>{{ translate(this.state["lock"]) }}</b>
        </v-row>
        <v-row v-if="this.state['freezerTemperature']"
               class="align-center justify-center"
        >
          <b>Temp. freezer:</b> {{ this.state["freezerTemperature"] }}
        </v-row>
        <v-row v-if="this.state['mode']"
               class="align-center justify-center"
        >
          {{ translate(this.state["mode"]) }}
        </v-row>
        <v-row v-if="this.state['level']"
               class="align-center justify-center"
        >
          <b>Nivel:</b> {{ this.state["level"] }}%
        </v-row>
        <v-row v-if="this.state['volume']"
               class="align-center justify-center"
        >
          <b>Volumen:</b> {{ this.state["volume"] }}
        </v-row>
        <v-row v-if="this.state['genre']"
               class="align-center justify-center"
        >
          {{ this.state["genre"] }}
        </v-row>
        <v-row
            v-if="this.state['color']"
            class="align-center justify-center"
        >
          <b>Color:</b> <span>
          <v-sheet
              :color="'#' + this.state['color']"
              elevation="2"
              outlined
              height="18"
              width="18"
          />
        </span>
        </v-row>
        <v-row v-if="this.state['brightness']"
               class="align-center justify-center"
        >
          <b>Brillo:</b> {{ this.state["brightness"] }}%
        </v-row>
        <v-switch
            v-model="switchState"
            color="primary"
            inset
            hide-details
            readonly
            class="align-center justify-center"
        />
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import BtnDevice from "@/components/buttons/Device";
import {mapActions, mapState} from "vuex";

export default {

  name: "cardDevice",
  components: {BtnDevice},

  props: {
    'id': String,
    'typeId': String,
    'name': String,
    'image': String,
    'state': Object,
  },

  data() {
    return {
      waitingForApi: false,
      intervalID: null,
      routePath: '',

      switchState: false,

      spanishWords: {
        'active': 'Activo',
        'docked': 'En base',
        'inactive': 'Inactivo',
        'Vacuum': 'Aspiradora',
        'vacuum': 'Aspiradora',
        'opened': 'Abierto',
        'closed': 'Cerrado',
        'Stopped': 'Detenido',
        'stopped': 'Detenido',
        'closing': 'Cerrando',
        'on': 'Encendido',
        'turnOn': 'Encender',
        'turnOff': 'Apagar',
        'setColor': 'Establecer color',
        'setBrightness': 'Establecer brillo',
        'setVolume': 'Establecer volumen',
        'play': 'Reproducir',
        'stop': 'Detener',
        'pause': 'Pausar',
        'resume': 'Resumir',
        'nextSong': 'Siguiente canción',
        'previousSong': 'Canción anterior',
        'setGenre': 'Establecer género',
        'genre': 'Género',
        'getPlaylist': 'Obtener playlist',
        'open': 'Abrir',
        'close': 'Cerrar',
        'dispense': 'Dispensar',
        'quantity': 'Cantidad',
        'unit': 'Unidad',
        'setLevel': 'Establecer nivel',
        'level': 'Nivel',
        'color': 'Color',
        'brightness': 'Brillo',
        'setTemperature': 'Establecer temperatura',
        'temperature': 'Temperatura',
        'setHeat': 'Establecer calor',
        'heat': 'Calor',
        'conventional': 'Convencional',
        'bottom': 'Abajo',
        'top': 'Arriba',
        'setGrill': 'Establecer grill',
        'grill': 'Grill',
        'large': 'Convencional',
        'eco': 'Económico',
        'off': 'Apagado',
        'setConvection': 'Establecer convección',
        'convection': 'Convencional',
        'normal': 'Normal',
        'setMode': 'Establecer modo',
        'mode': 'Modo',
        'setVerticalSwing': 'Establecer desplazamiento de aspas verticales',
        'verticalSwing': 'Desplazamiento de aspas verticales',
        "auto": 'Automático',
        'setHorizontalSwing': 'Establecer desplazamiento de aspas horizontales',
        'horizontalSwing': 'Desplazamiento de aspas horizontales',
        'setFanSpeed': 'Establecer velocidad de ventilador',
        'fanSpeed': 'Velocidad de ventilador',
        'lock': 'Bloquear',
        'unlock': 'Desbloquear',
        'start': 'Iniciar',
        'dock': 'Regresar a base de carga',
        'setLocation': 'Cambiar ubicación de base de carga',
        'roomId': 'Habitación',
        'setFreezerTemperature': 'Establecer temperatura del freezer',
      },
    }
  },

  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),

    classes() {
      return {
        'card-device': true,
        'card-device--active': this.switchState,
      }
    }
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
    }, 5000);

  },

  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    translate(original) {
      if (!original) {
        return;
      }

      let word = '';
      if (original in this.spanishWords) {
        word = this.spanishWords[original];
      } else {
        word = original.charAt(0).toUpperCase() + original.slice(1).toLowerCase();
      }
      return word;
    },

    getState() {
      if (!this.image) {
        return '';
      }
      if (this.switchState) {
        return `icons/64/${this.image}-color.png`;
      }
      return `icons/64/${this.image}-bw.png`;
    },


    getDeviceState() {
      const device = this.devices.find(device => device.id === this.id);

      if (device) {
        this.waitingForApi = true;

        if (device.state.status) {
          switch (device.state.status) {
            case 'on':      /* Fallthrough */
            case 'opened':
            case 'open':
            case 'active':
            case 'playing':
              this.switchState = true;
              break;
            default:
              this.switchState = false;
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
  },
}
</script>

<style scoped>
.card-device.card-device--active {
  border: 3px solid var(--v-primary-darken1) !important;
}
</style>