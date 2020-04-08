import { WOD_TYPE } from '@/data/constants'
import { getEmomReps } from '@/model/score/Emom'
import store from '@/store'

export default class WorkoutName {
    constructor(wods, movements) {
        this._wods = wods ? wods : []
        this._movements = movements ? movements : []
        this._fitnessLevel = store.getters['user/fitnessLevel']
    }
    
    getAllNames() {
        this._wodNames = this._getWodsNames(this._wods)
        this._movementNames = this._getMovementsNames(this._movements, this._wods)

        return {
            wods: this._wodNames,
            movements: this._movementNames
        }
    }

    _getWodsNames(wods) {
        return wods.map((wod) => {
            return {
                id: wod.id,
                name: `${this._wodName(wod)}`
            }
        }) 
    }

    _wodName(wod) {
        if (wod) {
            const value = wod.value
            switch (wod.type) {
                case WOD_TYPE.ONE_ROUND: return 'For Time'
                case WOD_TYPE.MULTIPLE_ROUNDS:
                case WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS: return value ? value + ' Rounds For Time' : 'For Time'
                case WOD_TYPE.AMRAP:
                case WOD_TYPE.AMRAP_DIF_REPS:
                case WOD_TYPE.AMRAP_MAX_REPS: return value ? value + ' Min AMRAP' : 'AMRAP'
                case WOD_TYPE.EMOM: return value ? value + ' Min EMOM' : 'EMOM'
                case WOD_TYPE.STRENGTH:
                case WOD_TYPE.CUSTOM: return value ? value : 'Workout'
                default: return 'Workout'
            }
        }
    }

    _getMovementsNames(movements, wods) {
        let normalNames = this._normalReps(movements)
        wods.forEach(wod => {
            switch (wod.type) {
                case WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS: this._updateForDifReps(movements, wods, normalNames); break
                case WOD_TYPE.AMRAP_DIF_REPS: this._updateForAmrapDif(movements, wods, normalNames); break
                case WOD_TYPE.AMRAP_MAX_REPS: this._updateForMaxReps(movements, wods, normalNames); break
                case WOD_TYPE.EMOM: this._updateForEmom(movements, wods, normalNames); break
                case WOD_TYPE.STRENGTH: this._updateForStrength(movements, wods, normalNames); break
                case WOD_TYPE.CUSTOM: this._updateForCustom(movements, wods, normalNames); break
                // case WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS: return value ? value + ' Rounds For Time' : 'For Time'
                // case WOD_TYPE.AMRAP_DIF_REPS:
                // case WOD_TYPE.EMOM: return value ? value + ' Min EMOM' : 'EMOM'
            }
        })
        return normalNames
    }

    _normalReps(movements) {
        return movements.map((movement) => {
            if ('custom' in movement && movement.custom) {
                return {
                    id: movement.id,
                    name: {title: movement.title, description: movement.description}
                }
            } else {
                return {
                    id: movement.id,
                    name: `${this._frontPartOfName(movement)} ${this._middlePartOfName(movement)} ${this._endPartOfName(movement)}`
                }
            }
        })
    }

    _updateForDifReps(movements, wods, normalNames) {
        const difWods = this._wodsOfType(wods, WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS)
        difWods.forEach(wod => {
            const movementsToChange = movements.filter(mov => mov.movId === wod.id)
            movementsToChange.forEach(mov => {
                if ('custom' in mov && mov.custom) return
                const indexToReplace = normalNames.findIndex(name => name.id === mov.id)
                normalNames[indexToReplace] = `${this._frontPartOfName(mov)} ${this._middlePartOfName(mov)} ${this._endPartOfName(mov)}`
            })
        })
    }

    _updateForAmrapDif(movements, wods, normalNames) {
        const difWods = this._wodsOfType(wods, WOD_TYPE.AMRAP_DIF_REPS)
        difWods.forEach(wod => {
            const movementsToChange = movements.filter(mov => mov.wodId === wod.id)
            movementsToChange.forEach(mov => {
                if ('custom' in mov && mov.custom) return
                const indexToReplace = normalNames.findIndex(name => name.id === mov.id)
                normalNames[indexToReplace].name = `${this._frontPartOfName(mov)} ${this._middlePartOfName(mov)} ${this._endPartOfName(mov)}`
            })
        })
    }

    _updateForMaxReps(movements, wods, normalNames) {
        const lastMovements = this._lastMovementsPerWod(movements)
        const maxWods = this._wodsOfType(wods, WOD_TYPE.AMRAP_MAX_REPS)
        maxWods.forEach(wod => {
            const lastMovement = lastMovements[`${wod.id}`]
            const indexToReplace = normalNames.findIndex(name => name.id === lastMovement.id)
            if (lastMovement) {
                if ('custom' in lastMovement && lastMovement.custom) return
                normalNames[indexToReplace].name = `Max ${this._middlePartOfName(lastMovement)} ${this._endPartOfName(lastMovement)}`
            }
        })
    }

    _updateForEmom(movements, wods, normalNames) {
        const emomWods = this._wodsOfType(wods, WOD_TYPE.EMOM)
        emomWods.forEach(wod => {
            const movementsToChange = movements.filter(mov => mov.wodId === wod.id)
            movementsToChange.forEach(mov => {
                if ('custom' in mov && mov.custom) return
                const indexToReplace = normalNames.findIndex(name => name.id === mov.id)
                normalNames[indexToReplace].name = `${this._frontPartOfNameForEmom(mov)} ${this._middlePartOfName(mov)} ${this._endPartOfName(mov)}`
            })
        })
    }

