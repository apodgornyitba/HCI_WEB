<template>
  <v-card
      outlined
      max-width="250"
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
      <v-col>
        <v-row v-if="this.state['status']">
          {{ translate(this.state["status"]) }}
        </v-row>
        <v-row v-if="this.state['temperature']">
          Temp.: {{ this.state["temperature"] }}
        </v-row>
        <v-row v-if="this.state['lock']">
          {{ translate(this.state["lock"]) }}
        </v-row>
        <v-row v-if="this.state['freezerTemperature']">
          Temp. freezer: {{ this.state["freezerTemperature"] }}
        </v-row>
        <v-row v-if="this.state['mode']">
          {{ translate(this.state["mode"]) }}
        </v-row>
        <v-row v-if="this.state['level']">
          Nivel: {{ this.state["level"] }}%
        </v-row>
        <v-row v-if="this.state['volume']">
          Volumen: {{ this.state["volume"] }}
        </v-row>
        <v-row v-if="this.state['genre']">
          {{ this.state["genre"] }}
        </v-row>
        <v-row
            v-if="this.state['color']"
        >
          Color: #{{ this.state["color"] }}
        </v-row>
        <v-row v-if="this.state['brightness']">
          Brillo: {{ this.state["brightness"] }}%
        </v-row>
        <v-switch
            v-model="switchState"
            color="primary"
            inset
        >
        </v-switch>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import BtnDevice from "@/components/buttons/Device";

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
        'lock': 'Bloquar',
        'unlock': 'Desbloquear',
        'start': 'Iniciar',
        'dock': 'Regresar a base de carga',
        'setLocation': 'Cambiar ubicación de base de carga',
        'roomId': 'Habitación',
        'setFreezerTemperature': 'Establecer temperatura del freezer',
      }


    }
  },

  methods: {
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
    }
  },
}
</script>

<style scoped>

</style>