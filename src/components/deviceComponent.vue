<template>
  <v-container
    class="pa-4"
  >
    <v-row
        class="justify-center align-center mx-4"
    >
      <v-spacer/>
      <h2
          class="text-center"
      >
        {{ this.name }}
      </h2>

      <v-spacer/>

      <v-tooltip right>
        <template v-slot:activator="{on, attrs}">
          <v-btn
              @click="toggleFavorite"
              elevation="0"
              icon
              v-bind="attrs"
              v-on="on"
              style="color: black"
          >
            <v-icon
                v-if="!favorite"
                large
            >
              mdi-star-outline
            </v-icon>

            <v-icon
                v-else
                large
                style="color: #FDD835"
            >
              mdi-star
            </v-icon>
          </v-btn>
        </template>
        <span>Añadir a Favoritos</span>
      </v-tooltip>
    </v-row>
    <v-row
        class="align-center justify-center"
    >
      <v-img
          v-if="this.image"
          :src="getStateImage()"
          :max-height="getImageSize()['height']"
          :max-width="getImageSize()['width']"
          class="mt-3 mb-0 pa-0"
      />
    </v-row>

    <v-row
        class="align-center justify-center"
    >
      <v-spacer/>

      <h2>{{ getState() }}</h2>

      <v-spacer/>

      <v-switch
          ref="componentSwitch"
          v-model="active"
          color="primary"
          inset
          @change="stateChange"
      >
<!-- TODO: Add error handling
        :error="!hasError"
-->
      </v-switch>

      <v-spacer/>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "deviceComponent",

  props: {
    'name': String,
    'image': String,
    'on': String,
    'off': String,
  },
  data: function () {
    return {
      width: 400,
      height: 400,
      active: false,
      favorite: false,
      hasError: false,
    }
  },
  methods: {
    getImageSize() {
      const size = 0.5 * Math.min(this.height, this.width);
      return {
        'width': size,
        'height': size
      }
    },
    created() {
      if (this.$attrs['width']) {
        this.width = parseFloat(this.$attrs['width']);
      }
      if (this.$attrs['height']) {
        this.height = parseFloat(this.$attrs['height']);
      }
    },
    getStateImage() {
      if (!this.image) {
        return '';
      }

      if (this.active) {
        return require(`@/assets/icons/256/${this.image}-color.png`);
      }
      return require(`@/assets/icons/256/${this.image}-bw.png`);
    },
    getState() {
      if (!this.image) {
        return '';
      }

      if (this.active) {
        return (this.on) ? this.on : "Encendido";
      }
      return (this.off) ? this.off : "Apagado";
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
    },
    stateChange(status) {
      this.$emit('change', status);
    },

    setStatus(status) {
      this.active = status;
    },
    setErrorStatus(status) {
      this.hasError = status;
    }
  },
}
</script>

<style scoped>

</style>