<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="n in 6"
          :key="n"

          cols="4"
      >
<!--        <v-img-->
<!--            :src="require('../assets/User.png')"-->
<!--            width="50"-->
<!--            aspect-ratio="1.5"-->
<!--        >-->
<!--        </v-img>-->
            <v-btn
                outlined
                large
                fab
                elevation="0"
                height="100"
                width="100"
            >
              <v-icon
                  size="50"
              >mdi-account-outline</v-icon>
            </v-btn>
      </v-col>
      <v-col class="text-right">
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