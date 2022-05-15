<template>
  <div
      id="help-button"
      :class="classes"
  >
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <template #activator="{ on: onDialog }">
        <v-tooltip bottom>
          <template #activator="{on: onTooltip}">
            <v-btn
                v-on="{...onDialog, ...onTooltip}"
                icon
                outlined
                style="color:black"
                large
            >
              <v-icon>
                mdi-help
              </v-icon>
            </v-btn>
          </template>
          <span>Ayuda</span>
        </v-tooltip>
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
  name: "helpButton",
  props: {
    message: String,
  },
  computed: {
    classes() {
      return ['ma-1', 'pa-1']
    }
  },
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped>
</style>