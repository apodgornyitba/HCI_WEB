<template>
  <v-container fluid>
    <floating-container>
      <help-button
          message="Se debe elegir el nombre de la rutina, el dispositivo a accionar y su accion."
      />
    </floating-container>

    <v-row class="ma-auto align-center text-center justify-center">
      <v-col cols="4">
        <v-card-text
            class="text-h1 text-center"
        >
          Crear una rutina
        </v-card-text>

        <v-text-field
            v-model="routine.name"
            :rules="[rules.required, rules.name]"

            label="Nombre de la rutina"
            hint="Introducí el nombre para la rutina"

            persistent-hint
            outlined
            clearable

            class="mx-1"

            @update:error="routineNameChangeError"
            @change="routineNameChange"
        />
      </v-col>
    </v-row>

    <v-row
        no-gutters
        class="mx-6 justify-center align-start"
    >
      <v-col
          v-if="!actions.show"
          cols="2"
      />

      <v-col
          cols="4"
          class="ma-0 pa-4"
      >
        <container-vertical
            :tabs="devices.tabs"
            hint="Elegí un dispositivo"
        >
          <template v-slot:tab-1>
            <v-card
                v-if="devicesFavorites"
                flat
                class="d-flex flex-wrap flex-row align-center justify-space-around"
            >
              <btn-device
                  v-for="item in devicesFavorites"
                  :key="item.id"

                  :ref="`btn-fav-${item.id}`"

                  :image-off="`icons/64/${item.meta.image}-bw.png`"
                  :image-on="`icons/64/${item.meta.image}-color.png`"

                  small
                  manually-disabled
                  :disable-border="false"

                  class="justify-center align-center"

                  @click="deviceButtonClick(item.id)"
              >
                {{ item.name }}
              </btn-device>
            </v-card>
            <v-card v-else>
              <v-card-text
                  class="d-flex flex-wrap align-center justify-center text-center text-body-1"
              >
                Todavía no agregaste ningún dispositivo como favorito.
              </v-card-text>
            </v-card>
          </template>


          <template v-slot:tab-2>
            <v-card
                v-if="devicesAll"
                flat
                class="d-flex flex-wrap flex-row align-center justify-space-around"
            >
              <btn-device
                  v-for="item in devicesAll"
                  :key="item.id"

                  :ref="`btn-all-${item.id}`"

                  :image-off="`icons/64/${item.meta.image}-bw.png`"
                  :image-on="`icons/64/${item.meta.image}-color.png`"

                  class="justify-center align-center"
                  small
                  manually-disabled
                  :disable-border="false"

                  @click="deviceButtonClick(item.id)"
              >
                {{ item.name }}
              </btn-device>
            </v-card>
            <v-card v-else>
              <v-card-text
                  class="d-flex flex-wrap align-center justify-center text-center text-body-1"
              >
                Todavía no agregaste ningún dispositivo.
              </v-card-text>
            </v-card>
          </template>
        </container-vertical>
      </v-col>

      <v-col
          v-if="!actions.show"
          cols="2"
      />

      <v-col
          v-if="actions.show"
          class="ma-0 pa-4"
      >
        <container-vertical
            :tabs="[{ id: 0, title:'Acciones', icon:'' }]"
            single-tab
            hint="Elegí una acción"
        >

          <v-card
              v-if="deviceTypes"
              flat
              class="d-flex flex-wrap flex-row align-center justify-space-around"
          >
            <btn-secondary
                v-for="item in actions.device.human"
                :key="item.idx"

                :height="48"

                class="justify-center align-center"

                @click="selectedActionHandler(item.idx, item)"
            >
              {{ item.name }}
            </btn-secondary>

            <div
                v-if="typeof(actions.selected.idx) === 'number'"
            >
              <v-row
                  v-for="param in actions.device.human.at(actions.selected.idx).params"
                  :key="param.idx"
                  class="mt-2 pa-2 px-3 align-center justify-center"
              >
                <SliderMM
                    v-if="isActionSlider(param)"

                    :ref="`param-${param.idx}`"
                    :max="parseInt(param.maxValue)"
                    :min="parseInt(param.minValue)"
                    :title="param.name"
                >
                </SliderMM>

                <v-select
                    v-else-if="isDropdown(param)"

                    :ref="`param-${param.idx}`"
                    v-model="actions.selected.dropValue"
                    :items="getDropdownItems(param)"
                    :label="param.name"
                />

                <v-card
                    v-else-if="isColor(param)"
                    outlined
                    flat
                >
                  <v-color-picker

                      :ref="`param-${param.idx}`"
                      v-model="actions.selected.colorValue"
                      dot-size="20"
                      hide-mode-switch
                  />
                </v-card>

                <v-card-text v-else>
                  ¡OH NO!
                  Esta acción todavía no está soportada.
                </v-card-text>

              </v-row>
              <v-row
                  class="my-2 pa-0 justify-center align-center"
              >
                <btn-tertiary
                    @click="storeAction"
                >
                  Agregar acción {{ actions.selected.human }}
                </btn-tertiary>
              </v-row>
            </div>
          </v-card>
          <v-row
              v-else
              no-gutters
          >
            <v-card-text
                class="text-center txt--text text-body-2"
            >
              Cargando...
            </v-card-text>
            <v-card/>
          </v-row>
        </container-vertical>
      </v-col>

      <v-col
          cols="4"
          class="ma-0 pa-4"
      >
        <container-vertical
            :tabs="[{ id: 0, title:'Rutina', icon:'' }]"
            :disabled="!this.routine.enabled"
            single-tab
        >
          <v-row
              v-if="routine.actions.length < 1"
              no-gutters
              class="align-center justify-center fill-height"
          >
            <v-card-text
                class="text-center txt--text text-body-2"
            >
              Todavía no agregaste ningún dispositivo.
            </v-card-text>
          </v-row>

          <v-virtual-scroll
              v-else
              bench="2"
              :items="getRoutineActions()"
              height="277"
              item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-row
                  no-gutters
                  class="align-center justify-space-around"
              >
                <v-list-item-action
                    v-if="routine.actions.length > 1"
                    class="mx-2 mr-1"
                >
                  <v-btn
                      depressed
                      fab
                      color="primary darken-1"
                      height="24"
                      width="24"
                      @click="moveUp(item.index)"
                  >
                    <v-icon>mdi-arrow-up-thick</v-icon>
                  </v-btn>
                </v-list-item-action>

                <v-list-item-action
                    v-if="routine.actions.length > 1"
                    class="mx-2 ml-1"
                >
                  <v-btn
                      depressed
                      fab
                      color="primary darken-1"
                      height="24"
                      width="24"
                      @click="moveDown(item.index)"
                  >
                    <v-icon>mdi-arrow-down-thick</v-icon>
                  </v-btn>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title
                      class="text-center"
                  >
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action
                    class="mx-2"
                >
                  <v-btn
                      depressed
                      fab
                      color="error"
                      height="24"
                      width="24"
                      @click="removeStoredAction(item.index)"
                  >
                    <v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-row>
            </template>
          </v-virtual-scroll>
        </container-vertical>
      </v-col>
    </v-row>

    <v-row
        class="my-2 mt-5 align-center text-center justify-center"
    >
      <container-with-hint
          :hint="confirmBtn.errorMsg"
          error-hint
      >
        <btn-primary
            :disabled="confirmButtonDisabled"
            :loading="confirmBtn.waitingApi"
            :color="confirmBtn.color"
            @click="createRoutine"
        >
          <v-icon v-if="confirmBtn.icon"> mdi-check-bold</v-icon>
          <div v-else> Crear</div>
        </btn-primary>
      </container-with-hint>
    </v-row>

    <v-row class="ma-auto align-center text-center justify-center">
      <btn-tertiary
          @click="$router.back()"
      >
        Cancelar
      </btn-tertiary>
    </v-row>
  </v-container>
