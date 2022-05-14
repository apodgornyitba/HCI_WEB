<template>
  <v-app>
    <header-true-view>
      <v-main>
        <v-row>
          <v-col cols="4">
            <cardRutinas/>
          </v-col>
          <v-col>
            <cardHomes/>
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

export default {
  name: "mainScreenView.vue",
  components: {HeaderTrueView, CardDispFav, CardHomes, CardRutinas}
}
</script>