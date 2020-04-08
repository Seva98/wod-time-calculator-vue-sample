
import { cleaned, repsOfMovement } from '@/model/helpers/helpers'
import { WEIGHT_UNITS, OTHER_TYPES } from '@/data/constants'
import Movements from '@/model/data/Movements'

const movementsData = new Movements()

export default class WorkoutDifficulty {
    constructor(wods, movements) {
        this._wods = wods ? wods : []
        this._movements = movements ? movements : []
        this._cleanedMovements = cleaned(movements, wods)
    }

    getDifficulty() {
        const difficulties = []
        this._movements.forEach(movement => {
            if ('custom' in movement && movement.custom) return
            const wod = this._wods.find(wod => wod.id === movement.wodId)
            if (!wod) return
            let difficulty = 0
            if (!wod || OTHER_TYPES.includes(wod.type)) {
                difficulty = 0 
            } else {
                difficulty = this._baseMovementDifficulty(movement)
                difficulty += this._compareRepsWithBaseline(movement)
                difficulty += this._compareLoadWithBaseline(movement)
            }
            difficulties.push(difficulty)
        })
        let maxDifficulty = Math.max(...difficulties)
        if (maxDifficulty < 0) maxDifficulty = 0
        if (maxDifficulty > 10) maxDifficulty = 10
        return maxDifficulty
    }

    _baseMovementDifficulty(movement) {
        //            const wodType = this._wods.find(wod => wod.id === movement.wodId).type
        return movementsData.getDifficulty(movement.name)
    }

    _compareRepsWithBaseline(movement) {
        let highestDifficulty = 0
        const movDifficulty = movementsData.getDifficulty(movement.name)
        const movReps = repsOfMovement(movement)
        const baselineReps = movementsData.getRepsFor(movement.name)
        const repsRatio = movReps/baselineReps
        if (repsRatio < 1) {
            highestDifficulty = Math.max(highestDifficulty, 0)
        } else if (repsRatio < 2) {
            switch (movDifficulty) {
                case 0:
                case 1:
                case 2: highestDifficulty = Math.max(highestDifficulty, 1)
                break
                case 3: 
                case 4: highestDifficulty = Math.max(highestDifficulty, 2)
            }
        } else if (repsRatio < 3) {
            switch (movDifficulty) {
                case 0:
                case 1: highestDifficulty = Math.max(highestDifficulty, 1)
                break
                case 2: highestDifficulty = Math.max(highestDifficulty, 2)
                break
                case 3: 
                case 4: highestDifficulty = Math.max(highestDifficulty, 3)
            }
        } else if (repsRatio < 4) {
            switch (movDifficulty) {
                case 0: highestDifficulty = Math.max(highestDifficulty, 1)
                break
                case 1: highestDifficulty = Math.max(highestDifficulty, 2)
                break
                case 2: highestDifficulty = Math.max(highestDifficulty, 3)
                break
                case 3: 
                case 4: highestDifficulty = Math.max(highestDifficulty, 4)
            }
        } else if (repsRatio > 4) {
            switch (movDifficulty) {
                case 0: highestDifficulty = Math.max(highestDifficulty, 2)
                break
                case 1: highestDifficulty = Math.max(highestDifficulty, 3)
                break
                case 2: highestDifficulty = Math.max(highestDifficulty, 4)
                break
                case 3: 
                case 4: highestDifficulty = Math.max(highestDifficulty, 4)
            }
        }
        return highestDifficulty
    }

    _compareLoadWithBaseline(movement) {
        let highestDifficulty = 0
        if ('weight' in movement) {
            const constant = WEIGHT_UNITS.find(unit => unit.name === movement.weightUnit).constant
            const movBaselineWeight = movementsData.getBaselineWeightFor(movement.name)
            const weightRatio = (movement.weight/constant)/movBaselineWeight
            if (weightRatio < 1) {
                highestDifficulty = Math.max(highestDifficulty, 1)
            } else if (weightRatio < 1.33) {
                highestDifficulty = Math.max(highestDifficulty, 2)
            } else if (weightRatio < 1.66) {
                highestDifficulty = Math.max(highestDifficulty, 3)
            } else if (weightRatio < 2) {
                highestDifficulty = Math.max(highestDifficulty, 4)
            } else if (weightRatio < 2.5) {
                highestDifficulty = Math.max(highestDifficulty, 5)
            } else if (weightRatio >= 2.5) {
                highestDifficulty = Math.max(highestDifficulty, 6)
            }
        } else if ('height' in movement) {
            const movBaselineHeight = movementsData.getBaselineHeightFor(movement.name)
            const weightRatio = movement.weight/movBaselineHeight
            if (weightRatio <= 1) {
                highestDifficulty = Math.max(highestDifficulty, 1)
            } else if (weightRatio < 1.33) {
                highestDifficulty = Math.max(highestDifficulty, 2)
            } else if (weightRatio < 1.66) {
                highestDifficulty = Math.max(highestDifficulty, 3)
            } else if (weightRatio < 2) {
                highestDifficulty = Math.max(highestDifficulty, 4)
            } else if (weightRatio < 2.5) {
                highestDifficulty = Math.max(highestDifficulty, 5)
            } else if (weightRatio >= 2.5) {
                highestDifficulty = Math.max(highestDifficulty, 6)
            }
        }
        return highestDifficulty
    }
}