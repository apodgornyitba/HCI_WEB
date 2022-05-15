<template>
  <div>
    <v-row no-gutters
           class="align-center justify-end">
      <help-button
          :message="'Seleccione los dispositivos que desee eliminar del hogar o desvincular del ambiente.'"
          class="text-right"
      />
    </v-row>
    <v-row no-gutters
           class="align-center justify-end">
      <v-col class="align-center justify-center" cols="10">
        <card-modify-room/>
      </v-col>
      <v-col class="align-center justify-center" cols="2">
        <v-row
            v-for="(button, index) in buttons"
            :key="index"
            class="ma-14 "
        >
          <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <v-btn
                  :to="`${ button.path }`"
                  icon
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  width="50"
                  height="50"
                  :color="`${ button.color }`"
              >
                <v-icon large>{{ button.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ button.text }}</span>
          </v-tooltip>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardModifyRoom from "@/components/cardModifyRoom";
import HelpButton from "@/components/accesories/helpButton";

export default {
  name: "modifyDevicesView",
  components: {HelpButton, CardModifyRoom},

  data: () => ({
    buttons: [
      {text: 'Añadir dispositivos', icon: 'mdi-plus', color: 'black', path: '/addDevice'},
      {text: 'Eliminar dispositivos seleccionados', icon: 'mdi-trash-can-outline', color: 'black', path: ''},
      {text: 'Desvincular dispositivos seleccionados', icon: 'mdi-cellphone-link-off', color: 'black', path: ''},
      {text: 'Guardar cambios', icon: 'mdi-check', color: 'green', path: '/roomScreen'},

    ],
    heigth: 50,
    width: 50,
  }),
}
</script>

<style scoped>

</style>