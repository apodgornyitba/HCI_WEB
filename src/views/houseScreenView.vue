<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row>
          <v-col>
            <cardRutinas/>
          </v-col>
          <v-col cols="8">
            <cardDispHouse/>
          </v-col>
          <v-col>
            <v-row style="margin-top: 50px">
              <v-btn
                  icon
                  outlined
                  style="color:black"
                  large
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              Modificar dispitivos
            </v-row>
            <v-row style="margin-top: 200px">
              <v-btn
                  icon
                  outlined
                  style="color:black"
                  x-large
              >
                <v-icon>
                  mdi-qrcode
                </v-icon>
              </v-btn>
              Generar QR
            </v-row>
          </v-col>
        </v-row>
      </v-main>
    </header-true-view>
  </v-app>
</template>

<script>

import CardRutinas from "@/components/cardRutinas";
import CardDispHouse from "@/components/cardDispHouse";
import HeaderTrueView from "@/views/headerTrueView";

export default {
  name: "houseScreenView",
  components: {CardDispHouse, CardRutinas, FooterV, HeaderV2}
}
</script>

<style scoped>

</style>