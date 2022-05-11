<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ this.name }}</h1>
      </v-col>
      <v-col>
<!--        <v-tooltip>-->
            <v-btn
                @click="toggleStatus"
                elevation="0"
                icon
                style="color: black"
            >
              <v-icon
                  v-if="!active"
              >mdi-star-outline
              </v-icon>

              <v-icon
                  v-else
                  large
                  style="color: #FDD835"
              >mdi-star
              </v-icon>
            </v-btn>
<!--          <span>Añadir a Favoritos</span>-->
<!--        </v-tooltip>-->
      </v-col>
    </v-row>
    <v-row>
      <v-img
          v-if="this.image"
          :src="getStateImage()"
          :max-height="getImageSize()['height']"
          :max-width="getImageSize()['width']"
          class="mt-3 mb-0 pa-0"
      />
    </v-row>
    <v-row>
      <v-col>
      <h2>{{ getState() }}</h2>
      </v-col>
      <v-col>
        <v-switch
            v-model="switchState"
            color="primary"
            inset
        >
        </v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "deviceComponent",

  props:{
    'name': String,
    'image': String,

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
        return "Encendido";
      }
      return "Apagado";
    },
    toggleStatus() {
      this.active = !this.active;
    }
  },
}
</script>

<style scoped>

</style>