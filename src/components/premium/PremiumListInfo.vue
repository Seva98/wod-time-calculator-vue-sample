<template>
    <v-layout class="ma-4" row wrap justify-center>
        <v-flex md5 xl3>
            <div class="display-2 my-2 weight-100">Workouts Database</div>
            <div class="promo">
                <p>Get access to the full database of workouts submitted by WOD Time Calculator users.</p>
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