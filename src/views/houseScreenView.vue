<template>
  <v-app>
    <HeaderV2/>
    <v-main>
      <v-row>
        <v-col cols="4">
          <cardRutinas/>
          <div style="margin-left: 70px">
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
            <v-btn
                icon
                outlined
                style="margin-left: 290px;color:black"
                large
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <v-card
              flat
              style="margin-top: 50px"
          >
            <v-card-title><h1>[Nombre Hogar]</h1></v-card-title>
            <cardDispHouse/>
          </v-card>
        </v-col>

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
          <v-btn
              icon
              outlined
              style="color:black"
              large
          >
            <v-icon>
              mdi-qrcode
            </v-icon>
        </v-btn>
      </v-row>
    </v-main>
    <FooterV/>
  </v-app>
</template>

<script>
import HeaderV2 from "@/components/Header2";
import FooterV from "@/components/Footer";
import CardRutinas from "@/components/cardRutinas";
import CardDispHouse from "@/components/cardDispHouse";
export default {
  name: "houseScreenView",
  components: {CardDispHouse, CardRutinas, FooterV, HeaderV2}
}
</script>

<style scoped>

</style>