import {Device, DeviceApi, DeviceType, DeviceTypeApi} from "@/api/device";

export default {
    namespaced: true,
    state: {
        devices: [],
        deviceTypes: [],
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
        },
        replaceTypes(state, devices) {
            state.deviceTypes = devices;
        },
    },
};
