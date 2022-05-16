<template>
  <div>
    <floating-container>
      <help-button
          :message="'Seleccione el tipo de ambiente que quiere agregar, ingrese el nombre y presione confirmar.'"
          class="text-right"
      />
    </floating-container>
    <v-row class="ma-auto align-center text-center justify-center">
      <v-col cols="4">
        <h1
            class="my-2 mb-3"
        >
          Agregar un ambiente
        </h1>
        <v-text-field
            v-model="roomName"
            :rules="[rules.required, rules.name]"

            label="Nombre del ambiente"
            hint="Introducí el nombre para tu nuevo ambiente"

            persistent-hint
            outlined
            clearable

            class="mx-1"

            @update:error="roomNameChangeError"
            @change="roomNameChange"
        />
      </v-col>
    </v-row>
    <v-row
        class="my-5 align-center justify-center"
    >
      <container-with-hint
          outlined
          hint="Elegí el tipo de ambiente"
      >
        <template
            v-for="(r, idx) in rooms"
        >
          <v-radio-group v-model="selectedRoom"
                         :key="idx"
                         dense
                         row
                         class="ma-2"
          >
            <card-add-device
                :key="r.id"
                :ref="`btn-${r.id}`"
                :name="r.name"
                :image="r.image"
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
      </container-with-hint>
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
            @click="createRoom"
        >
          <v-icon v-if="confirmBtn.icon"> mdi-check-bold</v-icon>
          <div v-else> Confirmar</div>
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
  </div>
</template>

<script>
import CardAddDevice from "@/components/cardAddDevice";
import BtnTertiary from "@/components/buttons/Tertiary";
import BtnPrimary from "@/components/buttons/Primary";
import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/containers/FloatingContainer";
import ContainerWithHint from "@/components/containers/ContainerWithHint";

import {mapActions} from "vuex";
import {Room} from "@/api/room";

export default {
  name: "addRoom",
  components: {ContainerWithHint, FloatingContainer, HelpButton, BtnPrimary, BtnTertiary, CardAddDevice},
  data: () => ({
    roomName: '',
    validRoomName: false,
    selectedRoom: null,
    confirmBtn: {
      waitingApi: false,
      color: '',
      icon: false,
      errorMsg: '',
    },

    rooms: [
      {id: 'bedroomMain', name: 'Dormitorio principal', image: 'bed_big'},
      {id: 'bedroom', name: 'Dormitorio', image: 'bed_small'},
      {id: 'bathroom', name: 'Baño', image: 'bath'},
      {id: 'garden', name: 'Jardin', image: 'garden'},
      {id: 'living', name: 'Living', image: 'sofa'},
      {id: 'kitchen', name: 'Cocina', image: 'kitchen'},
      {id: 'office', name: 'Oficina', image: 'desk'},
      {id: 'laundryRoom', name: 'Lavadero', image: 'washingmachine'},
      {id: 'garage', name: 'Garaje', image: 'garage'},
    ],
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
  }),

  computed: {
    confirmButtonDisabled: function () {
      let disable = true;

      if (this.selectedRoom && this.validRoomName) {
        disable = false;
      }

      return disable == true;
    },
  },

  methods: {
    ...mapActions("room", {
      $createRoom: "create",
      $getRoom: "get",
      $getAllRooms: "getAll",
    }),

    roomNameChange() {
      if (this.confirmBtn.color === 'error') {
        this.confirmBtn.color = '';
      }
    },
    roomNameChangeError(val) {
      if (!val) {
        this.validRoomName = true;
      } else {
        this.validRoomName = false;
      }
    },

    setSelectedRoom(roomId) {
      if (this.selectedRoom) {
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

      this.selectedRoom = roomId;
    },

    roomButtonClickHandler(id) {
      this.setSelectedRoom(id);
      this.$refs[`radio-${this.selectedRoom}`][0].isActive = true;
    },

    radioButtonClickHandler(id) {
      this.setSelectedRoom(id);
      this.$refs[`btn-${this.selectedRoom}`][0].setActive(true);
    },


    /* API */
    async createRoom() {
      if (this.confirmBtn.waitingApi || this.confirmBtn.color) {
        return;
      }

      const room = new Room(null, this.roomName);

      this.confirmBtn.waitingApi = true;
      try {
        await this.$createRoom(room);

        this.confirmBtn.waitingApi = false;
        this.confirmBtn.color = 'info';
        this.confirmBtn.icon = true;

        setTimeout(() => this.$router.back(), 1000);

      } catch (e) {
        let errorMsg = '';

        this.confirmBtn.waitingApi = false;
        this.confirmBtn.color = 'error';
        this.confirmBtn.icon = false;

        switch (e.code) {
          case 1:
            errorMsg = `El nombre '${this.roomName} es inválido.'`;
            break;
          case 2:
            errorMsg = `La habitación '${this.roomName}' ya existe.`;
            break;
          default:
            errorMsg = `Se ha producido un error. Vuelva a intentarlo más tarde.'`;
            break;
        }

        this.confirmBtn.errorMsg = errorMsg;
      }
    },
  }
}
</script>

<style scoped>

</style>