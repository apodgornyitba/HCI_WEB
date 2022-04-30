<template>
  <v-app>
    <HeaderV/>

    <v-main>
<!--   PREGUNTAR COMO SE HARIA CON ROUTER   -->
<!--      <v-breadcrumbs-->
<!--        divider=">"-->
<!--      ></v-breadcrumbs>-->
      <v-row style="margin-left: 550px; margin-top: 30px">
      <h1 class="display-3"> Crear un usuario </h1>
      </v-row>
      <v-row style="margin-top: 50px" align="center">
        <v-col style="margin-left: 500px; margin-right: -100px">
          <p>Usuario:</p>
        </v-col>
        <v-col  style="margin-right: 400px">
          <v-text-field
              label="Ingresar usuario"
              outlined
              class="rounded-lg"
              clearable
              required
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col style="margin-left: 500px; margin-right: -100px">
          <p>Fecha de nacimiento:</p>
        </v-col>
        <v-col style="margin-right: 400px">
          <v-text-field
              label="Ingresar fecha"
              hint="dd/mm/aaaa"
              outlined
              class="rounded-lg"
              clearable
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col style="margin-left: 680px">
          <v-btn
              color="tertiary"
              elevation="3"
              x-large
              raised
              class="rounded-lg"
              style="color:white"
          >
            Continuar
          </v-btn>
        </v-col>
      </v-row>
    </v-main>
    <FooterV/>
  </v-app>
</template>

<script>
import HeaderV from "@/components/Header";
import FooterV from "@/components/Footer";
export default {
  name: "AddUserScreen",
  components: {FooterV, HeaderV}
}
</script>