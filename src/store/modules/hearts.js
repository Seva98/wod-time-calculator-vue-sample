import { HEARTS } from '../mutation-types'

export default {
    namespaced: true,
  
    state: {
        hearts: []
    },
  
    getters: {
        hearts: state => state.hearts
    },

    actions: {
        addHeart: ({commit}, id) => commit(HEARTS.ADD_HEART, id),
        removeHeart: ({commit}, id) => commit(HEARTS.REMOVE_HEART, id),
    },

    mutations: {
        [HEARTS.ADD_HEART]: (state, id) => state.hearts.push(id),
        [HEARTS.REMOVE_HEART]: (state, id) => state.hearts.splice(state.hearts.indexOf(id), 1)
    }
}
