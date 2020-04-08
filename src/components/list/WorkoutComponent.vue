<template>
	<div :id="id">
		<v-card>
			<v-toolbar dark class="primary">
				<v-toolbar-title>{{this.workout.name ? this.workout.name : "Workout"}}</v-toolbar-title>
				<v-spacer />
				<v-menu bottom offset-y>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on">
							<v-icon small>fa-ellipsis-v</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-tile v-for="item in menuItems" :key="item" @click="dropMenuClicked(item)">
							<v-list-tile-title>{{ item }}</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-toolbar>
			<v-layout v-if="deleting" align-center justify-center>
				<SyncLoader class="ma-5" />
			</v-layout>
			<v-list v-else>
				<template v-for="wod in wods">
					<v-list-tile :key="wod.id">
						<v-list-tile-content>
							<v-subheader class="px-0">{{getWodName(wod)}}</v-subheader>
						</v-list-tile-content>
					</v-list-tile>
					<v-list :key="wod.id+' '">
						<template v-for="movement in movementsById(wod.id)">
							<v-list-tile :key="movement.id">
								<v-list-tile-content>
									<!-- <v-list-tile-title>
                                            {{getMovementName(movement)}}
									</v-list-tile-title>-->
									<v-list-tile-content v-if="typeof getMovementName(movement) === 'string'">
										<v-list-tile-title class="headtext">{{getMovementName(movement)}}</v-list-tile-title>
									</v-list-tile-content>
									<v-list-tile-content v-else>
										<v-list-tile-title class="headtext">{{getMovementName(movement).title}}</v-list-tile-title>
										<v-list-tile-sub-title class="headtext">{{getMovementName(movement).description}}</v-list-tile-sub-title>
									</v-list-tile-content>
								</v-list-tile-content>
							</v-list-tile>
						</template>
					</v-list>
				</template>
			</v-list>
			<v-divider v-if="'comment' in workout && type !== 'list' && workout.comment" />
			<div
				v-if="'comment' in workout && type !== 'list' && workout.comment"
				class="px-3 py-3"
				v-html="comment"
			></div>
			<v-divider v-if="showScore" />
			<div v-if="showScore" class="px-3 py-3" v-html="score"></div>
			<v-divider v-if="rephaos" />
			<v-card-actions class="pa-3 gray-text" v-if="rephaos">
				<div>
					{{date}} by
					<router-link :to="`/profile/${workout.author}`">{{' ' + workout.author}}</router-link>
				</div>
				<v-spacer />
				{{hearts}}
				<i
					@click="heartClicked()"
					aria-hidden="true"
					:class="heart ? 'fa red-color' : 'far'"
					class="v-icon v-icon--link fa-heart theme--dark ml-1"
				></i>
			</v-card-actions>
		</v-card>
		<v-dialog :value="deletingDialog" persistent max-width="400px" lazy>
			<v-card>
				<v-toolbar class="primary">
					<div class="title">Do you really want to delete selected workout?</div>
				</v-toolbar>
				<v-card-actions>
					<v-btn class="secondary" @click="abortDelete">No</v-btn>
					<v-spacer />
					<v-btn class="primary" @click="confirmDelete">Yes</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import WorkoutName from '@/model/WorkoutName'
import SyncLoader from '@/components/helpers/SyncLoader'
import { showScore, showTime, toNth } from '@/model/helpers/helpers'
import { mapGetters } from 'vuex'

export default {
	props: ['workout', 'type'],
	components: {
		SyncLoader
	},
	data: () => ({
		id: null,
		wods: null,
		movements: null,
		name: null,
		names: null,
		heart: false,
		deleting: false,
		deletingDialog: false
	}),
	computed: {
		...mapGetters({
			user: 'user/user',
			rephaos: 'user/rephaos'
		}),
		menuItems: function() {
			const items = ['Use in Calculator']
			if (this.type === 'log' || this.type === 'zakaio') {
				items.push('Delete')
			}
			return items
		},
		comment: function() {
			return `<div class="gray-text">Comment</div>${this.workout.comment}`
		},
		date: function() {
			const date = new Date(this.workout.date)
			return date.toLocaleDateString()
		},
		hearts: function() {
			if ('hearts' in this.workout && this.workout.hearts >= 0) {
				return this.workout.hearts
			} else {
				return null
			}
		},
		showScore: function() {
			const keys = ['reps', 'rounds', 'minutes', 'seconds', 'rank']
			let keyFound = false
			keys.forEach(key => {
				if (key in this.workout) keyFound = true
			})
			return keyFound
		},
		score: function() {
			let html = ''
			if (showTime(this.wods) || showScore(this.wods))
				html += '<div class="gray-text">Result</div>'
			if (showTime(this.wods))
				html += `${this.workout.minutes}:${this.workout.seconds}<br>`
			if (showScore(this.wods))
				html += `${this.workout.rounds} rounds and ${this.workout.reps} reps<br>`

			if ('rank' in this.workout)
				html += `<div class="gray-text">Result level</div>${toNth(
					this.workout.rank
				)} percentile`
			return html
		}
	},
	methods: {
		getWodName(wod) {
			if (this.names) return this.names.wods.find(w => w.id === wod.id).name
		},
		movementsById(id) {
			if (this.movements) return this.movements.filter(mov => id === mov.wodId)
		},
		getMovementName(movement) {
			if (movement)
				return this.names.movements.find(mov => mov.id === movement.id).name
		},
		heartClicked() {
			this.heart = !this.heart
			this.heart
				? this.$mongo.hearts.addHeartTo(this.workout)
				: this.$mongo.hearts.removeHeartFrom(this.workout)
		},
		abortDelete() {
			this.deletingDialog = false
		},
		async confirmDelete() {
			this.deletingDialog = false
			this.deleting = true
			let status = {}
			if (this.type === 'log') {
				status = await this.$mongo.log.removeWorkout(this.id)
			} else if (this.type === 'zakaio') {
				status = await this.$mongo.zakaio.removeWorkout(this.id)
			}
			this.deleting = false
			this.$emit('onDelete', status)
		},
		dropMenuClicked(item) {
			if (item === 'Use in Calculator') {
				this.$store.dispatch('workout/resetState')
				this.$store.dispatch('workout/setWorkout', {
					wods: this.wods,
					movements: this.movements
				})
				this.$router.push('/')
			} else if (item === 'Delete') {
				this.deletingDialog = true
			}
		}
	},
	created: function() {
		if (this.workout && 'id' in this.workout) {
			const parsedWorkout = JSON.parse(atob(this.workout.id))
			this.wods = parsedWorkout.wods
			this.movements = parsedWorkout.movements
			this.id = this.workout._id
			const workoutName = new WorkoutName(this.wods, this.movements)
			this.names = workoutName.getAllNames()
			if (this.id) {
				this.heart = this.$store.getters['hearts/hearts'].includes(
					this.id.toString()
				)
			}
		}
	}
}
</script>
