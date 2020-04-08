import { getEmomReps } from '@/model/score/Emom'
import { WOD_TYPE, FITNESS_LEVEL } from '@/data/constants'

describe('EMOM class', () => {
    
    describe('EMOM of bodyweight movements', () => {
        const log = false
        const name = 'EMOM bodyweight'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.EMOM,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Burpees",
                reps: 20,
                emomReps: [6, 9, 15, 16, 18]
            },{
                id: 0,
                wodId: 0,
                name: "Pull Ups",
                reps: 20,
                emomReps: [7, 10, 18, 21, 23]
            },{
                id: 0,
                wodId: 0,
                name: "Air Squats",
                reps: 20,
                emomReps: [12, 18, 30, 34, 38]
            },{
                id: 0,
                wodId: 0,
                name: "Push Ups",
                reps: 20,
                emomReps: [8, 12, 22, 25, 28]
            },{
                id: 0,
                wodId: 0,
                name: "Sit Ups",
                reps: 20,
                emomReps: [10, 14, 25, 29, 32]
            },{
                id: 0,
                wodId: 0,
                name: "Calories Row",
                reps: 20,
                emomReps: [6, 8, 14, 16, 18]
            },{
                id: 0,
                wodId: 0,
                name: "Row",
                reps: 20,
                emomReps: [83, 124, 220, 248, 275]
            },{
                id: 0,
                wodId: 0,
                name: "Handstand Push Ups",
                reps: 20,
                emomReps: [4, 7, 12, 14, 16]
            },{
                id: 0,
                wodId: 0,
                name: "Ring Muscle Ups",
                reps: 20,
                emomReps: [1, 2, 3, 4, 5]
            },{
                id: 0,
                wodId: 0,
                name: "Rope Climbs",
                reps: 20,
                height: 4,
                heightUnit: 'm',
                emomReps: [1, 1, 3, 5, 6]
            }]
        }

        state.movements.forEach( mov => {
            it(`${mov.name} will have ${mov.emomReps[0]-1}-${mov.emomReps[0]+1} reps for beginner`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[0])
                if (log) console.log(name, `Beginner ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[0]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[0]+1)
            })
            it(`${mov.name} will have ${mov.emomReps[1]-1}-${mov.emomReps[1]+1} reps for average`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[1])
                if (log) console.log(name, `Average ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[1]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[1]+1)
            })
            it(`${mov.name} will have ${mov.emomReps[2]-1}-${mov.emomReps[2]+1} reps for advanced`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[2])
                if (log) console.log(name, `Advanced ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[2]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[2]+1)
            })
            it(`${mov.name} will have ${mov.emomReps[3]-1}-${mov.emomReps[3]+1} reps for competitor`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[3])
                if (log) console.log(name, `Competitor ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[3]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[3]+1)
            })
            it(`${mov.name} will have ${mov.emomReps[4]-1}-${mov.emomReps[4]+1} reps for elite`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[4])
                if (log) console.log(name, `Elite ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[4]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[4]+1)
            })
            
        })
    })    

    describe('EMOM of clean and jerks', () => {
        const log = false
        const name = 'EMOM'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.EMOM,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 40,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [3, 5, 9, 10, 12]
            },{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 50,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [2, 4, 8, 9, 11]
            },{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 60,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 3, 6, 8, 9]
            },{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 70,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 3, 5, 6, 9]
            },{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 80,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 2, 4, 5, 8]
            },{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 90,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 2, 3, 4, 5]
            },{
                id: 0,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 100,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 1, 3, 4, 5]
            }]
        }

        state.movements.forEach( mov => {
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[0]-1}-${mov.emomReps[0]+1} reps for beginner`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[0])
                if (log) console.log(name, `Beginner ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[0]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[0]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[1]-1}-${mov.emomReps[1]+1} reps for average`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[1])
                if (log) console.log(name, `Average ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[1]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[1]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[2]-1}-${mov.emomReps[2]+1} reps for advanced`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[2])
                if (log) console.log(name, `Advanced ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[2]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[2]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[3]-1}-${mov.emomReps[3]+1} reps for competitor`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[3])
                if (log) console.log(name, `Competitor ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[3]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[3]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[4]-1}-${mov.emomReps[4]+1} reps for elite`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[4])
                if (log) console.log(name, `Elite ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[4]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[4]+1)
            })
        })
    })    

    describe('EMOM of deadlifts', () => {
        const log = false
        const name = 'EMOM'
        const movName = "Deadlifts"
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.EMOM,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 40,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [5, 9, 18, 20, 22]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 60,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [4, 6, 16, 17, 21]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 80,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 4, 11, 14, 18]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 100,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [2, 2, 8, 10, 13]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 120,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 1, 6, 8, 10]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 140,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 2, 3, 5, 7]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 160,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 1, 1, 2, 5]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 180,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 1, 1, 1, 2]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 200,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 1, 1, 1, 1]
            }]
        }

        state.movements.forEach( mov => {
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[0]-1}-${mov.emomReps[0]+1} reps for beginner`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[0])
                if (log) console.log(name, `Beginner ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[0]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[0]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[1]-1}-${mov.emomReps[1]+1} reps for average`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[1])
                if (log) console.log(name, `Average ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[1]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[1]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[2]-1}-${mov.emomReps[2]+1} reps for advanced`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[2])
                if (log) console.log(name, `Advanced ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[2]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[2]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[3]-1}-${mov.emomReps[3]+1} reps for competitor`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[3])
                if (log) console.log(name, `Competitor ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[3]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[3]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[4]-1}-${mov.emomReps[4]+1} reps for elite`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[4])
                if (log) console.log(name, `Elite ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[4]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[4]+1)
            })
        })
    })
    
    describe('EMOM of back squats', () => {
        const log = false
        const name = 'EMOM'
        const movName = "Back Squats"
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.EMOM,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 40,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [5, 9, 18, 20, 22]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 50,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [4, 8, 17, 19, 22]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 60,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [3, 6, 16, 18, 21]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 70,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [3, 5, 13, 16, 19]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 80,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [2, 4, 11, 14, 17]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 90,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [2, 4, 10, 12, 14]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 100,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 3, 9, 11, 13]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 110,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 2, 8, 9, 11]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 120,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 2, 7, 8, 10]
            }]
        }

        state.movements.forEach( mov => {
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[0]-1}-${mov.emomReps[0]+1} reps for beginner`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[0])
                if (log) console.log(name, `Beginner ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[0]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[0]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[1]-1}-${mov.emomReps[1]+1} reps for average`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[1])
                if (log) console.log(name, `Average ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[1]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[1]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[2]-1}-${mov.emomReps[2]+1} reps for advanced`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[2])
                if (log) console.log(name, `Advanced ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[2]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[2]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[3]-1}-${mov.emomReps[3]+1} reps for competitor`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[3])
                if (log) console.log(name, `Competitor ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[3]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[3]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[4]-1}-${mov.emomReps[4]+1} reps for elite`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[4])
                if (log) console.log(name, `Elite ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[4]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[4]+1)
            })
        })
    })  

    describe('EMOM of American KB Swings', () => {
        const log = false
        const name = 'EMOM'
        const movName = "American Kettlebell Swings"
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.EMOM,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 16,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [4, 9, 20, 23, 26]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 24,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [2, 5, 13, 17, 20]
            },{
                id: 0,
                wodId: 0,
                name: movName,
                weight: 32,
                weightUnit: 'kg',
                reps: 20,
                emomReps: [1, 3, 10, 12, 14]
            }]
        }

        state.movements.forEach( mov => {
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[0]-1}-${mov.emomReps[0]+1} reps for beginner`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[0])
                if (log) console.log(name, `Beginner ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[0]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[0]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[1]-1}-${mov.emomReps[1]+1} reps for average`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[1])
                if (log) console.log(name, `Average ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[1]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[1]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[2]-1}-${mov.emomReps[2]+1} reps for advanced`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[2])
                if (log) console.log(name, `Advanced ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[2]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[2]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[3]-1}-${mov.emomReps[3]+1} reps for competitor`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[3])
                if (log) console.log(name, `Competitor ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[3]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[3]+1)
            })
            it(`${mov.name} ${mov.weight} ${mov.weightUnit} will have ${mov.emomReps[4]-1}-${mov.emomReps[4]+1} reps for elite`, () => {
                const reps = getEmomReps(mov, FITNESS_LEVEL[4])
                if (log) console.log(name, `Elite ${mov.name}:`, reps)
                expect(reps).toBeGreaterThanOrEqual(mov.emomReps[4]-1)
                expect(reps).toBeLessThanOrEqual(mov.emomReps[4]+1)
            })
        })
    })  
})