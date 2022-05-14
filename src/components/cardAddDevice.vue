<template>
  <v-card
      flat
      max-width="250"
  >
    <v-card-actions>
      <v-col>
        <btn-device
            :image-off= "`icons/64/${this.image}-bw.png`"
            class="my-3 mx-1 pa-0"
            disabled
        >
          {{ this.name }}
        </btn-device>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>

import BtnDevice from "@/components/buttons/Device";

export default {
  name: "cardAddDevice",
  components: {BtnDevice},
  props: {
    'name': String,
    'image': String,
  } 

}
</script>

<style scoped>

</style>