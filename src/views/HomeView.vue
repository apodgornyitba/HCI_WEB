<template>
  <v-app>
    <HeaderV/>
    <v-main>
      <WelcomeScreen/>
    </v-main>
    <FooterV/>
  </v-app>
</template>

<script>
// @ is an alias to /src
import WelcomeScreen from "@/views/WelcomeScreenView";
import HeaderV from "@/components/Header";
import FooterV from "@/components/Footer";

export default {
  name: 'HomeView',
  components: {
    FooterV,
    HeaderV,
    WelcomeScreen,
  }
}
</script>
