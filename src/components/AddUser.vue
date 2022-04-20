<template>
  <v-btn
      :to="{path: 'src/AddUserScreen'}"
      target="_blank"
      icon
      outlined
      x-large
      text
  >

    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "AddUser"
}
</script>
