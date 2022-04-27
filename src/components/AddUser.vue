<template>
  <v-btn
      :to="{path: 'src/AddUserScreen'}"
      icon
      outlined
      width="60"
      height="60"
  >

    <v-icon large>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "AddUser"
}
</script>
