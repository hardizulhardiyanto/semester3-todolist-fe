const namespaced = true;

const state = {
    todoList: null
}

const getters = {};
const mutations = {};

const actions = {
    fetchAllTodo: ({ commit }, payload) => {
        return axios({
            method: "GET",
            url: `api/index`
        })
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error
            })
    },
    fetchAddTodo: ({ commit }, payload) => {
        return axios({
            method: "POST",
            url: `api/index`,
            data: payload
        })
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error
            })
    }
}

export default { namespaced, state, getters, mutations, actions };