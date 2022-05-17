<template>
  <div>
    <floating-container>
      <help-button
          message="Seleccione el tipo de dispositivo que quiere agregar, ingrese el nombre y presione confirmar."
          class="text-right"
      />
    </floating-container>
    <v-row class="ma-auto align-center text-center justify-center">
      <v-col cols="4">
        <h1
            class="my-2 mb-3"
        >
          Agregar un dispositivo
        </h1>
        <v-text-field
            v-model="deviceName"
            :rules="[rules.required, rules.name]"

            label="Nombre del dispositivo"
            hint="Introducí el nombre para tu nuevo dispositivo"

            persistent-hint
            outlined
            clearable

            class="mx-1"

            @update:error="deviceNameChangeError"
            @change="deviceNameChange"
        />
      </v-col>
    </v-row>
    <v-row
        class="my-5 align-center justify-center"
    >
      <container-with-hint
          outlined
          hint="Elegí el tipo de dispositivo"
      >
        <template
            v-for="(r, idx) in devices"
        >
          <v-radio-group v-model="selectedDevice"
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
                @click="deviceButtonClickHandler(r.id, $event)"
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
            @click="createDevice"
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
import {Device, DeviceType, DeviceMeta} from "@/api/device";

export default {
  name: "addDevice",
  components: {ContainerWithHint, FloatingContainer, HelpButton, BtnPrimary, BtnTertiary, CardAddDevice},
  data: () => ({
    deviceName: '',
    validDeviceName: false,
    selectedDevice: null,
    confirmBtn: {
      waitingApi: false,
      color: '',
      icon: false,
      errorMsg: '',
    },

    devices: [
      {id: 'c89b94e8581855bc', name: 'Parlante', image: 'speaker'},
      {id: 'ofglvd9gqx8yfl3l', name: 'Aspiradora', image: 'vacuumcleaner_robot'},
      {id: 'eu0v2xgprrhhg41g', name: 'Persiana', image: 'curtain'},
      {id: 'lsf78ly0eqrjbz91', name: 'Puerta', image: 'door'},
      {id: 'mxztsyjzsrq7iaqc', name: 'Alarma', image: 'alarm'},
      {id: 'go46xmbqeomjrsjr', name: 'Lámpara', image: 'lamp'},
      {id: 'li6cbv5sdlatti0j', name: 'Aire Acondicionado', image: 'ac'},
      {id: 'dbrlsh7o5sn8ur4i', name: 'Grifo', image: 'tap'},
      {id: 'rnizejqr2di0okho', name: 'Heladera', image: 'refrigerator'},
      {id: 'im77xxyulpegfmv8', name: 'Horno', image: 'oven'}
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

      if (this.selectedDevice && this.validDeviceName) {
        disable = false;
      }

      return disable == true;
    },
  },

  methods: {
    ...mapActions("device", {
      $createDevice: "create",
    }),

    deviceNameChange() {
      if (this.confirmBtn.color === 'error') {
        this.confirmBtn.color = '';
      }
    },
    deviceNameChangeError(val) {
      if (!val) {
        this.validDeviceName = true;
      } else {
        this.validDeviceName = false;
      }
    },

    setSelectedDevice(deviceId) {
      if (this.selectedDevice) {
        for (const ref in this.$refs) {
          const split = ref.split('-');

          if (split[1] !== deviceId) {
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

      this.selectedDevice = deviceId;
    },

    deviceButtonClickHandler(id) {
      this.setSelectedDevice(id);
      this.$refs[`radio-${this.selectedDevice}`][0].isActive = true;
    },

    radioButtonClickHandler(id) {
      this.setSelectedDevice(id);
      this.$refs[`btn-${this.selectedDevice}`][0].setActive(true);
    },


    /* API */
    async createDevice() {
      if (this.confirmBtn.waitingApi || this.confirmBtn.color) {
        return;
      }

      const selectedDeviceImage = this.devices.find(obj => obj.id === this.selectedDevice).image;

      const device = new Device(null,
          this.deviceName,
          new DeviceType(this.selectedDevice),
          new DeviceMeta(selectedDeviceImage, false));

      this.confirmBtn.waitingApi = true;
      try {
        await this.$createDevice(device);

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
            errorMsg = `El nombre '${this.deviceName} es inválido.'`;
            break;
          case 2:
            errorMsg = `La habitación '${this.deviceName}' ya existe.`;
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