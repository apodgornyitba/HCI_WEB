<template>
  <header-true-view>
    <v-container
        class="ma-0 mt-16 pa-0 fill-height"
        fluid
    >
      <v-row no-gutters>
        <v-card-text
            class="text-h1 text-center"
        >
          Crear una rutina
        </v-card-text>
      </v-row>

      <v-row
          no-gutters
          class="mx-6 justify-center align-center"
      >
        <v-col
            class="ma-0 pa-0"
        >
          <txt-field
              label="Nombre de la rutina"
              hint="Ingresá un nombre para la rutina"
              :rules="[rules.required]"
              class="mx-1"
          />
        </v-col>

        <v-col
            cols="7"
        >
          <v-row
              no-gutters
              class="ma-0 mx-6 pa-0 align-center justify-space-between"
          >
            <v-col>
              <v-row
                  class="align-start justify-space-between"
              >
                <v-col
                    class="ma-0 pa-2"
                >
                  <container-vertical
                      :tabs="this.devices.tabs"
                      hint="Elegí un dispositivo"
                      class="ma-0 mr-2 pa-0"
                  >

                    <template v-slot:tab-1>
                      <v-virtual-scroll
                          :items="devices.favorites"
                          height="277"
                          item-height="105"
                          bench="2"
                      >
                        <template v-slot:default="{ item }">
                          <btn-device
                              :key="item.id"
                              :image-off="`icons/64/${item.image}-bw.png`"
                              :image-on="`icons/64/${item.image}-color.png`"
                              class="justify-center align-center"
                              small
                              @click="deviceButtonClick($event, item.id)"
                          >
                            {{ item.name }}
                          </btn-device>
                        </template>
                      </v-virtual-scroll>
                    </template>


                    <template v-slot:tab-2>
                      <v-virtual-scroll
                          :items="devices.all"
                          height="277"
                          item-height="105"
                          bench="2"
                      >
                        <template v-slot:default="{ item }">
                          <btn-device
                              :key="item.id"
                              :image-off="`icons/64/${item.image}-bw.png`"
                              :image-on="`icons/64/${item.image}-color.png`"
                              class="justify-center align-center"
                              small
                              @click="deviceButtonClick($event, item.id)"
                          >
                            {{ item.name }}
                          </btn-device>
                        </template>
                      </v-virtual-scroll>
                    </template>

                  </container-vertical>
                </v-col>

                <v-col
                    class="ma-0 ml-2 pa-2"
                >
                  <container-vertical
                      :tabs="this.actions.tabs"
                      class="ma-0 pa-0"
                      :disabled="!this.actions.enabled"
                      hint="Elegí una acción"
                  >

                    <template v-slot:tab-1>
                      <v-row
                          v-if="devices.selected === 0"
                          no-gutters
                          class="align-center justify-center fill-height"
                      >
                        <v-card-text
                            class="text-center txt--text text-body-2"
                        >
                          Seleccioná un dispositivo primero.
                        </v-card-text>

                      </v-row>

                      <v-card
                          v-else
                          flat
                      >
                        <v-virtual-scroll
                            bench="2"
                            :items="actions.byDevice[devices.selected]"
                            height="277"
                            item-height="64"
                        >
                          <template v-slot:default="{ item }">
                            <v-list-item :key="item">
                              <v-list-item-action>
                                <btn-secondary
                                    :height="48"
                                    @click="selectedActionHandler($event, item)"
                                >
                                  {{ item }}
                                </btn-secondary>
                              </v-list-item-action>
                            </v-list-item>
                          </template>
                        </v-virtual-scroll>
                      </v-card>
                    </template>


                    <template v-slot:tab-2>
                      Lista de acciones 2
                    </template>
                  </container-vertical>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col
            class="ma-0 pa-4"
        >
          <container-vertical
              :tabs="[{ id: 0, title:'Rutina', icon:'' }]"
              :disabled="!this.routine.enabled"
              single-tab
          >
            <v-row
                v-if="routine.stored.length < 1"
                no-gutters
                class="align-center justify-center fill-height"
            >
              <v-card-text
                  class="text-center txt--text text-body-2"
              >
                Todavía no agregaste ningún dispositivo.
              </v-card-text>
            </v-row>

            <v-virtual-scroll
                v-else
                bench="2"
                :items="routine.stored"
                height="277"
                item-height="64"
            >
              <template v-slot:default="{ item }">
                <v-row
                    no-gutters
                    class="align-center justify-space-around"
                >
                  <v-list-item-action
                      v-if="routine.stored.length > 1"
                      class="mx-2 mr-1"
                  >
                    <v-btn
                        depressed
                        fab
                        color="primary darken-1"
                        height="24"
                        width="24"
                        @click="moveUp({action: item.action, id: item.id, time: item.time})"
                    >
                      <v-icon>mdi-arrow-up-thick</v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-action
                      v-if="routine.stored.length > 1"
                      class="mx-2 ml-1"
                  >
                    <v-btn
                        depressed
                        fab
                        color="primary darken-1"
                        height="24"
                        width="24"
                        @click="moveDown({action: item.action, id: item.id, time: item.time})"
                    >
                      <v-icon>mdi-arrow-down-thick</v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title
                        class="text-center"
                    >
                      {{ getDeviceNameById(item.id) }}: {{ item.action }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action
                      class="mx-2"
                  >
                    <v-btn
                        depressed
                        fab
                        color="error"
                        height="24"
                        width="24"
                        @click="removeStoredAction({action: item.action, id: item.id, time: item.time})"
                    >
                      <v-icon>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-row>
              </template>
            </v-virtual-scroll>
          </container-vertical>
        </v-col>
      </v-row>

      <v-row
          no-gutters
          class="ma-0 pa-0 justify-center align-center"
      >
        <btn-primary
            :height="64"
            :disabled="!this.routine.enabled"
        >
          Crear
        </btn-primary>
      </v-row>
    </v-container>
  </header-true-view>
</template>

<script>
import HeaderTrueView from "@/views/headerTrueView";
import containerVertical from "@/components/containers/ContainerVertical";
import BtnPrimary from "@/components/buttons/Primary";
import BtnSecondary from "@/components/buttons/Secondary";
import BtnDevice from "@/components/buttons/Device";
import TxtField from "@/components/accesories/txt-field";

export default {
  name: "RoutineCreationView",
  components: {TxtField, BtnDevice, BtnSecondary, BtnPrimary, HeaderTrueView, containerVertical},
  data: () => ({
    rules: {
      required: value => !!value || 'Este campo es obligatorio'
    },

    devices: {
      selected: 0,
      tabs: [
        {id: 1, title: 'Favoritos', icon: 'mdi-star', image: 'star'},
        {id: 2, title: 'Todos', icon: 'mdi-all-inclusive', image: 'all'},
      ],
      all: [
        {id: 456, name: 'Lampara', image: 'lamp'},
        {id: 123, name: 'Parlante', image: 'speaker'},
        {id: 789, name: 'Alarma', image: 'alarm'},
        {id: 912, name: 'Horno', image: 'oven'},
        {id: 345, name: 'AC', image: 'ac'},
        {id: 678, name: 'Puerta', image: 'door'},
        {id: 901, name: 'Heladera', image: 'refrigerator'},
        {id: 234, name: 'Aspiradora', image: 'vacuumcleaner'},
      ],
      favorites: [
        {id: 123, name: 'Parlante', image: 'speaker'},
        {id: 456, name: 'Lampara', image: 'lamp'},
        {id: 789, name: 'Alarma', image: 'alarm'},
        {id: 912, name: 'Horno', image: 'oven'},
        {id: 345, name: 'AC', image: 'ac'},
      ],
    },

    actions: {
      enabled: false,
      tabs: [
        {id: 1, title: 'Favoritos', icon: 'mdi-phone', image: 'star'},
        {id: 2, title: 'Todos', icon: 'mdi-heart', image: 'bulb_smart'},
      ],
      byDevice: {
        123: ['Prender', 'Apagar', 'Reproducir', 'Detener'],
        456: ['Prender', 'Apagar', 'Establecer intensidad'],
      }
    },

    routine: {
      enabled: false,
      stored: [],
    }
  }),
  methods: {
    getDeviceNameById(id) {
      const device = this.devices.all.find(device => device.id === id);

      if (device) {
        return device.name;
      }

      return 'Invalid device.';
    },

    deviceButtonClick(e, id) {
      if (this.devices.selected === id) {
        this.devices.selected = 0;
        this.actions.enabled = false;
      } else {
        this.devices.selected = id;
        this.actions.enabled = true;
      }
    },

    selectedActionHandler(e, action) {
      this.storeAction(action, this.devices.selected);
      this.routine.enabled = true;
    },

    isAction(item, action) {
      return (item.time === action.time
          && item.action === action.action
          && item.id === action.id);
    },
    storeAction(action, device) {
      this.routine.stored.push({
        id: device,
        action: action,
        time: new Date().getTime() / 1000,
      });
    },
    removeStoredAction(action) {
      this.routine.stored = this.routine.stored.filter(item => !(this.isAction(item, action)))

      if (this.routine.stored.length === 0) {
        this.routine.enabled = false;
      }
    },

    moveUp(action) {
      const index = this.routine.stored.findIndex(item => this.isAction(item, action));
      if (index === 0) {
        return;
      }

      const tmp = this.routine.stored[index - 1];
      this.routine.stored.splice(index - 1, 1, this.routine.stored[index]);
      this.routine.stored.splice(index, 1, tmp);
    },
    moveDown(action) {
      const index = this.routine.stored.findIndex(item => this.isAction(item, action));
      if (index === this.routine.stored.length - 1) {
        return;
      }

      const tmp = this.routine.stored[index + 1];
      this.routine.stored.splice(index + 1, 1, this.routine.stored[index]);
      this.routine.stored.splice(index, 1, tmp);
    },
  }
}
</script>

<style scoped>

</style>