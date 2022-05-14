<template>
  <v-app>

    <header-true-view>

      <v-main>

        <v-row no-gutters
               class="align-center justify-end">
          <help-button
              :message="'Seleccione los ambientes que desee eliminar del hogar.'"
              class="text-right"
          />
        </v-row>
        <v-row no-gutters
               class="align-center justify-end">
          <v-col>
            <template>

              <container-vertical
                  :tabs="this.tabs"
                  class="ma-2 pa-0"
              >


                <template v-slot:tab-1>

                </template>

              </container-vertical>

            </template>
          </v-col>
          <v-col class="align-center justify-center" cols="6">
            <template>
              <container-noutline
                  :title="`${ this.houseName }`"
              >
                <v-row>
                  <template v-for="room in rooms">
                    <card-modify
                        :key="room.name"
                        :name="room.name"
                        :image="room.image"
                        class="my-3 mx-1 pa-0"
                    />
                  </template>
                </v-row>
              </container-noutline>
            </template>
          </v-col>
          <v-col class="align-center justify-center" cols="3">
            <v-row
                v-for="(button, index) in buttons"
                :key="index"
                class="ma-14 "
            >
              <v-tooltip bottom>
                <template v-slot:activator="{on, attrs}">
                  <v-btn
                      :to="`${ button.path }`"
                      icon
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      width="50"
                      height="50"
                      :color="`${ button.color }`"
                  >
                    <v-icon large>{{ button.icon }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ button.text }}</span>
              </v-tooltip>
            </v-row>
          </v-col>
        </v-row>
      </v-main>


    </header-true-view>

  </v-app>
</template>

<script>
import HeaderTrueView from "@/views/headerTrueView";
import HelpButton from "@/components/accesories/helpButton";
import ContainerNoutline from "@/components/containers/ContainerNoutline";
// import TxtField from "@/components/accesories/txt-field";
import CardModify from "@/components/cardModify";
import ContainerVertical from "@/components/containers/ContainerVertical";

export default {
  name: "modifyHomeView",
  components: {ContainerVertical, CardModify, ContainerNoutline, HelpButton, HeaderTrueView},

  data: () => ({
    buttons: [
      {text: 'Añadir ambiente', icon: 'mdi-plus', color: 'black', path: '/addRoom'},
      {text: 'Eliminar ambientes seleccionados', icon: 'mdi-trash-can-outline', color: 'black', path: ''},
      {text: 'Guardar cambios', icon: 'mdi-check', color: 'green', path: '/roomScreen'},

    ],
    rooms: [
      {name: 'Dormitorio 1', image: 'bed_big'},
      {name: 'Oficina', image: 'desk'},
      {name: 'Cocina', image: 'kitchen'},
      {name: 'Baño 1', image: 'bath'},
      {name: 'Garaje', image: 'garage'}
    ],
    tabs: [
      {id: 1, title: 'Dispositivos', icon: 'mdi-heart', image: 'bulb_smart'},

    ],
    houseName: 'MI HOGAR', /* TODO: Al cambiar de pantalla agregar nombre del hogar */
  }),
}
</script>

<style scoped>

</style>