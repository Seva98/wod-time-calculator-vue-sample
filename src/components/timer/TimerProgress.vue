<template>
    <v-layout
    column
    align-center
    justify-center
    shrink
    mx-4
    >
        <div class="title my-2">{{title}}</div>
        <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="25"
            :value="percentage"
            color="primary"
            class="ma-2"
            >
            {{ Math.floor(percentage) }}%
        </v-progress-circular>
    </v-layout>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        percentage: {
            default: 0
        }
    }
}
</script>