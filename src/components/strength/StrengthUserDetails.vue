<template>
    <v-layout
    row
    wrap
    justify-start
    >
        <v-text-field
            v-model="weight"
            color="secondary"
            label="1 Rep Max"
            placeholder="1 Rep Max"
            class="mx-2"
            style="max-width: 500px"
            :rules="positiveNumberRule"
            type="number"
        />
        <v-text-field
            v-model="bodyweight"
            color="secondary"
            label="Bodyweight"
            placeholder="Bodyweight"
            class="mx-2"
            style="max-width: 500px"
            :rules="positiveNumberRule"
            type="number"
        />
        <v-btn 
        @click="toggleWeightUnit"
        color="primary">
            {{weightUnit.name}}
        </v-btn>
        <v-btn 
        @click="toggleGender"
        color="primary">
            {{gender}}
        </v-btn>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        movements: [],
        positiveNumberRule: [v => (!isNaN(parseFloat(v)) && v >= 1 && v < 10000) || 'Number has to be between 1 and 9999']
    }),
    computed: {
        ...mapGetters({
            gender: 'user/gender',
            weightUnit: 'user/weightUnit',
        }),
        weight: {
            get: function() {
                return this.$store.getters['strength/weight']
            },
            set: function(newVal) {
                this.$store.dispatch('strength/setWeight', newVal)
            }
        },
        bodyweight: {
            get: function() {
                return this.$store.getters['user/bodyweight']
            },
            set: function(newVal) {
                this.$store.dispatch('user/setBodyweight', newVal)
            }
        }
    },
    methods: {
        ...mapActions({
            toggleGender: 'user/toggleGender',
            toggleWeightUnit: 'user/toggleWeightUnit'
        }),
        movementSelected: function(movement) {
            const changeMovement = 'Change Movement'
            if (movement === changeMovement) {
                this.movements = this.getNames()
            } else {
                this.movements = [movement, changeMovement] 
            }
        }
    },
    created: function() {
        this.bodyweight = this.$store.getters['strength/bodyweight']
    }
}
</script>