import { Api } from "./api";

class blindsApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(blinds, controller) {
        return await Api.post(blindsApi.getUrl(), blinds, controller);
    }

    static async modify(blinds, controller) {
        return await Api.put(blindsApi.getUrl(blinds.id), blinds, controller);
    }

    static async modifyAction(blinds, action, controller) {
        return await Api.put(`${ blindsApi.getUrl(blinds.id)}/${ action }`, blinds, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(blindsApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(blindsApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ blindsApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(blindsApi.getUrl(), controller);
    }
}

class blinds {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "eu0v2xgprrhhg41g",
            name: "blinds",
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
class blindsMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { blindsApi, blinds, blindsMeta };