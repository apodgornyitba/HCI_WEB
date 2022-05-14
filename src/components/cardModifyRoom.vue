<template>
  <container-noutline>
    <v-row
      class="justify-center align-center"
    >
      <v-col cols="4">
        <txt-field
            v-model="ambienceName"
            label="Nombre del ambiente"
            class="mx-1"
        />
      </v-col>
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
import TxtField from "@/components/accesories/txt-field";

export default {
  name: "cardModifyHouse",
  components: {TxtField, CardModify, ContainerNoutline},
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