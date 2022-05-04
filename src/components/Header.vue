<!-- HEADER PANTALLA INICIO -->
<template>
  <v-app-bar
      app
      color="quaternary base"
      flat
      class="rounded-xl rounded-t-0"
  >
    <div class="d-flex align-center">

<!--      <v-btn-->
<!--       to="/"-->
<!--       elevation="0"-->
<!--       color="secondary"-->
<!--      >-->
<!--        <v-img-->
<!--            :src="require('../assets/logo-name.png')"-->
<!--        />-->
<!--      </v-btn>-->

      <a href="/">
        <v-img :src="require('@/assets/logo-name.png')"
      />
      </a>
    </div>

  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderV"
}
</script>