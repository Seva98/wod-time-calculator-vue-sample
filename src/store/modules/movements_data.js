import { MOVEMENT_DATA } from '../mutation-types'
import Movements from '@/model/data/Movements'

const movements = new Movements()

export default {
    namespaced: true,
  
    state: {
        movements: null
    },
  
    getters: {
        all: state => state.movements
    },

    actions: {
        loadAllMovements: ({commit}) => commit('GET_ALL')
    },

    mutations: {
        [MOVEMENT_DATA.GET_ALL]: (state) => state.movements = movements.getAll()
    }
}
