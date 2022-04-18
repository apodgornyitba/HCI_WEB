<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
            :src="require('../assets/User.png')"
            width="100"
        />
      </v-col>
      <v-col>
        <v-img
            :src="require('../assets/User.png')"
            width="100"
        />
      </v-col>
      <v-col>
        <v-img
            :src="require('../assets/User.png')"
            width="100"
        />
        <AddUser/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserTemplate",
  components: {AddUser}
}
import AddUser from "@/components/AddUser";
</script>

<style scoped>

</style>