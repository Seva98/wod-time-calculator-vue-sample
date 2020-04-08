<template>
  <v-card>
    <v-toolbar dark class="primary">
      <v-toolbar-title>Personal Information</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleEdit">
        <v-icon small>{{editMode ? "fa-check" : "fa-pen"}}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout>
      <v-card-text>
        <template fluid>
          <div class="title">Username</div>
          <div class="subheading">
            <v-layout row v-if="editMode">
              <v-text-field
                v-if="editMode"
                v-model="newUsername"
                placeholder="New username"
                color="secondary"
                hint="All spaces will be removed."
              ></v-text-field>
              <v-btn
                class="my-3"
                :color="btnColor"
                @click="updateUsername()"
                :loading="loadingBtn"
                :disabled="loadingBtn"
              >Update</v-btn>
            </v-layout>
            <span v-else>{{name}}</span>
          </div>
          <br />
          <div class="title">Newsletter</div>
          <div class="subheading">
            <v-layout row>
              <span>{{newsletter ? "Subscribed" : "Unsubscribed"}}</span>
              <v-spacer />
              <v-switch
                v-model="newsletter"
                class="py-0 px-1 ma-0"
                style="height:24px; flex: 0 1 auto;"
                color="primary"
              />
            </v-layout>
            <div v-if="!newsletter" class="caption" style="opacity: 0.7">
              Join newsletter to receive occasional mail with app updates and top content from WTC.
              <br />By turning switch on you consent to receive such newsletter.
            </div>
          </div>
        </template>
      </v-card-text>
    </v-layout>
    <v-snackbar v-model="snackbar" color="error" :timeout="6000">
      {{ error }}
      <v-btn @click="snackbar = false" color="">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data: () => ({
		editMode: false,
		newUsername: '',
		loadingBtn: false,
    btnColor: 'primary',
    snackbar: false,
    error: ''
	}),
	computed: {
    ...mapGetters({
      name: 'user/name',
      newsletter: 'user/newsletter'
    }),
    newsletter: {
      get: function() {
        return this.$store.getters['user/newsletter']
      },
      set: function(newValue) {
        this.$store.dispatch('user/setNewsletter', newValue)
        this.$mongo.auth.toggleNewsletter(newValue)
      }
    }
	},
	methods: {
		toggleEdit() {
			this.editMode = !this.editMode
			this.loadingBtn = false
			this.btnColor = 'primary'
    },
    async updateUsername() {
      this.loadingBtn = true
      try {
        const result = await this.$mongo.auth.updateName(this.newUsername)
        this.newUsername = result
        this.btnColor = 'success'
      } catch (error) {
        this.btnColor = 'error'
        this.snackbar = true
        this.error = error
      }
      this.loadingBtn = false
		}
  }
}
</script>