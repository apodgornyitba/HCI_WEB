<template>
  <v-app>
    <v-main>
      <SuperiorBar/>
      <WelcomeScreen/>
    </v-main>
  </v-app>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen';
import SuperiorBar from './components/SuperiorBar'

export default {
  name: 'App',

  components: {
    WelcomeScreen,
    SuperiorBar,
  },

  data: () => ({
    //
  }),
};
</script>
