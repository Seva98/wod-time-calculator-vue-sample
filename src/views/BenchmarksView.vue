<template>
    <v-content>
        <div class="py-0">
            <div class="ma-4">
                <div class="display-1 my-2">Benchmarks</div>
            </div>
            <v-btn 
                v-for="type in types" 
                :key="'btn' + type"
                @click="selectType(type)"
                :loading="loading"
                :disabled="loading">
                {{type}}
            </v-btn>
            <v-layout>
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-text-field
                        v-model="workoutNameFilter"
                        color="secondary"
                        label="Workout Name"
                        placeholder="Workout name"
                        class="mx-3"
                        clearable
                    />
                </v-flex>
            </v-layout>
            <GoogleAd type="generic"/>
            <SyncLoader v-if="loading" :loading="loading" class="text-xs-center ma-4"/>
            <div v-else>
                <div class="title mx-4 my-2">{{selectedType}}</div>
                <v-layout row wrap :id="`id-${selectedType.replace(' ', '_')}`" class="workouts-container">
                    <template v-for="workout in workoutsToShow" >
                        <v-flex class="pa-1 item" xs12 sm6 md4 lg3 xl2 :key="`${workout.id}${Math.random()}`">
                            <WorkoutComponent 
                                :key="workout.id" 
                                :workout="workout" 
                                type="benchmark"
                                />
                        </v-flex>
                    </template>
                </v-layout>
            </div>
        </div>        
    </v-content>
</template>

<script>
import waterfall from '@/model/helpers/waterfall'
import WorkoutComponent from '@/components/list/WorkoutComponent'
import GoogleAd from '@/components/helpers/GoogleAd'
import SyncLoader from '@/components/helpers/SyncLoader'
import { BENCHMARK_TYPES } from '@/data/constants'
import { mapGetters } from 'vuex'

export default {
    components: {
        SyncLoader,
        WorkoutComponent,
        GoogleAd
    },
    data: () => ({
        resizeListener: null,
        workouts: [],
        workoutsToShow: [],
        loading: true,
        types: BENCHMARK_TYPES,
        selectedType: BENCHMARK_TYPES[0],
        workoutNameFilter: ''
    }),
    computed: {
        ...mapGetters({
            rephaos: 'user/rephaos'
        }),
    },
    methods: {
        async getWorkouts() {
            this.workouts = await this.$mongo.workouts.getBenchmarkWODs()
            this.activateWaterfall()
        },
        async selectType(newType) {
            const that = this
            that.loading = true
            await setTimeout(function() {
                that.selectedType = newType
                that.allTypeWorkouts = that.workouts[newType]
                that.workoutsToShow = that.workouts[newType]
                that.activateWaterfall()
                that.loading = false
            }, 0)
        },
        activateWaterfall() {
            requestAnimationFrame(() => waterfall(`.workouts-container`))
        }
    },
    watch: {
        workoutNameFilter: function(newName) {
            this.workoutsToShow = this.allTypeWorkouts.filter(workout => workout.name.toLowerCase().includes(newName.toLowerCase()))
            this.activateWaterfall()
        }
    },
    created: async function() {
        this.loading = true
        await this.getWorkouts()
        await this.selectType(this.selectedType)
        if (!this.resizeListener) this.resizeListener = window.addEventListener('resize', this.activateWaterfall)
        this.loading = false
    },
    destroyed: function() {
        window.removeEventListener('resize', this.activateWaterfall)
    }
}
</script>