<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row
          no-gutters
        >
          <v-col cols="4">
            <cardRutinas/>
          </v-col>
          <v-col>
            <v-row
                no-gutters
                class="align-center justify-end mt-2 mr-2"
            >
              <help-button
                  :message="'Hola:D'"
              />
            </v-row>
            <cardRooms/>
            <cardDispFav/>
          </v-col>
        </v-row>
      </v-main>
    </header-true-view>
  </v-app>
</template>

<script>

import CardRutinas from "@/components/cardRutinas";
import CardRooms from "@/components/cardRooms";
import CardDispFav from "@/components/cardDispFav";
import HeaderTrueView from "@/views/headerTrueView";
import HelpButton from "@/components/helpButton";

export default {
  name: "mainScreenView.vue",
  components: {HelpButton, HeaderTrueView, CardDispFav, CardRooms, CardRutinas}
}
</script>