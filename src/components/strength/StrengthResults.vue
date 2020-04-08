<template>
    <div>
        <v-btn
        @click="getResults"
        color="primary"
        :loading="loading"
        :disabled="loading">
            Get Results
        </v-btn>
        <div v-if="results && results.length > 0">
            <v-divider class="my-2"/> 
            <div class="title" >
                <ul>
                    <li 
                    v-for="result in results" 
                    :key="result"
                    class="my-2">{{result}}</li>
                </ul>
            </div>
        </div>
        <div v-if="error" style="color:red">
            {{error}}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Strength from '@/model/strength/Strength'


export default {
    data: () => ({
        movements: [],
        results: [],
        error: null,
        loading: false
    }),
    computed: {
        ...mapGetters({
            movement: 'strength/movement',
            weight: 'strength/weight',
            bodyweight: 'user/bodyweight',
            weightUnit: 'user/weightUnit',
            gender: 'user/gender'
        })
    },
    methods: {
        getResults: async function() {
            this.loading = true
            let data = await this.$mongo.strength.updateModel(this.movement, this.weight, this.bodyweight, this.gender)
            this.loading = false
            console.log(data)
            const strength = new Strength(data, this.movement, this.weight, this.bodyweight, this.weightUnit, this.gender)
            let percentile = strength.getPercentile()
            
            if (!percentile) {
                this.error = 'Please select movement, fill weight and bodyweight.'
                return
            } else {
                this.error = null
            }
            this.results = []
            this.results.push(`You have lifted 1 rep of ${this.movement.toLowerCase()} with ${this.weight} ${this.weightUnit.name} at ${this.bodyweight} ${this.weightUnit.name}`)
            this.results.push(`This makes your lift to bodyweight ratio equal to ${Math.round((this.weight/this.bodyweight)*100)/100}`)
            this.results.push(`Your lift is better than ${percentile}% of ${this.gender.toLowerCase()} lifters`)
        }
    }
}
</script>