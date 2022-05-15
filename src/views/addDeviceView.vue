<template>
  <div>
    <v-row no-gutters
           class="align-center justify-end">
      <help-button
          :message="'Seleccione el tipo de dispositivo que quiere agregar, ingrese el nombre y presione confirmar.'"
          class="text-right"
      />
    </v-row>
    <v-row class="ma-auto align-center text-center justify-center">
      <v-col cols="4">
        <h1>Agregar un dispositivo</h1>
        <txt-field
            label="Nombre del dispositivo"
            class="mx-1"
            hint=""
        />
      </v-col>
    </v-row>
    <v-row class="ma-auto align-center justify-center">
      <template
          v-for="(dev, idx) in devices"
      >
        <card-add-device
            :key="dev.name"
            :name="dev.name"
            :image="dev.image"
        />
        <v-radio-group v-model="radioGroup"
                       :key="idx">
          <v-radio
              color="primary"
              :value="idx"
          />
        </v-radio-group>
      </template>
    </v-row>
    <v-row class="ma-auto align-center text-center justify-center">
      <btn-primary
          to="/roomScreen">
        Confirmar
      </btn-primary>
    </v-row>
    <v-row class="ma-auto align-center text-center justify-center">
      <btn-tertiary
          to="/modifyDevices"
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
import TxtField from "@/components/accesories/txt-field";

export default {
  name: "addDevice",
  components: {TxtField, HelpButton, BtnPrimary, BtnTertiary, CardAddDevice},
  data: () => ({
    devices: [
      {name: 'Parlante', image: 'speaker'},
      {name: 'Aspiradora', image: 'vacuumcleaner_robot'},
      {name: 'Persiana', image: 'curtain'},
      {name: 'Puerta', image: 'door'},
      {name: 'Alarma', image: 'alarm'},
      {name: 'Lampara', image: 'lamp'},
      {name: 'AC', image: 'ac'},
      {name: 'Grifo', image: 'tap'},
      {name: 'Heladera', image: 'refrigerator'},
      {name: 'Horno', image: 'oven'}
    ],
    radioGroup: 0,
  }),
}
</script>

<style scoped>

</style>