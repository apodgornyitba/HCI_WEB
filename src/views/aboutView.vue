<template>
  <div>
      <v-row class="align-center">
        <v-col class="text-center" cols="11">
          <h1 class="display-3" style="margin-top: 30px">
            ¿Quiénes somos?
          </h1>
          <h2 class="subheading font-weight-light" style="margin-top: 10px">
            Somos estudiantes del ITBA cursando la materia HCI
          </h2>
          <h2 class="subheading font-weight-light" style="margin-top: 5px">
            GRUPO 5
          </h2>
        </v-col>
      </v-row>
      <v-row class="align-center">
        <v-col class="text-center">
          <h2 class="subheading font-weight-light">
            Martín Edgardo Zahnd
          </h2>
          <v-img
              :src="require('@/assets/martin.png')"
              max-width="300px"
              max-height="300px"
              style="margin-left: 50px"
          />
          <h3 class="subheading font-weight-light">
            Legajo: 60401
          </h3>
          <h3 class="subheading font-weight-light">
            E-mail: mzahnd@itba.edu.ar
          </h3>
        </v-col>
        <v-col class="text-center">
          <h2 class="subheading font-weight-light">
            Andrés Podgorny
          </h2>
          <v-img
              :src="require('@/assets/andres.png')"
              max-width="300px"
              max-height="300px"

              style="margin-left: 50px"
          />
          <h3 class="subheading font-weight-light">
            Legajo: 60570
          </h3>
          <h3 class="subheading font-weight-light">
            E-mail: apodgorny@itba.edu.ar
          </h3>
        </v-col>
        <v-col class="text-center">
          <h2 class="subheading font-weight-light">
            Sol Victoria Anselmo
          </h2>
          <v-img
              :src="require('@/assets/sol.png')"
              max-width="300px"
              max-height="300px"
              style="margin-left: 50px"
          />
          <h3 class="subheading font-weight-light">
            Legajo: 61278
          </h3>
          <h3 class="subheading font-weight-light">
            E-mail: soanselmo@itba.edu.ar
          </h3>
        </v-col>
      </v-row>
  </div>
</template>

<script>

export default {
  name: "aboutView",
  components: {}
}
</script>

<style scoped>

</style>