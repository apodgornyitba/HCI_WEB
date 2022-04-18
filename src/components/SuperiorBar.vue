<template>
  <v-app-bar
      app
      color="light-blue lighten-4"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          :src="require('../assets/logo-name.png')"
      />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "SuperiorBar"
}
</script>