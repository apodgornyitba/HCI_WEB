<template>
  <container-vertical
      :tabs="this.tabs"
      class="ma-2 pa-0"
  >
    <template v-slot:tab-1>

      <btn-primary
          image="icons/64/cinema-bw.png"
          class="mx-auto justify-center"
      >
        Hora de cine
      </btn-primary>
      <btn-primary
          image="icons/64/sunrise-bw.png"
          class="mx-auto justify-center"
      >
        Hora de despertar
      </btn-primary>

      <btn-primary
          image="icons/64/night-bw.png"
          class="mx-auto justify-center"
      >
        Hora de dormir
      </btn-primary>
    </template>


    <template v-slot:tab-2>
      <p>abc def</p>
    </template>

  </container-vertical>
</template>

<script>
import ContainerVertical from "@/components/containers/ContainerVertical";
import BtnPrimary from "@/components/buttons/Primary";

export default {
  name: "cardRutinas",
  components: {BtnPrimary, ContainerVertical},

  data() {
    return {
      tabs: [
        {id: 1, title: 'Rutinas', icon: 'mdi-phone', image: 'spinclock'},
        {id: 2, title: 'Dispositivos', icon: 'mdi-heart', image: 'bulb_smart'},
        {id: 3, title: '', icon: 'mdi-qrcode-remove'},
        {id: 4, title: '', icon: 'mdi-qrcode-scan'},
      ]
    }
  },
}
</script>

<style scoped>

</style>
