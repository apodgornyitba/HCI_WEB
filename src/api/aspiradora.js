import { Api } from "./api";

class aspiradoraApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(aspiradora, controller) {
        return await Api.post(aspiradoraApi.getUrl(), aspiradora, controller);
    }

    static async modify(aspiradora, controller) {
        return await Api.put(aspiradoraApi.getUrl(aspiradora.id), aspiradora, controller);
    }

    static async modifyAction(aspiradora, action, controller) {
        return await Api.put(`${ aspiradoraApi.getUrl(aspiradora.id)}/${ action }`, aspiradora, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(aspiradoraApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(aspiradoraApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ aspiradoraApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(aspiradoraApi.getUrl(), controller);
    }
}

class aspiradora {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "eu0v2xgprrhhg41g",
            name: "aspiradora",
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
class aspiradoraMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { aspiradoraApi, aspiradora, aspiradoraMeta };