<template>
	<v-app :dark=darkMode>
		<v-navigation-drawer fixed clipped app v-model="drawer">
			<v-list dense>
				<v-subheader>Profile</v-subheader>
				<v-list-tile 
				:to="user ? '/profile' : '/login'">
					<v-list-tile-action>
						<v-icon 
							class="center"
						>fa-user-alt</v-icon>	
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{user ? username : 'Sign In'}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-subheader>Apps</v-subheader>
				<v-list-tile to="/">
					<v-list-tile-action>
						<v-icon class="center">fa-calculator</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{title}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile :to="user ? '/timer' : '/login'">
					<v-list-tile-action>
						<v-icon :class="user ? 'center' : 'center grey-color'">fa-clock</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title :class="user ? '' : 'grey-color'">{{user ? 'Workout Timer' : 'Workout Timer (login)'}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile to="/benchmarks">
					<v-list-tile-action>
						<v-icon class="center">fa-chart-bar</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Benchmark Workouts</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile :to="rephaos ? '/workouts' : '/premium'">
					<v-list-tile-action>
						<v-icon :class="rephaos ? 'center' : 'center grey-color'">fa-list</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title :class="rephaos ? '' : 'grey-color'">{{rephaos ? 'Workouts Database' : 'Workouts Database (premium)'}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile :to="rephaos ? '/log' : '/premium'">
					<v-list-tile-action>
						<v-icon :class="rephaos ? 'center' : 'center grey-color'">fa-th</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title :class="rephaos ? '' : 'grey-color'">{{rephaos ? 'Workout Log' : 'Workouts Log (premium)'}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile to="/strength">
					<v-list-tile-action>
						<v-icon class="center">fa-dumbbell</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Strength Level Calculator</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile v-if="!rephaos" to="/premium">
					<v-list-tile-action>
						<v-icon class="center">fa-gem</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Premium</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile to="/feedback">
					<v-list-tile-action>
						<v-icon class="center">fa-comment-alt</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Feedback</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile to="/faq">
					<v-list-tile-action>
						<v-icon class="center">fa-question-circle</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>FAQ</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<!-- <v-list-tile to="/endurance">
					<v-list-tile-action>
						<v-icon class="center">fa-running</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Endurance Level Calculator</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile> -->
				<v-subheader>WTC Website</v-subheader>
				<v-list-tile href="/blog">
					<v-list-tile-action>
						<v-icon class="center">fa-blog</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Blog</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-subheader>Settings</v-subheader>
				<v-list-tile @click="switchDarkMode">
					<v-list-tile-action>
						<v-icon class="center">{{darkMode ? "fa-sun" : "fa-moon" }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{darkMode ? "Light Mode" : "Dark Mode" }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="switchGender">
					<v-list-tile-action>
						<v-icon class="center">{{gender === "Male" ? "fa-mars" : "fa-venus" }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{gender}}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
			<v-footer dark color="primary" app inset height="auto" style="padding: 0px !important">
				<v-flex text-xs-center xs12>
					<span>Code Marketer s.r.o., Ondrej Sevcik &copy;{{year}}</span><br>
					<a href="https://wodtimecalculator.com/blog/terms-of-service/" style="color:white" target="_blank">Terms of Service</a>
					{{'-'}}
					<a href="https://wodtimecalculator.com/blog/privacy-policy/" style="color:white" target="_blank">Privacy Policy</a>

				</v-flex>
			</v-footer>
		</v-navigation-drawer>
		<v-toolbar dark dense fixed clipped-left color="primary" app>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<router-link to="/" style="text-decoration: none; color: white;">
				<span class="font-weight-black">WOD</span><span class="font-weight-medium">TIME</span><span class="font-weight-light">CALCULATOR</span>
			</router-link>
			<v-spacer />
			<LoginButton />
		</v-toolbar>
		<main fill-height>
			<router-view></router-view>
		</main>
	</v-app>
</template>

<script>
import LoginButton from '@/components/helpers/LoginButton'
import { mapGetters, mapActions } from 'vuex'
import colors from 'vuetify/es5/util/colors'

export default {
	components: {
		LoginButton
	},
	props: {
		source: String
	},
	data: () => ({
		drawer: null,
		show: false,
		title: 'WOD Time Calculator'
	}),
	computed: {
		...mapGetters({
			darkMode: 'user/darkMode',
			gender: 'user/gender',
			user: 'user/user',
			username: 'user/name',
			userImg: 'user/img',
			rephaos: 'user/rephaos'
		}),
		year: function () {
			const date = new Date()
			return date.getFullYear()
		}
	},
	methods: {
		...mapActions({
			loadAllMovements: 'movementsData/loadAllMovements',
			toggleDarkMode: 'user/toggleDarkMode',
			toggleGender: 'user/toggleGender',
			updateAll: 'workout/updateAll',
			resetUser: 'user/resetData',
			setRephaos: 'user/setRephaos'
		}),
		checkDarkMode: function () {
			this.$vuetify.theme.primary = this.darkMode ? colors.blue : colors.blue
			this.$vuetify.theme.secondary = this.darkMode ? colors.blue.lighten2 : colors.blue.lighten2
		},
		switchDarkMode: function () {
			this.toggleDarkMode()
			this.checkDarkMode()
		},
		switchGender: function () {
			this.toggleGender()
			this.updateAll()
		}
	},
	created: function () {
		this.loadAllMovements()
		this.checkDarkMode()
	}
}
</script>
<style>
	.center {
		margin: 0 auto;
	}
	.avatar {
		width:22px;
		height:22px;
		margin: 0 auto;
	}
</style>