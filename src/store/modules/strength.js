import { STRENGTH } from '../mutation-types'

export default {
    namespaced: true,
  
    state: {
        movement: null,
        weight: null
    },
  
    getters: {
        movement: state => state.movement,
        weight: state => state.weight
    },

    actions: {
        setMovement: ({commit}, movement) => commit(STRENGTH.SET_MOVEMENT, movement),
        setWeight: ({commit}, weight) => commit(STRENGTH.SET_WEIGHT, weight)
    },

    mutations: {
        [STRENGTH.SET_MOVEMENT]: (state, payload) => state.movement = payload,
        [STRENGTH.SET_WEIGHT]: (state, payload) => state.weight = payload,
    }
}
