<template>
  <div class="ma-2">
    <v-dialog
      v-model="dialog"
      width="500"
    >

      <template v-slot:activator="{ on, attrs }">
        <v-btn
            outlined
            icon
            large
            color="black"
            v-bind="attrs"
            v-on="on"
            class="btn--ayuda"
        >
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ayuda
        </v-card-title>

        <v-card-text
          class="mt-4"
        >
          <h3>{{ this.message }}</h3>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "helpD",
  props: {
    message: String,
  },
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped>
.btn--ayuda {
  position: absolute;
  top: 75px;
  right: 25px;
}
</style>