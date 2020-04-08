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
                <v-toolbar-title>Add workout description</v-toolbar-title>
                    <v-spacer />
                <v-icon class="center" @click="cancelClicked">fa-times</v-icon>
            </v-toolbar>
            <v-card-text>
                <v-text-field
                    v-model="newMovement.title"
                    label="Title"
                    :rules="newMovement.title ? lengthRule : []"
                />
                <v-text-field
                    v-model="newMovement.description"
                    label="Description"
                    :rules="newMovement.description ? lengthRule : []"
                />
                <!-- <v-textarea 
                    v-model="newMovement.description"
                    label="Description"
                    :rules="newMovement.description ? lengthRule : []"
                    :rows="1"
                    auto-grow
                /> -->
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
                    color="primary"
                    @click="confirmClicked"
                    :disabled="!valid"
                    :rules="[v => !!v || 'Everything has to be valid']"
                >
                    Confirm
                    <v-icon right>fa-check</v-icon>
                </v-btn>
        </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        valid: true,
        newMovement: {},
        title: '',
        description: '',
        lengthRule: [v => v.length <= 28 || 'Maximum of 28 characters.']   
    }),
    methods: {
        ...mapActions({
            saveEditedMovement: 'workout/saveEditedMovement',
            resetEditedMovement: 'workout/resetEditedMovement',
            updateAll: 'workout/updateAll'
        }),
        cancelClicked() {
            this.resetEditedMovement()
            this.resetState()
        },
        confirmClicked() {
            const movement = this.$store.getters['workout/movement']
            const movementToSave = {...this.newMovement, id: movement.id, wodId: movement.wodId, custom: true}
            this.saveEditedMovement(movementToSave)
            this.updateAll()
            this.resetState()
        },
        resetState() {
            this.$refs.form.reset() 
            this.newMovement = {}
        },
    },
}
</script>