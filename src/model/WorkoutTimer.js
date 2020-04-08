import WorkoutName from '@/model/WorkoutName'

export default class WorkoutTimer extends WorkoutName {

    getCalculatedWorkoutData(difference, workout) {
        if (workout.time > difference) return ''
        const currentMovement = {...workout.allMovements.find(mov => difference < mov.comulativeTime)}
        currentMovement.movement = {...currentMovement.movement}
        currentMovement.repsInRound = {...currentMovement.repsInRound}
        const repsInRound = currentMovement.repsInRound.value
        const movementTime = currentMovement.time*60000
        const movementPercentage = (difference-currentMovement.previousComulativeTime)/movementTime
        currentMovement.movement = this._updateMovementWithCalculatedReps(currentMovement.movement, movementPercentage, repsInRound)
        return {
            movementText: `${this._frontPartOfName(currentMovement.movement, currentMovement.round)} ${this._middlePartOfName(currentMovement.movement)} ${this._endPartOfName(currentMovement.movement, currentMovement.round)}`,
            movementPercentage: movementPercentage*100,
            roundPercentage: this._getRoundPercentage(difference, currentMovement),
            workoutPercentage: this._getWorkoutPercentage(difference, workout)

        }
    }

    _frontPartOfName(movement) {
        let frontPart = ''
        if ('reps' in movement) frontPart += `${movement.reps}`
        if ('distance' in movement && 'distanceUnit' in movement) frontPart += `${movement.distance} ${movement.distanceUnit}`
        if ('duration' in movement && 'durationUnit' in movement) frontPart += `${movement.duration} ${movement.durationUnit}`
        return frontPart
    }

    _getRoundPercentage(difference, currentMovement) {
        const roundedResult = 100*(difference-currentMovement.roundTime.startTime)/(currentMovement.roundTime.duration)
        return `${roundedResult.toFixed(2)}`
    }

    _getWorkoutPercentage(difference, workout) {
        const workoutTime = workout.time*60000
        const roundedResult = 100*(difference/workoutTime)
        return `${roundedResult.toFixed(2)}`
    }

    _updateMovementWithCalculatedReps(movement, percentage, repsInRound) {
        if ("reps" in movement) {
            movement.reps = Math.floor(repsInRound*percentage)+1
        } else if ("distance" in movement) {
            movement.distance = Math.floor(repsInRound*percentage)+1
        } else if ("duration" in movement) {
            movement.duration = Math.floor(repsInRound*percentage)+1
        }
        return movement
    }
    
}