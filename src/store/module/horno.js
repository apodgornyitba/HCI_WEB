import { oven, ovenApi } from "@/api/horno";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, oven) {
            const result = await ovenApi.add(oven);
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async modify({ dispatch }, oven) {
            const result = await ovenApi.modify(oven);
            dispatch("get");
            return result;
        },
        async turnOn({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, 'turnOn');
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async turnOff({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, 'turnOff');
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async setTemperature({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async setHeat({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async setGrill({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async setConvection({ dispatch }, oven) {
            const result = await ovenApi.modifyAction(oven, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new oven(), result);
        },
        async delete({ dispatch }, id) {
            await ovenApi.delete(id);
            dispatch("get");
        },
        async getState({ dispatch }, id) {
            const result = await ovenApi.getState(id);
            dispatch("get");
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