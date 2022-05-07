<template>
  <v-container>
    <div style="margin-left: 50px">
      <v-btn
          large
          icon
      >
        <v-icon> mdi-update </v-icon>
      </v-btn>
      <v-btn
          large
          icon
      >
        <v-icon> mdi-lightbulb-on-outline </v-icon>
      </v-btn>
    </div>
    <v-card
        outlined
        style="margin-left: 50px"
        max-width="320"
        height="460"
    >
      <v-card-actions>
        <v-btn
            color="secondary"
            style="color: white"
            elevation="3"
            height="100"
            width="300"
            raised

        >
          Hora de cine
        </v-btn>
      </v-card-actions>
    </v-card>
<!--    <v-card
        outlined
        style="margin-left: 50px"
        max-width="400"
        height="480"
    >
      <v-card-actions>
        <v-btn
            text
        >
          Parlante 1
        </v-btn>
      </v-card-actions>
    </v-card>-->
  </v-container>
</template>

<script>
export default {
  name: "cardRutinas"
}
</script>

<style scoped>

</style>
