import { HELPERS } from '../mutation-types'
//import createPersistedState from 'vuex-persistedstate'

export default {
    namespaced: true,
  
    state: {
        syncingDb: true,
        resourceId: '',
        lastOrderId: '',
        planId: ''
    },
  
    getters: {
        syncingDb: state => state.syncingDb,
        resourceId: state => state.resourceId,
        lastOrderId: state => state.lastOrderId,
        planId: state => state.planId
    },

    actions: {
        setSyncingDb: ({commit}, syncingDb) => commit(HELPERS.SET_SYNCINGDB, syncingDb),
        updateP: ({commit}, payload) => commit(HELPERS.UPDATE_P, payload)
    },

    mutations: {
        [HELPERS.SET_SYNCINGDB]: (state, payload) => state.syncingDb = payload,
        [HELPERS.UPDATE_P]: (state, payload) => {
            state.planId = payload.id
            state.lastOrderId = payload.orderID
            state.resourceId = payload.subscriptionID
        }
    },
   // plugins: [createPersistedState()]
}
