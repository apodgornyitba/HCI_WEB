<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row class="mt-15 ml-5 align-center justify-center">
          <h1>Agregar un ambiente</h1>
        </v-row>
        <v-row class="mt-15 ml-5 align-center justify-center">
          <v-col cols="4">

            <v-text-field
                label="Nombre del ambiente"
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
import HelpButton from "@/components/accesories/helpButton";
export default {
  name: "addRoom",
  components: {BtnPrimary, BtnTertiary, CardAddDevice, HeaderTrueView},
  data: () => ({
    devices: [
      {name: 'Dormitorio principal', image: 'bed_big'},
      {name: 'Dormitorio', image: 'bed_small'},
      {name: 'Baño', image: 'bath'},
      {name: 'Jardin', image: 'garden'},
      {name: 'Living', image: 'sofa'},
      {name: 'Cocina', image: 'kitchen'},
      {name: 'Oficina', image: 'desk'},
      {name: 'Lavadero', image: 'washingmachine'},
      {name: 'Garaje', image: 'garage'},
    ],
    radioGroup: 0,
  }),
}
</script>

<style scoped>

</style>