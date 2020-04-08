<template>
    <v-content v-if="user">
      <div class="ma-4">
            <div v-if="username">
                <div class="display-1 my-2">Profile of {{ username }}</div>
                <v-btn color="primary" @click="workoutLogLink">
                    Check the Workout Log of {{ username }}
                </v-btn>
                <div class="display-1 my-2">The Most Popular Workouts of {{ username }}</div>
                <TopUserWorkouts :username="username"/>
                <div class="display-1 my-2">Workout Stats</div>
                <UserStats :username="username" />
            </div>
            <div v-else>
                <div class="display-1 my-2">Your Profile</div>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg3 xl2 class="pa-1">
                    <UserInfo/>
                    </v-flex>
                    <v-flex xs12 sm6 md4 lg3 xl2 class="pa-1">
                    <UserPremiumManager/>
                    </v-flex>
                </v-layout>
                <div class="display-1 my-2">Workout Stats</div>
                <UserStats />
            </div>
        </div>
    </v-content>
    <v-content v-else>
        <PleaseLogin sender="Your Profile"/>
    </v-content>
</template>


<script>
import UserStats from '@/components/profile/UserStats'
import UserInfo from '@/components/profile/UserInfo'
import UserPremiumManager from '@/components/profile/UserPremiumManager'
import TopUserWorkouts from '@/components/profile/TopUserWorkouts'
import PleaseLogin from '@/components/helpers/PleaseLogin'
import { capitalize } from '@/model/helpers/helpers'
import { mapGetters } from 'vuex'

export default {
  components: {
    UserStats,
    UserInfo,
    UserPremiumManager,
    TopUserWorkouts,
    PleaseLogin
  },
  computed: {
      ...mapGetters({
          user: 'user/user'
      }),
      username() {
            const username = this.$route.params.id
            if (username) {
                return capitalize(this.$route.params.id)
            } else {
                return ''
             } 
      }
  },
  methods: {
      workoutLogLink() {
          this.$router.push(`/log/${this.username}`)
      }
  },
  beforeRouteUpdate(to, from, next) {
      this.$forceUpdate()
      next()
  }
}
</script>