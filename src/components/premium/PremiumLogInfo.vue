<template>
    <v-layout class="ma-4" row wrap justify-center>
        <v-flex md5 xl3>
            <div class="display-2 my-2 weight-100">Workout Log</div>
            <div class="promo">
                <p>I've been logging my workouts since 2006 using many tools and I still haven't found the one that will be perfect.</p>
                <p>WTC Log is also not perfect (yet) but I will keep it improving based on your feedback until it suits all your needs no matter the sport you are trying to log.</p>
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