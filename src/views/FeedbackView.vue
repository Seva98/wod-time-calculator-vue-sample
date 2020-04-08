<template>
    <v-content>
        <v-layout
            align-center
            justify-center
            column
            fill-height
        >
          <v-container fluid v-if="user">
            <v-form lazy-validation ref="form">  
                <v-flex grow xs12 sm6 md6 lg4 xl3 style="margin: 0 auto;">
                    <div class="title my-2">Please share your opinion, suggestions, ideas, bugs and more.</div>
                    <div class="title my-2">Your feedback helps me to constantly improve the WTC app. Thank you!</div>
                    <div class="subheading">This form automatically attaches current state data of the app to a feedback you are going to send so you don't need to copy the WOD to the message.</div>
                </v-flex>
                <v-flex grow xs12 sm6 md6 lg4 xl3 style="margin: 0 auto;">
                    <v-card>
                        <v-toolbar dark class="primary">
                            <v-toolbar-title>Send Feedback</v-toolbar-title>
                        </v-toolbar>
                        <v-layout>
                            <v-card-text>
                                <template fluid>
                                    <v-text-field
                                        v-model="email"
                                        placeholder="Your Email"
                                        label="Your Email"
                                        type="email"
                                        :disabled="true"
                                    />
                                    <v-select 
                                        :items="categories"
                                        v-model="category"
                                        label="Feedback Category"
                                    />
                                    <v-textarea
                                        v-model="message"
                                        placeholder="Your Feedback"
                                        label="Your Feedback"
                                        type="text" 
                                    />
                                </template>
                            </v-card-text>
                        </v-layout>
                        <v-btn 
                            block 
                            :color="sendBtnColor"
                            @click="sendBtnColor === 'primary' ? sendFeedback() : feedbackAlreadySent()"
                            :disabled="!allFields"
                            >
                            Send
                        </v-btn>
                    </v-card>
                </v-flex>
            </v-form>
            <v-flex grow xs12 sm6 md6 lg4 xl3 class="my-4" style="margin: 0 auto;" v-if="category === categories[0]">
                <span class="title">This WOD will be added to your feedback:</span>
                <WodEditor />
            </v-flex>
            <v-snackbar v-model="snackbar" color="error" :timeout="10000">
                {{error}}
            <v-btn @click="snackbar = false" color="">
                Close
            </v-btn>
            </v-snackbar>
          </v-container>
          <div v-else class="subtitle my-2">
            Please <router-link to="/login">login</router-link> to be able to send detailed feedback about current workout<br>
            If you don't want to create the account you can still use <a href="https://wodtimecalculator.com/blog/contact/">old contact form</a> to send your feedback
        </div>    
        </v-layout>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import WodEditor from '@/components/workout/WodEditor'

export default {
    components: {
        WodEditor
    },
    data: () => ({
//        email: '',
        message: '',
        category: 'WOD Time Calculator App',
        categories: ['WOD Time Calculator App', 'Premium Account', '#WTCAthlete Programming', 'Workout Timer', 'Workout Database', 'Workout Log', 'Strength Level Calculator', 'Suggestions', 'Complaints', 'Other Feedback'],
        snackbar: false,
        sendBtnColor: 'primary',
        sendBtnSync: false,
        error: ''
//        valid: false,
        //emailRule: [v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid email']
    }),
    computed: {
        ...mapGetters({
            wods: 'workout/wods',
            movements: 'workout/movements',
            user: 'user/user',
            email: 'user/email'
        }),
        allFields() {
            return this.category && this.message
        }
    },
    methods: {
        async sendFeedback() {
            this.sendBtnSync = true
            try {
                await this.$mongo.feedback.insertToDb(this.category, this.message)
                this.sendBtnColor = 'success'
            } catch (error) {
                this.snackbar = true
                this.error = 'Error connecting to database, please try again later'
                this.sendBtnColor = 'warning'
            }
            this.sendBtnSync = false
        },
        feedbackAlreadySent() {
            this.snackbar = true
            this.error = 'Your feedback has been already sent'
        }
    },
  }
</script>

<style>
.v-progress-circular__overlay {
    transition: all 0.01s ease-in-out !important;
}
</style>