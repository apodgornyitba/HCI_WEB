<template>
  <div>
    <floating-container>
      <div
          class="ma-1 pa-1"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                outlined
                style="color:black"
                large
                to="/createroutine"
            >
              <v-icon>
                mdi-table-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Crear una rutina</span>
        </v-tooltip>
      </div>
      <div
          class="ma-1 pa-1"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs}">
            <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                outlined
                style="color:black"
                large
                to="/modifyHome"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>Modificar hogar</span>
        </v-tooltip>
      </div>
      <help-button
          :message="'Los botones a color están accionados. Hacer click en una rutina para accionarla. Hacer click en un ambiente para accederlo. Hacer click en un dispositivo para utilizarlo'"
          class="text-right"
      />
    </floating-container>
    <v-row
        no-gutters
        class="align-center justify-space-around"
    >
      <v-col cols="4">
        <cardRutinas/>
      </v-col>
      <v-col
          class="fill-height align-center justify-space-around"
      >
        <v-row class="mb-5">
          <cardRooms/>
        </v-row>
        <v-row class="mt-5">
          <cardDispFav/>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import CardRutinas from "@/components/cardRutinas";
import CardRooms from "@/components/cardRooms";
import CardDispFav from "@/components/cardDispFav";
import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/containers/FloatingContainer";

export default {
  name: "MainScreenView",
  components: {FloatingContainer, HelpButton, CardDispFav, CardRooms, CardRutinas}
}
</script>