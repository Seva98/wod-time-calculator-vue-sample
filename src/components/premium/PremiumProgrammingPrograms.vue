<template>
    <v-layout class="ma-4" row wrap justify-center>
        <v-flex md4 xl3>
            <v-card class="ma-1">
                <v-toolbar dark class="primary">
                    <v-toolbar-title>
                        Kratos (Strength)
                    </v-toolbar-title>
                </v-toolbar>
                <div class="promo-description py-2">
                    <ul>
                        <li>Kratos is the divine personification of strength in Greek mythology</li>
                        <li>Recommended for advanced athletes who seeks raw strength gains</li>
                        <li>Focus on deadlifts, back squats, bench presses and shoulder presses with occasional strongman exercises</li>
                        <li>Heavy weights, low reps, low intensity, long rest</li>
                    </ul>
                </div>
            </v-card>            
        </v-flex>
        <v-flex md4 xl3>
            <v-card class="ma-1">
                <v-toolbar dark class="primary">
                    <v-toolbar-title>
                        Hercules (All-round)
                    </v-toolbar-title>
                </v-toolbar>
                <div class="promo-description py-2">
                     <ul>
                        <li>Hercules is a Roman hero famous for his strength and for his numerous far-ranging adventures</li>
                        <li>Recommended for everyone who aims to be great all-round athlete</li>
                        <li>Focus on clean and jerks, snatches, thrusters, wall-balls, pull-ups, HSPU and other compound movements that can be done at high intensity</li>
                        <li>Moderate weights, medium reps, high intensity, variable rest</li>
                    </ul>
                </div>
            </v-card>            
        </v-flex>
        <v-flex md4 xl3>
            <v-card class="ma-1">
                <v-toolbar dark class="primary">
                    <v-toolbar-title>
                        Perseus (Capacity)
                    </v-toolbar-title>
                </v-toolbar>
                <div class="promo-description py-2">
                     <ul>
                        <li>Perseus is from Greek mythology, he beheaded the Gorgon Medusa and saved Andromeda from the sea monster Cetus</li>
                        <li>Recommended for beginners to advanced athletes who wants to increase work capacity</li>
                        <li>Focus on burpees, box jumps, pull ups, push ups, row, running, double unders and other simple movements</li>
                        <li>Light weights, high reps, high intensity, intervals based rest</li>
                    </ul>
                </div>
            </v-card>            
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