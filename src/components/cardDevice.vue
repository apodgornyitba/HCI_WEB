<template>
  <v-card
      outlined
      max-width="250"
  >
    <v-card-actions>
      <v-col>
        <btn-device
            :image-off="getState()"
            class="my-3 mx-1 pa-0"
            disable-border
        >
          {{ this.name }}
        </btn-device>
      </v-col>
      <v-col>
        <v-row>
        {{ this.state["status"] }}
        </v-row>
        <v-row>
          {{ this.state["temperature"] }}
        </v-row>
        <v-row>
          {{ this.state["lock"] }}
        </v-row>
        <v-row>
          {{ this.state["freezerTemperature"] }}
        </v-row>
        <v-row>
          {{ this.state["mode"] }}
        </v-row>
        <v-row>
          {{ this.state["level"] }}
        </v-row>
        <v-row>
          {{ this.state["volume"] }}
        </v-row>
        <v-row>
          {{ this.state["genre"] }}
        </v-row>
        <v-row>
          {{ this.state["color"] }}
        </v-row>
        <v-row>
          {{ this.state["brightness"] }}
        </v-row>
        <v-switch
            v-model="switchState"
            color="primary"
            inset
        >
        </v-switch>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import BtnDevice from "@/components/buttons/Device";

export default {

  name: "cardDevice",
  components: {BtnDevice},

  data() {
    return {
      switchState: false
    }
  },
  props: {
    'name': String,
    'image': String,
    'state': Object,
  },
  methods: {
    getState() {
      if (!this.image) {
        return '';
      }
      if (this.switchState) {
        return `icons/64/${this.image}-color.png`;
      }
      return `icons/64/${this.image}-bw.png`;
    }
  },
}
</script>

<style scoped>

</style>