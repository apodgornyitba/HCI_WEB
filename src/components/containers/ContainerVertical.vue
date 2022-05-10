<template>
  <v-card
      outlined
      elevation="1"
  >
    <v-tabs
        v-model="tab"
        hide-slider
        center-active
        show-arrows
        grow
        class="py-2 px-1"
    >
      <template v-for="n in this.numberOfTabs">
        <v-tab
            :key="n"
            :href="`#tab-${n}`"
            class="ma-0 px-0"
            v-on:click="tabClickHandler(n)"
        >
          <v-container
              class="ma-0 pa-0"
          >
            <v-row
                no-gutters
                class="ma-0 pa-0 justify-center"
            >
              <v-img
                  v-if="getTab[n-1].image"
                  :src="getImage(n-1)"
                  class="ma-0 pa-0 mb-1 container-vertical--image"
              />
              <v-icon v-else>{{ getTab[n - 1].icon }}</v-icon>
            </v-row>
            <v-row
                no-gutters
                class="ma-0 pa-0 justify-center"
            >
              {{ getTab[n - 1].title }}
            </v-row>
          </v-container>
        </v-tab>
      </template>

      <v-tabs-items
          v-model="tab"
      >
        <v-tab-item
            v-for="n in this.numberOfTabs"
            :key="n"
            :value="'tab-' + n"
            eager
            class="ma-0 pa-0"
        >
          <v-card
              flat
              class="my-4 mx-3 py-0 px-2 container-vertical--content-card "
          >
            <slot :name="'tab-' + n"></slot>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "ContainerVertical",

  props: {
    tabs: Array,
  },
  data() {
    return {
      tab: null,
      tabIdx: 1
    }
  },

  methods: {
    getImage(idx) {
      const img = this.tabs[idx].image;
      if (!img) {
        return '';
      }

      if (this.tabIdx === idx+1) {
        return require(`@/assets/icons/32/${img}-color.png`);
      }
      return require(`@/assets/icons/32/${img}-bw.png`);
    },
    tabClickHandler(idx) {
      this.tabIdx = idx;
    }
  },
  computed: {
    numberOfTabs() {
      return this.tabs.length;
    },
    getTab() {
      return this.tabs;
    }
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
.container-vertical--content-card {
  overflow-y: auto;
}

.container-vertical--image {
  max-height: $tabs-bar-height * 0.50;
  max-width: $tabs-bar-height * 0.50;
}
</style>