<template>
  <v-app>
    <HeaderV/>
    <v-main>
      <!--COMPLETAR-->
    </v-main>
    <FooterV/>
  </v-app>
</template>

<script>
import FooterV from "@/components/Footer";
import HeaderV from "@/components/Header";

export default {
  name: "mainScreenView.vue",
  components: {FooterV, HeaderV}
}
</script>