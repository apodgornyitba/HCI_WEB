<template>
  <div>
    <floating-container>
      <help-button
          :message="'Seleccione los ambientes o dispositivos del hogar que desee modificar, o añada nuevos.'"
          class="text-right"
      />
    </floating-container>
    <v-row
      no-gutters
      class="my-2 mb-3 text-center align-center justify-center"
    >
      <h1>
        Modificar {{ this.houseName }}
      </h1>
    </v-row>
    <v-row no-gutters
           class="align-center justify-end">

      <container-vertical
          :tabs="tabs"
          @change="tabChangeHandler"
      >
        <template v-slot:tab-1>
          <div
              v-if="rooms.length > 0"
              class="d-flex flex-wrap flex-row align-center justify-space-around"
          >
            <template
                v-for="(r, idx) in rooms"
            >
              <v-radio-group v-model="selected"
                             :key="idx"
                             dense
                             row
                             class="ma-2"
              >
                <card-add-device
                    :key="r.id"
                    :ref="`btn-${r.id}`"
                    :name="r.name"
                    :image="r.meta.image"
                    @click="roomButtonClickHandler(r.id, $event)"
                />
                <v-radio
                    :ref="`radio-${r.id}`"
                    color="primary"
                    :value="r.id"
                    @click="radioButtonClickHandler(r.id, $event)"
                />
              </v-radio-group>
            </template>
          </div>

          <div v-else>
            <v-card-text
                class="d-flex flex-wrap align-center justify-center text-center text-body-1"
            >
              Todavía no agregaste ninguna habitación.
            </v-card-text>
          </div>
        </template>

        <template v-slot:tab-2>
          <div
              v-if="devices && devices.length > 0"
              class="d-flex flex-wrap flex-row align-center justify-space-around"
          >
            <template
                v-for="(r, idx) in devices"
            >
              <v-radio-group v-model="selected"
                             :key="idx"
                             dense
                             row
                             class="ma-2"
              >
                <card-add-device
                    :key="r.id"
                    :ref="`btn-${r.id}`"
                    :name="r.name"
                    :image="r.meta.image"
                    @click="roomButtonClickHandler(r.id, $event)"
                />
                <v-radio
                    :ref="`radio-${r.id}`"
                    color="primary"
                    :value="r.id"
                    @click="radioButtonClickHandler(r.id, $event)"
                />
              </v-radio-group>
            </template>
          </div>

          <div v-else>
            <v-card-text
                class="d-flex flex-wrap align-center justify-center text-center text-body-1"
            >
              Todavía no agregaste ningún dispositivo.
            </v-card-text>
          </div>
        </template>
      </container-vertical>
    </v-row>

    <v-row
        class="my-2 mt-5 flex-row-reverse align-center justify-space-around"
    >

      <v-dialog
          v-model="deleteButton.dialog"
          persistent
          max-width="350"
      >
        <template v-slot:activator="{on, attrs}">
          <btn-secondary
              v-on="on"
              v-bind="attrs"
              :disabled="!selected"
              :loading="deleteButton.dialog"
          >
            <div class="d-flex flex-column align-center justify-center">
              <v-icon>mdi-trash-can-outline</v-icon>
              <div class="mt-2">{{ deleteButton.text }}</div>
            </div>
          </btn-secondary>
        </template>

        <v-card>
          <v-card-title>
            Eliminar {{ getSelectedPretty() }}
          </v-card-title>
          <v-card-text class="text-body-1">
            <p>
              ¿Está seguro que desea eliminar "{{ getSelectedPretty() }}"?
            </p>
            <p>
              Esta acción es permanente.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="red darken-1"
                text
                :disabled="deleteButton.waitingApi"
                @click="deleteButton.dialog = false"
            >
              Cancelar
            </v-btn>
            <v-spacer/>
            <v-btn
                color="green darken-1"
                text
                :loading="deleteButton.waitingApi"
                @click="deleteButtonClickHandler"
            >Confirmar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <container-with-hint
          error-hint
      >
        <btn-primary
            class="mx-15"
            @click="addClickHandler"
        >
          <div class="d-flex flex-column align-center justify-center">
            <v-icon>mdi-plus</v-icon>
            <div class="mt-2">{{ addButton.text }}</div>
          </div>
        </btn-primary>
      </container-with-hint>


      <btn-secondary
          :disabled="!selected"
          @click="editButtonClickHandler"
      >
        <div class="d-flex flex-column align-center justify-center">
          <v-icon>mdi-pencil</v-icon>
          <div class="mt-2">{{ editButton.text }}</div>
        </div>
      </btn-secondary>

    </v-row>

    <v-row
        class="align-center justify-center"
    >
      <btn-tertiary
          @click="$router.back()"
      >
        Volver
      </btn-tertiary>
    </v-row>
  </div>
</template>

