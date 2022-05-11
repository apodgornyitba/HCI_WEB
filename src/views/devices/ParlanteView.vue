<template>
 <v-app>
   <header-true-view>
     <v-main>
       <v-col cols="2">
       <device-component
        name="Parlante"
        image="speaker"
       />
       </v-col>
       <v-col cols="3">
         <v-btn-toggle
             mandatory
         >
           <v-btn>
             <v-icon>mdi-step-backward</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-pause</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-play</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-stop</v-icon>
           </v-btn>
           <v-btn>
             <v-icon>mdi-step-forward</v-icon>
           </v-btn>
         </v-btn-toggle>
        <SliderMM
          title="Volumen"
          max="10"
        />
       </v-col>
       <v-col>
         <v-list >
          <!-- LISTA DE REPRODUCCION -->
         </v-list>
         <!-- BOTON PARA CAMBIAR DE GENERO -->
       </v-col>
     </v-main>
   </header-true-view>
 </v-app>
</template>

<script>
import HeaderTrueView from "@/views/headerTrueView";
import DeviceComponent from "@/components/deviceComponent";
import SliderMM from "@/components/accesories/SliderMM";
export default {
  name: "ParlanteView",
  components: {SliderMM, DeviceComponent, HeaderTrueView},
}
</script>

<style>

</style>