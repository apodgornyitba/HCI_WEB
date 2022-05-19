import { lamp, lampApi } from "@/api/lampara";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, lamp) {
            const result = await lampApi.add(lamp);
            dispatch("get", lamp.id);
            return Object.assign(new lamp(), result);
        },
        async modify({ dispatch }, lamp) {
            const result = await lampApi.modify(lamp);
            dispatch("get", lamp.id);
            return result;
        },
        async turnOn({ dispatch }, lamp) {
            const result = await lampApi.modifyAction(lamp, 'turnOn');
            dispatch("get", lamp.id);
            return Object.assign(new lamp(), result);
        },
        async turnOff({ dispatch }, lamp) {
            const result = await lampApi.modifyAction(lamp, 'turnOff');
            dispatch("get", lamp.id);
            return Object.assign(new lamp(), result);
        },
        async setColor({ dispatch }, [lamp, body]) {
            const result = await lampApi.modifyAction(lamp, 'setColor', body);
            dispatch("get", lamp.id);
            return Object.assign(new lamp(), result);
        },
        async setBrightness({ dispatch }, [lamp, body]) {
            const result = await lampApi.modifyAction(lamp, 'setBrightness', body);
            dispatch("get", lamp.id);
            return Object.assign(new lamp(), result);
        },
        async delete({ dispatch }, id) {
            await lampApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await lampApi.getState(id);
            dispatch("get", id);
            return Object.assign(new lamp(), result);
        },
        async get({ commit }, id) {
            let result = await lampApi.get(id);
            result = Object.assign(new lamp(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, lamp) {
            if(lamp["state"]["status"] === "on") {
                state.on_off = true;
            } else if(lamp["state"]["status"] === "off"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};