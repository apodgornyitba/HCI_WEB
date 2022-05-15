<template>
    <div>
        <v-row no-gutters
               class="align-center justify-end">
          <help-button
              :message="'Seleccione el tipo de ambiente que quiere agregar, ingrese el nombre y presione confirmar.'"
              class="text-right"
          />
        </v-row>
        <v-row class="ma-auto align-center text-center justify-center">
          <v-col cols="4">
            <h1>Agregar un ambiente</h1>
            <txt-field
                label="Nombre del ambiente"
                class="mx-1"
                hint=""
            />
          </v-col>
        </v-row>
        <v-row class="ma-auto align-center justify-center">
            <template
                v-for="(r, idx) in rooms"
            >
              <card-add-device
                  :key="r.name"
                  :name="r.name"
                  :image="r.image"
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
              to="/mainScreen">
            Confirmar
          </btn-primary>
        </v-row>
        <v-row class="ma-auto align-center text-center justify-center">
          <btn-tertiary
              to="/modifyRoom"
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
  name: "addRoom",
  components: {TxtField, HelpButton, BtnPrimary, BtnTertiary, CardAddDevice},
  data: () => ({
    rooms: [
      {name: 'Dorm. princ.', image: 'bed_big'},
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