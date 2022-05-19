import {Device, DeviceApi, DeviceType, DeviceTypeApi} from "@/api/device";

export default {
    namespaced: true,
    state: {
        devices: [],
        favorites: [],
        types: [],
    },
    getters: {
        isInRoom(state) {
            return (roomId) => {
                if (!roomId) {
                    console.error("module/device.js: No room id provided.");
                    return state.devices;
                }
                return state.devices.filter(dev => dev.meta.room === roomId);
            }
        },
        favoriteDevices(state) {
            return state.devices.filter(dev => dev.meta.favorite);
        },

        getActionByType(state) {
            return function (id) {
                const device = state.types.filter(type => type.id === id);
                console.log("module/device.js: device:", device);
            }
        },
    },
    actions: {
        async create({dispatch}, device) {
            const result = await DeviceApi.add(device);
            dispatch("getAll");
            return Object.assign(new Device(), result);
        },
        async modify({dispatch}, device) {
            const result = await DeviceApi.modify(device);
            dispatch("getAll");
            return result;
        },
        async delete({dispatch}, id) {
            await DeviceApi.delete(id);
            dispatch("getAll");
        },
        async get({dispatch}, id) {
            const result = await DeviceApi.get(id);
            dispatch("getAll");
            return Object.assign(new Device(), result);
        },
        async getAll({commit}, controller) {
            let result = await DeviceApi.getAll(controller);
            result = result.map((device) => Object.assign(new Device(), device));
            commit("replace", result);
        },
        async getType({dispatch}, id) {
            const result = await DeviceTypeApi.get(id);
            dispatch("getAllTypes");
            return Object.assign(new DeviceType(), result);
        },
        async getAllTypes({commit}, controller) {
            let result = await DeviceTypeApi.getAll(controller);
            result = result.map((device) => Object.assign(new DeviceType(), device));
            commit("replaceTypes", result);
        },
    },
    mutations: {
        replace(state, devices) {
            state.devices = devices;
            state.favorites = state.devices.filter(dev => dev.meta.favorite);
        },
        replaceTypes(state, types) {
            state.types = types;
        },
    },
};
