import { Room, RoomApi } from "../../api/room";

export default {
  namespaced: true,
  state: {
    rooms: [],
  },
  actions: {
    async create({ dispatch }, room) {
      const result = await RoomApi.add(room);
      dispatch("getAll");
      return Object.assign(new Room(), result);
    },
    async modify({ dispatch }, room) {
      const result = await RoomApi.modify(room);
      dispatch("getAll");
      return result;
    },
    async delete({ dispatch }, id) {
      await RoomApi.delete(id);
      dispatch("getAll");
    },
    async get({ dispatch }, id) {
      const result = await RoomApi.get(id);
      dispatch("getAll");
      return Object.assign(new Room(), result);
    },
    async getAll({ commit }, controller) {
      let result = await RoomApi.getAll(controller);
      result = result.map((room) => Object.assign(new Room(), room));
      commit("replace", result);
    },
  },
  mutations: {
    replace(state, rooms) {
      state.rooms = rooms;
    },
  },
};
