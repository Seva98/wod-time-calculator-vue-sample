import store from '@/store'
import { showScore, showTime } from '@/model/helpers/helpers'

export const getWTCRank = (score) => {
    const results = store.getters['workout/results']
    const wods = store.getters['workout/wods']
    let min = 0
    let max = 0
    let minRank = 0
    let maxRank = 0

    if (showTime(wods)) {
        const minutes = score.minutes || 0
        const seconds = score.seconds || 0
        const time = minutes + seconds/60 
        
        if (time > results[0].time) {
            return 0
        } else if (time <= results[0].time && time > results[1].time) {
            min = results[0].time
            max = results[1].time
            minRank = 0
            maxRank = 40 
        } else if (time <= results[1].time && time > results[2].time) {
            min = results[1].time
            max = results[2].time   
            minRank = 40
            maxRank = 80 
        } else if (time <= results[2].time && time > results[3].time) {
            min = results[2].time
            max = results[3].time 
            minRank = 80
            maxRank = 95 
        } else if (time <= results[3].time && time > results[4].time) {
            min = results[3].time
            max = results[4].time 
            minRank = 95
            maxRank = 99 
        } else if (time <= results[4].time) {
            return 100
        }

        const ratio = (time-min)/(max-min)
        const rank = ratio*(maxRank-minRank)+minRank
        
        return Math.round(rank)
    } else if (showScore(wods)) {
        const reps = score.reps
        const rounds = score.rounds
        const amrapReps = results[4].repsInRound
        let totalReps = 0
        
        if (rounds > results[4].rounds) return 100

        for (let i = 0; i < rounds; i++) {
            totalReps += amrapReps[i]
        }
        totalReps += reps

        if (totalReps < results[0].totalReps) {
            return 0
        } else if (totalReps >= results[0].totalReps && totalReps < results[1].totalReps) {
            min = results[0].totalReps
            max = results[1].totalReps
            minRank = 0
            maxRank = 40
        } else if (totalReps >= results[1].totalReps && totalReps < results[2].totalReps) {
            min = results[1].totalReps
            max = results[2].totalReps
            minRank = 40
            maxRank = 80
        } else if (totalReps >= results[2].totalReps && totalReps < results[3].totalReps) {
            min = results[2].totalReps
            max = results[3].totalReps
            minRank = 80
            maxRank = 95
        } else if (totalReps >= results[3].totalReps && totalReps < results[4].totalReps) {
            min = results[3].totalReps
            max = results[4].totalReps
            minRank = 95
            maxRank = 99
        } else if (totalReps >= results[4].totalReps) {
            return 100
        }

        const ratio = (totalReps-min)/(max-min)
        const rank = ratio*(maxRank-minRank)+minRank
    
        return Math.round(rank)
    }

    return undefined

}

export const getDbRank = (workoutData, rank) => {
    if (!workoutData || !('usersRank' in workoutData)) return
    let total = 0
    let subtotal = 0
    for (let i = 0; i <= 100; i += 1) {
        if (i in workoutData.usersRank) total += workoutData.usersRank[i]
        if (i <= rank) subtotal = total
    }
    if (total < 10) return
    const percentile = Math.round((subtotal / total) * 100)
    return percentile
}
