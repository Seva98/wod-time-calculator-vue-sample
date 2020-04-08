<template>
    <v-card>
        <v-toolbar dark class="primary">
            <v-toolbar-title>
                Workout Results
            </v-toolbar-title>
        </v-toolbar>
        <v-layout>
            <v-card-text>
                <template fluid>
                    <FitnessLevelSelect></FitnessLevelSelect>
                    <WorkoutScore :zakaio="zakaio"></WorkoutScore>
                    <WorkoutDifficulty></WorkoutDifficulty>
                </template>
            </v-card-text>
        </v-layout>
    </v-card>
</template>

<script>
import FitnessLevelSelect from '@/components/workout/result/FitnessLevelSelect'
import WorkoutScore from '@/components/workout/result/WorkoutScore'
import WorkoutDifficulty from '@/components/workout/result/WorkoutDifficulty'

export default {
    props: [
        'zakaio'
    ],
    components: {
        FitnessLevelSelect,
        WorkoutScore,
        WorkoutDifficulty
    }
  }
</script>

<style>

</style>
