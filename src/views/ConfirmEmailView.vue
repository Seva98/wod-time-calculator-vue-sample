<template>
    <v-content class="text-xs-center my-5">
        <v-layout align-center justify-center>
            <v-flex xs12 sm10 md4>
                <div class="title">{{infoText}}</div>
                <div v-if="showEmail">
                    <v-text-field prepend-icon="fa-user-alt" name="signIn" label="Email" type="text" v-model="email"></v-text-field>
                    <v-btn @click="resendConfirmationEmail" color="primary">Resend Confirmation Mail</v-btn>
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
        infoText: 'Checking tokens',
        email: null,
        showEmail: false
    }),
    methods: {
        resendConfirmationEmail: async function() {
            this.showEmail = false
            try {
                const response = await this.$mongo.auth.resendConfirmationEmail(this.email)
                this.infoText = response
                setTimeout(function() {
                    router.push('/login/')
                }, 5000)
            } catch (error) {
                this.infoText = capitalize(error.message)
            }
            this.showEmail = true
        }
    },
    mounted: async function() {
        try {
            const response = await this.$mongo.auth.confirmEmail()
            this.infoText = response
            setTimeout(function() {
                    router.push('/login/')
            }, 5000)
        } catch (error) {
            this.showEmail = true
            this.infoText = capitalize(error.message)
        }
    }
}
</script>
<style></style>