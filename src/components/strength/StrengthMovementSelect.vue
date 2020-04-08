<template>
    <v-layout
    row
    wrap
    justify-start
    >
        <v-flex 
        v-for="movement in movements"
        :key="movement"
        xs6 sm3 md2 xl1
        >
            <v-btn
            :color="movement === 'Change Movement' ? '' : 'primary'"
            style="width: 95%"
            @click="movementSelected(movement)"
            >
                {{movement}}
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  import strengthData from '@/data/strength'
  import strength from '@/model/strength/Strength'

  export default {
    components: {
        
    },
    props: {
    },
    data: () => ({
        movements: []
    }),
    computed: {
    },
    methods: {
        movementSelected: function(movement) {
            const changeMovement = 'Change Movement'
            if (movement === changeMovement) {
                this.movements = strength.getAllNames()
            } else {
                this.movements = [movement, changeMovement]
                this.$store.dispatch('strength/setMovement', movement)
            }
        }
    },
    created: function() {
        this.movements = Object.values(strengthData).map(obj => obj.name)
    }
  }
</script>