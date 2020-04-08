<template>
    <div class="ma-4" id="cta">
        <div class="display-2 my-4 weight-100 text-md-center">Upgrade Now</div>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm6 md4 lg3 xl2 class="pa-2">
                <v-card :class="darkMode ? 'secBgDark' : 'secBgLight'">
                    <v-toolbar dark class="primary">   
                        <v-toolbar-title>
                            WTC Monthly Membership
                        </v-toolbar-title>
                    </v-toolbar>
                    <ul class="promo ma-4">
                        <li>No Ads</li>
                        <li>Workout Log</li>
                        <li>Workout Stats</li>
                        <li>Daily Programming</li>
                        <li>2 Types of Programming</li>
                        <li>Secure Payment Gate</li>
                        <li>Cancel Anytime</li>
                        <br>
                    </ul>
                    <div class="display-1 text-xs-center">$11.99 / month</div>
                    <v-card-actions>
                        <PremiumPayPalButton ppId="paypal-plan-container-monthly"/>
                    </v-card-actions>
                    <div class="mx-4 pb-2">
                        By subscribing you agree with 
                        <a href="https://wodtimecalculator.com/blog/terms-of-service/" target="_blank">Terms of Service</a>
                        {{` and `}} 
                        <a href="https://wodtimecalculator.com/blog/privacy-policy/" target="_blank">Privacy Policy</a>.
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 md4 lg3 xl2 class="pa-2">
                <v-card :class="darkMode ? 'secBgDark' : 'secBgLight'">
                    <v-toolbar dark class="primary">   
                        <v-toolbar-title>
                            WTC Yearly Membership
                        </v-toolbar-title>
                    </v-toolbar>
                    <ul class="promo ma-4">
                        <li>No Ads</li>
                        <li>Workout Log</li>
                        <li>Workout Stats</li>
                        <li>Daily Programming</li>
                        <li>2 Types of Programming</li>
                        <li>Secure Payment Gate</li>
                        <li>Cancel Anytime</li>
                        <li><b><u>Two Months Free</u></b></li>
                    </ul>
                    <div class="display-1 text-xs-center">$119.90 / year</div>
                    <v-card-actions>
                        <PremiumPayPalButton ppId="paypal-plan-container-yearly"/>
                    </v-card-actions>
                    <div class="mx-4 pb-2">
                        By subscribing you agree with 
                        <a href="https://wodtimecalculator.com/blog/terms-of-service/" target="_blank">Terms of Service</a>
                        {{` and `}} 
                        <a href="https://wodtimecalculator.com/blog/privacy-policy/" target="_blank">Privacy Policy</a>.
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import PremiumPayPalButton from '@/components/premium/PremiumPayPalButton'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        PremiumPayPalButton
    },
	data: () => ({
        snackbar: false,
        confirmDialog: false,
        confirmSyncing: false,
        updateMessage: '',
        payPalEmail: '',
        paymentData: {},
        plans: [
            {
                name: 'WTC Monthly Membership',
                id: 'EMPTY',
                dom: '#paypal-plan-container-monthly'
            },
            {
                name: 'WTC Yearly Membership',
                id: 'EMPTY',
                dom: '#paypal-plan-container-yearly'
            }
        ]
	}),
	computed: {
        ...mapGetters({
            rephaos: 'user/rephaos',
            darkMode: 'user/darkMode',
            email: 'user/email',
            user: 'user/user'
        }),
	},
	methods: {
        ...mapActions({
            setRephaos: 'user/setRephaos',
            updateP: 'helpers/updateP'
        }),
        redirectToSuccess: async function(data, plan) {
            await this.$mongo.auth.updatePaymentInfo({...data, ...plan}, this.email)
            this.paymentData = {...data, ...plan}
            this.updateP(this.paymentData)
            this.$router.push('/premium-success')
        },
        setLoaded() {
            this.plans.forEach(plan => {
                window.paypal.Buttons({
                    createSubscription: (data, actions) => actions.subscription.create({'plan_id': plan.id}),
                    onApprove: async (data) => this.redirectToSuccess(data, plan),
                    onCancel: (data) => console.log('cancel', data, plan),
                    onError: (error) => console.log('error', error, plan)
                }).render(plan.dom)
            })
        },
    },    
    mounted: function() {
        if (this.user) {
            let paypalScript = document.createElement('script')
            paypalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=EMPTY&vault=true')
            paypalScript.addEventListener('load', this.setLoaded)
            document.head.appendChild(paypalScript)
        }
    },
    destroyed: function() {
        this.confirmDialog = false
    }
}
</script>