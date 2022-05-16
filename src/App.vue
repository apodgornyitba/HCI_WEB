<template>
  <v-app id="app">
    <HeaderV
        alt-home-path="/mainScreen"
    />

    <v-main>
      <v-container
          fluid
          fill-height
          class="justify-center align-center"
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
