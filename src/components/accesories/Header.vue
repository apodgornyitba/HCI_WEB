<template>
  <v-app-bar
      app
      color="quaternary base"
      flat
      class="rounded-lg rounded-t-0"
  >
    <div class="d-flex align-center">

      <router-link :to="(this.altHomePath && this.user.id) ? this.altHomePath : '/'">
        <v-img
            :src="require('@/assets/logo-name.png')"
        />
      </router-link>
    </div>

    <v-col
        offset-sm="7"/>
    <v-btn v-if="user.id"
           color="black"
           to="/mainScreen"
           text
    >
      MI HOGAR
    </v-btn>

    <div v-if="user.id">
      <strong style="color:black"> {{ user.name }} </strong>
      <v-btn
          color="black"
          icon
          to="/"
          @click="logOutHandler"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

export default {
  name: "HeaderV",
  props: {
    'altHomePath': String,
    'showUser': Boolean,
  },
  data: () => ({
    offset: true,
  }),
  computed: {
    ...mapGetters({
      user: 'user/data',
    }),
  },
  methods: {
    ...mapMutations({
      clearUser: 'user/clearUserData'
    }),

    logOutHandler() {
      this.clearUser();
    },
  }
}
</script>

<style scoped>
</style>