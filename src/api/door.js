import { Api } from "./api";

class doorApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(door, controller) {
        return await Api.post(doorApi.getUrl(), door, controller);
    }

    static async modify(door, controller) {
        return await Api.put(doorApi.getUrl(door.id), door, controller);
    }

    static async modifyAction(door, action, controller) {
        return await Api.put(`${ doorApi.getUrl(door.id)}/${ action }`, door, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(doorApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(doorApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ doorApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(doorApi.getUrl(), controller);
    }
}

class door {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "lsf78ly0eqrjbz91",
            name: "door",
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
class doorMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { doorApi, door, doorMeta };