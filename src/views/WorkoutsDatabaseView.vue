<template>
    <v-content>
        <div class="ma-4">
            <div class="display-1 my-2">Workouts Database</div>
            <div class="title my-2">Filters</div>
            <Filters :loading="loading" @search="searchClicked" @reset="resetSearchFilter"/>
        </div>
        <v-divider class="my-2"/>
        <v-layout row wrap class="items-container">
            <template v-for="workout in workouts">
                <v-flex :key="workout.id" class="pa-1 item" xs12 sm6 md4 lg3 xl2>
                    <WorkoutComponent 
                        :key="workout.id" 
                        :workout="workout" 
                        type="list"
                        />
                </v-flex>
            </template>
        </v-layout>
        <SyncLoader :loading="loading" class="text-xs-center ma-4"/>
        <div class="text-xs-center">
            <strong v-if="noMoreWorkouts">No more workouts available for selected filter</strong>
            <v-btn v-else color="primary" @click="loadWorkouts" :disabled="loading">
                Load More Workouts
            </v-btn>
        </div>
    </v-content>
</template>


<script>
  import { mapGetters } from 'vuex'
  import Filters from '@/components/list/Filters'
  import WorkoutComponent from '@/components/list/WorkoutComponent'
  import SyncLoader from '@/components/helpers/SyncLoader'
  import waterfall from '@/model/helpers/waterfall'

  export default {
    components: {
        Filters,
        WorkoutComponent,
        SyncLoader
    },
    data: () => ({
        resizeListener: null,
        dateFilter: true,
        workouts: [],
        loading: true,
        lastWorkout: null,
        noMoreWorkouts: false,
        filter: {
            searched: false,
            sortBy: 'Date',
            sort: -1
        },
    }),
    computed: {
        ...mapGetters({
          movements: 'movementsData/all',
          wods: 'wodsData/all'
        })
    },
    methods: {
        async loadWorkouts() {
            this.loading = true
            this.noMoreWorkouts = false
            if (!this.filter.searched) this.lastWorkout = null
            const response = await this.$mongo.workouts.loadWorkouts(this.filter, this.lastWorkout)
            this.filter.searched = true
            response.workouts.forEach(workout => this.workouts.push(workout))
            this.lastWorkout = response.lastWorkout
            if (!this.lastWorkout) this.noMoreWorkouts = true
            this.loading = false
            this.activateWaterfall()
        },
        searchClicked(filter) {
            for (const key of Object.keys(filter)) {
                this.filter[key] = filter[key]
            }
            this.workouts = []
            this.loading = true
            this.noMoreWorkouts = false
            this.loadWorkouts()
        },
        resetSearchFilter() {
            this.filter.searched = false
        },
        activateWaterfall() {
            requestAnimationFrame(() => waterfall('.items-container'))
        }
    },
    mounted: async function() {
        if (!this.resizeListener) this.resizeListener = window.addEventListener('resize', this.activateWaterfall)
        await this.loadWorkouts()
    },
    destroyed: function() {
        window.removeEventListener('resize', this.activateWaterfall)
    }
  }
</script>
<style>

</style>