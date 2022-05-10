<template>
  <container-noutline
      title="[HOGAR]"
  >
    <template v-for="dev in this.devices">
      <card-device
          :key="dev.name"
          :name="dev.name"
          :image="dev.image"
          :state1="dev.state1"
          :state2="dev.state2"
          class="my-3 mx-1 pa-0"
      />
    </template>

  </container-noutline>
</template>


<script>

import ContainerNoutline from "@/components/containers/ContainerNoutline";
import CardDevice from "@/components/cardDevice";

export default {
  name: "cardDispHouse",
  components: {CardDevice, ContainerNoutline},
  data: () => ({
    devices: [
      {name: 'Parlante', image: 'speaker', state1: 'Volumen', state2: '[Cancion]'},
      {name: 'Lampara', image: 'lamp', state1: 'Intensidad', state2: 'Color'},
      {name: 'Alarma', image: 'alarm', state1: 'Modo', state2: ''},
      {name: 'Horno', image: 'oven', state1: 'Temperatura', state2: 'Modo'},
      {name: 'AC', image: 'ac', state1: 'Temperatura', state2: 'Modo'}
    ]
  })
}
</script>

<style scoped>

</style>