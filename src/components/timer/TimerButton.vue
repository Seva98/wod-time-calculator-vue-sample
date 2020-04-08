<template>
    <v-btn
        v-if="state === 'reseted'"
        block 
        color="primary"
        @click="clicked('start')"
        >
        Start
    </v-btn>
    <v-btn
        v-else-if="state === 'running'"
        block 
        color="primary"
        @click="clicked('stop')"
        >
        Stop
    </v-btn>
    <v-btn
        v-else-if="state === 'stopped'"
        block 
        color="primary"
        @click="clicked('reset')"
        >
        Reset
    </v-btn>
    <v-btn
        v-else-if="state === 'countdown'"
        block 
        color="primary"
        @click="clicked('stopAndReset')"
        >
        Stop and Reset Countdown
    </v-btn>
</template>

<script>
export default {
    props: {
        state: {
            default: 'reseted',
            type: String
        }
    },
    methods: {
        clicked: function(event) {
            this.$emit('clicked', event)
        }
    }
}
</script>