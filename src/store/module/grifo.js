import {faucet, faucetApi} from "@/api/grifo";

export default {
    namespaced: true,
    state: {
        unitType: '',
        on_off: Boolean,
    },
    actions: {
        async create({dispatch}, faucet) {
            const result = await faucetApi.add(faucet);
            dispatch("get", faucet.id);
            return Object.assign(new faucet(), result);
        },
        async modify({dispatch}, faucet) {
            const result = await faucetApi.modify(faucet);
            dispatch("get", faucet.id);
            return result;
        },
        async open({dispatch}, faucet) {
            const result = await faucetApi.modifyAction(faucet, 'open', {});
            dispatch("get", faucet.id);
            return Object.assign(new faucet(), result);
        },
        async close({dispatch}, faucet) {
            const result = await faucetApi.modifyAction(faucet, 'close', {});
            dispatch("get", faucet.id);
            return Object.assign(new faucet(), result);
        },
        async dispense({dispatch}, [faucet, body]) {
            const result = await faucetApi.modifyAction(faucet, 'dispense', body);
            dispatch("get", faucet.id);
            return Object.assign(new faucet(), result);
        },
        async delete({dispatch}, id) {
            await faucetApi.delete(id);
            dispatch("get", id);
        },
        async getState({dispatch}, id) {
            const result = await faucetApi.getState(id);
            dispatch("get", id);
            return Object.assign(new faucet(), result);
        },
        async get({commit}, id) {
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