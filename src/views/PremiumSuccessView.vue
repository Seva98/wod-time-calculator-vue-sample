<template>
    <v-content>
        <v-container>
            <v-layout align-center justify-center>
                <v-card class="text-xs-center">
                    <v-toolbar class="primary">
                        <div class="title">Payment has been successful</div>
                    </v-toolbar>
                    <div class="ma-3">
                        <b v-html="updateMessage"/>
                        <div>
                            If you have issue with premium please contact me at ondrej@wodtimecalculator.com with following details:<br />
                            Resource ID: {{resourceId}}<br />
                            Order ID: {{lastOrderId}}<br />
                            Plan ID: {{planId}}<br />
                        </div>
                    </div>
                    <v-text-field
                        :model="payPalEmail"
                        :value="email"
                        placeholder="PayPal Email"
                        hint="PayPal Email"
                        persistent-hint
                        color="secondary"
                        class="mx-3 mt-0"
                    />
                    <v-card-actions >
                        <v-btn 
                            class="primary"
                            v-if="!finished"
                            @click="finishPayment" 
                            :loading="confirmSyncing"
                            :disabled="confirmSyncing"
                            block
                            >
                            Confirm Email
                        </v-btn>
                        <v-btn 
                            v-if="finished"
                            @click="redirectToHomepage" 
                            color="success"
                            block
                            >
                            Redirect to Homepage
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        updateMessage: `Thank you for your purchase<br>Please confirm your PayPal email`,
        payPalEmail: '',
        confirmSyncing: false,
        finished: false
    }),
    computed: {
        ...mapGetters({
            user: 'user/user',
            email: 'user/email',
            resourceId: 'helpers/resourceId',
            lastOrderId: 'helpers/lastOrderId',
            planId: 'helpers/planId'
        })
    },
    methods: {
        finishPayment: async function() {
            this.confirmSyncing = true
            const updateObj = {
                id: this.planId,
                orderID: this.lastOrderId,
                subscriptionID: this.resourceId
            }
            console.log(updateObj, this.payPalEmail)
            await this.$mongo.auth.updatePaymentInfo(updateObj, this.payPalEmail)
            this.confirmSyncing = false
            this.updateMessage = `Your PayPal email has been updated successfully.<br>You may now go back to the homepage or check premium status at your profile page.`
            this.finished = true
        },
        redirectToHomepage: function() {
            this.$router.push('/')
        }
    }
}
</script>