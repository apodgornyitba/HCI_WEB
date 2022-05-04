<template>
    <v-footer
        color="primary"
    >
      <v-row
          no-gutters
          class="my-0 py-0"
      >
        <v-card-text
            class="white--text text-left py-0"
            style="width: fit-content; margin: auto 0;"
        >
          <strong style="color:white">Copyright © {{ new Date().getFullYear() }} — SmartHouse S.R.L.</strong>
        </v-card-text>

        <v-spacer></v-spacer>

        <v-row
            class="justify-space-around py-0"
            width="fit-content"
            no-gutters
        >
          <v-btn
              v-for="link in links" :key="link"
              :href="link.path"
              color="white" text rounded
              class="my-1"
          >
            {{ link.name }}
          </v-btn>
        </v-row>

        <v-spacer></v-spacer>

        <v-row
            width="fit-content"
            class="justify-end py-0"
            no-gutters
        >
          <v-btn v-for="link in social" :key="link"
                 :href="link.path"
                 :title="link.name"
                 color="white" text rounded
                 class="my-1"
                 dark icon
          >
            <v-icon>{{ link.icon }}</v-icon>
          </v-btn>
        </v-row>

      </v-row>
    </v-footer>
    
</template>

<script>
  export default {
    name: "FooterV",
    components:{
    },
    
    data: () => ({

      links: [
        {path: '/help', name: 'Ayuda'},
        {path: '/about', name: '¿Quiénes somos?'},
        {path: '/contact', name: 'Contacto'}
      ],
      social: [
        {path: 'https://www.youtube.com/smarthouse', name: 'YouTube', icon: 'mdi-youtube'},
        {path: 'https://www.instagram.com/', name: 'Instagram', icon: 'mdi-instagram'},
        {path: 'https://www.twitter.com/', name: 'Twitter', icon: 'mdi-twitter'},
        {path: 'https://www.facebook.com/', name: 'Facebook', icon: 'mdi-facebook'},
      ]
    }),
  }
</script>
