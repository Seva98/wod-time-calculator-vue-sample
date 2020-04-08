<template>
  <v-form>
	<v-card> 
		<v-toolbar class="primary">
			<v-text-field
			v-model="searchString"
			placeholder="Search movement"
			color="secondary"
			></v-text-field>
			<v-spacer />
			<v-icon class="center" @click="cancelClicked">fa-times</v-icon>
		</v-toolbar>
		<v-layout
			row
			wrap>
			<v-btn
			v-for="(category, index) in mainCategories"
			block
			class="mx-1 primary"
			:key="index"
			@click="categoryClicked(category)">
				{{category}}
			</v-btn>
		</v-layout>
		<v-card-text
				class="pa-0">
			<v-list
			style="max-height: 600px"
			class="scroll-y">
				<template 
					v-for="(movement, index) in filteredMovements">
					<v-list-tile
					:key="movement.name"
					@click="movementSelected(movement)">
						<v-list-tile-content>
							<v-list-tile-title
							class="text-xs-center">
								{{movement.name}}
							</v-list-tile-title>
							<v-list-tile-sub-title v-if="'description' in movement" class="text-xs-center">
								{{movement.description}}
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider 
					:key="index"
					v-if="index+1 !== filteredMovements.length"/>
				</template>
			</v-list>
		</v-card-text>
	</v-card>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getCategoriesFor, WOD_TYPE } from '@/data/constants'

export default {
	data: () => ({
		mainCategories: [],
		selectedCategories: [],
		searchString: '',
		filteredMovements: [],
		customMovement: {
			name: 'Custom', 
			description: 'WTC calculations are not supported',
			type: WOD_TYPE.CUSTOM
			}
	}),
	computed: {
		...mapGetters({
			movements: 'movementsData/all'
		}),
		movement: {
			get: function() {
				return this.$store.getters['workout/movement']
			}
		}
	},
	methods: {
		...mapActions({
			setEditedMovement: 'workout/setEditedMovement',
			resetEditedMovement: 'workout/resetEditedMovement',
			setNewMovement: 'workout/setNewMovement',
			addKeyToMovement: 'workout/addKeyToMovement',
			changeMovementType: 'workout/changeMovementType'
		}),
		cancelClicked() {
			this.resetEditedMovement()
			this.setNewMovement(null)
			this.resetState()
		},
		categoryClicked(categoryClicked) {
			this.mainCategories = getCategoriesFor(categoryClicked)
			if (categoryClicked === "Reset Categories") {
				this.selectedCategories = []
			} else {
				this.selectedCategories.push(categoryClicked)
			}
			this.filterMovements(this.searchString)
		},
		// 1) Goes through all search strings to fill filteredMovements from full object of movements
		// 2) Looks to movement's tags and name and compares it to search string
		// 3) AND looks at selected categories and compare it to movement categories
		filterMovements: function(search) {
			const searchStrings = search.split(' ')
			this.filteredMovements = this.movements.filter(mov => searchStrings.every(search => {
				const tags = [...mov.tags.map(tag =>  tag.toLowerCase())]
				tags.push(mov.name.toLowerCase())
				return tags.some(tag => tag.includes(search.toLowerCase())) && this.selectedCategories.every(cat => mov.categories.includes(cat))
			}))
			this.filteredMovements.push(this.customMovement)
		},
		movementSelected(movement) {
			if ('type' in movement && movement.type === WOD_TYPE.CUSTOM) {
				this.changeMovementType(movement.type)
			} else {
				this.setNewMovement(null)
				const tempMovement = this.movement
				this.addKeyToMovement({key: 'name', value: movement.name})
				this.setEditedMovement(tempMovement)
			}
		},
		resetState() {
			this.searchString = ''
			this.mainCategories = getCategoriesFor("Main")
			this.filteredMovements = this.movements
		}
		},
		watch: {
			searchString: function(search) {
				this.filterMovements(search)
			},
			movements: function(newMovements) {
				this.filteredMovements = newMovements
			}
	},
	beforeMount: function() {
		this.mainCategories = getCategoriesFor("Main")
		this.filteredMovements = this.movements
	}
  }
</script>
