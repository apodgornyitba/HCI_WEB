<template>
    
    <v-footer padless color="#446DAB">
      
    <v-col class="text-center" cols="3">
      <strong style="color:white">Copyright © {{ new Date().getFullYear() }} — SmartHouse S.R.L.</strong>
    </v-col>

      <!-- PROGRAMAR BOTONES -> DECIRLES A Q PANTALLA IR -->

    <v-col offset-sm="4"/>
    <v-col class="text-center" > 
     <v-btn text to="/help" rounded> <strong style="color:white">Ayuda</strong> </v-btn>
       <!-- TENEMOS AYUDA EN EL FOOTER Y ARRIBA COMO ICONO -->
    </v-col>
      <v-col class="text-center" >
        <v-btn text to="/help" rounded> <strong style="color:white">Quienes somos?</strong> </v-btn>
      </v-col>
      <v-col class="text-center" >
        <v-btn text to="/help" rounded> <strong style="color:white">Contacto</strong> </v-btn>
      </v-col>
        <v-btn href="https://www.youtube.com/" dark icon>
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn href="https://www.instagram.com/" dark icon>
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn href="https://www.twitter.com/" dark icon>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn href="https://www.facebook.com/" dark icon>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
   </v-footer>
    
</template>

<script>
  export default {
    name: "FooterV",
    components:{
    },
    
    data: () => ({
      icons: [
        'mdi-youtube',
        'mdi-instagram',
        'mdi-twitter',
        'mdi-facebook',
      ],
    }),
  }
</script>