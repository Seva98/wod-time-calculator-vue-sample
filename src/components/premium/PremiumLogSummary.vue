<template>
    <v-layout class="ma-4" row wrap justify-center>
        <v-flex md6 xl2>
            <div class="display-1 my-2 weight-100">Intuitive Workout Input</div>
            <div class="promo-description">
                <p>Logging classic workouts is easy. You just select movement, input sets, reps and/or weight, that's all, you are done.</p>
                <p>Inputing CrossFit workouts (WODs) is totally different story.</p>
                <p>WODs have many different types, different reps or weights in each round (set), they can start with different workout and continue with another one etc.</p>
                <p>The WOD Time Calculator should allow you to log 99% of such workouts no matter how crazy they look.</p>
            </div>            
        </v-flex>
        <v-flex md6 xl2>
            <div class="display-1 my-2 weight-100">Custom Workouts and Comments</div>
            <div class="promo-description">
                <p>Sometimes you do workout that is unique, that has some special twist.</p>
                <p>In this case you can enter custom workout which is just title and description that allows you to cover that special cases.</p>
                <p>Every workout you enter can also include a comment where you can add any extra information you want.</p>
            </div>            
        </v-flex>
        <v-flex md6 xl2>
            <div class="display-1 my-2 weight-100">Workout Stats</div>
            <div class="promo-description">
                <p>Under your profile you can find stats about your logged workouts.</p>
                <p>You can find there summaries of your most favorite movements, you can also find out what modality or type of movements you have been doing the most and more.</p>
            </div>            
        </v-flex>
        <v-flex md6 xl2>
            <div class="display-1 my-2 weight-100">Continuos Development</div>
            <div class="promo-description">
                <p>Nothing is perfect even WTC Workout Log is not but I can at least try to make perfect workout log based on your feedback.</p>
                <p>Just let me know if you are missing some functionality, movement or have any idea how to make inputing workouts more convenient. I will do my best to implement your ideas as soon as possible.</p>
            </div>            
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data: () => ({
        snackbar: false
	}),
	computed: {
        ...mapGetters({
            rephaos: 'user/rephaos'
        }),
	},
	methods: {
    },    
  
}
</script>