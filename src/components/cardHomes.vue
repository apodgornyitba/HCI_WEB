<template>
  <container-horizontal
      title="Hogares"
  >
    <template v-for="n in 4">
      <btn-device
          :key="n"
          image-off="icons/64/home-bw.png"
          image-on="icons/64/home-color.png"
          class="my-3 mx-1 pa-0"
      >
        Hogar {{ n }}
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
  }
}
</script>

<style scoped>

</style>