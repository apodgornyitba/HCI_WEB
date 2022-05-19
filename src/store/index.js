import Vue from "vue";
import Vuex from "vuex";

import user from "./module/user";

import room from "./module/room";
import device from "./module/device";
import routine from "./module/routine";

import faucet from "./module/grifo"
import blinds from "./module/persiana"
import speaker from "./module/parlante"
import lamp from "./module/lampara"
import oven from "./module/horno"
import ac from "./module/ac"
import door from "./module/door"
import fridge from "./module/fridge"
import vacuum from "./module/vacuum"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        room,
        device,
        routine,
        faucet,
        blinds,
        speaker,
        lamp,
        oven,
        ac,
        door,
        fridge,
        vacuum,
    },
})
;
