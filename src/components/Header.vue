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
    <v-btn icon style="color:black" v-if="this.showButtons">
      <v-icon large> mdi-bell-outline</v-icon>
    </v-btn>
    <div v-if="this.showButtons">
      <v-menu
          :offset-y="offset"
          max-width="120"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="black"
              v-bind="attrs"
              v-on="on"
              text
              flat
          >
            [HOGAR]
          </v-btn>
        </template>
        <v-list color="primary">
          <v-list-item
              v-for="(item, index) in Homes"
              :key="index"
          >
            <!--  HAY QUE HACER QUE LOS ELEMENTOS DE LA LISTA SEAN BOTONES          -->
            <!--            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
            <v-list-item-action>
              <v-btn
                  text
                  style="color: white"

              >
                {{ item.home }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item-action>
            <v-btn
                outlined
                icon
                style="color: white"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list>
      </v-menu>
    </div>
    <v-col
        v-if="this.showUser"
    >
      <strong style="color:black">[USUARIO]</strong>
    </v-col>
    <div
        v-if="this.showUser"
    >
      <v-menu
          :offset-y="offset"
          max-width="150"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="black"
              v-bind="attrs"
              v-on="on"
              icon
          >
            <v-icon x-large>mdi-account-outline</v-icon>
          </v-btn>
        </template>
        <v-list color="primary">
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
          >
            <!--  HAY QUE HACER QUE LOS ELEMENTOS DE LA LISTA SEAN BOTONES          -->
            <!--            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
            <v-list-item-action>
              <v-btn
                  text
                  style="color: white"

              >
                {{ item.title }}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item-action>
            <v-btn
                outlined
                icon
                style="color: white"
                to="/"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list>
      </v-menu>
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
    Homes: [
      {home: 'Hogar 1'},
      {home: 'Hogar 2'},
      {home: 'Hogar 3'},
    ],
    offset: true,
    items: [
      {title: 'Perfil'},
      {title: 'Acerca de ...'}
    ]
  }),
}
</script>

<style scoped>
</style>