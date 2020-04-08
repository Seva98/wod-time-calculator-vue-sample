<template>
    <v-layout class="ma-4" row wrap justify-center>
        <v-flex md6 xl3>
            <div class="display-1 my-2 weight-100">Ever rising collection of new workouts</div>
            <div class="promo-description">
                <p>The WTC database is being continuously updated with new workouts from other users.</p>
            </div>            
        </v-flex>
        <v-flex md6 xl3>
            <div class="display-1 my-2 weight-100">Advanced Filters</div>
            <div class="promo-description">
                <p>Advanced filtering allow you to filter through workouts by time, difficulty, types, movements and more.</p>
                <p>You will easily find a workout that suits your needs.</p>
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
	}
}
</script>