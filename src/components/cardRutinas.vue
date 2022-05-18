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
      <v-card
          v-if="devices"
          flat
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <btn-device
            v-for="item in devices"
            :key="item.id"
            :image-off="`icons/64/${item.meta.image}-bw.png`"
            :image-on="`icons/64/${item.meta.image}-color.png`"
            class="justify-center align-center"
            small
        >
          {{ item.name }}
        </btn-device>
      </v-card>
      <v-card
          v-else
          flat
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <v-card-text
            class="d-flex flex-wrap align-center justify-center text-center text-body-1"
        >
          Todavía no agregaste ningún dispositivo.
        </v-card-text>
      </v-card>
    </template>

    <template v-slot:tab-3>
      <v-img
          max-width="250px"
          :src="require(`@/assets/Codigo_QR.png`)"
          class="ma-auto"
      />
    </template>

  </container-vertical>
</template>

<script>
import ContainerVertical from "@/components/containers/ContainerVertical";
import BtnPrimary from "@/components/buttons/Primary";
import {mapActions, mapState} from "vuex";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "cardRutinas",
  components: {BtnDevice, BtnPrimary, ContainerVertical},
  data() {
    return {
      tabs: [
        {id: 1, title: 'Rutinas', icon: 'mdi-phone', image: 'spinclock'},
        {id: 2, title: 'Dispositivos', icon: 'mdi-heart', image: 'bulb_smart'},
        {id: 3, title: 'QR mi hogar', icon: 'mdi-qrcode'},
      ]
    }
  },
  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
  },
  mounted() {
    this.getAllDevices();
  },
  methods: {
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  }
}
</script>

<style scoped>

</style>
