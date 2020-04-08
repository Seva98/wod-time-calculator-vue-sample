import { WORKOUT } from '../mutation-types'
import { WOD_TYPE, FITNESS_LEVEL } from '@/data/constants'
import { cleaned, sorted} from '@/model/helpers/helpers'
import { getEmomReps } from '@/model/score/Emom'
import WorkoutDifficulty from '@/model/WorkoutDifficulty'
import WorkoutName from '@/model/WorkoutName'
import WorkoutTime from '@/model/score/WorkoutTime'
import store from '@/store'
import Vue from 'vue'

export default {
    namespaced: true,
  
    state: {
        name: "",
        wods: [],
        movements: [],
        result: {
            score: {
                rounds: 0,
                reps: 0
            },
            time: 0,
            difficulty: 0
        },
        results: {},
        names: {
            wods: [],
            movements: []
        },
        wod: null,
        movement: null,
        newMovement: null,
        saving: false
    },
  
    getters: {
        wods: state => sorted(state.wods),
        wodById: state => (id) => state.wods[id],
        movements: state => cleaned(sorted(state.movements), state.wods),
        movementById: state => (id) => state.movements[id],
        movement: state => state.movement,
        wod: state => state.wod,
        name: state => state.name,
        allMovementsForWodOfId: state => (id) => state.movements.filter(mov => id === mov.wodId),
        largestIdForWodOfId: state => (id) => state.movements.filter(mov => id === mov.wodId).slice(-1)[0].id + 1,
        largestMovementId: state => state.movements.length > 0 ? state.movements.slice(-1)[0].id + 1 : 0,
        largestWodId: state => state.wods.length > 0 ? state.wods.slice(-1)[0].id +1 : 0,
        result: state => state.result,
        names: state => state.names,
        newMovement: state => state.newMovement,
        results: state => state.results,
        saving: state => state.saving,
        export: state => btoa(JSON.stringify({
            wods: state.wods,
            movements: state.movements,
            result: state.result,
            results: state.results,
            names: state.names
        }))
    },

    actions: {
        setWorkout: ({commit}, workout) => {
            commit(WORKOUT.SET_WORKOUT, workout)
            commit(WORKOUT.UPDATE_SCORE)
            commit(WORKOUT.UPDATE_SCORE_FOR_EMOM)
            commit(WORKOUT.UPDATE_DIFFICULTY)
            commit(WORKOUT.UPDATE_NAMES)
            commit(WORKOUT.UPDATE_RESULTS)
        }, 
        setName: ({commit}, name) => commit(WORKOUT.SET_NAME, name),
        newEditedWod: ({commit}, wod) => commit(WORKOUT.NEW_EDITED_WOD, wod),
        setEditedWod: ({commit}, wod) => commit(WORKOUT.SET_EDITED_WOD, wod),
        removeWod: ({commit}, wod) => commit(WORKOUT.REMOVE_WOD, wod),
        switchWods: ({commit}, wod) => commit(WORKOUT.SWITCH_WODS, wod),
        saveEditedWod: ({commit}, wod) => commit(WORKOUT.SAVE_EDITED_WOD, wod),
        resetEditedWod: ({commit}) => commit(WORKOUT.RESET_EDITED_WOD),
        addMovement: ({commit}, movement) => commit(WORKOUT.ADD_MOVEMENT, movement),
        removeMovement: ({commit}, movement) => commit(WORKOUT.REMOVE_MOVEMENT, movement),
        switchMovements: ({commit}, movement) => commit(WORKOUT.SWITCH_MOVEMENTS, movement),
        newEditedMovement: ({commit}, movement) => commit(WORKOUT.NEW_EDITED_MOVEMENT, movement),
        setEditedMovement: ({commit}, movement) => commit(WORKOUT.SET_EDITED_MOVEMENT, movement),
        saveEditedMovement: ({commit}, movement) => commit(WORKOUT.SAVE_EDITED_MOVEMENT, movement),
        editMovement: ({commit}, movement) => commit(WORKOUT.EDIT_MOVEMENT, movement),
        resetEditedMovement: ({commit}) => commit(WORKOUT.RESET_EDITED_MOVEMENT),
        changeMovementType: ({commit}, type) => commit(WORKOUT.CHANGE_MOVEMENT_TYPE, type),
        addResultsToWod: ({commit}, results) => commit(WORKOUT.ADD_RESULTS_TO_WOD, results),
        updateScore: ({commit}) => commit(WORKOUT.UPDATE_SCORE),
        updateScoreForEmom: ({commit}, fitnessLevel) => commit(WORKOUT.UPDATE_SCORE_FOR_EMOM, fitnessLevel), 
        updateDifficulty: ({commit}) => commit(WORKOUT.UPDATE_DIFFICULTY),
        updateNames: ({commit}) => commit(WORKOUT.UPDATE_NAMES), 
        updateAll2: ({commit}) => commit(WORKOUT.UPDATE_ALL),
        setNewMovement: ({commit}, value) => commit(WORKOUT.SET_NEW_MOVEMENT, value),
        addKeyToMovement: ({commit}, payload) => commit(WORKOUT.ADD_KEY_TO_MOVEMENT, payload),
        resetState: ({commit}) => commit(WORKOUT.RESET_STATE),
        setSaving: ({commit}, payload) => commit(WORKOUT.SET_SAVING, payload),
        updateAll: ({commit}) => {
            commit(WORKOUT.UPDATE_SCORE)
            commit(WORKOUT.UPDATE_SCORE_FOR_EMOM)
            commit(WORKOUT.UPDATE_DIFFICULTY)
            commit(WORKOUT.UPDATE_NAMES)
            commit(WORKOUT.UPDATE_RESULTS)
        },
        import: ({commit}, payload) => commit(WORKOUT.IMPORT, payload)
    },

    mutations: {
        [WORKOUT.SET_WORKOUT]: (state, workout) => {
            state.wods = workout.wods
            state.movements = workout.movements
        },
        [WORKOUT.SET_NAME]: (state, payload) => state.name = payload,
        [WORKOUT.ADD_WOD]: (state, payload) => state.wods.push(payload),
        [WORKOUT.EDIT_WOD]: (state, payload) => {
            let index = getIndexForWod(state, payload)
            state.wods[index] = {...state.wods[index], ...payload}
        },
        [WORKOUT.OVERWRITE_WOD]: (state, payload) => {
            let index = getIndexForWod(state, payload)
            state.wods[index] = payload
        },
        [WORKOUT.REMOVE_WOD]: (state, payload) => {
            state.wods = state.wods.filter(wod => wod.id !== payload.id)
            state.movements = state.movements.filter(mov => mov.wodId !== payload.id)
        },
        [WORKOUT.SWITCH_WODS]: (state, payload) => {
            const oldWodIndex = payload.oldIndex
            const newWodIndex = payload.newIndex
            // Switch ids of movements
            var tempMovementId = state.wods[oldWodIndex].id
            state.wods[oldWodIndex].id = state.wods[newWodIndex].id
            state.wods[newWodIndex].id = tempMovementId
            // Sort them by new ids
            state.wods.sort((a,b) => (a.id - b.id))
        },
        [WORKOUT.ADD_MOVEMENT]: (state, payload) => {
            const maxId = Math.max.apply(Math, state.movements.filter(mov => mov.wodId === payload.wodId).map(mov => mov.id))
            payload.id = maxId+1
            state.movements.push(payload)
        },
        [WORKOUT.EDIT_MOVEMENT]: (state, payload) => {
            let index = getIndexForMovement(state, payload)
            state.movements[index] = {...state.movements[index], ...payload}
        },
        [WORKOUT.OVERWRITE_MOVEMENT]: (state, payload) => {
            let index = getIndexForMovement(state, payload)
            state.movements[index] = payload
        },
        [WORKOUT.REMOVE_MOVEMENT]: (state, payload) => state.movements = state.movements.filter(movement => movement.id !== payload.id),
        [WORKOUT.SWITCH_MOVEMENTS]: (state, payload) => {
            const oldMovementIndex = getIndexOfMovementByIdAndWodId(state, payload, true)
            const newMovementIndex = getIndexOfMovementByIdAndWodId(state, payload, false)
            // Switch ids of movements
            var tempMovementId = state.movements[oldMovementIndex].id
            state.movements[oldMovementIndex].id = state.movements[newMovementIndex].id
            state.movements[newMovementIndex].id = tempMovementId
            // Sort them by new ids
            state.movements.sort((a,b) => (a.id - b.id))
        },
        [WORKOUT.NEW_EDITED_MOVEMENT]: (state, payload) => state.movement = payload,
        [WORKOUT.SET_EDITED_MOVEMENT]: (state, payload) => state.movement = payload,
        [WORKOUT.ADD_KEY_TO_MOVEMENT]: (state, payload) => state.movement[payload.key] = payload.value,
        [WORKOUT.SAVE_EDITED_MOVEMENT]: (state, payload) => {
            let index = getIndexForMovement(state, payload)
            if (!payload.rounds) delete payload.rounds
            if (index === -1) {
                state.movements.push(payload)
            } else {
                state.movements.splice(index, 1, payload)
            }
            state.movement = null
        },
        [WORKOUT.RESET_EDITED_MOVEMENT]: (state) => state.movement = null,
        [WORKOUT.CHANGE_MOVEMENT_TYPE]: (state, payload) =>  state.movement.type = payload, 
        [WORKOUT.NEW_EDITED_WOD]: (state, payload) => state.wod = payload,
        [WORKOUT.SET_EDITED_WOD]: (state, payload) => state.wod = payload,
        [WORKOUT.SAVE_EDITED_WOD]: (state, payload) => {
            let index = getIndexForWod(state, payload)
            if (index === -1) {
                const maxId = Math.max.apply(Math, state.wods.map(w => w.id))
                payload.id = maxId === -Infinity ? 0 : maxId + 1
                state.wods.push(payload)
            } else {
                if (payload.type !== state.wods[index].type) {
                    state.movements = state.movements.filter(mov => mov.wodId !== payload.id)
                }
                state.wods.splice(index, 1, payload)
            }
            state.wod = null
        },
        [WORKOUT.RESET_EDITED_WOD]: (state) => state.wod = null,
        [WORKOUT.ADD_RESULTS_TO_WOD]: (state, payload) => {
            const wodIndex = state.wods.findIndex(el => el.id === payload.id)
            state.wods[wodIndex].time = payload.time 
            state.wods[wodIndex].score = payload.score 
        },
        [WORKOUT.UPDATE_ALL]: (state) => {
            // CALLING ALL FUNCTIONS MANUALLY AS commit() CAN'T BE DONE INSIDE ANOTHER COMMIT
            // UPDATE_SCORE
            const fitnessLevel = store.getters['user/fitnessLevel']
            const gender = store.getters['user/gender']
            const workoutTime = new WorkoutTime(state.wods, state.movements, fitnessLevel, gender)
            const result = workoutTime.getResult()
            state.result = {...result}
            // UPDATE_SCORE_FOR_EMOM
            state.wods.forEach(wod => {
                if (wod.type === WOD_TYPE.EMOM) {
                    const movements = state.movements.filter(mov => wod.id === mov.wodId)
                    movements.forEach(mov => {
                        mov.reps = getEmomReps(mov, fitnessLevel)
                    }) 
                }
            })
            // UPDATE_DIFFICULTY
            const workoutDifficulty = new WorkoutDifficulty(state.wods, state.movements)
            const difficulty = workoutDifficulty.getDifficulty()
            Vue.set(state.result, 'difficulty', difficulty)
            // UPDATE_NAMES
            const workoutName = new WorkoutName(state.wods, state.movements)
            const names = workoutName.getAllNames()
            state.names = {...names}
        },
        [WORKOUT.UPDATE_SCORE]: (state) => {
            const fitnessLevel = store.getters['user/fitnessLevel']
            const workoutTime = new WorkoutTime(state.wods, state.movements, fitnessLevel)
            const result = workoutTime.getResult()
            state.result = {...result}
        },
        [WORKOUT.UPDATE_SCORE_FOR_EMOM]: (state, fitnessLevel) => {
            state.wods.forEach(wod => {
                if (wod.type === WOD_TYPE.EMOM) {
                    const movements = state.movements.filter(mov => wod.id === mov.wodId)
                    movements.forEach(mov => {
                        mov.reps = getEmomReps(mov, fitnessLevel)
                    }) 
                }
            })
        },
        [WORKOUT.UPDATE_DIFFICULTY]: (state) => {
            const workoutDifficulty = new WorkoutDifficulty(state.wods, state.movements)
            const difficulty = workoutDifficulty.getDifficulty()
            Vue.set(state.result, 'difficulty', difficulty)
        },
        [WORKOUT.UPDATE_NAMES]: (state) => {
            const workoutName = new WorkoutName(state.wods, state.movements)
            const names = workoutName.getAllNames()
            state.names = {...names}
        },
        [WORKOUT.UPDATE_RESULTS]: (state) => {
            const results = []
            FITNESS_LEVEL.forEach(level => {
                const workoutTime = new WorkoutTime(state.wods, state.movements, level)
                const result = workoutTime.getSimpleResult()
                result.difficulty = level.value
                results.push(result)
            })
            state.results = {
                0: { rounds: results[0].score.rounds, reps: results[0].score.reps, totalReps: results[0].score.totalReps, time: results[0].time, repsInRound: results[0].score.repsInRound },
                1: { rounds: results[1].score.rounds, reps: results[1].score.reps, totalReps: results[1].score.totalReps, time: results[1].time, repsInRound: results[1].score.repsInRound },
                2: { rounds: results[2].score.rounds, reps: results[2].score.reps, totalReps: results[2].score.totalReps, time: results[2].time, repsInRound: results[2].score.repsInRound },
                3: { rounds: results[3].score.rounds, reps: results[3].score.reps, totalReps: results[3].score.totalReps, time: results[3].time, repsInRound: results[3].score.repsInRound },
                4: { rounds: results[4].score.rounds, reps: results[4].score.reps, totalReps: results[4].score.totalReps, time: results[4].time, repsInRound: results[4].score.repsInRound },
            }
        },
        [WORKOUT.SET_NEW_MOVEMENT]: (state, value) => {
            state.newMovement = value
        },
        [WORKOUT.RESET_STATE]: (state) => {
            state.name = ""
            state.wods = []
            state.movements = []
            state.wod = null
            state.movement = null
            state.names = {
                wods: [],
                movements: []
            }
            state.newMovement = null
            state.saving = false
        },
        [WORKOUT.SET_SAVING]: (state, payload) => {
            state.saving = !!payload
        },
        [WORKOUT.LOAD_WORKOUT]: (state, payload) => {
            state.movements = payload.movements
            state.wods = payload.wods
        },
        [WORKOUT.IMPORT]: (state, payload) => {
            const updateObj = JSON.parse(atob(payload))
            state.wods = updateObj.wods
            state.movements = updateObj.movements
            state.result = updateObj.result
            state.results = updateObj.results
            state.names = updateObj.names
        }
    }
}

//Helper Functions
const getIndexForWod = (state, payload) => state.wods.findIndex(wod => wod.id === payload.id)
const getIndexForMovement = (state, payload) => state.movements.findIndex(movement => movement.id === payload.id)
const getIndexOfMovementByIdAndWodId = (state, payload, oldIndex) => state.movements.findIndex(movement => movement.id === (oldIndex ? payload.oldIndex : payload.newIndex) && movement.wodId === payload.wodId)