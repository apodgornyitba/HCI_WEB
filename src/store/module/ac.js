import { ac, acApi } from "@/api/ac";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, ac) {
            const result = await acApi.add(ac);
            dispatch("get");
            return Object.assign(new ac(), result);
        },
        async modify({ dispatch }, ac) {
            const result = await acApi.modify(ac);
            dispatch("get", ac.id);
            return result;
        },
        async turnOn({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, 'turnOn');
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async turnOff({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, 'turnOff');
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async setTemperature({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async setMode({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async setVerticalSwing({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async setHorizontalSwing({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async setFanSpeed({ dispatch }, ac) {
            const result = await acApi.modifyAction(ac, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get", ac.id);
            return Object.assign(new ac(), result);
        },
        async delete({ dispatch }, id) {
            await acApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await acApi.getState(id);
            dispatch("get", id);
            return Object.assign(new ac(), result);
        },
        async get({ commit }, id) {
            let result = await acApi.get(id);
            result = Object.assign(new ac(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, ac) {
            if(ac["state"]["status"] === "on") {
                state.on_off = true;
            } else if(ac["state"]["status"] === "off"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};