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
import CardHomes from "@/components/cardHomes";
import CardDispFav from "@/components/cardDispFav";

export default {
  name: "mainScreenView.vue",
  components: {HeaderTrueView, CardDispFav, CardHomes, CardRutinas}
}
</script>