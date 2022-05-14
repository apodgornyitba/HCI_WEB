<template>
  <v-app>
    <HeaderV/>
    <v-main>
      <v-row class="align-center justify-center mt-15">
        <h1>Error 404</h1>
      </v-row>
      <v-row class="align-center justify-center mt-5">
        <h1>Page not found</h1>
      </v-row>
      <v-row class="align-center justify-center mt-5">
        <h2>Para volver a la página principal, haga click sobre el logo "SMARTHOUSE" </h2>
      </v-row>
    </v-main>
    <FooterV/>
  </v-app>
</template>

<script>
import HeaderV from "@/components/accesories/Header";
import FooterV from "@/components/accesories/Footer";
export default {
  name: "PageNotFound",
  components: {FooterV, HeaderV}
}
</script>

<style scoped>

</style>