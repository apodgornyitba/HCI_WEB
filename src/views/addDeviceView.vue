<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row class="mt-15 ml-5 align-center justify-center">
          <h1>Agregar un dispositivo</h1>
        </v-row>
        <v-row class="mt-15 ml-5 align-center justify-center">
          <v-col cols="4">

            <v-text-field
                label="Nombre del dispositivo"
                outlined
                class="rounded-lg"
                required
            />

          </v-col>

          <v-row class="ma-auto align-center justify-center">
            <template
                v-for="(dev, idx) in devices"

            >
              <card-add-device
                  :key="idx"
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


        </v-row>
        <v-row class="align-center justify-center">
          <v-col>
            <btn-primary>
              Confirmar
            </btn-primary>
            <btn-tertiary>
              Cancelar
            </btn-tertiary>
          </v-col>
        </v-row>
      </v-main>
    </header-true-view>
  </v-app>
</template>

<script>

import HeaderTrueView from "@/views/headerTrueView";
import CardAddDevice from "@/components/cardAddDevice";
import BtnTertiary from "@/components/buttons/Tertiary";
import BtnPrimary from "@/components/buttons/Primary";

export default {
  name: "addDevice",
  components: {BtnPrimary, BtnTertiary, CardAddDevice, HeaderTrueView},
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