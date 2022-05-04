<template>
  <v-app>
    <HeaderV/>
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
    <FooterV/>
  </v-app>
</template>

<script>
import FooterV from "@/components/Footer";
import HeaderV2 from "@/components/Header2";
import CardRutinas from "@/components/cardRutinas";
import CardHomes from "@/components/cardHomes";
import CardDispFav from "@/components/cardDispFav";

export default {
  name: "mainScreenView.vue",
  components: {CardDispFav, CardHomes, CardRutinas, HeaderV2, FooterV }
}
</script>