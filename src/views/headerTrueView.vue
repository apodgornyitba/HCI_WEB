<template>
  <v-app>
    <HeaderV
        home-path="/mainScreen"
        :show-user="true"
        :show-buttons="true"
    />
    <slot></slot>
    <FooterV/>
  </v-app>
</template>

<script>
import FooterV from "@/components/Footer";
import HeaderV from "@/components/Header";
export default {
  name: "headerTrueView",
  components: {FooterV, HeaderV},
}
</script>

<style scoped>

</style>