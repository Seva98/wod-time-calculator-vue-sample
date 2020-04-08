<template>
    <v-card>
      <v-toolbar dark class="primary">
         <v-toolbar-title>
            {{showLog ? 'Save to Workout Log' : 'Check your score'}}
          </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-switch v-model="showLog" label="Log the workout"></v-switch>
        <div class="title" v-if="showLog">When you did this workout?</div>
        <v-date-picker
          v-if="showLog"
          v-model='date'
          :full-width='true'
          no-title
          :max='today'
        />
        <v-textarea 
          v-if="showLog"
          v-model="comment"
          label="Workout Comment"
          :rows="1"
          auto-grow
        />
        <div class="title">What was your result?</div>
        <v-layout v-if="time" row>
            <v-flex grow xs6 >
                <v-text-field 
                v-model="minutes"
                type="number"
                label="Minutes"
                :rules="numberRule"/>
            </v-flex> 
            <v-flex grow xs6 >
                <v-text-field 
                v-model="seconds"
                type="number"
                label="Seconds"
                :rules="numberRule"/>
            </v-flex> 
        </v-layout>
        <v-layout v-if="score" row>
            <v-flex grow xs6 >
                <v-text-field 
                v-model="rounds"
                type="number"
                label="Rounds"
                :rules="numberRule"/>
            </v-flex> 
            <v-flex grow xs6 >
                <v-text-field 
                v-model="reps"
                type="number"
                label="Reps"
                :rules="numberRule"/>
            </v-flex> 
        </v-layout>
        <div v-if="typeof rank === 'number'">
          <br>
          <div class="title">Result level:</div>
          <SyncLoader v-if="loading"/>
          <div v-else>
            <div class="subheading">{{toNth(rank)}} percentile vs WTC</div>
            <div v-if="dbRank >= 0" class="subheading">{{toNth(dbRank)}} percentile vs other athletes</div>
            <div v-else class="subheading">Not enough results available in the database for this workout.</div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!valid || loading"
          :rules="[v => !!v || 'Everything has to be valid']"
          required
          color="primary"
          :loading="loading"
          @click="saveClicked"
          block
        >
          {{saveButtonText}}
        </v-btn>
      </v-card-actions>
      <v-snackbar v-model="snackbar" color="success" :timeout="6000">
        {{ success }}
        <v-btn @click="snackbar = false" color="">
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
</template>

<script>
import { showScore, showTime, toNth } from '@/model/helpers/helpers'
import { getWTCRank, getDbRank } from '@/model/helpers/workout'
import SyncLoader from '@/components/helpers/SyncLoader'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
      SyncLoader
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    today: new Date().toISOString().substr(0, 10),
    showLog: false,
    description: null,
    valid: true,
    comment: null,
    rounds: null,
    reps: null,
    minutes: null,
    seconds: null,
    numberRule: [v => v === null || v === '' || (!isNaN(parseFloat(v)) &&  v >= 0 && v <= 999999) || 'Number has to be between 0 and 999999'],
    loading: false,
    rank: null,
    dbRank: null,
    dbRankedRank: null,
    snackbar: false,
    success: ''
  }),
  computed: {
      ...mapGetters({
          wods: 'workout/wods'
      }),
      score: function() { return showScore(this.wods) },
      time: function() { return showTime(this.wods) },
      saveButtonText: function() {
        return this.showLog ? 'Save Workout' : 'Calculate Your Score'
      }
  },
  methods: {
    ...mapActions({
        setSaving: 'workout/setSaving'
    }),
    toNth(number) {
      return toNth(number)
    },
    cancelClicked() {
      this.resetState()
    },
    async saveClicked() {
      this.loading = true
      const data = {
        rounds: Math.round(this.rounds), 
        reps: Math.round(this.reps),
        minutes: Math.round(this.minutes),
        seconds: Math.round(this.seconds),
        comment: this.comment,
        date: new Date(this.date)
      }
      data.rank = getWTCRank(data)
      const workoutData = await this.$mongo.workouts.saveCurrentWorkout(data)
      if (this.rounds || this.reps || this.minutes || this.seconds) {
        this.dbRank = getDbRank(workoutData, data.rank)
        this.rank = data.rank
      }
      data.dbRank = this.dbRank
      if (this.showLog) {
        await this.$mongo.log.saveCurrentWorkout(data)
      }
      await this.$mongo.stats.updateStats(data, this.showLog)
      this.snackbar = true
      this.success = 'Workout has been successfully saved'
      this.loading = false
    },
    resetState() {
      this.comment = null
      this.date = this.today
      this.setSaving(false)
    }
  }
}
</script>
