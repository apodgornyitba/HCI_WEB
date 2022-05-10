<template>
  <container-noutline>
    <v-row>
    <v-text-field
        label="Nombre "
        outlined
        class="rounded-lg"
        required
        
    />
    </v-row>
    <v-row>
    <template v-for="dev in this.devices">
      <card-modify
          :key="dev.name"
          :name="dev.name"
          :image="dev.image"
          class="my-3 mx-1 pa-0"
      />
    </template>
    </v-row>
  </container-noutline>
</template>


<script>

import ContainerNoutline from "@/components/containers/ContainerNoutline";
import CardModify from "@/components/cardModify";

export default {
  name: "cardModifyHouse",
  components: {CardModify, ContainerNoutline},
  data: () => ({
    devices: [
      {name: 'Parlante', image: 'speaker'},
      {name: 'Lampara', image: 'lamp'},
      {name: 'Alarma', image: 'alarm'},
      {name: 'Horno', image: 'oven'},
      {name: 'AC', image: 'ac'}
    ],
  })
}
</script>
<style scoped>

</style>