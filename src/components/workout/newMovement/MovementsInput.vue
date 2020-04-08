<template>
  <v-form
  v-model="valid"
  lazy-validation
  ref="form">
    <v-card 
      @keydown.enter="confirmClicked"
      @keydown.esc="cancelClicked"
    >
      <v-toolbar dark class="primary">
        <v-toolbar-title>Add new movement</v-toolbar-title>
        <v-spacer />
        <v-icon class="center" @click="cancelClicked">fa-times</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-autocomplete
          v-model="movement"
          :items="movements"
          :color=this.$vuetify.theme.secondary
          hide-selected
          item-text="name"
          item-value="name"
          label="Movement"
          placeholder="Select movement from the list"
          return-object
        ></v-autocomplete>
        <v-layout>
          <v-text-field
            v-if="newMovement.type === WOD_TYPE.STRENGTH"
            v-model="newMovement.sets"
            :label="'Sets'"
            type="number"
          ></v-text-field>
        </v-layout>
        <v-layout>
          <v-text-field
            v-if="units.includes('Reps') && newMovement.type !== WOD_TYPE.EMOM"
            v-model="newMovement.reps"
            :label="repsDiff ? `Reps${seperateHint}` : 'Reps'"
            :rules="newMovement.type === WOD_TYPE.STRENGTH ? [] : repsDiff ? [compareRoundsAndReps] : numberRule"
            :type="repsDiff ? 'text' : 'number'"
          ></v-text-field>
          <v-checkbox
            v-if="newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && units.includes('Reps')"
            v-model="repsDiff"
            label="Different"
            hide-details
            class="shrink ml-3"
          ></v-checkbox>
        </v-layout>
        <v-layout
            v-if="newMovement.type === WOD_TYPE.AMRAP_DIF_REPS && units.includes('Reps')"
            >
          <v-checkbox
            v-model="repsIncrement"
            hide-details
            class="shrink"
          ></v-checkbox>
          <v-text-field 
            v-model="newMovement.increment"
            label="Reps Increment"
            :disabled="!repsIncrement"
            :rules="repsIncrement ? numberRule : []"
            type="number"
            grow
          ></v-text-field>
        </v-layout>
        <v-layout
          v-if="units.includes('Weight')"
          row>  
          <v-flex
          grow>
            <v-text-field
              v-model="newMovement.weight"
              :label="weightDiff ? `Weight${seperateHint}` : 'Weight'"
              :rules="newMovement.type === WOD_TYPE.STRENGTH ? [] : weightDiff ? [compareRoundsAndReps] : numberRule"
              :type="weightDiff ? 'text' : 'number'"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-select
              :items="newMovement.type === WOD_TYPE.STRENGTH ? WEIGHT_UNITS_WITH_PERCENT : WEIGHT_UNITS"
              v-model="newMovement.weightUnit"
              :value="newMovement.weightUnit"
              item-text="name"
              label="Unit"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-checkbox
              v-if="newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && units.includes('Weight')"
              v-model="weightDiff"
              label="Different"
              hide-details
              class="shrink ml-3"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout
            v-if="newMovement.type === WOD_TYPE.AMRAP_DIF_REPS && units.includes('Weight')"
            >
          <v-checkbox
            v-model="weightIncrement"
            hide-details
            class="shrink"
          ></v-checkbox>
          <v-text-field 
            v-model="newMovement.weightIncrement"
            label="Weight Increment"
            :disabled="!weightIncrement"
            :rules="weightIncrement ? numberRule : []"
            type="number"
            grow
          ></v-text-field>
        </v-layout>
        <v-layout
          v-if="units.includes('Height')"
          row>  
          <v-flex
          grow>
            <v-text-field
              v-model="newMovement.height"
              :label="heightDiff ? `Height${seperateHint}` : 'Height'"
              :rules="newMovement.type === WOD_TYPE.STRENGTH ? [] : heightDiff ? [compareRoundsAndReps] : numberRule"
              :type="heightDiff ? 'text' : 'number'"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-select
              :items="HEIGHT_UNITS"
              v-model="newMovement.heightUnit"
              :value="newMovement.heightUnit"
              item-text="name"
              label="Unit"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-checkbox
              v-if="newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && units.includes('Height')"
              v-model="heightDiff"
              label="Different"
              hide-details
              class="shrink ml-3"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout
            v-if="newMovement.type === WOD_TYPE.AMRAP_DIF_REPS && units.includes('Height')"
            >
          <v-checkbox
            v-model="heightIncrement"
            hide-details
            class="shrink"
          ></v-checkbox>
          <v-text-field 
            v-model="newMovement.heightIncrement"
            label="Height Increment"
            :disabled="!heightIncrement"
            :rules="heightIncrement ? numberRule : []"
            type="number"
            grow
          ></v-text-field>
        </v-layout>
        <v-layout
          v-if="units.includes('Distance') && newMovement.type !== WOD_TYPE.EMOM"
          row>
          <v-flex
          grow>
            <v-text-field
              v-model="newMovement.distance"
              :label="distanceDiff ? `Distance${seperateHint}` : 'Distance'"
              :rules="newMovement.type === WOD_TYPE.STRENGTH ? [] : distanceDiff ? [compareRoundsAndReps] : numberRule"
              :type="distanceDiff ? 'text' : 'number'"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-select
              :items="DISTANCE_UNITS"
              v-model="newMovement.distanceUnit"
              :value="newMovement.distanceUnit"
              item-text="name"
              label="Unit"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-checkbox
              v-if="newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && units.includes('Distance')"
              v-model="distanceDiff"
              label="Different"
              hide-details
              class="shrink ml-3"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout
            v-if="newMovement.type === WOD_TYPE.AMRAP_DIF_REPS && units.includes('Distance')"
            >
          <v-checkbox
            v-model="distanceIncrement"
            hide-details
            class="shrink"
          ></v-checkbox>
          <v-text-field 
            v-model="newMovement.distanceIncrement"
            label="Distance Increment"
            :disabled="!distanceIncrement"
            :rules="distanceIncrement ? numberRule : []"
            type="number"
            grow
          ></v-text-field>
        </v-layout>
        <v-layout
          v-if="units.includes('Duration') && newMovement.type !== WOD_TYPE.EMOM"
          row>
          <v-flex
          grow>
            <v-text-field
              v-model="newMovement.duration"
              :label="durationDiff ? `Duration${seperateHint}` : 'Duration'"
              :rules="newMovement.type === WOD_TYPE.STRENGTH ? [] : durationDiff ? [compareRoundsAndReps] : numberRule"
              :type="durationDiff ? 'text' : 'number'"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-select
              :items="DURATION_UNITS"
              v-model="newMovement.durationUnit"
              :value="newMovement.durationUnit"
              item-text="name"
              label="Unit"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-checkbox
              v-if="newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && units.includes('Duration')"
              v-model="durationDiff"
              label="Different"
              hide-details
              class="shrink ml-3"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout
            v-if="newMovement.type === WOD_TYPE.AMRAP_DIF_REPS && units.includes('Duration')"
            >
          <v-checkbox
            v-model="durationIncrement"
            hide-details
            class="shrink"
          ></v-checkbox>
          <v-text-field 
            v-model="newMovement.durationIncrement"
            label="Duration Increment"
            :disabled="!durationIncrement"
            :rules="durationIncrement ? numberRule : []"
            type="number"
            grow
          ></v-text-field>
        </v-layout>
      </v-card-text>
      <v-card-actions>
          <v-btn
          color="secondary"
          @click="cancelClicked"
        >
          Cancel
          <v-icon right>fa-undo</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          :rules="[v => !!v || 'Everything has to be valid']"
          required
          color="primary"
          @click="confirmClicked"
        >
          Confirm
          <v-icon right>fa-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { WEIGHT_UNITS, WEIGHT_UNITS_WITH_PERCENT, HEIGHT_UNITS, DISTANCE_UNITS, DURATION_UNITS } from '@/data/constants'
  import Movements from '@/model/data/Movements'
  import { WOD_TYPE } from '@/data/constants'
  import { textToArray } from '@/model/helpers/helpers'

