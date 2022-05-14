<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="(name, index) in Names"
          :key="index"

          cols="4"
      >
            <v-btn
                to="/mainScreen"
                outlined
                large
                fab
                elevation="0"
                x-large
            >
              <v-icon
                  x-large
              >mdi-account-outline</v-icon>
            </v-btn>
            <v-list-item-title>{{ name.title }}</v-list-item-title>
      </v-col>
      <v-col class="text-right">
        <AddUser/>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "UserTemplate",
  data: () => ({
    Names: [
      { title: 'Martin' },
      { title: 'Sol' },
      { title: 'Andres' },
      { title: 'Gonzalo'},
      { title: 'Emiliano'},
      { title: 'Marcela'},
    ],
  }),
}

</script>

<style>
.userTemplate > span{
  flex-direction: column;
}
</style>