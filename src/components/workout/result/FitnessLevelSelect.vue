<template>
  <div>
    <div
	v-if="extraInfo"
	class="title">Fitness level</div>
    <v-select
		v-model="fitnessLevel"
		:hint="extraInfo ? fitnessLevelDescription : ''"
		:items="levels"
		item-text="name"
		item-value="description"
		label="Select your fitness level"
		persistent-hint
		return-object
		single-line
		data-html="true"
    ></v-select>
    <v-rating
		v-model="level"
		:length="levels.length"
		:empty-icon="emptyIcon"
		:full-icon="fullIcon"
		:hover="true"
		color="secondary"
		background-color="grey lighten-1"
    ></v-rating>
  </div>
</template>

<script>
import { FITNESS_LEVEL } from '@/data/constants'
import { mapActions } from 'vuex'

export default {
	props: {
		extraInfo: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		emptyIcon: 'fa-walking',
		fullIcon: 'fa-running',
		level: 3,
		levels: FITNESS_LEVEL
	}),
	methods: {
		...mapActions({
			updateAll: 'workout/updateAll'
		})
	},
	computed: {
		fitnessLevel: {
			get: function() {
				return this.$store.getters['user/fitnessLevel']
			},
			set: function(newLevel) {
				this.level = newLevel.value+1
				const newLevelIndex = FITNESS_LEVEL.findIndex(lvl => lvl.name === newLevel.name)
				this.$store.dispatch('user/setFitnessLevel', FITNESS_LEVEL[newLevelIndex])
				this.updateAll()
			}
		}, 
		fitnessLevelDescription: function() {
			return this.fitnessLevel.description
		}
	},
	watch: {
		level: function(newLevel) {
			if (newLevel > 0) {
				this.fitnessLevel = this.levels.find(level => level.value === newLevel-1)
			}
		}
	},
	created: function() {
		const fitnessLevel = this.fitnessLevel.value+1
		if (fitnessLevel > 0) this.level = fitnessLevel
	}
}
</script>