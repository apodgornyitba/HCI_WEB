<template>

  <device-generic>

    <template v-slot:left-pane>
      <device-component
          name = "Grifo"
          image = "tap"
          on = "Abierto"
          off = "Cerrado"
          class = "ma-auto align-center justify-center"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row no-gutters
             class="justify-center ma-10 pa-0">
          <v-list >
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-title> Unidad </v-list-item-title>
              </template>
              <v-list-item
                  v-for="(unid, index) in Unidades"
                  :key="index"
              >
                <v-list-item-action>
                  <v-btn
                      text
                  >
                    {{ unid.title }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </v-list>
        <SliderMM
            title="Cantidad"
        />
        </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row no-gutters
             class="justify-center ma-10 pa-0">
      <btn-device
          image-off="icons/64/tap_drop-bw.png"
          image-on="icons/64/tap_drop-color.png"
      >
        Dispensar
      </btn-device>
      </v-row>
    </template>
  </device-generic>

</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import SliderMM from "@/components/accesories/SliderMM";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";

export default {
  name: "GrifoView",
  components: {BtnDevice, DeviceGeneric, SliderMM, DeviceComponent},
  data: () => ({
    Unidades:[
      {title: 'Litro'},
      {title: 'Decilitro'},
      {title: 'Centilitro'},
      {title: 'Mililitro'},
    ],
  }),
}
</script>

<style scoped>

</style>