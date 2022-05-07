<template>
  <container-noutline
      title="[HOGAR]"
  >
    <template v-for="dev in this.devices">
      <card-device
          :key="dev.name"
          :name="dev.name"
          :image="dev.image"
          :state1="dev.state1"
          :state2="dev.state2"
          class="my-3 mx-1 pa-0"
      />
    </template>

  </container-noutline>
</template>


<script>
export default {
  name: "cardDispHouse"
}
</script>

<style scoped>

</style>