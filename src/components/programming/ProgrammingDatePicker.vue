<template>
    <div>
        <v-card>
            <v-toolbar dark class="primary">
                <v-toolbar-title>Select Date</v-toolbar-title>
            </v-toolbar>
            <v-date-picker
                v-model='selectedDate'
                :full-width='true'
                :min='minDate'
                :max='zakaio ? null : today'
                show-week
                :first-day-of-week="1"
            />
            <v-btn 
                @click="searchClicked"
                color="primary"
                block>
                Search
            </v-btn>
        </v-card>
    </div>
                
</template>

<script>
import { FIRST_LOGGED_WORKOUT } from '@/data/constants'

export default {
    components: {
    },
    props: [
        'zakaio'
    ],
    data: () => ({
        minDate: FIRST_LOGGED_WORKOUT.toISOString().substr(0, 10),
        today: new Date().toISOString().substr(0, 10),
        selectedDate: new Date().toISOString().substr(0, 10)
    }),
    computed: {
    },
    methods: {
        searchClicked() {
           this.$emit('onSearch', this.selectedDate)
        }
    }
}
</script>