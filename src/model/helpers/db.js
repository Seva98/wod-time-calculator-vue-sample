import { roundKg } from '@/model/helpers/helpers'
import { FITNESS_LEVEL } from '@/data/constants'
import WorkoutTime from '@/model/score/WorkoutTime'
import store from '@/store'
import Movements from '@/model/data/Movements'

export const normalizedMovements = () => {
    const movements = [...store.getters['workout/movements']]
    const gender = store.getters['user/gender']
    movements.map(movement => {
        if (movement.weightUnit === 'lbs' || gender === 'Female') {
            if (movement.weightUnit === 'lbs') {
                movement.weight = movement.weight * 0.45359237
            } else if (movement.weightUnit === 'pood') {
                movement.weight = movement.weight * 16.3806872
            }
            movement.weightUnit = 'kg'
            if (gender === 'Female') movement.weight = movement.weight * 1.5
            movement.weight = roundKg(movement.weight)
        }
        delete movement['type']
        delete movement['units']
    })
    return movements
}

export const createScores = (wods, movements) => {
    const results = []
    FITNESS_LEVEL.forEach(level => {
        const workoutTime = new WorkoutTime(wods, movements, level)
        const result = workoutTime.getSimpleResult()
        result.difficulty = level.value
        results.push(result)
    })
    return {
        0: { rounds: results[0].score.rounds, reps: results[0].score.reps, time: results[0].time, difficulty: results[0].difficulty },
        1: { rounds: results[1].score.rounds, reps: results[1].score.reps, time: results[1].time, difficulty: results[1].difficulty },
        2: { rounds: results[2].score.rounds, reps: results[2].score.reps, time: results[2].time, difficulty: results[2].difficulty },
        3: { rounds: results[3].score.rounds, reps: results[3].score.reps, time: results[3].time, difficulty: results[3].difficulty },
        4: { rounds: results[4].score.rounds, reps: results[4].score.reps, time: results[4].time, difficulty: results[4].difficulty },
    }
}

export const getCountRange = (length) => {
    const range = Array.from(Array(length+1).keys())
    range.shift()
    return range
}

export const getMovementNames = (movements) => {
    const names = new Set()
    movements.forEach(movement => names.add(movement.name))
    return [...names]
}

export const getUsedWodTypes = (wods) => {
    const types = new Set()
    wods.forEach(wod => types.add(wod.type))
    return [...types]
}

export const getAllUsedCategories = (movements) => {
    const movementsData = new Movements()
    const categories = new Set()
    movements.forEach(mov => {
        const categoriesOfMov = movementsData.getCategoriesFor(mov.name)
        if (categoriesOfMov) categoriesOfMov.forEach(category => categories.add(category))
    })
    return [...categories]
}

export const findCategoriesAcrossAllMovements = (movements) => {
    const movementsData = new Movements()
    const categories = new Set()
    movements.forEach(mov => {
        if (!('name' in mov)) return
        movementsData.getCategoriesFor(mov.name).forEach(category => categories.add(category))
    })
    let categoriesCounts = {}
    categories.forEach(category => categoriesCounts[category] = 0)
    movements.forEach(mov => {
        if (!('name' in mov)) return
        movementsData.getCategoriesFor(mov.name).forEach(category => categoriesCounts[category] += 1)
    })
    let filteredCategories = Object.keys(categoriesCounts).filter(key => categoriesCounts[key] === movements.length)
    return [...filteredCategories]
}

