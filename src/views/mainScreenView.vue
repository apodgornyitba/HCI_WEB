<template>
  <div>
    <v-row no-gutters
           class="align-center justify-end">
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
      <help-button
          :message="'Los botones a color están accionados. Hacer click en una rutina para accionarla. Hacer click en un ambiente para accederlo. Hacer click en un dispositivo para utilizarlo'"
          class="text-right"
      />
    </v-row>
    <v-row
        no-gutters
        class="align-center justify-end"
    >
      <v-col cols="3">
        <cardRutinas/>
      </v-col>
      <v-col>
        <cardRooms/>
        <cardDispFav/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import CardRutinas from "@/components/cardRutinas";
import CardRooms from "@/components/cardRooms";
import CardDispFav from "@/components/cardDispFav";
import HelpButton from "@/components/accesories/helpButton";

export default {
  name: "MainScreenView",
  components: {HelpButton, CardDispFav, CardRooms, CardRutinas}
}
</script>