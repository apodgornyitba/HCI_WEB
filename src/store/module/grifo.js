import { faucet, faucetApi } from "@/api/grifo";

export default {
    namespaced: true,
    state: {
        unitType: '',
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, faucet) {
            const result = await faucetApi.add(faucet);
            dispatch("get");
            return Object.assign(new faucet(), result);
        },
        async modify({ dispatch }, faucet) {
            const result = await faucetApi.modify(faucet);
            dispatch("get");
            return result;
        },
        async open({ dispatch }, faucet) {
            const result = await faucetApi.modifyAction(faucet, 'open');
            dispatch("get");
            return Object.assign(new faucet(), result);
        },
        async close({ dispatch }, faucet) {
            const result = await faucetApi.modifyAction(faucet, 'close');
            dispatch("get");
            return Object.assign(new faucet(), result);
        },
        async dispense({ dispatch }, faucet) {
            const result = await faucetApi.modifyAction(faucet, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new faucet(), result);
        },
        async delete({ dispatch }, id) {
            await faucetApi.delete(id);
            dispatch("get");
        },
        async getState({ dispatch }, id) {
            const result = await faucetApi.getState(id);
            dispatch("get");
            return Object.assign(new faucet(), result);
        },
        async get({ commit }, id) {
            let result = await faucetApi.get(id);
            result = Object.assign(new faucet(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, faucet) {
            if(faucet["state"]["status"] === "opened") {
                state.on_off = true;
            } else if(faucet["state"]["status"] === "closed"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};