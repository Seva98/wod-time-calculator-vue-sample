<template>
    <v-layout
        v-if="loading"
        align-center
        justify-center>
        <SyncLoader class="ma-5"/>
    </v-layout>
   <div v-else>
        <div v-if="workouts.length > 0">
            <v-layout
            row
            wrap
            class="items-container"
            >
                <template v-for="workout in workouts">
                    <v-flex :key="workout.id" class="pa-1 item" xs12 sm6 md4 lg3 xl2>
                        <WorkoutComponent :key="workout.id" :workout="workout"/>
                    </v-flex>
                </template>
            </v-layout>
            <!-- TODO: <v-btn
            color="primary"
            block>
                More Workouts of {{username}}
            </v-btn> -->
        </div>   
        <div v-else>
            No workouts available for user {{username}}
        </div>
   </div>
</template>

<script>
import WorkoutComponent from '@/components/list/WorkoutComponent'
import SyncLoader from '@/components/helpers/SyncLoader'
import { WORKOUTS_TO_LOAD } from '@/data/constants'

export default {
    props: [
        'username'
    ],
    data: () => ({
        loading: false,
        workouts: [],
        WORKOUTS_TO_LOAD
    }),
    components: {
        SyncLoader,
        WorkoutComponent
    },
    methods: {
        loadWorkouts: async function() {
            this.workouts = await this.$mongo.workouts.loadTopWorkoutsOfUser(this.username)
        }
    },
    mounted: async function() {
        this.loading = true
        await this.loadWorkouts()
        this.loading = false
    },
    watch: {
        username: async function() {
            this.loading = true
            await this.loadWorkouts()
            this.loading = false
        }
    }
}
</script>