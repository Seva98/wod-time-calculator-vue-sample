<template>
    <div v-if="rephaos">
        <v-content> 
            <div class="ma-4">
                <div class="display-1 my-2" v-if="username">Workout Log of {{username}}</div>
                <div class="display-1 my-2" v-else>Workout Log</div>
                <LogDatePicker @onSearch="startSearch"/>
            </div>
            <div v-if="initialLoading && username">
                <v-layout
                    align-center
                    justify-center>
                    <SyncLoader class="ma-5"/>
                </v-layout>
            </div>
            <div v-else-if="username && !owner_id">
                <v-layout
                    align-center
                    justify-center>
                    {{username}} has no workouts saved in the Workout Log
                </v-layout>
            </div>
            <div v-else>
                <v-divider class="my-2"/>
                <template v-for="date in dates">
                    <div :key="date">
                        <div class="display-1 mx-4 my-2">{{toLocalDate(date)}}</div>
                        <v-layout row wrap :id="`id-${date}`">
                            <template v-for="workout in workoutsByDate(date)">
                                <v-flex :key="`${workout.id}${date}${Math.random()}`" class="pa-1 item" xs12 sm6 md4 lg3 xl2>
                                    <WorkoutComponent 
                                        :key="workout._id.toString()" 
                                        :workout="workout" 
                                        type="log"
                                        @onDelete="workoutDeleted"/>
                                </v-flex>
                            </template>
                        </v-layout>
                    </div>
                </template>
                <SyncLoader :loading="loading" class="text-xs-center ma-4"/>
                <div v-if="noWorkouts" class="text-xs-center">
                    <strong>Your workout log is empty, you can save workout through <router-link to="/">WOD Time Calculator</router-link> app</strong>
                </div>
            </div>
        </v-content>
    </div>
</template>


<script>
import LogDatePicker from '@/components/log/LogDatePicker'
import SyncLoader from '@/components/helpers/SyncLoader'
import waterfall from '@/model/helpers/waterfall'
import { capitalize, toLocalDate } from '@/model/helpers/helpers'
import WorkoutComponent from '@/components/list/WorkoutComponent'
import { mapGetters } from 'vuex'

export default {
    components: {
        LogDatePicker,
        SyncLoader,
        WorkoutComponent
    },
    props: {
    },
    data: () => ({
        resizeListener: null,
        initialLoading: false,
        loading: false,
        noWorkouts: false,
        workouts: [],
        dates: new Set(),
        owner_id: null
    }),
    computed: {
        ...mapGetters({
            rephaos: 'user/rephaos'
        }),
        username() {
            const username = this.$route.params.id
            if (username) {
                return capitalize(this.$route.params.id)
            } else {
                return ''
            }
        }
    },
    methods: {
        workoutsByDate(date) {
            const filteredWorkouts = this.workouts.filter(workout => workout.date.toISOString().substr(0,10) === date)
            return filteredWorkouts
        },
        async startSearch(date) {
            this.noWorkouts = false
            this.loading = true
            this.workouts = []
            this.dates = new Set()
            const workouts = await this.$mongo.log.loadWorkouts(date, this.owner_id)
            workouts.forEach(workout => {
                workout.author = this.$store.getters['user/name']
                this.workouts.push(workout)
                const date = workout.date.toISOString().substr(0,10)
                this.dates.add(date)
            })
            if (this.workouts.length === 0) this.noWorkouts = true
            this.dates = [...this.dates]
            this.loading = false
            this.activateWaterfall()
        },
        workoutDeleted(response) {
           if (response.status.deletedCount === 1) {
               this.workouts = this.workouts.filter(workout => workout._id !== response.id)
           }
        },
        toLocalDate(date) {
            return toLocalDate(date)
        },
        activateWaterfall() {
            this.dates.forEach(date => {
                requestAnimationFrame(() => waterfall(`#id-${date}`))
            })
        },
        async getOwnerId() {
            this.workouts = []
            this.dates = new Set()
            this.initialLoading = true
            this.owner_id = await this.$mongo.auth.getOwnerId(this.username)
            this.initialLoading = false
        }
    },
    watch: {
        username: async function() {
            await this.getOwnerId()
        }
    },
    mounted: async function() {
        if (!this.resizeListener) this.resizeListener = window.addEventListener('resize', this.activateWaterfall)
        await this.getOwnerId()
    },
    created: function() {
        if (!this.rephaos) this.$router.push('/premium')
    },
    destroyed: function() {
        window.removeEventListener('resize', this.activateWaterfall)
    }
}
</script>