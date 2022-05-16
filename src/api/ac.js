import { Api } from "./api";

class acApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(ac, controller) {
        return await Api.post(acApi.getUrl(), ac, controller);
    }

    static async modify(ac, controller) {
        return await Api.put(acApi.getUrl(ac.id), ac, controller);
    }

    static async modifyAction(ac, action, controller) {
        return await Api.put(`${ acApi.getUrl(ac.id)}/${ action }`, ac, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(acApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(acApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ acApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(acApi.getUrl(), controller);
    }
}

class ac {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "im77xxyulpegfmv8",
            name: "ac",
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
class acMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { acApi, ac, acMeta };