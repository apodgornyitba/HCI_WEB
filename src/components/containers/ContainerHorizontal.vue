<template>
  <v-container
      class="ma-0 pa-0"
  >
    <v-row
        class="my-6 mx-4 pa-1"
        no-gutters
    >
      <v-card-text
          class="ma-2 pa-0 text-h2"
      >
        {{ this.title }}
      </v-card-text>
      <v-container
          class="ma-0 pa-0"
      >
        <v-card
            class="ma-0 my-1 py-4 px-4"
            outlined
        >
          <v-row
              class="ma-0 pa-0 justify-space-around"
          >
            <slot></slot>
          </v-row>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContainerHorizontal",
  props: {
    'title': String,
  },
}
</script>

<style scoped>

</style>