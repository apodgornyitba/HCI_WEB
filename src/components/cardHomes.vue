<template>
<!--  <v-card
      outlined
      style="margin-left: 50px; margin-top: 50px; margin-bottom: 150px"
      max-width="900"
  >
    <btn-device
      title="Hogar 1"
      image-off="icons/home-bw-512px.png"
      image-on="icons/home-color-512px.png"
    />
  </v-card>-->
  <container-horizontal
      title="Hogares"
  >
    <btn-device
        title="Hogar 1"
        image-off="icons/home-bw-512px.png"
        image-on="icons/home-color-512px.png"
        class="my-0 mx-1 pa-0"
    />
    <btn-device
        title="Hogar 2"
        image-off="icons/home-bw-512px.png"
        image-on="icons/home-color-512px.png"
        class="my-0 mx-1 pa-0"
    />
    <btn-device
        title="Hogar 3"
        image-off="icons/home-bw-512px.png"
        image-on="icons/home-color-512px.png"
        class="my-0 mx-1 pa-0"
    />
  </container-horizontal>

</template>

<script>
import BtnDevice from "@/components/buttons/Device";
import ContainerHorizontal from "@/components/containers/ContainerHorizontal";
export default {
  name: "cardHomes",
  components: {ContainerHorizontal, BtnDevice}
}
</script>

<style scoped>

</style>