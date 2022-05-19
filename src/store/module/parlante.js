import { speaker, speakerApi } from "@/api/parlante";

export default {
    namespaced: true,
    state: {
        speakerStatus: String,
        playlist: {},
    },
    actions: {
        async create({ dispatch }, speaker) {
            const result = await speakerApi.add(speaker);
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async modify({ dispatch }, speaker) {
            const result = await speakerApi.modify(speaker);
            dispatch("get", speaker.id);
            return result;
        },
        async play({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'play');
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async pause({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'pause');
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async stop({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'stop');
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async resume({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'resume');
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async nextSong({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'nextSong');
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async previousSong({ dispatch }, speaker) {
            const result = await speakerApi.modifyAction(speaker, 'previousSong');
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async setVolume({ dispatch }, [speaker, body]) {
            const result = await speakerApi.modifyAction(speaker, 'setVolume', body);
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async setGenre({ dispatch }, [speaker, body]) {
            const result = await speakerApi.modifyAction(speaker, 'setGenre', body);
            dispatch("get", speaker.id);
            return Object.assign(new speaker(), result);
        },
        async getPlaylist({ commit }, [speaker, playlist]) {
            const result = await speakerApi.modifyAction(speaker, 'getPlaylist');
            commit("updatePlaylist", result);
            return Object.assign(playlist, result);
        },
        async delete({ dispatch }, id) {
            await speakerApi.delete(id);
            dispatch("get", id);
        },
        async getState({ dispatch }, id) {
            const result = await speakerApi.getState(id);
            dispatch("get", id);
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
            // if(speaker["state"]["status"] === "opened") {
            //     state.on_off = true;
            // } else if(speaker["state"]["status"] === "closed"){
            //     state.on_off = false;
            // }
            // console.log("speaker:", speaker["state"]);
            state.speakerStatus = speaker["state"]["status"];
            //Agregar los cambios de estado que se realizarian
        },
        updatePlaylist(state, result){
            state.playlist = null;
            state.playlist = result;
        },
    },
};