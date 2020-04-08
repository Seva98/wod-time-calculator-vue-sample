<template>
    <v-card>
       <v-toolbar dark class="primary">
            <v-text-field
                v-if="editMode"
                v-model="workoutName"
                placeholder="Workout name"
                color="secondary"
                >

            </v-text-field>
            <v-toolbar-title
            v-else
            >
                {{workoutName.length > 0 ? workoutName : "Workout"}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="toggleEdit">
                <v-icon small>{{editMode ? "fa-check" : "fa-pen"}}</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <template v-for="wod in wods">
                <v-list-tile
                :key=wod.id
                @click="editWod(wod)"
                >
                    <v-list-tile-content>
                        <v-subheader
                        class="px-0"
                        >
                            {{getWodName(wod)}}
                        </v-subheader>
                    </v-list-tile-content>
                    <v-list-tile-action
                    v-if="editMode"
                    > 
                        <v-icon
                        @click="removeWod(wod)"
                        >fa-times</v-icon>              
                    </v-list-tile-action>
                </v-list-tile>
                <v-list
                :key="wod.id+' '">
                    <div v-if="editMode">
                        <draggable :list="movementsById(wod.id)" :group="movements" @change="movementDragChanged"> 
                            <template v-for="movement in movementsById(wod.id)">
                                <v-list-tile
                                :key=movement.id
                                @click="editMovement(wod, movement)">
                                    <v-list-tile-content v-if="typeof getMovementName(movement) === 'string'">
                                        <v-list-tile-title class="headtext">
                                            {{getMovementName(movement)}}
                                        </v-list-tile-title>
                                    </v-list-tile-content>
                                    <v-list-tile-content v-else>
                                        <v-list-tile-title class="headtext">
                                            {{getMovementName(movement).title}}
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title class="headtext">
                                            {{getMovementName(movement).description}}
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action
                                        :style="editMode ? 'min-width: 56px' : 'min-width: 0px'"
                                    >
                                        <v-icon
                                        @click="removeMovement(movement)"
                                        >fa-times</v-icon>              
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </draggable>
                    </div>
                    <div v-else>
                        <template v-for="movement in movementsById(wod.id)">
                            <v-list-tile
                                :key=movement.id
                                @click="editMovement(wod, movement)">
                                <v-list-tile-content v-if="typeof getMovementName(movement) === 'string'">
                                    <v-list-tile-title class="headtext">
                                        {{getMovementName(movement)}}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-content v-else>
                                    <v-list-tile-title class="headtext">
                                        {{getMovementName(movement).title}}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title class="headtext">
                                        {{getMovementName(movement).description}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </div>
                    <v-btn 
                    v-if="editMode" 
                    color="primary" 
                    @click="newMovement(wod, newMovementId)" 
                    block>Add Movement</v-btn>
                </v-list>
            </template>
            <v-btn 
            v-if="editMode"
            color="primary" 
            @click="newWod()" 
            block>Add WOD</v-btn>
        </v-list>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Wods from '@/model/Wods'

export default {
    data: () => ({
        editMode: true,
        drag: null
    }),
    components: {
        draggable
    },
    computed: {
        ...mapGetters({
            movements: 'workout/movements',
            wods: 'workout/wods',
            movementsById: 'workout/allMovementsForWodOfId',
            newMovementId: 'workout/largestMovementId',
            newWodId: 'workout/largestWodId',
            fitnessLevel: 'user/fitnessLevel',
            names: 'workout/names'
        }),
        workoutName: {
            get: function() {
                return this.$store.getters['workout/name']
            },
            set: function(newName) {
                this.$store.dispatch('workout/setName', newName)
            }
        }
    },
    methods: {
        ...mapActions({
            createWod: 'workout/newEditedWod',
            switchWods: 'workout/switchWods',
            setEditedWod: 'workout/setEditedWod',
            createMovement: 'workout/newEditedMovement',
            switchMovements: 'workout/switchMovements',
            setEditedMovement: 'workout/setEditedMovement',
            updateAll: 'workout/updateAll',
            setNewMovement: 'workout/setNewMovement'
        }),
        removeWod(wod) {
            this.$store.dispatch('workout/removeWod', wod)
            this.updateAll()
        },
        removeMovement(movement) {
            this.$store.dispatch('workout/removeMovement', movement)
            this.updateAll()
        },
        wodName(wod) {
            return Wods.getNameForWod(wod)
        },
        movementDragChanged(dragObj) {
            const wodId = dragObj.moved.element.wodId
            const switchObj = {
                wodId: wodId,
                oldIndex: this.movementsById(wodId)[dragObj.moved.oldIndex].id,
                newIndex: this.movementsById(wodId)[dragObj.moved.newIndex].id
            }
            this.switchMovements(switchObj)
            this.updateAll()
        },
        editMovement(wod, movement) {
            movement.type = wod.type
            movement.rounds = wod.value
            this.setEditedMovement(movement)
        },
        editWod(wod) {
            this.setEditedWod(wod)
        },
        newMovement(wod, movementId) {
            this.setNewMovement(true)
            const newMovement = {wodId: wod.id, type: wod.type, rounds: wod.value, id: movementId, name: null}
            this.createMovement(newMovement)
        },
        newWod() {
            const newWod = {id: this.newWodId}
            this.createWod(newWod)
        },
        getWodName(wod) {
            if (this.names.wods.length < 1) return
            return this.names.wods.find(w => w.id === wod.id).name
        },
        getMovementName(movement) {
            if (this.names.movements.length < 1) return
            return this.names.movements.find(mov => mov.id === movement.id).name
        },
        toggleEdit() {
            this.editMode = !this.editMode
            if (!this.editMode) this.updateAll
        }
    },
    created: function() {
        if (this.names.movements.length === 0) {
            this.updateAll()
        }
    }
  }
</script>

<style>
.headtext {
    font-size: 100%;
    animation-name: head;
    animation-duration: 0.3s;
}

@keyframes head {
    0% {opacity:1;}
    50% {opacity:0.65;}
    100% {opacity:1;}
}
</style>
