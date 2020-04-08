<template>
    <v-content>
      <v-container pa-0>
        <v-layout align-center justify-center>
          <v-flex grow xs12 sm8 md4>
            <v-card class="ma-1">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{signIn ? "Sign in" : "Register"}} form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div v-if="!userDetails">
                    <v-text-field prepend-icon="fa-user-alt" name="signIn" label="Email" type="email" v-model="email"></v-text-field>
                    <v-text-field prepend-icon="fa-lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                  </div>
                </v-form>
                <a
                v-if="signIn && !userDetails" 
                @click="resetPassword">
                Reset password? (fill email first)
                </a>
              </v-card-text>
              <v-card-actions v-if="!userDetails">
                  <v-btn
                      color="secondary"
                      @click="signIn = !signIn"
                    >
                      {{signIn ? "Register" : "Sign In"}}
                    </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn 
                  color="primary"
                  @click="signIn ? signInUser(email, password) : registerUser(email, password)"
                  :disabled="signInLoading"
                  :loading="signInLoading"
                  >
                  {{signIn ? "Sign In" : "Register"}}
                  </v-btn>
              </v-card-actions>
            </v-card>
            <v-alert
              class="ma-1"
              :value="success"
              color="success"
              outline
              v-html="success">
            </v-alert>
            <v-alert
              class="ma-1"
              :value="error"
              color="error"
              outline
              v-html="error">
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog 
        :value="userDetails"
        persistent
        max-width="400px"
        lazy> 
        <v-card>
          <v-toolbar dark class="primary">
            <v-toolbar-title>Complete Registration</v-toolbar-title>
          </v-toolbar>
           <div class="ma-3">
              <div class="bold">1) Create your username, choose wisely, it can't be changed later</div>
              <v-text-field prepend-icon="fa-signature" name="username" label="Username" id="username" type="text" v-model="username"></v-text-field>
              <div class="bold">2) Do you want to receive info about app updates and the top blog posts from WTC?</div>
              <v-checkbox
                v-model="newsletter"
                label="Sign up for occasional updates from WTC"
                hide
                class="shrink ml-3"
              ></v-checkbox>
              <div class="bold">3) How did you hear about WTC?</div>
              <v-select
                :items="HOWDIDYOUHEARABOUTUS"
                v-model="source"
                label="How did you hear about WTC?"
              ></v-select>
              <v-alert
                class="ma-1"
                :value="error"
                color="error"
                outline
                v-html="error">
              </v-alert>
            </div>
            <v-card-actions>
              <v-btn
              color="primary"
              @click="completeRegistration"
              :disabled="userDetailsLoading"
              :loading="userDetailsLoading"
              block
              >
                Complete Registration
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers'
import { capitalize } from '@/model/helpers/helpers'
import router from '@/router/router'
import { HOWDIDYOUHEARABOUTUS } from '@/data/constants'

export default {
    data: () => ({
        signIn: true,
        signInLoading: false,
        email: '',
        password: '',
        error: null,
        success: null,
        timeout: null,
        userDetails: null,
        userDetailsLoading: false,
        username: null,
        newsletter: false,
        source: null,
        HOWDIDYOUHEARABOUTUS
    }),
    methods: {
      registerUser: async function(email, password) {
        this.progress(true)
        try {
          const response = await this.$mongo.auth.registerUser(email, password)
          this.setSuccess('Registred', response)
        } catch (error) {
          this.setError('Registration', error)
        }
        this.progress(false)
      },
      signInUser: async function(email, password) {
        this.progress(true)
        try {
          const response = await this.$mongo.auth.signInUser(email, password)
          if (response === 'Confirmation email has been sent again, please check your email') {
            throw {message: response}
          } else if (response === 'Please finish your registration by choosing your username') {
            this.setSuccess('Sign In', response)
            this.userDetails = true
          } else {
            this.setSuccess('Sign In', response)
            router.push('/profile/')
          } 
        } catch (error) {
          this.setError('Registration', error)
        }
        this.progress(false)
      },
      progress: function(progress) {
        if (progress) {
          this.signInLoading = true
          this.response = null
          this.error = null
        } else {
          this.signInLoading = false
        }
      },
      resetPassword: async function() {
        this.progress(true)
        try {
          const response = await this.$mongo.auth.resetPassword(this.email)
          this.setSuccess('Password Reset', response)
        } catch (error) {
          this.setError('Password Reset', error)
        }
        this.progress(false)
      },
      completeRegistration: async function() {
        this.userDetailsLoading = true
        try {
          if (!this.username) {
            throw({message: 'Please select username'})
          } else if (this.username.toLowerCase().includes('wtc')) {
            throw({message: "Can't use WTC in username, sorry"})
          } else if (!this.source) {
            throw({message: 'Please answer: How did you hear about WTC?'})
          } 
          await this.$mongo.auth.checkUsername(this.username)
          const data = {
            name: this.username,
            newsletter: this.newsletter,
            source: this.source
          }
          const response = await this.$mongo.auth.completeRegistration(data)
          this.setSuccess('Complete Registration', `${response}, redirecting to homepage`)
          router.push('/profile/')
        } catch (error) {
          this.setError('Complete Registration', error)
        }
        this.userDetailsLoading = false
      },
      setSuccess: function(action, response) {
        const that = this
        if (this.timeout) clearTimeout(this.timeout)
        this.error = null
        this.success = `${action} success:<br>${response}`
        this.timeout = setTimeout(function() {
          that.success = null
        }, 20000)
      },
      setError: function(action, error) {
        const that = this
        this.error = `${action} error:<br>${capitalize(error.message)}`
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(function() {
          that.error = null
        }, 20000)
      }
    },
    mounted: function() {
      if (this.$store.getters['user/user']) this.$router.push('/profile')
    }
}

</script>
<style>
.googleColor {
  background: #D54B3F !important
}
.facebookColor {
  background: #4267B2 !important
}
.twitterColor {
  background: #1B9CEB !important
}
.gitHubColor {
  background: #23292E !important
}
.lightText {
  color: white !important
}
.bold {
  font-weight: 500;
  font-size: 1.1rem;
}
</style>