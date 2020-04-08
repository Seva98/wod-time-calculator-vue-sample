<template>
    <div 
        v-if="user" 
        class="paypal-button" 
        style="margin: 0 auto; color: white;" 
        :id="ppId" />
    <v-btn 
        v-else 
        block
        color="primary" 
        @click="$router.push('/login')">
        Please login first
    </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        ppId: {
            type: String
        }
    },
    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    }
}
</script>