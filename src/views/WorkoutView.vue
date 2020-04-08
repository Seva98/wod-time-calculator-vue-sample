<script>
import { isDecodableJSON } from '@/model/helpers/helpers'
import { mapActions } from 'vuex'

export default {
    data: () => ({
        loading: false
    }),
    methods: {
        ...mapActions({
            setWorkout: 'workout/setWorkout'
        })
    },
    created: async function() {
        this.loading = true
        const id = this.$route.params.id
        let workout = {}
        if (isDecodableJSON(id)) {
            workout = JSON.parse(atob(id))
        } else {
            workout = await this.$mongo.workouts.getWithId(id)
        }
        if (workout && 'wods' in workout && 'movements' in workout) this.setWorkout(workout)
        this.loading = false
        this.$router.push('/')
    }
}
</script>