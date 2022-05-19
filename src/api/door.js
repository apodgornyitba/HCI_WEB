import { Api } from "./api";

class DoorApi {
    //*
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }
    //*
    static async add(door, controller) {
        return await Api.post(DoorApi.getUrl(), door, controller);
    }
    //*
    static async modify(door, controller) {
        return await Api.put(DoorApi.getUrl(door.id), door, controller);
    }

    static async modifyAction(door, action, controller) {
        return await Api.put(`${ DoorApi.getUrl(door.id)}/${ action }`, door, controller);
    }
    //*
    static async delete(id, controller) {
        return await Api.delete(DoorApi.getUrl(id), controller);
    }
    //*
    static async get(id, controller) {
        return await Api.get(DoorApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ DoorApi.getUrl(id)}/state`, controller);
    }
    //*
    static async getAll(controller) {
        return await Api.get(DoorApi.getUrl(), controller);
    }
}

class Door {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type = {
            id: "lsf78ly0eqrjbz91",
            //*
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
class DoorMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { DoorApi, Door, DoorMeta };