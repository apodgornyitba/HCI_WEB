<template>
   <v-container
       class="ma-0 pa-0"
   >
     <v-card
         class="ma-0 my-1 pa-4"
         outlined
     >
       <v-row
           class="ma-0 pa-0 justify-space-around"
       >
         <slot></slot>
       </v-row>
     </v-card>
   </v-container>
</template>

<script>
export default {
  name: "DeviceContanier"
}
</script>

<style scoped>

</style>