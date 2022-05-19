import { Door, DoorApi } from "@/api/door";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, door) {
            const result = await DoorApi.add(door);
            dispatch("get", door.id);
            return Object.assign(new Door(), result);
        },
        async modify({ dispatch }, door) {
            const result = await DoorApi.modify(door);
            dispatch("get", door.id);
            return result;
        },
        async open({ dispatch }, door) {
            console.log("open:", door);
            const result = await DoorApi.modifyAction(door, 'open');
            dispatch("get", door.id);
            return Object.assign(new Door(), result);
        },
        async close({ dispatch }, door) {
            const result = await DoorApi.modifyAction(door, 'close');
            dispatch("get", door.id);
            return Object.assign(new Door(), result);
        },
        async lock({ dispatch }, door) {
            const result = await DoorApi.modifyAction(door, 'lock');
            dispatch("get", door.id);
            return Object.assign(new Door(), result);
        },
        async unlock({ dispatch }, door) {
            const result = await DoorApi.modifyAction(door, 'unlock');
            dispatch("get", door.id);
            return Object.assign(new Door(), result);
        },
        async delete({ dispatch }, id) {
            await DoorApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await DoorApi.getState(id);
            dispatch("get", id);
            return Object.assign(new Door(), result);
        },
        async get({ commit }, id) {
            let result = await DoorApi.get(id);
            result = Object.assign(new Door(), result);
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