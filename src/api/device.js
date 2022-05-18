import {Api} from "./api";

class DeviceApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devices${slug ? `/${slug}` : ""}`;
    }

    static async add(device, controller) {
        return await Api.post(DeviceApi.getUrl(), device, controller);
    }

    static async modify(device, controller) {
        return await Api.put(DeviceApi.getUrl(device.id), device, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(DeviceApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(DeviceApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(DeviceApi.getUrl(), controller);
    }
}

class DeviceTypeApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/devicetypes${slug ? `/${slug}` : ""}`;
    }

    static async get(id, controller) {
        return await Api.get(DeviceTypeApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(DeviceTypeApi.getUrl(), controller);
    }
}


class Device {
    constructor(id, name, type, meta) {
        if (type) {
            this.type = type;
        }
        if (id) {
            this.id = id;
        }

        this.name = name;
        this.meta = meta;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

class DeviceMeta {
    constructor(image, favorite, room) {
        this.image = image;
        this.favorite = favorite;
        if (room) {
            this.room = room;
        }
    }
}


class DeviceType {
    constructor(id) {
        this.id = id;
    }
}

export {DeviceApi, DeviceTypeApi, Device, DeviceMeta, DeviceType};
