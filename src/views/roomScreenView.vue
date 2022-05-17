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
          :message="'Se muestra el estado actual de los dipositivos del ambiente. Hacer click en un dispositivo para utilizarlo'"
          class="text-right"
      />
    </floating-container>
    <v-row
        no-gutters
        class="align-center justify-end"
    >
      <v-col>
        <cardDispRoom/>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import cardDispRoom from "@/components/cardDispRoom";
import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/containers/FloatingContainer";

export default {
  name: "roomScreenView",
  components: {FloatingContainer, cardDispRoom, HelpButton}
}
</script>

<style scoped>
</style>