<template>
  <v-card
      outlined
      style="margin-left: 50px; margin-top: 50px; margin-bottom: 150px"
      max-width="900"
  >
    <BtnDevice
      title="Hogar 1"
      img-off="icons/home-bw-512px.png"
      img-on="icons/home-color-512px.png"
    />
  </v-card>
</template>

<script>
import BtnDevice from "@/components/buttons/Device";
export default {
  name: "cardHomes",
  components: {BtnDevice}
}
</script>

<style scoped>

</style>