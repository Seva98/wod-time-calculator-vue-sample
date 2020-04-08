<template>
    <div>
        <br>
        <div class="title">Difficulty</div>
        <div class="subheading">{{result.difficulty}} out of 10</div>
        <div class="subheading">Scaling is {{result.scaling}}</div>
    </div>
</template>

<script>
import { showScore, showTime, showEmom } from '@/model/helpers/helpers'
import { DIFFICULTY_SETTINGS } from '@/data/constants'

export default {
    data: () => ({
    }),
    computed: {
        result: {
            get: function() {
                const result = this.$store.getters['workout/result']
                const difficulty = result.difficulty
                const fitnessLevel = this.$store.getters['user/fitnessLevel'].name.toLowerCase()
                const scaling = DIFFICULTY_SETTINGS[difficulty][fitnessLevel]
                return {
                    difficulty: difficulty,
                    scaling: scaling
                }
            }
        },
        score: function() { return showScore(this.wods) },
        time: function() { return showTime(this.wods) },
        emom: function() { return showEmom(this.wods) }
    }
  }
</script>