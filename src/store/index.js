import Vue from 'vue'
import Vuex from 'vuex'
import moduleTodo from './modules/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todos: moduleTodo
  }
})
