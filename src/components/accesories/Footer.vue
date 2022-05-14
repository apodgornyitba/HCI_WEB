<template>
    <v-footer
        color="secondary darken-1"
        class="txt--text text--lighten-1"
    >
      <v-row
          no-gutters
          class="my-0 py-0"
      >

        <v-row
            class="justify-start mx-0 pa-0"
            width="fit-content"
            no-gutters
        >
          <v-btn
              color="txt lighten-1"
              class="my-1"
              text rounded
              v-for="link in links" :key="link.path"
              :href="link.path"
          >
            <span>{{ link.name }}</span>
          </v-btn>
        </v-row>

        <v-spacer></v-spacer>

        <v-card-text
            class="text-left mx-0 my-auto py-0 text-subtitle-1"
            style="width: fit-content;"
        >
          <strong>Copyright © {{ new Date().getFullYear() }} — SmartHouse S.R.L.</strong>
        </v-card-text>

        <v-spacer></v-spacer>

        <v-row
            width="fit-content"
            class="justify-end py-0"
            no-gutters
        >
          <v-btn
              color="txt lighten-1"
              class="my-1"
              text rounded
              dark icon
              v-for="link in social" :key="link.path"
              :href="link.path"
              :title="link.name"
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
        {path: "/about", name: "¿Quiénes somos?"},
        {path: "/acknowledgment", name: "Legales" }
      ],
      social: [
        {path: "https://www.youtube.com/smarthouse", name: "YouTube", icon: "mdi-youtube"},
        {path: "https://www.instagram.com/", name: "Instagram", icon: "mdi-instagram"},
        {path: "https://www.twitter.com/", name: "Twitter", icon: "mdi-twitter"},
        {path: "https://www.facebook.com/", name: "Facebook", icon: "mdi-facebook"},
      ]
    }),
  }
</script>
