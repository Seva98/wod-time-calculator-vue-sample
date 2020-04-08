<template>
    <v-layout
        row
        wrap
        justify-start
        >
        <v-flex xs12 sm6 md4 lg3 xl2>
            <v-range-slider
                v-model="timeFilter"
                label="Time (minutes)"
                thumb-label="always"
                always-dirty
                min="1"
                max="60"
                class="mx-2 timeFilter"   
            />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 xl2>
            <v-range-slider
                v-model="difficultyFilter"
                label="Difficulty"
                thumb-label="always"
                always-dirty
                min="0"
                max="10"
                class="mx-2"  
            />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 xl2>
        <v-range-slider
            v-model="movementsCountFilter"
            label="Movements"
            thumb-label="always"
            always-dirty
            min="1"
            max="5"
            class="mx-2 movementsFilter"
        />
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 xl2>
        <v-range-slider
            v-model="wodsCountFilter"
            label="Wods (parts)"
            thumb-label="always"
            always-dirty
            min="1"
            max="5"
            class="mx-2 wodsFilter"
        />
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout
                row
                wrap
                justify-start
            >
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-text-field
                        v-model="workoutNameFilter"
                        color="secondary"
                        label="Workout name"
                        placeholder="Workout name"
                        class="mx-2"
                    />
                </v-flex>
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-text-field
                        v-model="authorNameFilter"
                        color="secondary"
                        label="Author name"
                        placeholder="Author name"
                        class="mx-2"
                    />
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout
            row
            wrap
            justify-start
            >
            <v-flex xs12 sm6 md4 lg3 xl2>
                <v-autocomplete
                    v-model="selectedMovementsFilter"
                    :items="movements"
                    color="secondary"
                    label="Include movements"
                    placeholder="All movements"
                    item-text="name"
                    item-value="name"
                    multiple
                    class="mx-2"
                    >
                    <template v-slot:selection="data">
                        <v-chip
                        :selected="data.selected"
                        close
                        @input="removeMovement(data.item)"
                        >
                        {{ data.item.name }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2>
                <v-checkbox :label="allMovementsFilterText" color="primary" v-model="allMovementsFilter"/>
            </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-layout
            row
            wrap
            justify-start
            >
            <v-flex xs12 sm6 md4 lg3 xl2>
                <v-autocomplete
                    v-model="selectedWodsFilter"
                    :items="wods"
                    color="secondary"
                    label="Workout type"
                    placeholder="All types"
                    item-text="type"
                    item-value="type"
                    multiple
                    class="mx-2"
                    >
                    <template v-slot:selection="wodData">
                        <v-chip
                        :selected="wodData.selected"
                        close
                        @input="removeWod(wodData.item)"
                        >
                        {{ wodData.item.type }}
                        </v-chip>
                    </template>
                    <template v-slot:item="wodData">
                        <template>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="wodData.item.type"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2>
                <v-checkbox :label="allWodsFilterText" color="primary" v-model="allWodsFilter"/>
            </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <span class="v-label theme--dark">Sort by</span>
            <v-btn color="primary" @click="sortByClicked">{{sortBy}}</v-btn>
            <v-btn color="primary" @click="sortClicked">{{sort}}</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="primary" block @click="searchClicked" :disabled="loading">Search Workouts</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        loading: {
            default: false
        }
    },
    data: () => ({
        timeFilter: [1,60],
        difficultyFilter: [0,10],
        movementsCountFilter: [1,5],
        wodsCountFilter: [1,5],
        workoutNameFilter: null,
        authorNameFilter: null,
        selectedMovementsFilter: null,
        selectedWodsFilter: null,
        allMovementsFilter: true,
        allWodsFilter: false,
        allMovementsFilterText: 'Includes all movements',
        allWodsFilterText: 'Includes at least one wod type',
        sortBy: 'Date',
        sort: 'Ascending',
        filter: {
            sortBy: 'Date',
            sort: -1
        },
    }),
    computed: {
        ...mapGetters({
          movements: 'movementsData/all',
          wods: 'wodsData/all'
        })
    },
    methods: {
        sortByClicked() {
            this.sortBy = this.sortBy === 'Date' ? 'Rating' : 'Date'
            this.filter.sortBy = this.sortBy
            this.resetSearchFilter()
        },
        sortClicked() {
            this.sort = this.sort === 'Ascending' ? 'Descending' : 'Ascending'
            this.filter.sort = this.sort === 'Ascending' ? -1 : 1 
            this.resetSearchFilter()
        },
        removeMovement(movement) {
            const index = this.selectedMovementsFilter.indexOf(movement.name)
            if (index >= 0) this.selectedMovementsFilter.splice(index, 1)
        },
        removeWod(wod) {
            const index = this.selectedWodsFilter.indexOf(wod.type)
            if (index >= 0) this.selectedWodsFilter.splice(index, 1)
        },
        searchClicked() {
            this.$emit('search', this.filter)
        },
        resetSearchFilter() {
            this.$emit('reset')
        },
    },
    watch: {
        timeFilter: function(newVal) {
            const thumbLabel = document.querySelector('.timeFilter > div > div.v-input__slot > div > div:nth-child(5) > div.v-slider__thumb-label__container > div > span')
            parseInt(newVal[1]) === 60 ? thumbLabel.textContent = '+60' : thumbLabel.textContent = newVal[1]
            this.filter.time = {
                bottom: newVal[0],
                top: newVal[1]
            }
            this.resetSearchFilter()
        },
        difficultyFilter: function(newVal) {
            this.filter.difficulty = {
                bottom: newVal[0],
                top: newVal[1]
            }
            this.resetSearchFilter()
        },
        movementsCountFilter: function(newVal) {
            const thumbLabel = document.querySelector('.movementsFilter > div > div.v-input__slot > div > div:nth-child(5) > div.v-slider__thumb-label__container > div > span')
            parseInt(newVal[1]) === 5 ? thumbLabel.textContent = '+5' : thumbLabel.textContent = newVal[1]
            this.filter.movementsCount = {
                bottom: newVal[0],
                top: newVal[1]
            }
            this.resetSearchFilter()
        },
        wodsCountFilter: function(newVal) {
            const thumbLabel = document.querySelector('.wodsFilter > div > div.v-input__slot > div > div:nth-child(5) > div.v-slider__thumb-label__container > div > span')
            parseInt(newVal[1]) === 5 ? thumbLabel.textContent = '+5' : thumbLabel.textContent = newVal[1]
            this.filter.wodsCount = {
                bottom: newVal[0],
                top: newVal[1]
            }
            this.resetSearchFilter()
        },
        workoutNameFilter: function(newVal) {
            this.filter.workoutName = newVal
            this.resetSearchFilter() 
        },
        authorNameFilter: function(newVal) {
            this.filter.authorName = newVal
            this.resetSearchFilter() 
        },
        selectedMovementsFilter: function(newVal) {
            if (!newVal || newVal.length === 0) this.selectedMovementsFilter = null
            this.filter.selectedMovements = newVal
            this.resetSearchFilter()
        },
        selectedWodsFilter: function(newVal) {
            if (!newVal || newVal.length === 0) this.selectedWodsFilter = null
            this.filter.selectedWods = newVal
            this.resetSearchFilter()
        },
        allMovementsFilter: function(newVal) {
            newVal ? this.allMovementsFilterText = 'Includes all movements' : this.allMovementsFilterText = 'Includes at least one movement' 
            this.filter.allMovements = newVal
            this.resetSearchFilter()
        },
        allWodsFilter: function(newVal) {
            newVal ? this.allWodsFilterText = 'Includes all wod types' : this.allWodsFilterText = 'Includes at least one wod type' 
            this.filter.allWods = newVal
            this.resetSearchFilter()
        }
    },
    mounted: async function() {
        document.querySelector('.timeFilter > div > div.v-input__slot > div > div:nth-child(5) > div.v-slider__thumb-label__container > div > span').textContent = '+60'
        document.querySelector('.movementsFilter > div > div.v-input__slot > div > div:nth-child(5) > div.v-slider__thumb-label__container > div > span').textContent = '+5'
        document.querySelector('.wodsFilter > div > div.v-input__slot > div > div:nth-child(5) > div.v-slider__thumb-label__container > div > span').textContent = '+5'    
    }

}
</script>