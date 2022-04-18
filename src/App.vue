<template>
  <v-app>
    <v-main>
      <HeaderV/>
      <WelcomeScreen/>
      <FooterV/>
    </v-main>
  </v-app>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen';
import HeaderV from './components/Header';
import FooterV from './components/Footer'

export default {
  name: 'App',

  components: {
    WelcomeScreen,
    HeaderV,
    FooterV,
  },

  data: () => ({
    //
  }),
};
</script>
