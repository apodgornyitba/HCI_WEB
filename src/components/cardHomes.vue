<template>
  <v-card
      outlined
      style="margin-left: 50px; margin-top: 50px; margin-bottom: 150px"
      max-width="900"
  >
    <v-card-actions>
      <v-btn
          to="/houseScreen"
          color="secondary"
          elevation="3"
          height="110"
          width="110"
          style="color:black"
          raised
      >
        <v-icon>mdi-home-variant-outline</v-icon>
        Hogar 1
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "cardHomes"
}
</script>

<style scoped>

</style>