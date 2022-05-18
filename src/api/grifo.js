import { Api } from "./api";

class faucetApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(faucet, controller) {
        return await Api.post(faucetApi.getUrl(), faucet, controller);
    }

    static async modify(faucet, controller) {
        return await Api.put(faucetApi.getUrl(faucet.id), faucet, controller);
    }

    static async modifyAction(faucet, action, body, controller) {
        return await Api.put(`${ faucetApi.getUrl(faucet.id)}/${ action }`, body, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(faucetApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(faucetApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ faucetApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(faucetApi.getUrl(), controller);
    }
}

class faucet {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "dbrlsh7o5sn8ur4i",
            name: "faucet",
            powerUsage: 15,
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
class faucetMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { faucetApi, faucet, faucetMeta };
