import { Api } from "./api";

class lampApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(lamp, controller) {
        return await Api.post(lampApi.getUrl(), lamp, controller);
    }

    static async modify(lamp, controller) {
        return await Api.put(lampApi.getUrl(lamp.id), lamp, controller);
    }

    static async modifyAction(lamp, action, body, controller) {
        return await Api.put(`${ lampApi.getUrl(lamp.id)}/${ action }`, body, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(lampApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(lampApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ lampApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(lampApi.getUrl(), controller);
    }
}

class lamp {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "eu0v2xgprrhhg41g",
            name: "lamp",
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
class lampMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { lampApi, lamp, lampMeta };