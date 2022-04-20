<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="n in 6"
          :key="n"
          class="d-flex child-flex"
          cols="4"
      >
        <v-img
            :src="require('../assets/User.png')"
            width="50"
            aspect-ratio="1.5"
        >
        </v-img>
      </v-col>
      <v-col>
        <v-spacer></v-spacer>
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