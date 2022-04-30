<template>
  <v-container>
    <!-- BOTON COMUN -->
    <v-btn
        color="secondary"
        elevation="3"
        height="110"
        width="110"
        raised
    >
      <v-icon>mdi-home-variant-outline</v-icon>
      Hogar 1
    <!-- HAY QUE VER COMO PONER UN ICONO LINDO Y COLOCAR EL ICONO ARRIBA Y EL TEXTO ABAJO     -->
    </v-btn>

    <!-- BOTON CELESTE -->
    <v-btn
        color="tertiary"
        elevation="3"
        large
        raised

    >
    Continuar
    </v-btn>

    <!-- BOTON CELESTE con ejemplo de frases-->

    <v-btn
        color="tertiary"
        elevation="3"
        large
        raised
    >
    Crear un hogar
    </v-btn>

    <!--  BOTON CELESTE CLARO DE RUTINAS  -->
    <v-btn
        color="pentaternary"
        elevation="3"
        large
        raised

    >
      Hora de cine
    </v-btn>

    <!-- BOTON AZUL -->

    <v-btn
        color="quaternary"
        elevation="3"
        large
        raised
    >
    Unirme a un hogar
    </v-btn>

    <!-- BOTON GRIS -->

    <v-btn
        color="grey"
        elevation="3"
        raised
    >
    Omitir
    </v-btn>


    <!-- BOTONES DE ICONOS -->

    <v-btn
        class="mx-2"
        fab
    >
    <v-icon dark>
      mdi-plus
    </v-icon>
    </v-btn>

    <v-btn
        class="mx-2"
        fab
        large
    >
    <v-icon dark>
      mdi-pencil
    </v-icon>
    </v-btn>

    <v-btn
        class="mx-2"
        fab
    >
    <v-icon dark>
      mdi-help
    </v-icon>
    </v-btn>

<!--    DROPDOWN MENU-->
    <div>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-home-outline</v-icon>
          </v-btn>
        </template>
        <v-list class="text-center">
          <v-list-item
              v-for="(item, index) in itemsHogares"
              :key="index"
          >
            <!--  HAY QUE HACER QUE LOS ELEMENTOS DE LA LISTA SEAN BOTONES          -->
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
        </v-list>
      </v-menu>
    </div>
    <!-- SWITCH ON/OFF-->
     <v-switch
     color="primary"

     inset>
     </v-switch>

    <!-- ENTRADA DE TEXTO  -->
    <v-text-field
      label="Ingresar datos"
      hint="Ejemplo a dar"
      outlined
      filled
      rounded
      clearable
    />

  </v-container>
</template>

<script>
export default {
  name: "ButtonsV",
  data: () => ({
    itemsHogares: [
      { title: 'Hogar 1' },
      { title: 'Hogar 2' },
      { title: 'Hogar 3' },
    ],
  }),
}
</script>