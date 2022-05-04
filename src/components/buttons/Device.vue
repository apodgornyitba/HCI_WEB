<template>
  <v-card-actions>
    <v-btn
        color="secondary"
        height="110"
        width="110"
        class="d-flex flex-column btnDevice"
        style="color:black"
        elevation="3"
        raised
        @click="toggleImage()"
    >
      <v-img
          max-height="65"
          max-width="65"
          :src="getImage()"
          class="ma-1 pa-0"
      ></v-img>
      <v-card-text
          class="ma-1 pa-1"
      >
        {{ this.title }}
      </v-card-text>
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: "BtnDevice",
  props: {
    'title': String,
    'imgOff': String,
    'imgOn': String,
  },
  data() {
    return {
      isActivated: false
    }
  },
  methods: {
    getImage() {
      if (this.isActivated) {
        return require(`@/assets/${this.imgOn}`)
      } else {
        return require(`@/assets/${this.imgOff}`);
      }
    },
    toggleImage() {
      this.isActivated = !this.isActivated;
    }
  }
}
</script>

<style>
.btnDevice > span {
  flex-direction: column !important;
}
</style>