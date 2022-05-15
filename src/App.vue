<template>
  <v-app id="app">
    <HeaderV
        home-path="/mainScreen"
        :show-user="true"
        :show-buttons="true"
    />

    <v-main>
      <v-container
          fluid
          fill-height
      >
        <router-view/>
      </v-container>
    </v-main>

    <FooterV/>
  </v-app>
</template>

<script>
import FooterV from "@/components/accesories/Footer";
import HeaderV from "@/components/accesories/Header";

export default {
  components: {HeaderV, FooterV}
}
</script>

<style lang="scss">
</style>
