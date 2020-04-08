<template>
    <v-content>
        <v-layout
            align-center
            justify-center
            column
            fill-height
            text-xs-center
        >
          <v-container fluid v-if="user">
            <div v-if="wods.length > 0 && movements.length > 0">
                <v-layout 
                  column 
                  align-center 
                  justify-center 
                >
                    <TimerText :time="difference" :text="currentMovementText"/>
                </v-layout>
                <v-layout 
                  row 
                  align-center 
                  justify-center 
                >   
                    <TimerProgress title="Movement" :percentage="movementPercentage" />
                    <TimerProgress title="Round" :percentage="roundPercentage" />
                    <TimerProgress title="Workout" :percentage="workoutPercentage" />
                </v-layout>
                <TimerButton :state="stopwatchState" @clicked="handleClick"/> 
            </div>
            <div v-else class="title">
                Please create workout first with <router-link to="/">WOD Time Calculator app</router-link>
            </div>
          </v-container>
          <div v-else class="subtitle my-2">Create <router-link to="/login">free account or sign in</router-link> to access Workout Timer</div>    
        </v-layout>
        <GoogleAd type="generic"/>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { setInterval, clearInterval } from 'timers'
import WorkoutTimer from '@/model/WorkoutTimer'
import TimerText from '@/components/timer/TimerText'
import TimerProgress from '@/components/timer/TimerProgress'
import TimerButton from '@/components/timer/TimerButton'
import GoogleAd from '@/components/helpers/GoogleAd'

const workoutTimer = new WorkoutTimer()

export default {
    components: {
        TimerText,
        TimerProgress,
        TimerButton,
        GoogleAd
    },
    data: () => ({
        stopwatchState: 'reseted',
        currentMovementText: null,
        startTime: 0,
        currentTime: 0,
        countdown: 100,
        interval: null,
        countdownInterval: null,
        movementPercentage: 0,
        roundPercentage: 0,
        workoutPercentage: 0,
        difference: '0'
    }),
    computed: {
        ...mapGetters({
            wods: 'workout/wods',
            movements: 'workout/movements',
            user: 'user/user'
        }),
        workoutDetails: {
            get: function() {
                const result = this.$store.getters['workout/result']
                let comulativeTime = 0

                result.allMovements.map(mov => {
                    mov.previousComulativeTime = comulativeTime
                    comulativeTime += mov.time*60000
                    mov.comulativeTime = comulativeTime
                })

                let roundsTimes = {}
                let idsOrder = []
                result.allMovements.forEach(mov => {
                    const id = `${mov.movement.wodId}/${mov.round}`
                    roundsTimes[id] = {}
                    roundsTimes[id].endTime = mov.comulativeTime
                    if (!idsOrder.includes(id)) idsOrder.push(id)
                })

                let previousId = null
                idsOrder.forEach((id) => {
                    if (previousId) {
                        roundsTimes[id].duration = roundsTimes[id].endTime-roundsTimes[previousId].endTime
                        roundsTimes[id].startTime = roundsTimes[id].endTime-roundsTimes[id].duration
                    } else {
                        roundsTimes[id].duration = roundsTimes[id].endTime
                        roundsTimes[id].startTime = 0
                    }
                    previousId = id
                })

                result.allMovements.map(mov => {
                    let roundTime = roundsTimes[`${mov.movement.wodId}/${mov.round}`]
                    mov.roundTime = roundTime 
                    return mov
                })
                return result
            }
        },
    },
    methods: {
        ...mapActions({
            updateAll: 'workout/updateAll'
        }),
        handleClick: function(event) {
            switch (event) {
                case 'start': this.startClicked()
                break
                case 'stop': this.stopClicked()
                break
                case 'reset': 
                case 'stopAndReset': this.resetClicked()
                break
            }
        },
        startClicked: function() {
            this.stopwatchState = 'countdown'
            this.updateAll()
            this.countdownInterval = setInterval(() => this.runCountdown(), 100)
            
        },
        stopClicked: function() {
            this.stopwatchState = 'stopped'
            clearInterval(this.interval)
        },
        resetClicked: function() {
            this.clearAll()
        },
        runCountdown: function() {
            if (this.countdown > 0) {
                this.countdown -= 100
                this.difference = this.countdown
            } else {
                this.startTimerAfterCountdown()
            }
        },
        timePassed: function() {
            const workoutDetails = this.workoutDetails
            this.currentTime = new Date().getTime()
            const difference = new Date((this.currentTime - this.startTime)).getTime()
            this.difference = difference
            if (this.workoutDetails.time*60000 < difference) {
                this.stopwatchState = 'stopped'
                clearInterval(this.interval)
                this.movementPercentage = 100
                this.roundPercentage = 100
                this.workoutPercentage = 100
                return
            }
            const workoutData = workoutTimer.getCalculatedWorkoutData(difference, workoutDetails)
            this.currentMovementText = workoutData.movementText
            this.movementPercentage = workoutData.movementPercentage
            this.roundPercentage = workoutData.roundPercentage
            this.workoutPercentage = workoutData.workoutPercentage
        },
        clearAll: function() {
            clearInterval(this.interval)
            clearInterval(this.countdownInterval)
            this.stopwatchState = 'reseted'
            this.currentMovementText = null
            this.startTime = 0
            this.currentTime = 0
            this.countdown = 10000
            this.movementPercentage = 0
            this.roundPercentage = 0
            this.workoutPercentage = 0
            this.difference = 0
        },
        startTimerAfterCountdown: function() {
            clearInterval(this.countdownInterval)
            this.stopwatchState = 'running'
            this.difference = 0
            this.countdown = 10000
            this.startTime = new Date().getTime()
            this.currentMovementText = null
            this.interval = setInterval(() => this.timePassed(), 100)
        }
    },
  }
</script>

<style>
.v-progress-circular__overlay {
    transition: all 0.01s ease-in-out !important;
}
</style>