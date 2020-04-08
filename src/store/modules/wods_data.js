 import Wods from '@/model/Wods'

export default {
    namespaced: true,
  
    state: {
        wods: Wods.all
    },
  
    getters: {
        all: state => state.wods
    },

    actions: {
    },

    mutations: {

    }
}
