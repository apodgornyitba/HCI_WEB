<template>
  <v-container fluid>
    <div class="buttons">
      <v-row align="center">
        <v-col>
          <div id="Grupo_5"
               class="username"
               @click="Grupo_5()">
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
              >mdi-account-outline
              </v-icon>
            </v-btn>
            <v-list-item-title>{{ Names[0].title }}</v-list-item-title>
          </div>
        </v-col>
        <v-col>
          <div id="Catedra"
               class="username"
               @click="Catedra()">
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
              >mdi-account-outline
              </v-icon>
            </v-btn>
            <v-list-item-title>{{ Names[1].title }}</v-list-item-title>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "UserTemplate",
  data: () => ({
    Names: [
      {title: 'Grupo_5'},
      {title: 'Cátedra'},
    ],
  }),
  computed: {
  },
  methods: {
    ...mapMutations({
      setUserData: 'user/userData',
    }),

    Grupo_5() {
      this.setUserData({id: 'grupo5', name: 'Grupo 5'});

      this.$router.push('mainScreen');
    },
    Catedra() {
      this.setUserData({id: 'catedra', name: 'Cátedra'});
      this.$router.push('mainScreen');
    },
  },
}

</script>

<style>
.userTemplate > span {
  flex-direction: column;
}
</style>