    _updateForStrength(movements, wods, normalNames) {
        const strengthWods = this._wodsOfType(wods, WOD_TYPE.STRENGTH)
        strengthWods.forEach(wod => {
                const movementsToChange = movements.filter(mov => mov.wodId === wod.id)
                movementsToChange.forEach(mov => {
                    if ('custom' in mov && mov.custom) return
                    const indexToReplace = normalNames.findIndex(name => name.id === mov.id)
                    normalNames[indexToReplace].name = mov.sets + ' x ' + normalNames[indexToReplace].name
            })
        })
    }

    _updateForCustom(movements, wods, normalNames) {
        const customWods = this._wodsOfType(wods, WOD_TYPE.CUSTOM)
        customWods.forEach(wod => {
            const movementsToChange = movements.filter(mov => mov.wodId === wod.id)
            movementsToChange.forEach(mov => {
                const indexToReplace = normalNames.findIndex(name => name.id === mov.id)
                normalNames[indexToReplace].name = {}
                normalNames[indexToReplace].name.title = mov.title
                normalNames[indexToReplace].name.description = mov.description
            })
        })
    }

    _lastMovementsPerWod(movements) {
        let lastMovements = {}
        movements.forEach(movement => {
            if (!lastMovements[`${movement.wodId}`]) {
                lastMovements[`${movement.wodId}`] = movement
            } else if (lastMovements[`${movement.wodId}`].id < movement.id) {
                lastMovements[`${movement.wodId}`] = movement
            }
        })
        return lastMovements
    }

    _frontPartOfNameForEmom(movement) {
        return getEmomReps(movement, this._fitnessLevel)
    }

    _frontPartOfName(movement) {
        let frontPart = ''
        if ('reps' in movement) {
            const increment = parseInt(movement.increment)
            const reps = parseInt(movement.reps)
            if (typeof movement.reps === 'object') {
                movement.reps = movement.reps.filter(v => v !== "")
                frontPart += `${movement.reps.join('-')}`
            } else {
                'increment' in movement ? frontPart += `${reps}-${reps+increment}-${reps+increment*2}-...` : frontPart += movement.reps
            }
        }
        if ('distance' in movement && 'distanceUnit' in movement) {
            const increment = parseInt(movement.distanceIncrement)
            const distance = parseInt(movement.distance)
            if (typeof movement.distance === 'object') {
                movement.distance = movement.distance.filter(v => v !== "")
                frontPart += `${movement.distance.join('-')} ${movement.distanceUnit}`
            } else {
                'distanceIncrement' in movement ? frontPart += `${distance}-${distance+increment}-${distance+increment*2}-... ${movement.distanceUnit}` : frontPart += `${movement.distance} ${movement.distanceUnit}`
            }
        }
        if ('duration' in movement && 'durationUnit' in movement) {
            const increment = parseInt(movement.durationIncrement)
            const duration = parseInt(movement.duration)
            if (typeof movement.duration === 'object') {
                movement.duration = movement.duration.filter(v => v !== "")
                frontPart += `${movement.duration.join('-')} ${movement.durationUnit}`
            } else {
                'durationIncrement' in movement ? frontPart += `${duration}-${duration+increment}-${duration+increment*2}-... ${movement.durationUnit}` : frontPart += `${movement.duration} ${movement.durationUnit}`
            }
        }
        return frontPart
    }

    _middlePartOfName(movement) {
        return 'name' in movement ? movement.name : ''
    }

    _endPartOfName(movement, round) {
        let endPart = ''
        if ('weight' in movement && 'weightUnit' in movement) {
            const increment = parseInt(movement.weightIncrement)
            const weight = parseInt(movement.weight)
            if (typeof movement.weight  === 'object') {
                movement.weight = movement.weight.filter(v => v !== "")
                endPart += `${movement.weight.join('-')} ${movement.weightUnit}`
            } else if ('weightIncrement' in movement) {
                if (round >= 0) {
                    endPart += `${movement.weight+(round*movement.weightIncrement)} ${movement.weightUnit}`
                } else {
                    endPart += `${weight}-${weight+increment}-${weight+increment*2}-... ${movement.weightUnit}`
                }
            } else {
                if (movement.weightUnit === '%') {
                    endPart += `@ ${movement.weight}${movement.weightUnit} of 1 RM`
                } else {
                    endPart += `${movement.weight} ${movement.weightUnit}`
                }
            }
        }
        if ('height' in movement && 'heightUnit' in movement) {
            const increment = parseInt(movement.heightIncrement)
            const height = parseInt(movement.height)
            if (typeof movement.height === 'object') {
                movement.height = movement.height.filter(v => v !== "")
                endPart += `${movement.height.join('-')} ${movement.heightUnit}`
            } else if ('heightIncrement' in movement) {
                if (round >= 0) {
                    endPart += `${movement.height+(round*movement.heightIncrement)} ${movement.heightUnit}`
                } else {
                    endPart += `${height}-${height+increment}-${height+increment*2}-...  ${movement.heightUnit}`
                }
            } else {
                endPart += `${movement.height} ${movement.heightUnit}`
            }
        }
        return endPart
    }

    _wodsOfType(wods, type) {
        return wods.filter(wod => wod.type === type)
    }
}