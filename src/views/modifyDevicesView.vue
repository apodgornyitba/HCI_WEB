<template>
  <v-app>
    <header-true-view>
      <v-main>
          <v-row class="align-center justify-center">
            <v-col cols="8">
              <card-modify-house/>
            </v-col>
            <v-col>
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
      </v-main>
    </header-true-view>
  </v-app>
</template>

<script>
import HeaderTrueView from "@/views/headerTrueView";
import CardModifyHouse from "@/components/cardModifyHouse";

export default {
  name: "modifyDevicesView",
  components: {CardModifyHouse, HeaderTrueView},

  data: () => ({
    buttons: [
      {text: 'Añadir dispositivos', icon: 'mdi-plus', color: 'black', path: '/addDevice'},
      {text: 'Añadir ambiente', icon: 'mdi-plus', color: 'black', path: '/addRoom'},
      {text: 'Eliminar', icon: 'mdi-trash-can-outline', color: 'black', path: ''},
      {text: 'Guardar cambios', icon: 'mdi-check', color: 'green', path: ''},

    ],
    heigth: 50,
    width: 50,
  }),
}
</script>

<style scoped>

</style>