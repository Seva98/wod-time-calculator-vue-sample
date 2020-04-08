<template>
    <v-content class="pb-0">
        <PremiumTitle />
        <PremiumIntro style="min-height: 65vh;"/>
        <div class="py-2" :class="darkMode ? 'secBgDark' : 'secBgLight'">
            <PremiumProgrammingInfo />
        </div>
        <!-- <PremiumProgrammingPrograms /> -->
        <PremiumProgrammingSummary />
        <div class="py-2" :class="darkMode ? 'secBgDark' : 'secBgLight'">
            <PremiumLogInfo />
        </div>
        <PremiumLogSummary />
        <div class="py-2" :class="darkMode ? 'secBgDark' : 'secBgLight'"> 
            <PremiumListInfo />
        </div>
        <PremiumListSummary />
        <div class="py-2" :class="darkMode ? 'secBgDark' : 'secBgLight'">
            <PremiumNoAds />
        </div>
        <PremiumAlreadyActive v-if="rephaos"/>
        <PremiumCallToAction v-else />
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import PremiumTitle from '@/components/premium/PremiumTitle'
import PremiumIntro from '@/components/premium/PremiumIntro'
import PremiumProgrammingInfo from '@/components/premium/PremiumProgrammingInfo'
// import PremiumProgrammingPrograms from '@/components/premium/PremiumProgrammingPrograms'
import PremiumProgrammingSummary from '@/components/premium/PremiumProgrammingSummary'
import PremiumLogInfo from '@/components/premium/PremiumLogInfo'
import PremiumLogSummary from '@/components/premium/PremiumLogSummary'
import PremiumListInfo from '@/components/premium/PremiumListInfo'
import PremiumListSummary from '@/components/premium/PremiumListSummary'
import PremiumNoAds from '@/components/premium/PremiumNoAds'
import PremiumAlreadyActive from '@/components/premium/PremiumAlreadyActive'
import PremiumCallToAction from '@/components/premium/PremiumCallToAction'

export default {
    components: {
        PremiumTitle,
        PremiumIntro,
        PremiumProgrammingInfo,
        // PremiumProgrammingPrograms,
        PremiumProgrammingSummary,
        PremiumLogInfo,
        PremiumLogSummary,
        PremiumListInfo,
        PremiumListSummary,
        PremiumNoAds,
        PremiumAlreadyActive,
        PremiumCallToAction
    },
	data: () => ({
        snackbar: false
	}),
	computed: {
        ...mapGetters({
            rephaos: 'user/rephaos',
            darkMode: 'user/darkMode'
        }),
	},
	methods: {
    }
}
</script>

<style>

.secBgDark {
    background-color:#424242 !important;
}

.secBgLight {
    background-color:#EEEEEE !important;
}

</style>