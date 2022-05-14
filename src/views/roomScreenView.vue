<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row no-gutters
               class="align-center justify-end">
          <help-button
              :message="'Se muestra el estado actual de los dipositivos del ambiente. Hacer click en un dispositivo para utilizarlo'"
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
          <v-col cols="8">
            <cardDispRoom/>
          </v-col>
          <v-col cols="1">
              <v-tooltip bottom>
                <template v-slot:activator="{on, attrs}">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      icon
                      outlined
                      style="color:black"
                      large
                      to="/modifyDevices"
                  >
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Modificar ambiente</span>
              </v-tooltip>
          </v-col>
        </v-row>
      </v-main>
    </header-true-view>
  </v-app>
</template>

<script>

import CardRutinas from "@/components/cardRutinas";
import cardDispRoom from "@/components/cardDispRoom";
import HeaderTrueView from "@/views/headerTrueView";
import HelpButton from "@/components/accesories/helpButton";

export default {
  name: "roomScreenView",
  components: {HeaderTrueView, cardDispRoom, CardRutinas, HelpButton}
}
</script>

<style scoped>
.houseScreenView > span {
  flex-direction: column !important;
}
</style>