import { blinds, blindsApi } from "@/api/persiana";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, blinds) {
            const result = await blindsApi.add(blinds);
            dispatch("get");
            return Object.assign(new blinds(), result);
        },
        async modify({ dispatch }, blinds) {
            const result = await blindsApi.modify(blinds);
            dispatch("get");
            return result;
        },
        async open({ dispatch }, blinds) {
            const result = await blindsApi.modifyAction(blinds, 'open');
            dispatch("get");
            return Object.assign(new blinds(), result);
        },
        async close({ dispatch }, blinds) {
            const result = await blindsApi.modifyAction(blinds, 'close');
            dispatch("get");
            return Object.assign(new blinds(), result);
        },
        async setLevel({ dispatch }, blinds) {
            const result = await blindsApi.modifyAction(blinds, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new blinds(), result);
        },
        async delete({ dispatch }, id) {
            await blindsApi.delete(id);
            dispatch("get");
        },
        async getState({ dispatch }, id) {
            const result = await blindsApi.getState(id);
            dispatch("get");
            return Object.assign(new blinds(), result);
        },
        async get({ commit }, id) {
            let result = await blindsApi.get(id);
            result = Object.assign(new blinds(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, blinds) {
            if(blinds["state"]["status"] === "opened") {
                state.on_off = true;
            } else if(blinds["state"]["status"] === "closed"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};