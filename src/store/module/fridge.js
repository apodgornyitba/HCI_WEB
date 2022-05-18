import { fridge, fridgeApi } from "@/api/fridge";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, fridge) {
            const result = await fridgeApi.add(fridge);
            dispatch("get", fridge.id);
            return Object.assign(new fridge(), result);
        },
        async modify({ dispatch }, fridge) {
            const result = await fridgeApi.modify(fridge);
            dispatch("get", fridge.id);
            return result;
        },
        async setFreezerTemperature({ dispatch }, [fridge, body]) {
            const result = await fridgeApi.modifyAction(fridge, 'setFreezerTemperature',body);
            dispatch("get", fridge.id);
            return Object.assign(new fridge(), result);
        },
        async setTemperature({ dispatch }, [fridge, body]) {
            const result = await fridgeApi.modifyAction(fridge, 'setTemperature',body);
            dispatch("get", fridge.id);
            return Object.assign(new fridge(), result);
        },
        async setMode({ dispatch }, [fridge, body]) {
            const result = await fridgeApi.modifyAction(fridge, 'setMode', body);
            dispatch("get", fridge.id);
            return Object.assign(new fridge(), result);
        },
        async delete({ dispatch }, id) {
            await fridgeApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await fridgeApi.getState(id);
            dispatch("get", id);
            return Object.assign(new fridge(), result);
        },
        async get({ commit }, id) {
            let result = await fridgeApi.get(id);
            result = Object.assign(new fridge(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace() {

        },
    },
};