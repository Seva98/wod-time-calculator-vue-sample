<template>
    <v-content>
      <div class="ma-4">
        <div class="display-1 my-2">WOD Time Calculator</div>
        <div class="my-2 title" v-if="wods.length === 0">1) Start by entering your workout by clicking on Add WOD</div>
      </div>
      <v-layout row wrap justify-center>
        <v-flex grow xs12 sm6 md4 lg3 xl2>
          <WodEditor class="ma-1"/>
        </v-flex>
        <v-flex grow xs12 sm6 md4 lg3 xl2 v-if="wods.length > 0">
          <ResultViewer class="ma-1"/>
        </v-flex>
        <v-flex grow xs12 sm6 md4 lg3 xl2 v-if="wods.length > 0">
          <GetRankSaveWorkout class="ma-1" />
        </v-flex>
      </v-layout>
      <GoogleAd type="generic"/>
      <ProgrammingView />
      <GoogleAd type="relevant-content"/>
      <v-dialog 
        :value="movement" 
        persistent
        max-width="400px"
        lazy>
        <MovementsDialog />
      </v-dialog>
      <v-dialog 
        :value="wod" 
        persistent
        max-width="400px"
        lazy>
        <WodsDialog />
      </v-dialog>
    </v-content>
</template>


<script>
import { mapGetters } from 'vuex'
import WodEditor from '@/components/workout/WodEditor'
import ResultViewer from '@/components/workout/result/ResultViewer'
import MovementsDialog from '@/components/workout/newMovement/MovementsDialog'
import WodsDialog from '@/components/workout/newWod/WodsDialog'
import GetRankSaveWorkout from '@/components/workout/rank/GetRankSaveWorkout'
import ProgrammingView from '@/views/ProgrammingView'
import GoogleAd from '@/components/helpers/GoogleAd'

export default {
  components: {
    WodEditor,
    ResultViewer,
    MovementsDialog,
    WodsDialog,
    GetRankSaveWorkout,
    ProgrammingView,
    GoogleAd
  },
  computed: {
    ...mapGetters({
      movement: 'workout/movement',
      wod: 'workout/wod',
      wods: 'workout/wods'
    })
  }
}
</script>