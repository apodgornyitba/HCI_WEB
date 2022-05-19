<template>
  <v-app-bar
      app
      color="quaternary base"
      flat
      class="rounded-lg rounded-t-0 justify-end"
  >
    <v-row
        class="align-center justify-space-between"
    >
      <v-col>
        <div class="my-auto mx-5 pa-0">
          <router-link :to="(this.altHomePath && this.user.id) ? this.altHomePath : '/'">
            <v-img
                :src="require('@/assets/logo-name.png')"
            />
          </router-link>
        </div>
      </v-col>

      <v-spacer class="hidden-sm-and-down"/>

      <v-col class="ma-0 my-auto mx-10 pa-0 align-center justify-end">
        <v-row
          class="align-center justify-end"
        >
          <v-btn v-if="user.id"
                 color="black"
                 to="/mainScreen"
                 text
          >
            MI HOGAR
          </v-btn>

          <div v-if="user.id">
            <strong
                class="ma-0 my-auto mx-5 pa-0"
                style="color:black"
            >
              {{ user.name }}
            </strong>
            <v-btn
                color="black"
                icon
                to="/"
                @click="logOutHandler"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <!--
        <v-col>
          <v-btn v-if="user.id"
                 color="black"
                 to="/mainScreen"
                 text
          >
            MI HOGAR
          </v-btn>
        </v-col>

        <v-col>
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
        </v-col>
    -->

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