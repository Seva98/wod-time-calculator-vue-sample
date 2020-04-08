import { adjustBaselineWithDifficulty, adjustWeightConstant, adjustHeightConstant } from '@/model/score/adjusts'
import { FITNESS_LEVEL, WEIGHT_UNITS, HEIGHT_UNITS } from '@/data/constants'
import Movements from '@/model/data/Movements'
import store from '@/store'
const movementsData = new Movements()

export const getEmomReps = (movement) => {
    const fitnessLevel = store.getters['user/fitnessLevel']
    if ('custom' in movement && movement.custom) return 0
    let reps = movementsData.getRepsFor(movement.name)
    let units = movementsData.getUnitsFor(movement.name)
    if (units.includes("Weight")) {
        const constant = WEIGHT_UNITS.find(unit => unit.name === movement.weightUnit).constant
        const weight = movement.weight/constant
        let baselineWeight = movementsData.getBaselineWeightFor(movement.name)
        baselineWeight = adjustBaselineWithDifficulty(baselineWeight, 'weight', fitnessLevel)
        const weightRatio = adjustWeightConstant(weight/baselineWeight)
        reps = reps*weightRatio*0.7
    }
    if (units.includes("Height")) {
        const constant = HEIGHT_UNITS.find(unit => unit.name === movement.heightUnit).constant
        const height = movement.height/constant
        let baselineHeight = movementsData.getBaselineHeightFor(movement.name)
        baselineHeight = adjustBaselineWithDifficulty(baselineHeight, 'height', fitnessLevel)
        const heightRatio = adjustHeightConstant(height/baselineHeight)
        reps = reps*heightRatio
    }
    switch (fitnessLevel.name) {
        case FITNESS_LEVEL[0].name: return Math.round(reps*0.3) > 0 ? Math.round(reps*0.3) : 1
        case FITNESS_LEVEL[1].name: return Math.round(reps*0.45)> 0 ? Math.round(reps*0.45) : 1
        case FITNESS_LEVEL[2].name: return Math.round(reps*0.8)> 0 ? Math.round(reps*0.8) : 1
        case FITNESS_LEVEL[3].name: return Math.round(reps*0.9)> 0 ? Math.round(reps*0.9) : 1
        case FITNESS_LEVEL[4].name: return Math.round(reps)> 0 ? Math.round(reps) : 1
    }
}