<script>
import HelpButton from "@/components/accesories/helpButton";
import ContainerVertical from "@/components/containers/ContainerVertical";
import FloatingContainer from "@/components/containers/FloatingContainer";
import CardAddDevice from "@/components/cardAddDevice";
import BtnPrimary from "@/components/buttons/Primary";
import BtnTertiary from "@/components/buttons/Tertiary";
import BtnSecondary from "@/components/buttons/Secondary";
import ContainerWithHint from "@/components/containers/ContainerWithHint";

import {mapActions, mapState} from "vuex";
/*
import {Room} from "@/api/room";
*/

export default {
  name: "modifyHomeView",
  components: {
    ContainerWithHint,
    BtnSecondary, BtnTertiary, BtnPrimary, CardAddDevice, FloatingContainer, ContainerVertical, HelpButton
  },

  data: () => ({
    selected: null,
    controller: null,

    currentTab: 1,

    editButton: {
      text: '',
      waitingApi: false,
      color: '',
      errorMsg: '',
    },
    addButton: {
      text: '',
    },
    deleteButton: {
      text: '',
      dialog: false,
      waitingApi: false,
      color: '',
      errorMsg: '',
    },

    tabs: [
      {id: 1, title: 'Habitaciones', icon: 'mdi-heart', image: 'bed_small'},
      {id: 2, title: 'Dispositivos', icon: 'mdi-heart', image: 'bulb_smart'},

    ],
    houseName: 'MI HOGAR', /* TODO: Al cambiar de pantalla agregar nombre del hogar */
  }),

  computed: {
    ...mapState("room", {
      rooms: (state) => state.rooms,
    }),
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },

  mounted() {
    this.getAllRooms();
    this.getAllDevices();
  },

  methods: {
    ...mapActions("room", {
      $deleteRoom: "delete",
      $getAllRooms: "getAll",
    }),
    ...mapActions("device", {
      $deleteDevice: "delete",
      $getAllDevices: "getAll",
    }),

    setSelectedRoom(roomId) {
      if (this.selected) {
        for (const ref in this.$refs) {
          const split = ref.split('-');

          if (split[1] !== roomId) {
            switch (split[0]) {
              case 'btn':
                this.$refs[ref][0].setActive(false);
                break;
              case 'radio':
                this.$refs[ref][0].isActive = false;
                break;
              default:
                break;
            }
          }
        }
      }

      this.selected = roomId;
    },

    roomButtonClickHandler(id) {
      this.setSelectedRoom(id);
      this.$refs[`radio-${this.selected}`][0].isActive = true;
    },

    radioButtonClickHandler(id) {
      this.setSelectedRoom(id);
      this.$refs[`btn-${this.selected}`][0].setActive(true);
    },

    tabChangeHandler(tab) {
      const tabIdx = parseInt(tab.split('-')[1]);

      this.currentTab = tabIdx;
      switch (this.currentTab) {
        case 1:
          this.editButton.text = 'Editar habitación seleccionada';
          this.addButton.text = 'Añadir habitación';
          this.deleteButton.text = 'Eliminar habitación seleccionada';
          break;
        case 2:
          this.editButton.text = 'Editar dispositivo seleccionado';
          this.addButton.text = 'Añadir dispositivo';
          this.deleteButton.text = 'Eliminar dispositivo seleccionado';
          break;
        default:
          break;
      }
    },

    addClickHandler() {
      let path = '';
      switch (this.currentTab) {
        case 1:
          path = '/addRoom';
          break;
        case 2:
          path = '/addDevice';
          break;
        default:
          break;
      }

      this.$router.push(path);
    },

    editButtonClickHandler() {
      // TODO
    },

    deleteButtonClickHandler() {
      if (this.deleteButton.waitingApi) {
        return;
      }

      this.deleteButton.waitingApi = true;

      switch (this.currentTab) {
        case 1:
          this.deleteRoom(this.selected);
          break;
        case 2:
          this.deleteDevice(this.selected);
          break;
        default:
          break;
      }

      this.deleteButton.waitingApi = false
      this.deleteButton.dialog = false;
    },

    getSelectedPretty() {
      let selectedObject;
      switch (this.currentTab) {
        case 1:
          selectedObject = this.rooms.find(obj => obj.id === this.selected);
          break;
        case 2:
          selectedObject = this.devices.find(obj => obj.id === this.selected);
          break;
        default:
          break;
      }

      if (selectedObject && selectedObject.name) {
        const pascalName = selectedObject.name
            .toLowerCase()
            .split(' ')
            .map((word) =>
                [word.charAt(0).toUpperCase(), word.substring(1)].join('')
            )
            .join(' ');

        return pascalName;
      }

      return '';
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

    async deleteRoom(id) {
      try {
        await this.$deleteRoom(id);
      } catch (e) {
        console.error("Could not delete room due to: ", e);
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

    async deleteDevice(id) {
      try {
        await this.$deleteDevice(id);
      } catch (e) {
        console.error("Could not delete device due to: ", e);
      }
    }
  }
}
</script>

<style scoped>

</style>