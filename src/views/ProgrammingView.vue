<template>
	<div class="py-0">
		<div class="ma-4">
			<div class="display-1 my-2">{{rephaos ? '#WTCAthlete Programming' : '#WTCAthlete Programming'}}</div>
			<v-btn v-if="zakaio" @click="printToConsole" color="primary">Print</v-btn>
			<div class="subheading mb-2" v-if="!rephaos">
				For full daily programming sign up for
				<router-link to="/premium">premium</router-link>
			</div>
			<v-layout v-if="rephaos" row>
				<a class="title mx-4" @click="pickingDate = true">{{toLocalDate(pickedDate)}}</a>
			</v-layout>
			<!-- <v-layout v-else row>
				<a
					class="title mx-4"
					@click="pickingDate = true"
				>{{`Week #${weekFromDate(pickedDate)} of ${pickedDate.getFullYear()}`}}</a>
			</v-layout> -->
		</div>

		<template v-for="type in types">
			<div v-if="workoutsBytype(type).length > 0" :key="type">
				<div class="title mx-4 my-2">{{type}}</div>
				<router-link v-if="type === 'Kratos (Str+Cond)'" to="/faq#what_is_rpe" class="ml-3">What is RPE?</router-link>
				<v-layout row wrap :id="`id-${type}`">
					<template v-for="workout in workoutsBytype(type)" id="programming">
						<v-flex class="pa-1 item" xs12 sm6 md4 lg3 xl2 :key="workout.id">
							<WorkoutComponent
								:key="workout._id.toString()"
								:workout="workout"
								:type="zakaio ? 'zakaio' : 'programming'"
								@onDelete="workoutDeleted"
							/>
						</v-flex>
					</template>
				</v-layout>
			</div>
		</template>
		<SyncLoader :loading="loading" class="text-xs-center ma-4" />
		<div v-if="noWorkouts && rephaos" class="text-xs-center">
			<strong>Today is the rest day.</strong>
		</div>
		<v-dialog :value="pickingDate" persistent max-width="400px" lazy>
			<ProgrammingDatePicker :zakaio="zakaio" @onSearch="startSearch" />
		</v-dialog>
	</div>
</template>


<script>
import ProgrammingDatePicker from '@/components/programming/ProgrammingDatePicker'
import SyncLoader from '@/components/helpers/SyncLoader'
import waterfall from '@/model/helpers/waterfall'
import WorkoutComponent from '@/components/list/WorkoutComponent'
import { toLocalDate, weekFromDate, twoDigits } from '@/model/helpers/helpers'
import { PROGRAMMING_TYPES } from '@/data/constants'
import { mapGetters } from 'vuex'

export default {
	components: {
		ProgrammingDatePicker,
		SyncLoader,
		WorkoutComponent
	},
	props: ['zakaio'],
	data: () => ({
		resizeListener: null,
		loading: false,
		noWorkouts: false,
		workouts: [],
		types: PROGRAMMING_TYPES,
		pickingDate: false,
		pickedDate: new Date()
	}),
	computed: {
		...mapGetters({
			user: 'user/user',
			rephaos: 'user/rephaos'
		})
	},
	methods: {
		toLocalDate: date => toLocalDate(date),
		weekFromDate: date => weekFromDate(date),
		async startSearch(date) {
			this.loading = true
			this.pickedDate = new Date(date)
			this.pickingDate = false
			this.noWorkouts = false
			this.workouts = []
			const dateData = {
				start: new Date(new Date(date).setHours(0, 0, 0, 0)),
				end: new Date(new Date(date).setHours(23, 59, 59, 999))
			}
			if (this.rephaos) {
				this.workouts = await this.$mongo.zakaio.loadWorkouts(dateData)
			} else {
				const monthYear = `${twoDigits(weekFromDate(date))}-${new Date(
					date
				).getFullYear()}`
				try {
					const json = await import(`@/data/programming/${monthYear}`)
					if (json && 'data' in json) {
						const workouts = JSON.parse(atob(json.data))
						this.workouts = workouts
					}
				} catch (error) {
					console.log(error)
				}
			}
			if (this.workouts.length === 0) this.noWorkouts = true
			this.loading = false
			this.activateWaterfall()
		},
		workoutsBytype(type) {
			const filteredWorkouts = this.workouts.filter(
				workout => workout.type === type
			)
			return filteredWorkouts
		},
		workoutDeleted(response) {
			if (response.status.deletedCount === 1) {
				this.workouts = this.workouts.filter(
					workout => workout._id !== response.id
				)
			}
		},
		activateWaterfall() {
			requestAnimationFrame(() => waterfall(`#programming`))
		},
		printToConsole() {
			console.log(btoa(JSON.stringify(this.workouts)))
		}
	},
	mounted: async function() {
		await this.startSearch(new Date().toISOString().slice(0, 10))
		if (!this.resizeListener)
			this.resizeListener = window.addEventListener(
				'resize',
				this.activateWaterfall
			)
	},
	destroyed: function() {
		window.removeEventListener('resize', this.activateWaterfall)
	}
}
</script>