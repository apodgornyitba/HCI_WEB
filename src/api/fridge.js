import { Api } from "./api";

class fridgeApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(fridge, controller) {
        return await Api.post(fridgeApi.getUrl(), fridge, controller);
    }

    static async modify(fridge, controller) {
        return await Api.put(fridgeApi.getUrl(fridge.id), fridge, controller);
    }

    static async modifyAction(fridge, action, body, controller) {
        return await Api.put(`${ fridgeApi.getUrl(fridge.id)}/${ action }`, body, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(fridgeApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(fridgeApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ fridgeApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(fridgeApi.getUrl(), controller);
    }
}

class fridge {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "rnizejqr2di0okho",
            name: "refrigerator",
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
class fridgeMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { fridgeApi, fridge, fridgeMeta };