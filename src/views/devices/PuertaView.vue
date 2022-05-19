<template>
  <device-generic>

    <template v-slot:left-pane>
      <device-component
          ref="devComponent"

          :name="$route.params.deviceId"
          :loading="waitingForApi"
          :show-switch="!locked"

          on="Abierto"
          off="Cerrado"
          image="door"

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
                ref="btnLockMode"

                :disabled="deviceOn"
                :loading="waitingForApi"

                image-off="icons/64/lock_closed-bw.png"
                image-on="icons/64/lock_closed-color.png"

                @click="clickLockMode"
            >
              Bloquear
            </btn-device>

            <btn-device
                ref="btnUnlockMode"

                :disabled="deviceOn"
                :loading="waitingForApi"

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
    waitingForApi: true,
    intervalID: null,
    routePath: '',

    deviceOn: false,
    locked: true,
    door: {
      id: '',
      name: '',
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
    /* Llamada antes del loop */
    this.getAllDevices().then(this.getDeviceState);

    this.routePath = this.$route.path;
    this.intervalID = setInterval(() => {
      this.getAllDevices().then(this.getDeviceState);
      if (!this.routePath || this.$route.path !== this.routePath) {
        clearInterval(this.intervalID);
      }
    }, 5000);
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

      if (!this.door) {
        return;
      }
      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);

        if (this.door.state['status'] === "opened") {
          this.deviceOn = true;
        } else {
          this.deviceOn = false;
        }
        this.$refs.devComponent.setStatus(this.deviceOn);

        if (this.door.state['lock'] === "unlocked") {
          this.locked = false;
          this.$refs.btnLockMode.setActive(false);
          this.$refs.btnUnlockMode.setActive(true);
        } else {
          this.locked = true;
          this.$refs.btnUnlockMode.setActive(false);
          this.$refs.btnLockMode.setActive(true);
        }
      } catch (e) {
        console.error("Error while getting device state. Moving on anyway.", e);
      } finally {

        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }

    },

    setResult(result) {
      this.result = JSON.stringify(result, null, 2);
    },

    //FIX: no hace la parte visual --> si se guarda el state en la api
    async openDoor() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);

        await this.$openDoor(this.door)
      } catch (e) {
        this.setResult(e);
        console.error("Error opening door:", e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },
    async closeDoor() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        this.$refs.devComponent.waitForExternalApi(true);
        await this.$closeDoor(this.door)
      } catch (e) {
        this.setResult(e);
        console.error("Error closing door:", e);
      } finally {
        this.$refs.devComponent.waitForExternalApi(false);
        this.waitingForApi = false;
      }
    },
    async lockDoor() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        await this.$lockDoor(this.door);
      } catch (e) {
        this.setResult(e);
      } finally {
        this.waitingForApi = false;
      }
    },
    async unlockDoor() {
      if (this.waitingForApi) {
        return;
      }

      try {
        this.waitingForApi = true;
        await this.$unlockDoor(this.door);
      } catch (e) {
        this.setResult(e);
      } finally {
        this.waitingForApi = false;
      }
    },

    stateChange(active) {
      if (this.waitingForApi) {
        return;
      }

      if (this.locked) {
        this.$refs.devComponent.setStatus(false);
      } else {
        if (active) {
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