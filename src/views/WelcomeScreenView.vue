<template>
  <v-container>
    <floating-container>
      <help-button
          :message="'Seleccione un usuario para continuar'"
          class="text-right"
      />
    </floating-container>

    <v-row class="align-center text-center">
      <v-col>
        <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
        />
      </v-col>

      <v-col class="ml-10">
        <h1 class="display-3">
          ¡Bienvenido/a!
        </h1>
        <p class="subheading font-weight-light">
          Elegí tu usuario para continuar
        </p>
        <UserTemplate/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserTemplate from "@/components/UserTemplate";
import HelpButton from "@/components/accesories/helpButton";
import FloatingContainer from "@/components/accesories/FloatingContainer";

export default {
  name: 'WelcomeScreen',
  components: {FloatingContainer, HelpButton, UserTemplate},
}
</script>
