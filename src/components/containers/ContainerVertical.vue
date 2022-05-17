<template>
  <container-with-hint
      v-bind="$attrs"
  >
    <v-card
        outlined
        elevation="1"
        :disabled="this.disabled"
        width="100%"
    >
      <v-container
          v-if="singleTab"
          class="ma-0 pa-2"
      >
        <v-card-text
            v-if="numberOfTabs == 1"
            class="ma-0 pt-0 pb-3 px-1 text-h3 text-center"
        >
          {{ this.tabs[0].title }}
        </v-card-text>
        <v-row
            no-gutters
            class="ma-0 pa-0"
        >
          <slot></slot>
        </v-row>
      </v-container>

      <v-tabs
          v-else
          v-model="tab"
          hide-slider
          center-active
          show-arrows
          grow
          class="py-2 px-1"

          @change="tabChangeHandler"
      >
        <template v-for="n in this.numberOfTabs">
          <v-tab
              :key="n"
              :href="`#tab-${n}`"
              class="ma-0 px-0"
              v-on:click="tabClickHandler(n)"
          >
            <v-container
                fluid
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
            <v-container
                fluid
                class="my-2 mx-1 py-0 px-2 container-vertical--content-card "
            >
              <slot :name="'tab-' + n"></slot>
            </v-container>
          </v-tab-item>
        </v-tabs-items>

      </v-tabs>
    </v-card>
  </container-with-hint>
</template>

<script>
import ContainerWithHint from "@/components/containers/ContainerWithHint";

export default {
  name: "ContainerVertical",
  components: {ContainerWithHint},

  props: {
    tabs: Array,
    disabled: Boolean,
    singleTab: Boolean,
  },

  data() {
    return {
      tab: null,
      tabIdx: 1
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

  methods: {
    getImage(idx) {
      const img = this.tabs[idx].image;
      if (!img) {
        return '';
      }

      if (this.tabIdx === idx + 1) {
        return require(`@/assets/icons/32/${img}-color.png`);
      }
      return require(`@/assets/icons/32/${img}-bw.png`);
    },
    tabClickHandler(idx) {
      this.tabIdx = idx;
    },

    tabChangeHandler(tab) {
      this.$emit('change', tab);
    },

    getCurrentTab() {
      return this.tab;
    }
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