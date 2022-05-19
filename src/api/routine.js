import {Api} from "./api";

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ""}`;
    }

    static async add(routine, controller) {
        return await Api.post(RoutineApi.getUrl(), routine, controller);
    }

    static async modify(routine, controller) {
        return await Api.put(RoutineApi.getUrl(routine.id), routine, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(RoutineApi.getUrl(id), controller);
    }

    static async get(id, controller) {
        return await Api.get(RoutineApi.getUrl(id), controller);
    }

    static async getAll(controller) {
        return await Api.get(RoutineApi.getUrl(), controller);
    }

    static async execute(routine, controller) {
        return await Api.put(`${RoutineApi.getUrl(routine.id)}/execute`, routine, controller);
    }
}

class Routine {
    constructor(name, actions, meta) {
        this.name = name;
        this.actions = actions;
        this.meta = meta;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

class RoutineAction {
    constructor(device, actionName, params, meta) {
        this.device = device;
        this.actionName = actionName;
        this.params = params;
        this.meta = meta;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

class RoutineMeta {
    constructor() {
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

class RoutineActionMeta {
    constructor(human) {
        this.human = human;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

export {RoutineApi, Routine, RoutineMeta, RoutineAction, RoutineActionMeta};
