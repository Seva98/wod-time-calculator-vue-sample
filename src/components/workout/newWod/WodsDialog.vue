<template>
  <v-form
  ref="form"
  v-model="valid"
  lazy-validation>
    <v-card 
      @keydown.enter="confirmClicked"
      @keydown.esc="cancelClicked"
    >
      <v-toolbar dark class="primary">
         <v-toolbar-title>
            Add new WOD
          </v-toolbar-title>
        <v-spacer />
        <v-icon class="center" @click="cancelClicked">fa-times</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-autocomplete
          v-model="wod"
          :items="wods"
          :color=this.$vuetify.theme.secondary
          hide-selected
          item-text="type"
          item-value="type"
          label="Wod"
          placeholder="Select WOD type from the list"
          return-object
        ></v-autocomplete>
        <v-text-field
          v-if="description"
          v-model="newWod.value"
          :label="description"
          :rules="description === 'WOD Title' ? [] : numberRule"
          :type="description === 'WOD Title' ? 'text' : 'number'"
        ></v-text-field>
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
  import Wods from '@/model/Wods'

  export default {
    data: () => ({
      newWod: {},
      description: null,
      valid: true,
      numberRule: [v => (!isNaN(parseFloat(v)) &&  v >= 1 && v <= 999999) || 'Number has to be between 1 and 999999']
    }),
    computed: {
       ...mapGetters({
          wods: 'wodsData/all'
        }),
        wod: {
          get: function() {
            return this.$store.getters['workout/wod']
          },
          set: function(selectedWod) {
            // When new wod is selected from the list
            if (selectedWod) {
                this.description = "description" in selectedWod ? selectedWod.description : null
                this.newWod.type = selectedWod.type
            }
          }
        }
    },
    watch: {
        wod: function(currentWod) {
            if (currentWod) {
                this.newWod = {...currentWod}
                if ('type' in currentWod) this.description = Wods.getDescriptionForWod(currentWod)
            }
        }
    },
    created: function() {
      const currentWod = this.wod
      this.newWod = {...currentWod} 
      if ('type' in currentWod) this.description = Wods.getDescriptionForWod(currentWod)
    },
    methods: {
      ...mapActions({
        addWod: 'workout/addWod',
        saveEditedWod: 'workout/saveEditedWod',
        setEditedWod: 'workout/setEditedWod',
        resetEditedWod: 'workout/resetEditedWod',
        updateAll: 'workout/updateAll'
      }),
      cancelClicked() {
        this.resetState()
        this.resetEditedWod()
      },
      confirmClicked() {
        if (this.validate()) {
          const wodToSave = {...this.newWod}
          this.saveEditedWod(wodToSave)
          this.updateAll()
          this.resetState()
        }
      },
      validate() {
        if (this.$refs.form.validate()) {
          if (!Wods.shouldHaveValue(this.newWod.type)) delete this.newWod.value
          return true
        }
      },
      resetState() {
          this.$refs.form.reset() 
          this.newWod = {}
          this.description = null
      }
    },
  }
</script>
