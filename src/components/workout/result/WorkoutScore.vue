<template>
    <div>
        <div v-if="time">
            <br>
            <div class="title">Good time to beat:</div>
            <div v-if="zakaio" class="subheading">
                <div v-for="result in allResults" :key="result.time + result.id">
                    {{FITNESS_LEVEL[result.id].name + ': ' + result.time}}        
                </div>
            </div>
            <div v-else class="subheading">{{result.time}}</div>
        </div>
        <div v-if="score">
            <br>
            <div class="title">Good score to beat:</div>
            <div v-if="zakaio" class="subheading">
                <div v-for="result in allResults" :key="result.score + result.id">
                    {{FITNESS_LEVEL[result.id].name + ': ' + result.score}}        
                </div>
            </div>
            <div v-else class="subheading">{{result.score}}</div>
        </div>
        <div v-if="emom">
            <br>
            <div class="title">EMOM</div>
            <div class="subheading">Check reps on Workout card</div>
        </div>
    </div>
</template>

<script>
import { roundsToString, repsToString, timeToString, showScore, showTime, showEmom } from '@/model/helpers/helpers'
import { mapGetters } from 'vuex'
import { FITNESS_LEVEL } from '@/data/constants'

export default {
    data: () => ({
        FITNESS_LEVEL
    }),
    props: [
        'zakaio'
    ],
    computed: {
        ...mapGetters({
            wods: 'workout/wods'
        }),
        result: {
            get: function() {
                const result = this.$store.getters['workout/result']
                const rounds = result ? roundsToString(result.score.rounds) : ''
                const reps = result ? repsToString(Math.round(result.score.reps)) : ''
                const seperator = rounds && reps ? ` and ` : ''
                const time = result ? timeToString(result.time) : 0 
                return {
                    score: rounds + seperator + reps,
                    time: time
                }
            }
        },
        allResults: {
             get: function() {
                const results = []
                for (const i of Array(5).keys()) {
                    const resultsFromVuex = this.$store.getters['workout/results']
                    const result = resultsFromVuex[i]
                    const rounds = result ? roundsToString(result.rounds) : ''
                    const reps = result ? repsToString(Math.round(result.reps)) : ''
                    const seperator = rounds && reps ? ` and ` : ''
                    const time = result ? timeToString(result.time) : 0 
                    results.push({
                        score: rounds + seperator + reps,
                        time: time,
                        id: i
                    })
                }
                return results
            }
        },
        score: function() { return showScore(this.wods) },
        time: function() { return showTime(this.wods) },
        emom: function() { return showEmom(this.wods) }
    }
  }
</script>