import { Api } from "./api";

class speakerApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(speaker, controller) {
        return await Api.post(speakerApi.getUrl(), speaker, controller);
    }

    static async modify(speaker, controller) {
        return await Api.put(speakerApi.getUrl(speaker.id), speaker, controller);
    }

    static async modifyAction(speaker, action, body, controller) {
        return await Api.put(`${ speakerApi.getUrl(speaker.id)}/${ action }`, body, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(speakerApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(speakerApi.getUrl(id), controller);
    }

    static async getState(id, controller) {
        return await Api.get(`${ speakerApi.getUrl(id)}/state`, controller);
    }

    static async getAll(controller) {
        return await Api.get(speakerApi.getUrl(), controller);
    }
}

class speaker {
    constructor(id, name, meta) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.type={
            id: "c89b94e8581855bc",
            name: "speaker",
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
class speakerMeta {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }
}
export { speakerApi, speaker, speakerMeta };