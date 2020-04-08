<template>
  <v-card>
    <v-toolbar dark class="primary">
      <v-toolbar-title>Manage Premium</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-card-text>
        <template fluid>
          <div class="title">Status</div>
          <div class="subheading">{{rephaos ? 'Active' : 'Inactive'}}</div>
          <br/>
          <!-- <div v-if="rephaos && rephaosDate">
            <div class="title">Renewal or Expiration</div>
            <div class="subheading">{{new Date(rephaosDate).toLocaleDateString() + ' ' + new Date(rephaosDate).toLocaleTimeString()}}</div>
            <br/>
          </div> -->
            <router-link v-if="rephaos" to="/faq#payments_cancel_with_acc">
                How to unsubscribe?
            </router-link>
          <router-link to="/premium" v-if="!rephaos">
            <v-btn color="primary" block >
              Upgrade now
            </v-btn>
          </router-link>
        </template>
      </v-card-text>
    </v-layout>
    <v-snackbar v-model="snackbar" color="error" :timeout="6000">
      <v-btn @click="snackbar = false" color="">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data: () => ({
        snackbar: false
	}),
	computed: {
        ...mapGetters({
          rephaos: 'user/rephaos',
          rephaosDate: 'user/rephaosDate'
        }),
	},
	methods: {
        ...mapActions({
            setRephaos: 'user/setRephaos'
        })
    },    
  
}
</script>