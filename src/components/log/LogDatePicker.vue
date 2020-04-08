<template>
    <v-flex xs12 sm12 md12 lg12 xl12>
        <v-layout
            row
            wrap
            justify-start
        >
            <v-flex xs12 sm6 md4 lg3 xl2 class="px-2">
                <div class="title mb-1">From</div>
                <v-date-picker
                    v-model='fromDate'
                    :full-width='true'
                    :max='today'
                />
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 class="px-2">
                <div class="title mb-1">To</div>
                <v-date-picker 
                    v-model='toDate'
                    :full-width='true'
                    :max='today'                       
                />
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 class="px-2">
                <v-select
                    v-model="el"
                    v-on:change="selectedRangeChanged"
                    :items="ranges"
                    label="Date range"
                    />
                <div style="color:red" v-html="rangeError"></div>
                <v-btn 
                    @click="searchClicked"
                    color="primary"
                    block
                    :disabled="invalidRangeSelected">
                    Search
                </v-btn>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { DATE_RANGE } from '@/data/constants'

const day = 24*60*60*1000

export default {
    components: {
    },
    props: {
    },
    data: () => ({
        fromDate: new Date(new Date() - 7*day).toISOString().substr(0, 10),
        toDate: new Date().toISOString().substr(0, 10),
        today: new Date().toISOString().substr(0, 10),
        el: DATE_RANGE.LAST_7,
        ranges: Object.values(DATE_RANGE),
        invalidRangeSelected: false
    }),
    computed: {
        rangeError: function() {
            const daysDifference = (new Date(this.toDate) - new Date(this.fromDate))/day
            this.selectedRange = null
            if (daysDifference < 0) {
                this.invalidRangeSelected = true
                return 'Please select valid range.<br>From date is larger than to date.'
            } else if (daysDifference > 90) {
                this.invalidRangeSelected = true
                return 'Please select valid range.<br>Maximum allowed range is 90 days.'
            }
            if (daysDifference === 7 && this.el !== DATE_RANGE.LAST_7) {
                this.el = DATE_RANGE.LAST_7
            } else if (daysDifference === 14 && this.el !== DATE_RANGE.LAST_14) { 
                this.el = DATE_RANGE.LAST_14
            } else if (daysDifference === 21 && this.el !== DATE_RANGE.LAST_21) { 
                this.el = DATE_RANGE.LAST_21
            } else if (daysDifference === 30 && this.el !== DATE_RANGE.LAST_30) { 
                this.el = DATE_RANGE.LAST_30
            } else if (daysDifference === 60 && this.el !== DATE_RANGE.LAST_60) { 
                this.el = DATE_RANGE.LAST_60
            } else if (daysDifference === 90 && this.el !== DATE_RANGE.LAST_90) { 
                this.el = DATE_RANGE.LAST_90
            } else if (![7,14,21,30,60,90].includes(daysDifference) && this.el) {
                this.el = null
            }
            this.invalidRangeSelected = false
            return ''
        }
    },
    methods: {
        searchClicked() {
            const date = {
                from: this.fromDate,
                to: this.toDate
            }
            this.$emit('onSearch', date)
        },
        selectedRangeChanged(newVal) {
            switch (newVal) {
                case DATE_RANGE.LAST_7: 
                    this.toDate = this.today
                    this.fromDate = new Date(new Date() - 7*day).toISOString().substr(0, 10)
                    break 
                case DATE_RANGE.LAST_14: 
                    this.toDate = this.today
                    this.fromDate = new Date(new Date() - 14*day).toISOString().substr(0, 10)
                    break 
                case DATE_RANGE.LAST_30:
                    this.toDate = this.today
                    this.fromDate = new Date(new Date() - 30*day).toISOString().substr(0, 10)
                    break 
                case DATE_RANGE.LAST_60:
                    this.toDate = this.today
                    this.fromDate = new Date(new Date() - 60*day).toISOString().substr(0, 10)
                    break 
                case DATE_RANGE.LAST_90:
                    this.toDate = this.today
                    this.fromDate = new Date(new Date() - 90*day).toISOString().substr(0, 10)
                    break 
            }
        }
    }
}
</script>