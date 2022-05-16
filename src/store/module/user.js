export default {
    namespaced: true,
    state: {
        userData: {},
    },
    getters: {
        data: state => {
            return state.userData
        },
    },
    mutations: {
        initializeStore(state) {
            const plainItem = localStorage.getItem('userData');
            if (plainItem) {
                state.userData = JSON.parse(plainItem);
            } else {
                state.userData = {id: '', name: ''};
            }
        },
        userData(state, payload) {
            const obj = {
                id: payload.id,
                name: payload.name
            };

            state.userData = obj
            localStorage.setItem('userData', JSON.stringify(obj));
        },

        clearUserData(state) {
            state.userData = {id: '', name: ''};
            localStorage.removeItem('userData');
        },
    },
}
