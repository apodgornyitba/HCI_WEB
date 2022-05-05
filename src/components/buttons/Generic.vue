<template>
  <v-card-actions>
    <v-btn
        :class="eclassHandler()"
        :color="bindProperty('color','primary base')"
        :height="this.height"
        :width="this.width"
        v-bind="$attrs"
        elevation="3"
        raised
        @click="clickHandler"
    >
      <v-img
          v-if="this.image"
          :src="getImage()"
          :max-height="getImageSize()['height']"
          :max-width="getImageSize()['width']"
          class="mt-3 mb-0 pa-0"
      />

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
  name: "btn-generic",
  props: {
    'title': String,
    'image': String,
    'eclass': String,
  },
  data: function () {
    return {
      componentClass: ['d-flex', 'flex-column', 'btn-generic', 'txt--text'],
      width: 110,
      height: 110,
    }
  },
  methods: {
    clickHandler() {
      this.$emit('click', this.part);
    },
    eclassHandler() {
      let c = this.componentClass.join(' ');
      if (this.eclass) {
        c += ' ' + this.eclass;
      }
      return c;
    },
    getImage() {
      return require(`@/assets/${this.image}`)
    },
    getImageSize() {
      const size = 0.50 * Math.min(this.height, this.width);
      return {
        'width': size,
        'height': size
      }
    },
    bindProperty(prop, defaultValue) {
      return (this.$attrs[prop])
          ? this.$attrs[prop]
          : defaultValue;
    },
  },
  created() {
    if (this.$attrs['width']) {
      this.width = parseFloat(this.$attrs['width']);
    }
    if (this.$attrs['height']) {
      this.height = parseFloat(this.$attrs['height']);
    }
  },
  inheritAttrs: false,
}
</script>

<style>
.btn-generic > span {
  flex-direction: column !important;
}

.btn-generic.btn--active {
  border: 3px solid var(--v-primary-darken1) !important;
}
</style>