import { aspiradora, aspiradoraApi } from "@/api/aspiradora";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.add(aspiradora);
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async modify({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.modify(aspiradora);
            dispatch("get");
            return result;
        },
        async start({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.modifyAction(aspiradora, 'start');
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async pause({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.modifyAction(aspiradora, 'pause');
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async dock({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.modifyAction(aspiradora, 'dock');
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async setMode({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.modifyAction(aspiradora, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async setLocation({ dispatch }, aspiradora) {
            const result = await aspiradoraApi.modifyAction(aspiradora, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async delete({ dispatch }, id) {
            await aspiradoraApi.delete(id);
            dispatch("get");
        },
        async getState({ dispatch }, id) {
            const result = await aspiradoraApi.getState(id);
            dispatch("get");
            return Object.assign(new aspiradora(), result);
        },
        async get({ commit }, id) {
            let result = await aspiradoraApi.get(id);
            result = Object.assign(new aspiradora(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, aspiradora) {
            if(aspiradora["state"]["status"] === "opened") {
                state.on_off = true;
            } else if(aspiradora["state"]["status"] === "closed"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};