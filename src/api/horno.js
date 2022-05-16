import { Api } from "./api";

class ovenApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(oven, controller) {
        return await Api.post(ovenApi.getUrl(), oven, controller);
    }

    static async modify(oven, controller) {
        return await Api.put(ovenApi.getUrl(oven.id), oven, controller);
    }

    static async modifyAction(oven, action, controller) {
        return await Api.put(`${ ovenApi.getUrl(oven.id)}/${ action }`, oven, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(ovenApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(ovenApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ ovenApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(ovenApi.getUrl(), controller);
    }
}

class oven {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "im77xxyulpegfmv8",
            name: "oven",
            powerUsage: 350,
        }
        this.meta = meta;
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
    getType(){
        return this.type;
    }
}
class ovenMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { ovenApi, oven, ovenMeta };