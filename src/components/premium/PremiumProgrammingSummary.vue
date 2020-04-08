<template>
    <v-layout class="ma-4 pa-4" row wrap justify-center>
        <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">For Majority</div>
            <div class="promo-description">
                <p>This program is focused on average to advanced athletes who aim to get to the top 5%. Those who want to qualify to the CrossFit Games have to look somewhere else.</p>
            </div>            
        </v-flex>
        <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Optional Rest Days</div>
            <div class="promo-description">
                <p>Rest days are recommended but if you don't want them there will always be optional workout.</p>
            </div>            
        </v-flex>
        <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Different Routines</div>
            <div class="promo-description">
                <p>WTC programming follow either pull/push/squat, upper/lower body or fullbody routine combined with accessories day from time to time.</p>
            </div>            
        </v-flex>
        <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">2+1 Scheme</div>
            <div class="promo-description">
                <p>Programming follows 2+1 (2 main units + 1 optional unit) scheme repeated twice and is reseted every 6 days.</p>
            </div>            
        </v-flex>
        <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">6 Days</div>
            <div class="promo-description">
                <p>Six day scheme allows to have set system in programming while not having every monday squat day.</p>
            </div>            
        </v-flex>
        <!-- <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Interchangeable</div>
            <div class="promo-description">
                <p>Don't like 2nd part of Strength training plan? Just do 2nd part of All-round training plan instead.</p>
            </div>            
        </v-flex> -->
        <!-- <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Combinable</div>
            <div class="promo-description">
                <p>Want to workout more? Just add an extra workout from different program from that day.</p>
            </div>            
        </v-flex> -->
        <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Constantly Varied</div>
            <div class="promo-description">
                <p>Workouts never repeat. Every day is unique.</p>
            </div>            
        </v-flex>
        <!-- <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Scaled Options</div>
            <div class="promo-description">
                <p>Not everyone can do workout as prescribed. There will be always information about how to scale the workout.</p>
            </div>            
        </v-flex> -->
        <!-- <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Micro-strategies</div>
            <div class="promo-description">
                <p>Every workout will have a word or two about how to approach it to get the best score possible.</p>
            </div>            
        </v-flex> -->
        <!-- <v-flex md3 lg2 class="pa-3">
            <div class="display-1 my-2 weight-100">Explained</div>
            <div class="promo-description">
                <p>It is hard to tell what is the goal of the prescribed workout. I will always explain what you should aim for.</p>
            </div>            
        </v-flex> -->
        <!-- <router-link class="promo" to="/">Learn more about #WTCAthlete programming</router-link> -->
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