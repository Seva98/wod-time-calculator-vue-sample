<template>
    <div>
        <div class="headline">Workout Timer</div>
        <div class="display-3">{{timeToString}}</div>
        <div class="display-2">{{text}}</div>
    </div>
</template>

<script>
import { convertMilisecondToTime } from '@/model/helpers/helpers'

export default {
    props: {
        time: {
            default: 0
        },
        text: {
            type: String,
            default: ''
        }
    },
    computed: {
        timeToString() {
            return convertMilisecondToTime(this.time)
        } 
    }
}
</script>