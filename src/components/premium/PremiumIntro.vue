<template>
    <v-layout class="ma-4" row wrap align-center justify-center>
        <v-flex md4 xl2>
            <div class="display-3 my-2 weight-100">Supertools for Athletes</div>
            <v-layout class="mr-5" row justify-space-between>
                    <v-icon class="float">fa-calculator</v-icon>
                    <v-icon class="float delay-1">fa-clock</v-icon>
                    <v-icon class="float">fa-list</v-icon>
                    <v-icon class="float delay-1">fa-th</v-icon>
					<v-icon class="float">fa-dumbbell</v-icon>
            </v-layout>
        </v-flex>
        <v-flex md4 xl2>
            <div class="promo">
                <p>WODTimeCalculator.com is collection of apps that will help you fully reach your fitness potential.</p>
                <p>From free apps like the WOD Time Calculator itself, the Workout Timer and the Strength Calculator.</p>
                <p>To the #WTCAthlete Programming including 2 different fitness programs and the Workout Log to track your progress.</p>
                <v-btn block color="primary" @click="$vuetify.goTo('#cta')">Upgrade Now</v-btn>
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

<style>
.float {
    -webkit-animation-name: wave;
    animation-name: wave;
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    -webkit-animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}

.delay-1 {
    animation-delay: 1.5s;
}

@keyframes wave {
        0%   { transform: scale(1,1)        translateY(0); }
        5%  { transform: scale(1.1,.9)      translateY(0); }
        15%  { transform: scale(.9,1.1)     translateY(-10px); }
        25%  { transform: scale(1.05,.95)   translateY(0); }
        28%  { transform: scale(1,1)        translateY(-2px); }
        33%  { transform: scale(1,1)        translateY(0); }
        100% { transform: scale(1,1)        translateY(0); }
}
</style>