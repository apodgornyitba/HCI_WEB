<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row>
          <v-col>
            <cardRutinas/>
          </v-col>
          <v-col cols="8">
            <cardDispRoom/>
          </v-col>
          <v-col>
            <v-row style="margin-top: 50px" class="mt-10 mr-5 ma-auto align-center justify-center">
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
                <span>Modificar hogar</span>
              </v-tooltip>
            </v-row>
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

export default {
  name: "roomScreenView",
  components: {HeaderTrueView, cardDispRoom, CardRutinas}
}
</script>

<style scoped>
.houseScreenView > span {
  flex-direction: column !important;
}
</style>