import { door, doorApi } from "@/api/door";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, door) {
            const result = await doorApi.add(door);
            dispatch("get", door.id);
            return Object.assign(new door(), result);
        },
        async modify({ dispatch }, door) {
            const result = await doorApi.modify(door);
            dispatch("get", door.id);
            return result;
        },
        async open({ dispatch }, door) {
            const result = await doorApi.modifyAction(door, 'open');
            dispatch("get", door.id);
            return Object.assign(new door(), result);
        },
        async close({ dispatch }, door) {
            const result = await doorApi.modifyAction(door, 'close');
            dispatch("get", door.id);
            return Object.assign(new door(), result);
        },
        async lock({ dispatch }, door) {
            const result = await doorApi.modifyAction(door, 'lock');
            dispatch("get", door.id);
            return Object.assign(new door(), result);
        },
        async unlock({ dispatch }, door) {
            const result = await doorApi.modifyAction(door, 'unlock');
            dispatch("get", door.id);
            return Object.assign(new door(), result);
        },
        async delete({ dispatch }, id) {
            await doorApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await doorApi.getState(id);
            dispatch("get", id);
            return Object.assign(new door(), result);
        },
        async get({ commit }, id) {
            let result = await doorApi.get(id);
            result = Object.assign(new door(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, door) {
            if(door["state"]["status"] === "opened") {
                state.on_off = true;
            } else if(door["state"]["status"] === "closed"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};