import { oven, ovenApi } from "@/api/horno";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, oven) {
            const result = await ovenApi.add(oven);
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async modify({ dispatch }, oven) {
            const result = await ovenApi.modify(oven);
            dispatch("get", oven.id);
            return result;
        },
        async turnOn({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, 'turnOn');
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async turnOff({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, 'turnOff');
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async setTemperature({ dispatch }, [oven, body]) {
            const result = await ovenApi.modifyAction(oven, 'setTemperature', body);
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async setHeat({ dispatch }, [oven, body]) {
            const result = await ovenApi.modifyAction(oven, 'setHeat', body);
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async setGrill({ dispatch }, [oven, body]) {
            const result = await ovenApi.modifyAction(oven, 'setGrill', body);
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async setConvection({ dispatch }, [oven, body]) {
            const result = await ovenApi.modifyAction(oven, 'setConvection', body);
            dispatch("get", oven.id);
            return Object.assign(new oven(), result);
        },
        async delete({ dispatch }, id) {
            await ovenApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await ovenApi.getState(id);
            dispatch("get", id);
            return Object.assign(new oven(), result);
        },
        async get({ commit }, id) {
            let result = await ovenApi.get(id);
            result = Object.assign(new oven(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, oven) {
            if(oven["state"]["status"] === "on") {
                state.on_off = true;
            } else if(oven["state"]["status"] === "off"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};