export default {
    data: () => ({
      newMovement: {},
      units: [],
      WEIGHT_UNITS,
      WEIGHT_UNITS_WITH_PERCENT,
      HEIGHT_UNITS,
      DISTANCE_UNITS,
      DURATION_UNITS,
      WOD_TYPE,
      valid: true,
      repsDiff: false,
      weightDiff: false,
      heightDiff: false,
      distanceDiff: false,
      durationDiff: false,
      repsIncrement: false,
      distanceIncrement: false,
      durationIncrement: false,
      weightIncrement: false,
      heightIncrement: false,
      seperateHint: ' | Seperate by space, comma or hyphen',
      numberRule: [v => (!isNaN(parseFloat(v)) &&  v >= 1 && v <= 999999) || 'Number has to be between 1 and 999999']
    }),
    computed: {
       ...mapGetters({
          movements: 'movementsData/all'
        }),
        movement: {
          get: function() {
            const movement = this.$store.getters['workout/movement']
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.newMovement = {...movement}
            return movement
          },
          set: function(newMov) {
            if (!newMov) return
            const newMovUnits = [...newMov.units]
            const oldMovUnits = [...this.units].filter(oldUnit => !newMovUnits.includes(oldUnit))
            oldMovUnits.forEach(unit => {
              delete this.newMovement[`${unit.toLowerCase()}`] 
              delete this.newMovement[`${unit.toLowerCase()}Unit`] 
              delete this.newMovement[`${unit.toLowerCase()}Increment`] 
            })
            this.newMovement.name = newMov.name
            this.newMovement.units = newMov.units
            this.checkMovementProperties()
          }
        },
        weightUnit: {
          get: function() { return this.$store.getters['user/weightUnit'] },
          set: function(newUnit) {
            this.newMovement.weightUnit = newUnit
            const newUnitIndex = WEIGHT_UNITS.findIndex(u => u.name === newUnit)
            this.$store.dispatch('user/setWeightUnit', WEIGHT_UNITS[newUnitIndex])
          }
        },
        heightUnit: {
          get: function() { return this.$store.getters['user/heightUnit'] },
          set: function(newUnit) {
            this.newMovement.heightUnit = newUnit
            const newUnitIndex = HEIGHT_UNITS.findIndex(u => u.name === newUnit)
            this.$store.dispatch('user/setHeightUnit', HEIGHT_UNITS[newUnitIndex])
          }
        },
        durationUnit: {
          get: function() { return this.$store.getters['user/durationUnit'] },
          set: function(newUnit) {
            this.newMovement.durationUnit = newUnit
            const newUnitIndex = DURATION_UNITS.findIndex(u => u.name === newUnit)
            this.$store.dispatch('user/setDurationUnit', DURATION_UNITS[newUnitIndex])
          }
        },
        distanceUnit: {
          get: function() { return this.$store.getters['user/distanceUnit'] },
          set: function(newUnit) {
            this.newMovement.distanceUnit = newUnit
            const newUnitIndex = DISTANCE_UNITS.findIndex(u => u.name === newUnit)
            this.$store.dispatch('user/setDistanceUnit', DISTANCE_UNITS[newUnitIndex])
          }
        }
    },
    methods: {
      ...mapActions({
        addMovement: 'workout/addMovement',
        setNewMovement: 'workout/setNewMovement',
        saveEditedMovement: 'workout/saveEditedMovement',
        setEditedMovement: 'workout/setEditedMovement',
        resetEditedMovement: 'workout/resetEditedMovement',
        saveWeightUnit: 'user/setWeightUnit',
        saveHeightUnit: 'user/setHeightUnit',
        saveDistanceUnit: 'user/setDistanceUnit',
        saveDurationUnit: 'user/setDurationUnit',
        updateAll: 'workout/updateAll'
      }),
      cancelClicked() {
        this.resetEditedMovement()
        this.resetState()
      },
      confirmClicked() {
        if (this.validate()) {
          const movementToSave = {...this.newMovement}
          movementToSave.units = this.units
          this.saveEditedMovement(movementToSave)
          this.updateAll()
          this.resetState()
        }
      },
      validate() {
        if (this.$refs.form.validate()) {
          if (!this.units.includes('Reps')) {
            delete this.newMovement.reps
          } else {
            if (this.newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && this.repsDiff && typeof this.newMovement.reps !== 'object') {
              this.newMovement.reps = textToArray(this.newMovement.reps)
            } else {
              this.newMovement.reps = parseFloat(this.newMovement.reps)
            }
          }
          if (!this.units.includes('Weight')) {
            delete this.newMovement.weight
            delete this.newMovement.weightUnit
          } else {
            const newUnitIndex = WEIGHT_UNITS.findIndex(u => u.name === this.newMovement.weightUnit)
            this.$store.dispatch('user/setWeightUnit', WEIGHT_UNITS[newUnitIndex])
            if (this.newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && this.weightDiff && typeof this.newMovement.weightDiff !== 'object') {
              this.newMovement.weight = textToArray(this.newMovement.weight)
            } else {
              this.newMovement.weight = parseFloat(this.newMovement.weight)
            }
          }
          if (!this.units.includes('Height')) {
            delete this.newMovement.height
            delete this.newMovement.heightUnit
          } else {
            const newUnitIndex = HEIGHT_UNITS.findIndex(u => u.name === this.newMovement.heightUnit)
            this.$store.dispatch('user/setHeightUnit', HEIGHT_UNITS[newUnitIndex])
            if (this.newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && this.heightDiff && typeof this.newMovement.heightDiff !== 'object') {
              this.newMovement.height = textToArray(this.newMovement.height)
            } else {
              this.newMovement.height = parseFloat(this.newMovement.height)
            }
          }
          if (!this.units.includes('Distance')) {
            delete this.newMovement.distance
            delete this.newMovement.distanceUnit
          } else {
            const newUnitIndex = DISTANCE_UNITS.findIndex(u => u.name === this.newMovement.distanceUnit)
            this.$store.dispatch('user/setDistanceUnit', DISTANCE_UNITS[newUnitIndex])
            if (this.newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && this.distanceDiff && typeof this.newMovement.distanceDiff !== 'object') {
              this.newMovement.distance = textToArray(this.newMovement.distance)
            } else {
              this.newMovement.distance = parseFloat(this.newMovement.distance)
            }
          }
          if (!this.units.includes('Duration')) {
            delete this.newMovement.duration
            delete this.newMovement.durationUnit
          } else {
            const newUnitIndex = DURATION_UNITS.findIndex(u => u.name === this.newMovement.durationUnit)
            this.$store.dispatch('user/setDurationUnit', DURATION_UNITS[newUnitIndex])
            if (this.newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS && this.durationDiff && typeof this.newMovement.durationDiff !== 'object') {
              this.newMovement.duration = textToArray(this.newMovement.duration)
            } else {
              this.newMovement.duration = parseFloat(this.newMovement.duration)
            }
          }
          return true
        }
      },
      resetState() {
          this.$refs.form.reset() 
          this.newMovement = {}
          this.units = []
      },
      compareRoundsAndReps(v) {
        const numbers = String(v).replace(/[-,\s]/g, ' ').replace(/\s\s+/g, ' ').split(/ /g).filter(i => !isNaN(parseFloat(i))).map(j => Math.abs(parseFloat(j)))
        const difference = Math.abs(this.newMovement.rounds - numbers.length)
        const valueText = difference === 1 ? 'value' : 'values'
        if (numbers.length === parseInt(this.newMovement.rounds)) {
          return true
        } else if (numbers.length < this.newMovement.rounds) {
          return `Missing ${difference} ${valueText}`
        } else {
          return `Extra ${difference} ${valueText}`
        }
      },
      checkMovementProperties() {
        this.units = new Movements().getUnitsFor(this.newMovement.name)
        if (this.units.includes('Weight')) this.newMovement.weightUnit = this.weightUnit.name
        if (this.units.includes('Height')) this.newMovement.heightUnit = this.heightUnit.name
        if (this.units.includes('Distance')) this.newMovement.distanceUnit = this.distanceUnit.name
        if (this.units.includes('Duration')) this.newMovement.durationUnit = this.durationUnit.name
        if (this.newMovement.type === WOD_TYPE.AMRAP_DIF_REPS) {
          this.repsIncrement = "increment" in this.newMovement ? true : false
          this.weightIncrement = "weightIncrement" in this.newMovement ? true : false
          this.heightIncrement = "heightIncrement" in this.newMovement ? true : false
          this.distanceIncrement = "distanceIncrement" in this.newMovement ? true : false
          this.durationIncrement = "durationIncrement" in this.newMovement ?  true : false
        } else if (this.newMovement.type === WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS) {
          this.repsDiff = typeof this.newMovement.reps === 'object' ? true : false
          this.weightDiff = typeof this.newMovement.weight === 'object' ? true : false
          this.heightDiff = typeof this.newMovement.height === 'object' ? true : false
          this.distanceDiff = typeof this.newMovement.distance === 'object' ? true : false
          this.durationDiff = typeof this.newMovement.duration === 'object' ? true : false
        }
      }
    },
     watch: {
      repsDiff: function(newDiff) {
        if (!newDiff) {
          if (typeof this.newMovement.reps === 'string') {
            this.newMovement.reps = textToArray(this.newMovement.reps)[0]
          } else if (typeof this.newMovement.reps === 'object') {
            this.newMovement.reps = this.newMovement.reps[0]
          }
        } 
      },
      weightDiff: function(newDiff) {
        if (!newDiff) {
          if (typeof this.newMovement.weight === 'string') {
            this.newMovement.weight = textToArray(this.newMovement.weight)[0]
          } else if (typeof this.newMovement.weight === 'object') {
            this.newMovement.weight = this.newMovement.weight[0]
          }
        } 
      },
      heightDiff: function(newDiff) {
        if (!newDiff) {
          if (typeof this.newMovement.height === 'string') {
            this.newMovement.height = textToArray(this.newMovement.height)[0]
          } else if (typeof this.newMovement.height === 'object') {
            this.newMovement.height = this.newMovement.height[0]
          }
        } 
      },
      distanceDiff: function(newDiff) {
        if (!newDiff) {
          if (typeof this.newMovement.distance === 'string') {
            this.newMovement.distance = textToArray(this.newMovement.distance)[0]
          } else if (typeof this.newMovement.distance === 'object') {
            this.newMovement.distance = this.newMovement.distance[0]
          }
        } 
      },
      durationDiff: function(newDiff) {
        if (!newDiff) {
          if (typeof this.newMovement.duration === 'string') {
            this.newMovement.duration = textToArray(this.newMovement.duration)[0]
          } else if (typeof this.newMovement.duration === 'object') {
            this.newMovement.duration = this.newMovement.duration[0]
          }
        } 
      },
      repsIncrement: function(newIncrement) {
        if (!newIncrement) delete this.newMovement.increment
      },
      weightIncrement: function(newIncrement) {
        if (!newIncrement) delete this.newMovement.weightIncrement
      },
      heightIncrement: function(newIncrement) {
        if (!newIncrement) delete this.newMovement.heightIncrement
      },
      distanceIncrement: function(newIncrement) {
        if (!newIncrement) delete this.newMovement.distanceIncrement
      },
      durationIncrement: function(newIncrement) {
        if (!newIncrement) delete this.newMovement.durationIncrement
      },
    },
    mounted: function() {
      this.checkMovementProperties()
    }
  }
</script>
