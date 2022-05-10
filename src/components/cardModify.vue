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
        >
          {{ this.name }}
        </btn-device>
      </v-col>
      <v-col>
        <v-checkbox
            v-model="selectDevice"
            color="primary"
            indeterminate
            :colorCB="this.colorCB"
        >
        </v-checkbox>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "cardModify",
  components: {BtnDevice},

  data() {
    return {
      switchState: false
    }
  },
  props: {
    'name': String,
    'image': String,
    'colorCB': String,
  }
}
</script>

<style scoped>

</style>