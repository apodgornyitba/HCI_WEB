<template>
  <container-horizontal
      title="Dispositivos Favoritos"
  >
    <template v-for="dev in this.devices">
      <btn-device
          :key="dev.name"
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
  name: "cardDispFav",
  components: {
    BtnDevice,
    ContainerHorizontal
  },
  data: () => ({
    devices: [
      {name: 'Parlante', image: 'speaker'},
      {name: 'Lampara', image: 'lamp'},
      {name: 'Alarma', image: 'alarm'},
      {name: 'Horno', image: 'oven'},
      {name: 'AC', image: 'ac'},
    ]
  })
}
</script>

<style scoped>

</style>