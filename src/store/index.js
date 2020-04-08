import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import hearts from './modules/hearts'
import helpers from './modules/helpers'
import movementsData from './modules/movements_data'
import strength from './modules/strength'
import user from './modules/user'
import wodsData from './modules/wods_data'
import workout from './modules/workout'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    hearts,
    helpers,
    movementsData,
    strength,
    user,
    wodsData,
    workout
  },
  //This makes all store modules persist through page refresh
  plugins: [createPersistedState(
    {
      paths: ['user']
    }
  )]
})
