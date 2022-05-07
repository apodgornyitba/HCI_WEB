<template>
 <v-app>
   <HeaderV/>
   <v-main>
     <v-row align = "center">
       <v-col class="text-center">
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
     <v-row align = "center">
       <v-col class="text-center">
         <h2 class="subheading font-weight-light" style="margin-top: 10px">
           Martín Edgardo Zahnd
         </h2>
         <v-img
             :src="require('@/assets/martin.png')"
             style="margin-left: 80px"
             max-width="300px"
             max-height="300px"
         />
         <h3 class="subheading font-weight-light" style="margin-top: 5px">
           Legajo: 60401
         </h3>
         <h3 class="subheading font-weight-light" style="margin-top: 5px">
           E-mail: mzahnd@itba.edu.ar
         </h3>
       </v-col>
       <v-col class="text-center">
         <h2 class="subheading font-weight-light" style="margin-top: 10px">
           Andrés Podgorny
         </h2>
         <v-img
             :src="require('@/assets/andres.png')"
             style="margin-left: 80px"
             max-width="300px"
             max-height="300px"
         />
         <h3 class="subheading font-weight-light" style="margin-top: 5px">
           Legajo: 60570
         </h3>
         <h3 class="subheading font-weight-light" style="margin-top: 5px">
           E-mail: apodgorny@itba.edu.ar
         </h3>
       </v-col>
       <v-col class="text-center">
         <h2 class="subheading font-weight-light" style="margin-top: 10px">
           Sol Victoria Anselmo
         </h2>
         <v-img
             :src="require('@/assets/sol.png')"
             style="margin-left: 80px"
             max-width="300px"
             max-height="300px"
         />
         <h3 class="subheading font-weight-light" style="margin-top: 5px">
           Legajo: 61278
         </h3>
         <h3 class="subheading font-weight-light" style="margin-top: 5px">
           E-mail: soanselmo@itba.edu.ar
         </h3>
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
  name: "aboutView",
  components: {FooterV, HeaderV}
}
</script>

<style scoped>

</style>