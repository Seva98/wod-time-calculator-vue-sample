<template>
	<div class="ma-4">
		<div class="display-2 my-2 weight-100 text-md-center">#WTCAthlete Programming</div>
		<!-- <v-flex offset-md4 md4 offset-xl5 xl2 class="promo-description">
			<p>The #WTCAthlete programming is well rounded .</p>
			<p>
				<b>Why gods and heroes?</b>
			</p>
			<p>I've wanted to differentiate programs from each other and as we are building the fittest versions of ourselves I found that comparison to these litteral gods of fitness was the right thing.</p>
			<p>Select your path and work hard to become one of them! :)</p>
		</v-flex> -->
		<v-layout row justify-center class="display-1 weight-100 mt-3 mb-5 text-xs-center">
			<v-flex md4 xl3>
				<b>1</b>
				<div>Program</div>
			</v-flex>
			<v-flex md4 xl3>
				<b>7</b>
				<div>Days a week</div>
			</v-flex>
			<v-flex md4 xl3>
				<b>60 min</b>
				<div>Session duration</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data: () => ({
		snackbar: false
	}),
	computed: {
		...mapGetters({
			rephaos: 'user/rephaos'
		})
	},
	methods: {}
}
</script>