<template>
    <v-content class="text-xs-center my-5">
        <v-layout align-center justify-center>
            <v-flex xs12 sm10 md4>
                <div class="title">{{infoText}}</div>
                <div v-if="showPassword">
                    <v-text-field prepend-icon="fa-user-alt" name="password" label="Password" type="password" v-model="password"></v-text-field>
                    <v-btn @click="setNewPassword" color="primary">Set New Password</v-btn>
                </div>
                <SyncLoader v-else />
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import SyncLoader from '@/components/helpers/SyncLoader'
import { capitalize } from '@/model/helpers/helpers'
import router from '@/router/router'
import { setTimeout } from 'timers';

export default {
    components: {
        SyncLoader
    },
    data: () => ({
        infoText: 'Please choose new password',
        password: null,
        showPassword: true
    }),
    methods: {
        setNewPassword: async function() {
            try {
                this.showPassword = false
                const response = await this.$mongo.auth.setNewPassword(this.password)
                this.infoText = response
                setTimeout(function() {
                    router.push('/')
                }, 5000)
            } catch (error) {
                this.infoText = capitalize(error.message)
            }
            this.showPassword = true
        }
    }
}
</script>
<style></style>