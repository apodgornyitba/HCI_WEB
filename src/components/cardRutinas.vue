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
      <!--<div
          v-if="devices && devices.length > 0"
          class="d-flex flex-wrap flex-row align-center justify-space-around"
      >
        <template v-for="dev in this.devices">
          <btn-device
              :key="dev.id"
              :image-off="`icons/64/${dev.meta.image}-bw.png`"
              :image-on="`icons/64/${dev.meta.image}-color.png`"
              class="my-3 mx-1 pa-0"
          >
            {{ dev.name }}
          </btn-device>
        </template>
      </div>

      <div v-else>
        <v-card-text
            class="d-flex flex-wrap align-center justify-center text-center text-body-1"
        >
          Todavía no agregaste ningún dispositivo.
        </v-card-text>
      </div>-->
      <!-- ACA ROMPE PERO QUIERO AGREGAR LA LIST -->
    </template>

    <template v-slot:tab-3>
      <v-img
          max-width="300px"
        :src="require(`@/assets/Codigo_QR.png`)"
      />
    </template>

  </container-vertical>
</template>

<script>
import ContainerVertical from "@/components/containers/ContainerVertical";
import BtnPrimary from "@/components/buttons/Primary";
import {mapActions, mapState} from "vuex";

export default {
  name: "cardRutinas",
  components: {BtnPrimary, ContainerVertical},
  data() {
    return {
      tabs: [
        {id: 1, title: 'Rutinas', icon: 'mdi-phone', image: 'spinclock'},
        {id: 2, title: 'Dispositivos', icon: 'mdi-heart', image: 'bulb_smart'},
        {id: 3, title: 'QR mi hogar', icon: 'mdi-qrcode'},
      ]
    }
  },
  //FIX: VER COMENTARIO DE ARRIBA
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
