<!-- HEADER PANTALLA INICIO -->
<template>
  <v-app-bar
      app
      color="secondary"
      flat
      class="rounded-xl rounded-t-0"
  >
    <div class="d-flex align-center">
      <v-img
          :src="require('../assets/logo-name.png')"
      />
    </div>

  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderV"
}
</script>

<!-- NO SE DONDE PONERLOS PERO TENEMOS DISTINTOS HEADERS

<template>
  <v-app-bar
      app
      color="light-blue lighten-4"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          :src="require('../assets/logo-name.png')"
      />
    </div>
</template>

HEADER CON USUARIO PERO NO SE COMO CORRERLO MAS A LA IZQUIERDA

<template>
  <v-app-bar
      app
      color="light-blue lighten-4"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          :src="require('../assets/logo-name.png')"
      />
    </div>
    <v-col class="text-right" cols="15">
      <strong style="color:black">[USUARIO]</strong>
    </v-col>
    <v-col>
      <v-img
          :src="require('../assets/User.png')"
          width="50"
          aspect-ratio="1.5"
      >
      </v-img>
    </v-col>
  </v-app-bar>
</template>

HEADER CON LOS BOTONES

<template>
  <v-app-bar
      app
      color="light-blue lighten-4"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          :src="require('../assets/logo-name.png')"
      />
    </div>

    <v-col offset-sm="7"/>
    <v-btn icon>
      <v-icon large> mdi-bell </v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon x-large> mdi-home </v-icon>
    </v-btn>
    <v-col class="text-right" cols="15">
      <strong style="color:black">[USUARIO]</strong>
    </v-col>
    <v-col>
      <v-img
          :src="require('../assets/User.png')"
          width="50"
          aspect-ratio="1.5"
      >
      </v-img>
    </v-col>
  </v-app-bar>
</template>

 -->