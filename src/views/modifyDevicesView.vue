<template>
 <v-app>
   <header-true-view>
    <v-main>

      <v-col>
      <card-modify-house/>
      </v-col>
      <v-col>
      <v-btn
          to="/addDevice"
          icon
          outlined
          width="60"
          height="60"
      >
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
      </v-col>
    </v-main>
   </header-true-view>
 </v-app>
</template>

<script>
import HeaderTrueView from "@/views/headerTrueView";
import CardModifyHouse from "@/components/cardModifyHouse";
export default {
  name: "modifyDevicesView",
  components: {CardModifyHouse, HeaderTrueView}
}
</script>

<style scoped>

</style>