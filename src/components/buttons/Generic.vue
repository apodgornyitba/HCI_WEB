<template>
  <v-card-actions>
    <v-btn
        :class="extraClassesHandler()"
        :color="bindProperty('color','primary base')"
        :height="this.height"
        :width="this.width"
        v-bind="$attrs"
        elevation="3"
        raised
        @click="click"
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
        <slot></slot>
      </v-card-text>
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: "btn-generic",
  props: {
    'image': String,
    'extraClasses': String,
  },
  data: () => ({
    width: 64,
    height: 64
  }),
  computed: {
    classes: () => ({
      'd-flex': true,
      'flex-column': true,
      'btn-generic': true,
      'txt--text': true,
    })
  },
  methods: {
    click(e) {
      this.$emit('click', e);
      return;
    },
    extraClassesHandler() {
      let c;

      for (const cl in this.classes) {
        if (this.classes[cl] === true) {
          c += ' ' + cl;
        }
      }

      if (this.extraClasses) {
        c += ' ' + this.extraClasses;
      }
      return c;
    },
    getImage() {
      if (!this.image) {
        return '';
      }

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