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
              @click="toggleStatus"
              elevation="0"
              icon
              v-bind="attrs"
              v-on="on"
              style="color: black"
          >
            <v-icon
                v-if="!active"
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
          v-model="switchState"
          color="primary"
          inset
      >
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
      switchState: false,
      active: false,
      width: 400,
      height: 400,
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

      if (this.switchState) {
        return require(`@/assets/icons/256/${this.image}-color.png`);
      }
      return require(`@/assets/icons/256/${this.image}-bw.png`);
    },
    getState() {
      if (!this.image) {
        return '';
      }

      if (this.switchState) {
        return (this.on) ? this.on : "Encendido";
      }
      return (this.off) ? this.off : "Apagado";
    },
    toggleStatus() {
      this.active = !this.active;
    }
  },
}
</script>

<style scoped>

</style>