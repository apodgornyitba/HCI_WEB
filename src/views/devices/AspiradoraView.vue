<template>

  <device-generic>

    <template
        v-slot:left-pane
    >

      <device-component
          name="Aspiradora"
          image="vacuumcleaner_robot"
          class="ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
      <v-container
          class="align-center justify-space-around"
      >

        <v-row
            class="my-10 align-center justify-center"
        >
          <v-btn-toggle
              mandatory
          >
            <v-btn>
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-row>

        <v-row
            class="my-10  align-center justify-center"
        >
          <btn-device
              image-off="icons/64/vacuumcleaner-bw.png"
              image-on="icons/64/vacuumcleaner-color.png"
          >
            Aspirar
          </btn-device>
          <btn-device
              image-off="icons/64/broom-bw.png"
              image-on="icons/64/broom-color.png"
          >
            Trapear
          </btn-device>
          <btn-device
              image-off="icons/64/chargingstation-bw.png"
              image-on="icons/64/chargingstation-color.png"
          >
            Cargar
          </btn-device>
        </v-row>

      </v-container>
    </template>

    <template v-slot:right-pane>
      <v-container
          class="align-center justify-space-around"
      >
        <v-row
            class="my-10 align-center justify-center"
        >
          <v-card
              min-width="180"
          >
            <v-list>
              <v-list-group
                  :value="false"
              >
                <template v-slot:activator>
                  <v-list-item-title> Elegir zona de trabajo</v-list-item-title>
                </template>
                <v-list-item
                    v-for="(room, index) in Rooms"
                    :key="index"
                >
                  <v-list-item-action>
                    <v-btn
                        text
                    >
                      {{ room.title }}
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-row>

        <v-row
            class="my-10 align-center justify-center"
        >
          <v-card
              min-width="180"
          >
            <v-list>
              <v-list-group
                  :value="false"
              >
                <template v-slot:activator>
                  <v-list-item-title> Elegir zona de carga </v-list-item-title>
                </template>
                <v-list-item
                    v-for="(room, index) in Rooms"
                    :key="index"
                >
                  <v-list-item-action>
                    <v-btn
                        text
                    >
                      {{ room.title }}
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </device-generic>
</template>

<script>

import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "AspiradoraView",
  components: {DeviceGeneric, BtnDevice, DeviceComponent},
  data: () => ({
    Rooms: [
      {title: ''},
      //LISTA DE HABITACIONES AGREGADAS
    ],
  })
}
</script>

<style scoped>

</style>