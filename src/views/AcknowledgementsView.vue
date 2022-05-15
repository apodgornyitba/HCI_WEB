<template>
    <v-row
        class="align-center ma-1 mx-4"
    >
      <v-col>
        <v-card-text
            class="text-h1"
        >
          Reconocimientos a terceros y licencias
        </v-card-text>
      </v-col>
      <v-col>
        <help-button
            :message="'Seleccione un usuario para continuar'"
            class="text-right"
        />
      </v-col>
      <v-container>
        <v-row
            class="ma-2 mx-3 pa-0 justify-space-around"
        >
          <v-list>
            <v-list-group
                :value="false"
                prepend-icon="mdi-palette"
            >
              <template v-slot:activator>
                <v-list-item-title> Gráficos</v-list-item-title>
              </template>
              <v-list-group
                  :value="false"
                  no-action
                  sub-group
              >
                <template v-slot:activator>
                  <v-list-item-title> Autores</v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>
                      mdi-account-group
                    </v-icon>
                  </v-list-item-icon>
                </template>
                <v-list-item
                    v-for="flatAuthor in flaticonSorted" :key="flatAuthor.author"
                    link
                    :href="flatAuthor.url"
                    target="_blank"
                    class="px-12"
                >
                  <v-list-item-icon>
                    <v-icon>
                      mdi-account
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title v-text="flatAuthor.author"></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-group
                  :value="false"
                  no-action
                  sub-group
              >
                <template v-slot:activator>
                  <v-list-item-title> Licencias</v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>
                      mdi-scale-balance
                    </v-icon>
                  </v-list-item-icon>
                </template>
                <v-list-item
                    link
                    :to="this.flaticon.license.url"
                    target="_blank"
                    class="px-12"
                >
                  <v-list-item-icon>
                    <v-icon>
                      mdi-file-pdf-box
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Flaticon</v-list-item-title>
                </v-list-item>
              </v-list-group>

            </v-list-group>
          </v-list>

          <v-list>
            <v-list-group
                :value="false"
                prepend-icon="mdi-code-braces"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title> Software</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-group>
          </v-list>

        </v-row>
      </v-container>
    </v-row>
</template>

<script>
import HelpButton from "@/components/accesories/helpButton";

export default {
  name: "AcknowledgementsView",
  components: {HelpButton},

  data: () => ({
    flaticon: {
      license: {url: '/thirdparty/flaticon-license.pdf'},
      authors: [
        {author: 'lutfix', url: 'https://www.flaticon.es/autores/lutfix'},
        {author: 'Freepik', url: 'https://www.flaticon.es/autores/freepik'},
        {author: 'IcoGhost', url: 'https://www.flaticon.com/authors/icoghost'},
        {author: 'Aldo Cervantes', url: 'https://www.flaticon.com/authors/aldo-cervantes'},
        {author: 'Smashicons', url: 'https://www.flaticon.com/authors/smashicons'},
        {author: 'Iconjam', url: 'https://www.flaticon.com/authors/iconjam'},
        {author: 'Eucalyp', url: 'https://www.flaticon.com/authors/eucalyp'},
        {author: 'Octopocto', url: 'https://www.flaticon.com/authors/octopocto'},
        {author: 'photo3idea_studio', url: 'https://www.flaticon.com/authors/photo3idea-studio'},
        {author: 'Good Ware', url: 'https://www.flaticon.com/authors/good-ware'},
        {author: 'Muhammad Ali', url: 'https://www.flaticon.com/authors/muhammad-ali'},
        {author: 'Dreamstale', url: 'https://www.flaticon.com/authors/dreamstale'},
        {author: 'Ali Syaifullah', url: 'https://www.flaticon.es/autores/ali-syaifullah'},
        {author: 'Kiranshastry', url: 'https://www.flaticon.es/autores/kiranshastry'},
        {author: 'Bartama Graphic', url: 'https://www.flaticon.com/authors/bartama-graphic'},
        {author: 'Pixel perfect', url: 'https://www.flaticon.com/authors/pixel-perfect'},
        {author: 'Mehwish', url: 'https://www.flaticon.com/authors/mehwish'},
        {author: 'Konkapp', url: 'https://www.flaticon.com/authors/konkapp'},
        {author: 'xnimrodx', url: 'https://www.flaticon.com/authors/xnimrodx'},
        {author: 'ultimatearm', url: 'https://www.flaticon.com/authors/ultimatearm'},
        {author: 'kerismaker', url: 'https://www.flaticon.com/authors/kerismaker'},
        {author: 'surang', url: 'https://www.flaticon.com/authors/surang'},
        {author: 'rukanicon', url: 'https://www.flaticon.es/autores/rukanicon'},
        {author: 'joalfa', url: 'https://www.flaticon.com/authors/joalfa'},
      ]
    }
  }),
  methods: {},
  computed: {
    flaticonSorted: function () {
      return [...this.flaticon.authors].sort((a, b) => {
        if (a.author < b.author) {
          return -1;
        } else if (a.author > b.author) {
          return 1;
        }
        return 0;
      });
    }
  }
}
</script>

<style scoped>

</style>