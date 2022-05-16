<template>
  <v-row
      no-gutters
  >
    <v-col
    >
      <v-card
          :outlined="outlined"
          :class="classes.rowCard"
      >
        <v-row
            no-gutters
            :class="classes.row"
        >
          <slot/>
        </v-row>
      </v-card>
      <v-card-text
          v-if="this.hint"
          :class="classes.text"
          style="width: fit-content;"
      >
        {{ this.hint }}
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ContainerWithHint",
  props: {
    hint: String,
    outlined: Boolean,
  },
  computed: {
    classes() {
      return {
        row: [
          'mx-auto',
          'justify-center',
          'align-center',
        ],
        text: [
          'ma-0',
          'pa-0',
          'my-3',
          'mx-auto',
          'justify-center',
          'align-center',
          'text-center',
          'txt--text',
          'text-subtitle-2',
          'text--darken-1',
        ],
        rowCard: {
          'mx-6': this.outlined,
        }
      }
    },
  },
}
</script>

<style scoped>

</style>