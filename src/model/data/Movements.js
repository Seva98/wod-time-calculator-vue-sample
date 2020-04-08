import movements from '@/data/movements'

export default class Movements {

    constructor() {
        this._movements = movements
    }

    get all() { return movements }
    getAll() { return this._movements.sort((a,b) => - (b.name.localeCompare(a.name))).sort((a,b) => - (a.priority < b.priority)) }
    getNames() { return this._movements.map(mov => mov.name) }
    getCategoriesFor(name) { 
        const movement = this._movements.find(movement => movement.name === name)
        if (movement && 'categories' in movement) return movement.categories
    }
    getRepsFor(name) { return this._movements.find(movement => movement.name === name).repsInMinute }
    getUnitsFor(name) { return this._movements.find(movement => movement.name === name).units }
    getTagsFor(name) { return this._movements.find(movement => movement.name === name).tags }
    getPriorityFor(name) { return this._movements.find(movement => movement.name === name).priority }
    getBaselineWeightFor(name) { return this._movements.find(movement => movement.name === name).baselineWeight }
    getBaselineHeightFor(name) { return this._movements.find(movement => movement.name === name).baselineHeight }
    getFatigueFor(name) { return this._movements.find(movement => movement.name === name).fatigue }
    getDifficultyModifierFor(name) { return this._movements.find(movement => movement.name === name).difficultyModifier }
    getDifficulty(name) { return this._movements.find(movement => movement.name === name).difficulty }
}
