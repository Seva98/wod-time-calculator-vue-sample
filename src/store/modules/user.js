import { USER } from '../mutation-types'
import { WEIGHT_UNITS, HEIGHT_UNITS, DISTANCE_UNITS, DURATION_UNITS, FITNESS_LEVEL } from '@/data/constants'
//import createPersistedState from 'vuex-persistedstate'

export default {
    namespaced: true,
  
    state: {
        darkMode: true,
        gender: "Male",
        bodyweight: null,
        weightUnit: WEIGHT_UNITS[0],
        heightUnit: HEIGHT_UNITS[0],
        distanceUnit: DISTANCE_UNITS[0],
        durationUnit: DURATION_UNITS[0],
        fitnessLevel: FITNESS_LEVEL.find(lvl => lvl.name === 'Advanced'),
        user: null,
        name: null,
        newsletter: false,
        rephaos: true,
        rephaosDate: null,
        planId: null,
        created: null,
        lastOnline: null,
        email: null,
        img: null
    },
  
    getters: {
        darkMode: state => state.darkMode,
        gender: state => state.gender,
        bodyweight: state => state.bodyweight,
        weightUnit: state => state.weightUnit,
        heightUnit: state => state.heightUnit,
        distanceUnit: state => state.distanceUnit,
        durationUnit: state => state.durationUnit,
        fitnessLevel: state => state.fitnessLevel,
        user: state => state.user,
        name: state => state.name,
        newsletter: state => state.newsletter,
        rephaos: state => state.rephaos,
        rephaosDate: state => state.rephaosDate,
        email: state => state.email,
        img: state => state.img
    },

    actions: {
        toggleDarkMode: ({commit}) => commit(USER.TOGGLE_DARKMODE),
        toggleGender: ({commit}) => commit(USER.TOGGLE_GENDER),
        setBodyweight: ({commit}, bodyweight) => commit(USER.SET_BODYWEIGHT, bodyweight),
        setWeightUnit: ({commit}, weightUnit) => commit(USER.SET_WEIGHT_UNIT, weightUnit),
        toggleWeightUnit: ({commit}) => commit(USER.TOGGLE_WEIGHT_UNIT),
        setHeightUnit: ({commit}, heightUnit) => commit(USER.SET_HEIGHT_UNIT, heightUnit),
        setDistanceUnit: ({commit}, distanceUnit) => commit(USER.SET_DISTANCE_UNIT, distanceUnit),
        setDurationUnit: ({commit}, durationUnit) => commit(USER.SET_DURATION_UNIT, durationUnit),
        setFitnessLevel: ({commit}, fitnessLevel) => commit(USER.SET_FITNESS_LEVEL, fitnessLevel),
        setUser: ({commit}, user) => commit(USER.SET_USER, user),
        setNewsletter: ({commit}, newsletter) => commit(USER.SET_NEWSLETTER, newsletter),
        setRephaos: ({commit}, rephaos) => commit(USER.SET_REPHAOS, rephaos),
        updateName: ({commit}, name) => commit(USER.UPDATE_NAME, name),
        // Resets persisted state
        resetData: ({commit}) => {
            commit(USER.SET_WEIGHT_UNIT, WEIGHT_UNITS[0])
            commit(USER.SET_HEIGHT_UNIT, HEIGHT_UNITS[0])
            commit(USER.SET_DISTANCE_UNIT, DISTANCE_UNITS[0])
            commit(USER.SET_DURATION_UNIT, DURATION_UNITS[0])
            commit(USER.SET_FITNESS_LEVEL, FITNESS_LEVEL[2])
            commit(USER.SET_USER, null)
        }
    },

    mutations: {
        [USER.TOGGLE_DARKMODE]: (state) => state.darkMode = !state.darkMode,
        [USER.TOGGLE_GENDER]: (state) => state.gender = state.gender === "Male" ? "Female" : "Male",
        [USER.SET_BODYWEIGHT]: (state, payload) => state.bodyweight = payload,
        [USER.SET_WEIGHT_UNIT]: (state, payload) => state.weightUnit = payload,
        [USER.TOGGLE_WEIGHT_UNIT]: (state) => { 
            const kg = WEIGHT_UNITS.find(unit => unit.name === 'kg')
            const lbs = WEIGHT_UNITS.find(unit => unit.name === 'lbs')
            state.weightUnit = state.weightUnit === kg ? lbs : kg
        },
        [USER.SET_HEIGHT_UNIT]: (state, payload) => state.heightUnit = payload,
        [USER.SET_DISTANCE_UNIT]: (state, payload) => state.distanceUnit = payload,
        [USER.SET_DURATION_UNIT]: (state, payload) => state.durationUnit = payload,   
        [USER.SET_FITNESS_LEVEL]: (state, payload) => state.fitnessLevel = payload,
        [USER.SET_NEWSLETTER]: (state, payload) => state.newsletter = payload,
        [USER.SET_REPHAOS]: (state, payload) => {
            if (payload) {
                state.planId = payload.planId
                state.rephaos = payload.rephaos
                state.rephaosDate = payload.rephaosDate
            } else {
                state.planId = null
                state.rephaos = false
                state.rephaosDate = null
            }
        },
        [USER.UPDATE_NAME]: (state, payload) => state.name = payload,
        [USER.SET_USER]: (state, payload) => { 
            if (payload) {
                state.user = payload.id
                state.email = payload.email
                state.created = payload.created
                state.lastOnline = payload.lastOnline
                state.name = payload.name
                state.newsletter = payload.newsletter
            } else {
                state.user = null
                state.email = null
                state.created = null
                state.lastOnline = null
                state.name = null
                state.newsletter = null
                state.rephaos = null
            }
        }
    },
   // plugins: [createPersistedState()]
}
