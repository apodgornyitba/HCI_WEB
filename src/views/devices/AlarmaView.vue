<template>
  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          name="Alarma"
          image="alarm"
          on="Activado"
          off="Desactivado"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="align-center text-center justify-center">
        <div style="max-width: 300px">
          INGRESE EL PIN DE SEGURIDAD
          <v-otp-input
              length="4"
              type="number"
              class="align-center text-center justify-center"
          ></v-otp-input>
        </div>
      </v-row>
      <v-row
          class="my-10 align-center justify-center"
      >
        <btn-device
            :disabled="!deviceOn"
            ref="btnCasaMode"
            image-off="icons/64/house_family-bw.png"
            image-on="icons/64/house_family-color.png"
            @click="clickCasaMode"
        >
          Modo Casa
        </btn-device>
        <btn-device
            :disabled="!deviceOn"
            ref="btnRegularMode"
            image-off="icons/64/house_heart-bw.png"
            image-on="icons/64/house_heart-color.png"
            @click="clickRegularMode"
        >
          Modo Regular
        </btn-device>
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Ingrese el PIN para activar y desactivar la alarma. Para activar la alarma, debe elegur un modo'"
        />
      </v-row>
      <v-row no-gutters
             class="align-center justify-center">
        <btn-device
            :disabled="deviceOn"
            image-off="icons/64/dial-bw.png"
            image-on="icons/64/dial-color.png"
            manually-disabled
            click-off="clickEditMode"
            @click="clickEditMode"
        >
          EDITAR PIN
        </btn-device>
      </v-row>
      <v-row no-gutters
             class="align-center justify-center"
      >
        <v-card
            :disabled="!edit"
            class="align-center text-center justify-center" min-width="400px"
        >
          <v-row no-gutters
                 class="align-center justify-center">
            <div style="max-width: 300px">
              INGRESE EL PIN ACTUAL
              <v-otp-input
                  length="4"
                  type="number"
                  plain
              ></v-otp-input>
            </div>
          </v-row>
          <v-row
              class="my-10 align-center justify-center"
          >
            <div style="max-width: 300px">
              INGRESE EL PIN NUEVO
              <v-otp-input
                  length="4"
                  type="number"
                  plain
              ></v-otp-input>
            </div>
          </v-row>
        </v-card>
      </v-row>
    </template>
  </device-generic>
</template>

<script>
import DeviceComponent from "@/components/deviceComponent";
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import BtnDevice from "@/components/buttons/Device";
import HelpD from "@/components/accesories/helpD";

export default {
  name: "AlarmaView",
  components: {HelpD, DeviceGeneric, BtnDevice, DeviceComponent},
  data: () => ({
    deviceOn: false,
    edit: false,
  }),
  methods: {
    stateChange(active) {
      this.deviceOn = active;
    },
    clickCasaMode(isActive, e) {
      this.$refs.btnRegularMode.setActive(false, e);
    },
    clickRegularMode(isActive, e) {
      this.$refs.btnCasaMode.setActive(false, e);
    },
    clickEditMode() {
      this.edit = true;
    },
  },
}
</script>

<style scoped>

</style>