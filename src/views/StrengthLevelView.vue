<template>
    <v-content>
        <v-layout>
            <v-container fluid>
                <div class="display-1 my-2">Strength Level Calculator</div>
                <div class="title my-2">1) Select movement</div>       
                <StrengthMovementSelect />
                <div class="title my-2">2) Add additional information</div>       
                <StrengthUserDetails />
                <div class="title my-2">3) Get your result</div>
                <StrengthResults />   
                <div v-if="!user" class="subtitle my-2"><router-link to="/login">Sign in</router-link> for more accurate results</div>    
            </v-container>
        </v-layout>
        <GoogleAd type="generic"/>
    </v-content>
</template>


<script>
import StrengthMovementSelect from '@/components/strength/StrengthMovementSelect'
import StrengthUserDetails from '@/components/strength/StrengthUserDetails'
import StrengthResults from '@/components/strength/StrengthResults'
import { mapGetters } from 'vuex'
import GoogleAd from '@/components/helpers/GoogleAd'

export default {
    components: {
        StrengthMovementSelect,
        StrengthUserDetails,
        StrengthResults,
        GoogleAd
    },
    props: {
    },
    data: () => ({
    }),
    computed: {
        ...mapGetters({
            user: 'user/user'
        })
    },
    methods: {
    }
}
</script>