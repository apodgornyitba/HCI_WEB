<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"
          :name="$route.params.deviceId"
          image="door"
          on="Abierto"
          off="Cerrado"
          class="ma-auto align-center justify-center"
          @change="stateChange"
      />
    </template>

    <template v-slot:middle-pane>
      <v-row
          no-gutters
          class="align-center justify-end"
      >
        <v-col>
          <container-with-hint
              :hint="lockHint()"
          >
            <btn-device
                :disabled="deviceOn"
                ref="btnLockMode"
                image-off="icons/64/lock_closed-bw.png"
                image-on="icons/64/lock_closed-color.png"
                @click="clickLockMode"
            >
              Bloquear
            </btn-device>

            <btn-device
                :disabled="deviceOn"
                ref="btnUnlockMode"
                image-off="icons/64/lock_open-bw.png"
                image-on="icons/64/lock_open-color.png"
                @click="clickUnlockMode"
            >
              Desbloquear
            </btn-device>
          </container-with-hint>
        </v-col>
      </v-row>
    </template>

    <template v-slot:right-pane>
      <v-row class="justify-end mr-5">
        <help-d
            :message="'Para mayor seguridad bloquear la puerta después de cerrala'"
        />
      </v-row>
    </template>

  </device-generic>
</template>

<script>
import DeviceGeneric from "@/views/devices/DeviceGeneric";
import DeviceComponent from "@/components/deviceComponent";
import BtnDevice from "@/components/buttons/Device";
import HelpD from "@/components/accesories/helpD";
import ContainerWithHint from "@/components/containers/ContainerWithHint";
import {mapActions, mapState} from "vuex";

export default {
  name: "PuertaView",
  components: {ContainerWithHint, HelpD, BtnDevice, DeviceGeneric, DeviceComponent},
  data: () => ({
    deviceOn: false,
    locked: true,
    door: {
      id: '',
      name:'',
      type: {
        id: '',
        name: '',
        powerUsage: 350,
      },
    },
    result: null,
    controller: null,
  }),

  mounted() {
    this.getAllDevices().then(this.getDeviceState);
  },

  methods: {
    ...mapActions("door", {
      $modifyDoor: "modify",
      $openDoor: "open",
      $closeDoor: "close",
      $lockDoor: "lock",
      $unlockDoor: "unlock",
    }),
    ...mapActions("device", {
      $getAllDevices: "getAll",
    }),

    getDeviceState() {
      this.door = this.devices.filter(e => e.id === this.$route.params.deviceId)[0];
      if(this.door.state['status'] === "closed") {
        this.deviceOn = false;
      }
      if(this.door.state['status'] === "opened") {
        this.deviceOn = true;
      }
      if(this.door.state['lock'] === "unlocked") {
        this.locked = false;
      }
      if(this.door.state['status'] === "locked") {
        this.locked = true;
      }
    },

    setResult(result){
      this.result = JSON.stringify(result, null, 2);
    },
    //FIX: no hace la parte visual --> si se guarda el state en la api
    async openDoor(){
      try{
        await this.$openDoor(this.door)
      }catch (e){
        this.setResult(e);
      }
    },
    async closeDoor(){
      try{
        await this.$closeDoor(this.door)
      }catch (e){
        this.setResult(e);
      }
    },
    async lockDoor(){
      try{
        await this.$lockDoor(this.door)
      }catch (e){
        this.setResult(e);
      }
    },
    async unlockDoor(){
      try{
        await this.$unlockDoor(this.door)
      }catch (e){
        this.setResult(e);
      }
    },

    stateChange(active) {
      if (this.locked) {
        if (active) {
          this.$refs.devComponent.setErrorStatus(true);
        } else {
          this.$refs.devComponent.setErrorStatus(false);
        }

        this.$refs.devComponent.setStatus(false);
      } else {
        this.$refs.devComponent.setErrorStatus(false);
        if(active) {
          this.openDoor();
        } else {
          this.closeDoor();
        }
        this.deviceOn = active;
      }
    },
    clickLockMode(isActive, e) {
      this.lockDoor();
      this.locked = true;

      this.$refs.btnUnlockMode.setActive(false, e);
    },
    clickUnlockMode(isActive, e) {
      this.unlockDoor();
      this.locked = false;

      this.$refs.btnLockMode.setActive(false, e);
    },

    lockHint() {
      if (this.locked) {
        return "Desbloqueá la puerta para poder abrirla.";
      }
      return "";
    },
    async getAllDevices() {
      try {
        this.controller = new AbortController();
        await this.$getAllDevices(this.controller);
        this.controller = null;
      } catch (e) {
        console.error("Could not load devices due to: ", e);
      }
    },
  },
  computed: {
    ...mapState("device", {
      devices: (state) => state.devices,
    }),
    ...mapState("dooor", {
      on_off: (state) => state.on_off,
    }),
  }
}

</script>

<style scoped>

</style>