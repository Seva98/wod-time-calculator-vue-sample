<template>
    <v-btn
    class="secondary"
    @click="signOut"
    v-if="username"
    :loading="syncingDb"
    :disabled="syncingDb">
        Sign Out
    </v-btn>
    <v-btn
    class="secondary"
    @click="signIn"
    v-else>
        Sign In
    </v-btn>
</template>
<script>
import { mapGetters } from 'vuex'
import router from '@/router/router'

export default {
    computed: {
        ...mapGetters({
            username: 'user/user',
			syncingDb: 'helpers/syncingDb'
        })
    },
    methods: {
        signOut: function() {
            this.$mongo.auth.signOutUser()
        }, 
        signIn: function() {
            router.push('/login')
        }
    }
}
</script>