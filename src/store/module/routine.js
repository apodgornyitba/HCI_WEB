import {Routine, RoutineApi} from "@/api/routine";

export default {
    namespaced: true,
    state: {
        routines: [],
    },
    getters: {},

    actions: {
        async create({dispatch}, routine) {
            const result = await RoutineApi.add(routine);
            dispatch("getAll");
            return Object.assign(new Routine(), result);
        },
        async modify({dispatch}, routine) {
            const result = await RoutineApi.modify(routine);
            dispatch("getAll");
            return result;
        },
        async delete({dispatch}, id) {
            await RoutineApi.delete(id);
            dispatch("getAll");
        },
        async get({dispatch}, id) {
            const result = await RoutineApi.get(id);
            dispatch("getAll");
            return Object.assign(new Routine(), result);
        },
        async getAll({commit}, controller) {
            let result = await RoutineApi.getAll(controller);
            result = result.map((routine) => Object.assign(new Routine(), routine));
            commit("replace", result);
        },
    },

    mutations: {
        replace(state, routines) {
            state.routines = routines;
            state.favorites = state.routines.filter(dev => dev.meta.favorite);
        },
    },
}
