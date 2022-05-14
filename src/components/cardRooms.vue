<template>
  <container-horizontal
      title="Ambientes"
  >
    <template v-for="(dev, idx) in devices">

      <btn-device
          :key="idx"
          :image-off="`icons/64/${dev.image}-bw.png`"
          :image-on="`icons/64/${dev.image}-color.png`"
          class="my-3 mx-1 pa-0"
      >
        {{ dev.name }}
      </btn-device>
    </template>

  </container-horizontal>

</template>

<script>
import BtnDevice from "@/components/buttons/Device";
import ContainerHorizontal from "@/components/containers/ContainerHorizontal";

export default {
  name: "cardHomes",
  components: {
    BtnDevice,
    ContainerHorizontal
  },
  data: () => ({
    devices: [
      {name: 'Dormitorio 1', image: 'bed_big'},
      {name: 'Oficina', image: 'desk'},
      {name: 'Cocina', image: 'kitchen'},
      {name: 'Baño 1', image: 'bath'},
      {name: 'Garaje', image: 'garage'},
    ]
  })
}
</script>

<style scoped>

</style>