</template>

<script>
import containerVertical from "@/components/containers/ContainerVertical";
import BtnPrimary from "@/components/buttons/Primary";
import BtnSecondary from "@/components/buttons/Secondary";
import BtnDevice from "@/components/buttons/Device";
import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/containers/FloatingContainer";
import BtnTertiary from "@/components/buttons/Tertiary";
import ContainerWithHint from "@/components/containers/ContainerWithHint";
import SliderMM from "@/components/accesories/SliderMM";

import {mapActions, mapState} from "vuex";
import {Routine, RoutineAction, RoutineMeta, RoutineActionMeta} from "@/api/routine";

export default {
  name: "RoutineCreationView",
  components: {
    SliderMM,
    ContainerWithHint,
    BtnTertiary, FloatingContainer, HelpButton, BtnDevice, BtnSecondary, BtnPrimary, containerVertical
  },
  data: () => ({
    validRoutineName: false,
    confirmBtn: {
      waitingApi: false,
      color: '',
      icon: false,
      errorMsg: '',
    },

    devices: {
      selected: {
        id: null,
        type: null,
      },
      tabs: [
        {id: 1, title: 'Favoritos', icon: 'mdGi-star', image: 'star'},
        {id: 2, title: 'Todos', icon: 'mdi-all-inclusive', image: 'all'},
      ],
    },

    actions: {
      show: false,
      selected: {
        name: '',
        human: '',
        idx: null,

        dropValue: null,
        colorValue: null,
      },
      device: {
        api: null,
        human: null,
      }
    },

    routine: {
      enabled: false,
      name: '',
      actions: [],
    },

    rules: {
      required: value => !!value || 'Este campo es obligatorio',
      name: value => {
        const msg = `El nombre debe contener entre 3 y 60 caracteres.
            Podés utilizar letras mayúsculas (A-Z) y minúsculas (a-z), números (0-9), espacios y guiones bajos (_)
            `

        const validCharsRegex = /^[ \w]{3,60}$/;

        if (value && !validCharsRegex.test(value)) {
          return msg;
        }

        return true;
      },
    },


    spanishWords: {
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
  }),

  computed: {
    ...mapState("device", {
      devicesAll: (state) => state.devices,
      devicesFavorites: (state) => state.favorites,
      deviceTypes: (state) => state.types,
    }),

    confirmButtonDisabled: function () {
      let disable = true;

      if (this.routine.actions.length > 0 && this.validRoutineName) {
        disable = false;
      }

      return disable == true;
    },
  },


  mounted() {
    this.getAllDevices();
    this.getAllDeviceTypes();
  },

  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
      $getAllTypes: "getAllTypes",
    }),
    ...mapActions("routine", {
      $createRoutine: "create",
    }),

    routineNameChange() {
      if (this.confirmBtn.color === 'error') {
        this.confirmBtn.color = '';
      }
    },
    routineNameChangeError(val) {
      if (!val) {
        this.validRoutineName = true;
      } else {
        this.validRoutineName = false;
      }
    },

    getDeviceNameById(id) {
      const device = this.devicesAll.find(device => device.id === id);

      if (device) {
        return device.name;
      }

      return 'Invalid device.';
    },

    getDeviceTypeById(id) {
      if (!id) {
        return null;
      }
      const device = this.devicesAll.find(dev => dev.id === id);

      if (!device) {
        return null;
      }

      return device.type.id;
    },

    getActionsByDeviceType(id) {
      const deviceType = this.deviceTypes.find(element => element.id === id);
      if (deviceType) {
        return deviceType.actions;
      }

      return [];
    },

    translateActionsToHuman(actions) {
      function translate(original, dictionary) {
        let word = '';

        if (original.name in dictionary) {
          word = dictionary[original.name];
        } else {
          word = original.name.charAt(0).toUpperCase() + original.name.slice(1).toLowerCase();
        }

        original.name = word;
        return original;
      }

      const translated = JSON.parse(JSON.stringify(actions))
          .map(e => translate(e, this.spanishWords));
      translated.forEach(action => {
        action.params.map(e => translate(e, this.spanishWords))
      });

      for (let i = 0; i < translated.length; i++) {
        translated[i]['idx'] = i;
        for (let j = 0; j < translated[i].params.length; j++) {
          translated[i]['params'][j]['idx'] = j;
        }
      }

      return translated;
    },

    cleanNotSelectedDeviceButtons(id) {
      for (const ref in this.$refs) {
        const split = ref.split('-');

        if (split[0] === 'btn' && split[2] !== id) {
          this.$refs[ref][0].setActive(false);
        }
      }
    },

    deviceButtonClick(id) {
      if (this.devices.selected.id && this.devices.selected.id === id) {
        this.devices.selected.id = null;
        this.devices.selected.type = null;

        this.actions.show = false;
        this.actions.device.api = null;
        this.actions.device.human = null;
        this.actions.selected.idx = null;
        this.actions.selected.human = null;
        this.actions.selected.name = null;
        this.actions.selected.paramsType = null;
      } else {
        const deviceType = this.getDeviceTypeById(id);

        this.cleanNotSelectedDeviceButtons(id);

        this.devices.selected.id = id;
        this.devices.selected.type = deviceType;

        this.actions.show = true;
        this.getActionsByDeviceType(deviceType);
        this.actions.device.api = this.getActionsByDeviceType(deviceType);
        this.actions.device.human = this.translateActionsToHuman(this.actions.device.api);
        this.$refs[`btn-all-${id}`][0].setActive(true);
      }
    },


    selectedActionHandler(idx, action) {
      this.actions.selected.idx = idx;
      this.actions.selected.name = this.actions.device.api.at(idx).name;
      this.actions.selected.human = action.name;
      this.actions.selected.dropValue = null;
      this.actions.selected.colorValue = null;

      this.routine.enabled = true;
    },

    isActionSlider(param) {
      if (param && param.type) {
        return param.type === 'number' || param.type === 'integer';
      }
      return false;
    },

    isDropdown(param) {
      if (param && param.type && param.supportedValues) {
        return param.type === 'string' && param.supportedValues;
      }
      return false;
    },

    isColor(param) {
      if (param && param.type && param.name) {
        return param.type === 'string' && param.name.toLowerCase() === 'color';
      }
      return false;
    },

    getDropdownItems(param) {
      return param.supportedValues;
    },

    isAction(item, action) {
      return (item.time === action.time
          && item.action === action.action
          && item.id === action.id);
    },
    storeAction() {
      let params = [];

      if (this.actions.device.human.at(this.actions.selected.idx).params.length) {
        for (const ref in this.$refs) {
          const split = ref.split('-');
          const param = this.actions.device.human.at(this.actions.selected.idx).params.at(split[1]);

          switch (split[0]) {
            case 'param':
              if (this.isActionSlider(param)) {
                params.push(this.$refs[ref][0].getValue());
              } else if (this.isDropdown(param)) {
                if (this.actions.selected.dropValue) {
                  params.push(this.actions.selected.dropValue);
                } else {
                  params.push(this.getDropdownItems[0]);
                }
              } else if (this.isColor(param)) {
                params.push(this.actions.selected.colorValue.hex.substring(1));
              }
              break;
            default:
              break;
          }
        }
      }

      const routineAction = new RoutineAction(
          {id: this.devices.selected.id},
          this.actions.selected.name,
          params,
          new RoutineActionMeta({name: this.actions.selected.human})
      );

      this.routine.actions.push(routineAction);
    },

    removeStoredAction(idx) {
      if (typeof (idx) !== 'number') {
        return;
      }

      this.routine.actions.splice(idx, 1);

      if (this.routine.actions.length === 0) {
        this.routine.enabled = false;
      }
    },


    getRoutineActions() {
      if (!this.routine.actions) {
        return [];
      }

      let humanActions = [];
      let i = 0;
      for (const action of this.routine.actions) {

        const deviceName = `${this.getDeviceNameById(this.devices.selected.id)}`;
        let actionString = '';

        if (action.params.join('').length === 0) {
          actionString = `${action.meta.human.name}`;
        } else if (action.meta.human.name.split(' ')[1] === 'color') {
          actionString = `${action.meta.human.name}`;
        } else {
          actionString = `${action.meta.human.name}: ${action.params.join(' ')} `;
        }


        humanActions.push({
          id: this.devices.selected.id,
          name: `${actionString} (${deviceName})`,
          index: i,
        });

        i += 1;
      }

      return humanActions;
    },

    moveUp(idx) {
      if (!idx) {
        return;
      }

      /* Don't move first element */
      if (idx === 0) {
        return;
      }

      const tmp = this.routine.actions[idx - 1];
      this.routine.actions.splice(idx - 1, 1, this.routine.actions[idx]);
      this.routine.actions.splice(idx, 1, tmp);
    },
    moveDown(idx) {
      if (!idx) {
        return;
      }

      /* Don't move last element */
      if (idx === this.routine.actions.length - 1) {
        return;
      }

      const tmp = this.routine.actions[idx + 1];
      this.routine.actions.splice(idx + 1, 1, this.routine.actions[idx]);
      this.routine.actions.splice(idx, 1, tmp);
    },

    async createRoutine() {
      if (this.confirmBtn.waitingApi || this.confirmBtn.color) {
        return;
      }

      const routine = new Routine(
          this.routine.name,
          this.routine.actions,
          new RoutineMeta()
      )

      this.confirmBtn.waitingApi = true;
      try {
        await this.$createRoutine(routine);

        setTimeout(() => this.$router.back(), 1000);

        this.confirmBtn.waitingApi = false;
        this.confirmBtn.color = 'info';
        this.confirmBtn.icon = true;
      } catch (e) {
        let errorMsg = '';

        this.confirmBtn.waitingApi = false;
        this.confirmBtn.color = 'error';
        this.confirmBtn.icon = false;

        switch (e.code) {
          case 1:
            if (e.description[0].toLowerCase().includes('name')) {
              errorMsg = `El nombre '${this.routine.name}' es inválido.`;
            } else if (e.description[0].toLowerCase().includes('actions')) {
              errorMsg = `Se debe ingresar al menos una acción.`;
            } else {
              errorMsg = `Se ha producido un error. Vuelva a intentarlo más tarde.'`;
            }
            break;
          case 2:
            errorMsg = `La rutina '${this.routine.name}' ya existe.`;
            break;
          default:
            errorMsg = `Se ha producido un error. Vuelva a intentarlo más tarde.'`;
            break;
        }

        this.confirmBtn.errorMsg = errorMsg;
      }
    },


    /* API */
    async getAllDeviceTypes() {
      try {
        this.controller = new AbortController();
        await this.$getAllTypes(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices types due to: ", e);
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