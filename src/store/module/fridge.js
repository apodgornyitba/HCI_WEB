import { fridge, fridgeApi } from "@/api/fridge";
import {lampApi} from "@/api/lampara";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, fridge) {
            const result = await fridgeApi.add(fridge);
            dispatch("get");
            return Object.assign(new fridge(), result);
        },
        async modify({ dispatch }, fridge) {
            const result = await fridgeApi.modify(fridge);
            dispatch("get");
            return result;
        },
        async setFreezerTemperature({ dispatch }, fridge) {
            const result = await lampApi.modifyAction(fridge, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new fridge(), result);
        },
        async setTemperature({ dispatch }, fridge) {
            const result = await lampApi.modifyAction(fridge, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new fridge(), result);
        },
        async setMode({ dispatch }, fridge) {
            const result = await lampApi.modifyAction(fridge, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new fridge(), result);
        },
        async delete({ dispatch }, id) {
            await fridgeApi.delete(id);
            dispatch("get");
        },
        async getState({ dispatch }, id) {
            const result = await fridgeApi.getState(id);
            dispatch("get");
            return Object.assign(new fridge(), result);
        },
        async get({ commit }, id) {
            let result = await fridgeApi.get(id);
            result = Object.assign(new fridge(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, fridge) {
            if(fridge["state"]["status"] === "opened") {
                state.on_off = true;
            } else if(fridge["state"]["status"] === "closed"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};