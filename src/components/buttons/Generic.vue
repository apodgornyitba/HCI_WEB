<template>

  <v-btn
      v-bind="$attrs"
      :class="classes"
      :width="this.width"
      :height="this.height"
      :color="bindProperty('color','primary base')"
      raised
      elevation="3"
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
        class="ma-1 pa-1 btn-generic--text"
    >
      <slot></slot>
    </v-card-text>
  </v-btn>
</template>

<script>
export default {
  name: "btn-generic",
  props: {
    image: String,
    toggle: Boolean,
  },
  data: () => ({
    isActive: false,
    width: 64,
    height: 64,
  }),
  computed: {
    classes: () => ({
      'ma-2': true,
      'd-flex': true,
      'flex-column': true,
      'btn-generic': true,
      'txt--text': true,
    })
  },
  methods: {
    click(e) {
      this.clickActions()
      if (this.toggle) {
        this.$emit('click', this.isActive, e);
      } else {
        this.$emit('click', e);
      }
    },
    clickActions() {
      if (this.toggle) {
        this.isActive = !this.isActive;
      }
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

    setActive(value) {
      if (!this.toggle) {
        return;
      }
      if (typeof (value) !== "boolean") {
        console.error("Invalid type.")
        return;
      }

      if (value !== this.isActive) {
        this.clickActions();
      }
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

.btn-generic.btn-generic--text {
  white-space: pre-line;
}
</style>