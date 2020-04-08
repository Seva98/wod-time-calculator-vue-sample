<template>
    <v-layout
        v-if="loading"
        align-center
        justify-center>
        <SyncLoader class="ma-5"/>
    </v-layout>
    <div v-else>
        <div v-if="stats">
            <div v-for="category in categories" :key="category.name">
                <div class="title">{{category.name}}</div>
                <v-layout row wrap>
                    <Stats
                        v-for="date in dates"
                        :key="date.name"
                        :title="`${category.name} (${date.name})`" 
                        :data="category.obj[date.obj]" 
                        :loading="loading"
                    />
                </v-layout>
            </div>
        </div>
        <div v-else>
            <div v-if="username">
                No stats available for user {{username}}
            </div>
            <div v-else>
                No stats available, you need to log workout first
            </div>
        </div>
    </div>
</template>

<script>
import { to2Dec, toNth, sortedNames } from '@/model/helpers/helpers'
import Stats from '@/components/profile/Stats'
import SyncLoader from '@/components/helpers/SyncLoader'

export default {
    props: [
        'username'
    ],
    components: {
        Stats,
        SyncLoader
    },
    data: () => ({
        summaryStats: {},
        movementsStats: {},
        workoutsStats: {},
        date: new Date(),
        stats: {},
        loading: false,
        percentage: true,
        resetCategories: false
    }),
    computed: {
        currentMonth: function() {
            return new Date().toISOString().slice(0,7)
        },
        lastMonth: function() {
            const previousMonth = this.date.setMonth(this.date.getMonth()-1)
            return new Date(previousMonth).toISOString().slice(0,7)
        },
        currentYear: function() {
            return new Date().toISOString().slice(0,4)
        },
        dates: function() {
            return [
                {name: 'Alltime', obj: 'alltime'}, 
                {name: 'Current Month', obj: this.currentMonth},
                {name: 'Last Month', obj: this.lastMonth},
                {name: 'Current Year', obj: this.currentYear}
            ]
        },
        categories: function() {
            return [
                {name: 'Summary', obj: this.summaryStats},
                {name: 'Movements', obj: this.movementsStats},
                {name: 'Workouts', obj: this.workoutsStats}
            ]
        },
    },
    methods: {
        createTotalStats() {
            const dates = ['alltime', this.currentMonth, this.lastMonth, this.currentYear]
            dates.forEach(date => {
                const curObj = this.stats[date]
                if (!curObj) return
                this.summaryStats[date] = [
                    { name: 'Total Workouts Logged', value: curObj.rankedWorkoutsLogged || 0},
                    { name: 'Average Rank', value: `${toNth(to2Dec(curObj.totalRank/curObj.rankedWorkoutsLogged))} percentile` || 0 },
                    { name: 'Average Difficulty', value: to2Dec(curObj.totalRankedDifficulty/curObj.rankedWorkoutsLogged) || 0}
                ]
                this.movementsStats[date] = [
                    { name: 'Top Logged', value: sortedNames(curObj.movementNamesRanked)},
                    { name: 'Modality', value: sortedNames({
                        'Bodyweight': curObj.categories.Bodyweight || 0,
                        'Cardio': curObj.categories.Cardio || 0,
                        'Weight': curObj.categories.Weight || 0
                    })},
                    { name: 'Type', value: sortedNames({
                        'Multiple': curObj.categories.Multiple || 0,
                        'Pull': curObj.categories.Pull || 0,
                        'Push': curObj.categories.Push || 0,
                        'Squat': curObj.categories.Squat || 0
                    })},
                    { name: 'Type (Weight Only)', value: sortedNames({
                        'Barbell': curObj.categories.Multiple || 0,
                        'Dumbbell': curObj.categories.Push || 0,
                        'Kettlebell': curObj.categories.Pull || 0,
                        'Other': curObj.categories.Squat || 0
                    })},
                    { name: 'Type (Bodyweight Only)', value: sortedNames({
                        'Bar': curObj.categories.Multiple || 0,
                        'No Equipment': curObj.categories.Pull || 0,
                        'Rings': curObj.categories.Push || 0,
                        'Other': curObj.categories.Squat || 0
                    })},
                ]
                this.workoutsStats[date] = [
                    { name: 'Top Logged', value: sortedNames(curObj.wodsTypesRanked)},
                    { name: 'Average Workout Duration', value: `${to2Dec(curObj.totalRankedTime/curObj.rankedWorkoutsLogged)} min` || `0 min`},
                    { name: 'Average Movements Count Per Workout', value: to2Dec(curObj.movementsRankedCount/curObj.rankedWorkoutsLogged) || 0}
                ]
            })
        }
    },
    watch: {
        username: async function() {
            this.loading = true
            this.summaryStats = {}
            this.movementsStats = {}
            this.workoutsStats = {}
            this.stats = await this.$mongo.stats.getUserStats(this.username)
            if (this.stats) this.createTotalStats()
            this.loading = false
        }
    },
    mounted: async function() {
        this.loading = true
        this.stats = await this.$mongo.stats.getUserStats(this.username)
        if (this.stats) this.createTotalStats()
        this.loading = false    
    }
}
</script>