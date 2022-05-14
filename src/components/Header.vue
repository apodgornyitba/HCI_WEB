<template>
  <v-app-bar
      app
      color="quaternary base"
      flat
      class="rounded-lg rounded-t-0"
  >
    <div class="d-flex align-center">

      <a :href="(this.homePath) ? this.homePath : '/'">
        <v-img
            :src="require('@/assets/logo-name.png')"
        />
      </a>
    </div>

    <v-col offset-sm="7"/>
    <v-btn v-if="this.showButtons"
        color="black"
           to="/mainScreen"
        text
    >
      MI HOGAR
    </v-btn>

    <div v-if="this.showUser">
      <strong style="color:black"> {{ username }} </strong>
      <v-btn
          color="black"
          icon
          to="/"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderV",
  props: {
    'homePath': String,
    'showUser': Boolean,
    'showButtons': Boolean
  },
  data: () => ({
    username: localStorage.getItem('username'),
    offset: true,
  }),
}
</script>

<style scoped>
</style>