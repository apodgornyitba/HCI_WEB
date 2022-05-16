import { speaker, speakerApi } from "@/api/parlante";

export default {
    namespaced: true,
    state: {
        on_off: Boolean,
    },
    actions: {
        async create({ dispatch }, speaker) {
            const result = await speakerApi.add(speaker);
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async modify({ dispatch }, speaker) {
            const result = await speakerApi.modify(speaker);
            dispatch("get");
            return result;
        },
        async play({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'play');
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async pause({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'pause');
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async stop({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'stop');
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async resume({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'resume');
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async nextSong({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'nextSong');
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async previousSong({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'previousSong');
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async setVolume({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async setGenre({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async getPlaylist({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, /* Agregar el parametro o parametros necesarios para dispense*/);
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async delete({ dispatch }, id) {
            await speakerApi.delete(id);
            dispatch("get");
        },
        async getState({ dispatch }, id) {
            const result = await speakerApi.getState(id);
            dispatch("get");
            return Object.assign(new speaker(), result);
        },
        async get({ commit }, id) {
            let result = await speakerApi.get(id);
            result = Object.assign(new speaker(), result);
            commit("replace", result);
        },
    },
    mutations: {
        replace(state, speaker) {
            if(speaker["state"]["status"] === "opened") {
                state.on_off = true;
            } else if(speaker["state"]["status"] === "closed"){
                state.on_off = false;
            }
            //Agregar los cambios de estado que se realizarian
        },
    },
};