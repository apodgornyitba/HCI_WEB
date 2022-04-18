<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="450"
          width="450"
        />
      </v-col>

      <v-col class="text-center">
        <h1 class="display-2 font-weight-bold mb-3">
          ¡Bienvenido/a!
        </h1>
        <p class="subheading font-weight-regular">
          Elegí tu usuario para continuar
        </p>
        <UserTemplate/>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import UserTemplate from "@/components/UserTemplate";
  export default {
    name: 'WelcomeScreen',
    components: {UserTemplate},
    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
    }),
  }
</script>
