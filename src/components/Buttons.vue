<!-- BOTON CELESTE -->

<v-btn
    color="secondary"
    elevation="3"
    large
    raised
>
Continuar
</v-btn>

<!-- BOTON CELESTE con ejemplo de frases-->

<v-btn
    color="secondary"
    elevation="3"
    large
    raised
>
Crear un hogar
</v-btn>

<!-- BOTON AZUL -->

<v-btn
    color="primary"
    elevation="3"
    large
    raised
>
Unirme a un hogar
</v-btn>

<!-- BOTON GRIS -->

<v-btn
    depressed
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


<!-- DROPDOWN MENU -->
<div class="text-center">
<v-menu offset-y>
  <template v-slot:activator="{ on, attrs }">
    <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
    >
      Dropdown
    </v-btn>
  </template>
  <v-list>
    <v-list-item
        v-for="(item, index) in items"
        :key="index"
    >
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</div>

new Vue({
el: '#app',
vuetify: new Vuetify(),
data: () => ({
items: [
{ title: 'Hogar 1' },
{ title: 'Hogar 2' },
{ title: 'Hogar 3' },
{ title: 'Click Me 2' }, //NO SE COMO AGREGAR EL MAS A LA ULTIMA LINEA
],
}),
})