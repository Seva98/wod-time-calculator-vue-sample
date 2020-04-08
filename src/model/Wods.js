import {WOD_TYPE} from '@/data/constants'

const types = [{
    type: WOD_TYPE.ONE_ROUND
},
{
    type: WOD_TYPE.MULTIPLE_ROUNDS,
    description: 'Number of rounds'
},
{
    type: WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS,
    description: 'Number of rounds'
},
{
    type: WOD_TYPE.AMRAP,
    description: 'Minutes'
},
{
    type: WOD_TYPE.AMRAP_DIF_REPS,
    description: 'Minutes'
},
{
    type: WOD_TYPE.AMRAP_MAX_REPS,
    description: 'Minutes'
},
{
    type: WOD_TYPE.EMOM,
    description: 'Minutes'
},
{
    type: WOD_TYPE.STRENGTH,
    description: 'WOD Title'
},
{
    type: WOD_TYPE.CUSTOM,
    description: 'WOD Title'
}]

export default class Wods {

    static get all() { return types }

    static shouldHaveValue(wodType) {
        switch (wodType) {
            case 'One Round For Time':
            case 'Custom': return false
            default: return true
        }
    }

    static getDescriptionForWod(wod) {
        return this.all.find(w => w.type === wod.type).description
    }
}