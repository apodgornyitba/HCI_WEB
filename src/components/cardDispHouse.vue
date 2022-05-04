<template>
  <v-card
      outlined
      max-width="250"
  >
    <v-card-actions>
      <v-col>
        <v-btn
            color="secondary"
            elevation="3"
            height="110"
            width="110"
            style="color:black"
            raised
        >
          <v-icon>mdi-speaker</v-icon>
          Parlante
        </v-btn>
      </v-col>
      <v-col>
        <v-switch
            color="primary"

            inset>
        </v-switch>
      </v-col>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  name: "cardDispHouse"
}
</script>

<style scoped>

</style>