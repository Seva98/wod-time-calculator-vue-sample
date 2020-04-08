<template>
    <div>
        <MovementsSelect 
            v-if="newMovement && movement && movement.type !== WOD_TYPE.CUSTOM && !('custom' in movement && movement.custom)" />  
        <CustomMovementInput 
            v-else-if="newMovement && movement && (movement.type === WOD_TYPE.CUSTOM || ('custom' in movement && movement.custom))" />
        <MovementsInput
            v-else-if="!newMovement && movement && movement.type !== WOD_TYPE.CUSTOM" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { WOD_TYPE } from '@/data/constants'
import MovementsSelect from '@/components/workout/newMovement/MovementsSelect'
import MovementsInput from '@/components/workout/newMovement/MovementsInput'
import CustomMovementInput from '@/components/workout/newMovement/CustomMovementInput'

export default {
    components: {
        MovementsInput,
        MovementsSelect,
        CustomMovementInput
    },
    data: () => ({
        WOD_TYPE
    }),
    computed: {
        ...mapGetters({
            movement: 'workout/movement',
            newMovement: 'workout/newMovement'
        })
    }
}
</script>