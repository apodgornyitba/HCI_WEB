<template>
  <v-app>
    <HeaderV/>
    <v-main>
      <WelcomeScreen/>
<!--      <ButtonsV/>-->
    </v-main>
    <FooterV/>
  </v-app>
</template>

<script>

import WelcomeScreen from './components/WelcomeScreen';
import HeaderV from './components/Header';
import FooterV from './components/Footer'
// import ButtonsV from "@/components/Buttons";

export default {
  name: 'App',

  components: {
    // ButtonsV,
    WelcomeScreen,
    HeaderV,
    FooterV,
  },

  data: () => ({
    //
  }),
};
</script>
