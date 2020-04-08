import WorkoutTime from '@/model/score/WorkoutTime'
import { WOD_TYPE, FITNESS_LEVEL } from '@/data/constants'

describe('Workout Time class', () => {


    describe('Short For Time chipper of 20 pull ups, 40 wall balls 9 kg and 20 pull ups', () => {
        const log = false
        const name = 'Short chipper'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.ONE_ROUND,
                value: 1
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Pull Ups",
                reps: 20
            },{
                id: 1,
                wodId: 0,
                name: "Wall Balls",
                weight: 9,
                weightUnit: 'kg',
                reps: 40
            },{
                id: 2,
                wodId: 0,
                name: "Pull Ups",
                reps: 20
            }]
        }

        it('will have time of 6-10 minutes for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(6)
            expect(time).toBeLessThan(10)
        })
        it('will have time of 4-8 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(4)
            expect(time).toBeLessThan(8)
        })
        it('will have time of 2.85-4 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(2.85)
            expect(time).toBeLessThan(4)
        })
        it('will have time of 2.55-2.85 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(2.55)
            expect(time).toBeLessThan(2.85)
        })
        it('will have time of faster than 2.55 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeLessThan(2.55)
        })
    })    

    describe('Medium For Time chipper of 40 burpees, 40 clean and jerks 60 kg and 40 burpees', () => {
        const log = false
        const name = 'Medium chipper'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.ONE_ROUND,
                value: 1
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Burpees",
                reps: 40
            },{
                id: 1,
                wodId: 0,
                name: "Power Clean and Jerks",
                weight: 60,
                weightUnit: 'kg',
                reps: 40
            },{
                id: 2,
                wodId: 0,
                name: "Burpees",
                reps: 40
            }]
        }

        it('will have time of 16-25 minutes for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(16)
            expect(time).toBeLessThan(25)
        })
        it('will have time of 12-16 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(12)
            expect(time).toBeLessThan(16)
        })
        it('will have time of 7.5-12 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(7.5)
            expect(time).toBeLessThan(12)
        })
        it('will have time of 6.5-7.5 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(6.5)
            expect(time).toBeLessThan(7.5)
        })
        it('will have time of faster than 7 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeLessThan(7)
        })
    })
    
    describe('Long For Time chipper Murph', () => {
        const log = false
        const name = 'Long chipper Murph'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.ONE_ROUND,
                value: 1
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Run",
                distance: 1600,
                distanceUnit: 'm'
            },{
                id: 1,
                wodId: 0,
                name: "Pull Ups",
                reps: 100
            },{
                id: 2,
                wodId: 0,
                name: "Push Ups",
                reps: 200
            },{
                id: 3,
                wodId: 0,
                name: "Air Squats",
                reps: 300
            },{
                id: 4,
                wodId: 0,
                name: "Run",
                distance: 1600,
                distanceUnit: 'm'
            }]
        }

        it('will have time of 60-90 minutes for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(60)
            expect(time).toBeLessThan(90)
        })
        it('will have time of 45-60 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(45)
            expect(time).toBeLessThan(60)
        })
        it('will have time of 35-45 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(35)
            expect(time).toBeLessThan(45)
        })
        it('will have time of 32-35 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(32)
            expect(time).toBeLessThan(35)
        })
        it('will have time of faster than 32 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeLessThan(32)
        })
    })
    
    describe('Short bodyweight AMRAP 8 min Cindy', () => {
        const log = false
        const name = '8 min Cindy'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP,
                value: 8
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Pull Ups",
                reps: 5
            },{
                id: 1,
                wodId: 0,
                name: "Push Ups",
                reps: 10
            },{
                id: 2,
                wodId: 0,
                name: "Air Squats",
                reps: 15
            }]
        }

        it('will have total reps of 95-150 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(95)
            expect(score.totalReps).toBeLessThanOrEqual(150)
        })
        it('will have total reps of 150-210 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(150)
            expect(score.totalReps).toBeLessThan(210)
        })
        it('will have total reps of 210-270 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(210)
            expect(score.totalReps).toBeLessThan(270)
        })
        it('will have total reps of 270-330 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(270)
            expect(score.totalReps).toBeLessThanOrEqual(330)
        })
        it('will have better than 330 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThan(330)
        })
    })
    
    describe('Medium bodyweight AMRAP 20 min Cindy', () => {
        const log = false
        const name = '20 min Cindy'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Pull Ups",
                reps: 5
            },{
                id: 1,
                wodId: 0,
                name: "Push Ups",
                reps: 10
            },{
                id: 2,
                wodId: 0,
                name: "Air Squats",
                reps: 15
            }]
        }

        it('will have total reps of 210-360 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(210)
            expect(score.totalReps).toBeLessThanOrEqual(360)
        })
        it('will have total reps of 360-510 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(360)
            expect(score.totalReps).toBeLessThan(510)
        })
        it('will have total reps of 510-660 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(510)
            expect(score.totalReps).toBeLessThan(660)
        })
        it('will have total reps of 660-810 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(660)
            expect(score.totalReps).toBeLessThan(810)
        })
        it('will have better than 810 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(810)
        })
    })     

    describe('Long bodyweight AMRAP 40 min Cindy', () => {
        const log = false
        const name = '40 min Cindy'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP,
                value: 40
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Pull Ups",
                reps: 5
            },{
                id: 1,
                wodId: 0,
                name: "Push Ups",
                reps: 10
            },{
                id: 2,
                wodId: 0,
                name: "Air Squats",
                reps: 15
            }]
        }

        it('will have total reps of 400-720 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(400)
            expect(score.totalReps).toBeLessThanOrEqual(720)
        })
        it('will have total reps of 720-990 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(720)
            expect(score.totalReps).toBeLessThan(990)
        })
        it('will have total reps of 990-1260 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(990)
            expect(score.totalReps).toBeLessThan(1260)
        })
        it('will have total reps of 1260-1500 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(1260)
            expect(score.totalReps).toBeLessThan(1500)
        })
        it('will have better than 1500 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(1500)
        })
    })    

    describe('Short barbell WOD 5 rounds DT', () => {
        const log = false
        const name = '5 Rounds DT'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.MULTIPLE_ROUNDS,
                value: 5
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Deadlifts",
                reps: 12,
                weight: 155,
                weightUnit: 'lbs'
            },{
                id: 1,
                wodId: 0,
                name: "Hang Power Cleans",
                reps: 9,
                weight: 155,
                weightUnit: 'lbs'
            },{
                id: 2,
                wodId: 0,
                name: "Push Jerks",
                reps: 6,
                weight: 155,
                weightUnit: 'lbs'
            }]
        }

        it('will have time between 15-25 min for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', score)
            expect(score).toBeGreaterThanOrEqual(15)
            expect(score).toBeLessThan(25)
        })
        it('will have time between 10-15 min for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', score)
            expect(score).toBeGreaterThanOrEqual(10)
            expect(score).toBeLessThan(15)
        })
        it('will have time between 5.75-10 min for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', score)
            expect(score).toBeGreaterThanOrEqual(5.75)
            expect(score).toBeLessThan(10)
        })
        it('will have time between 4.5-5.75 min for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', score)
            expect(score).toBeGreaterThanOrEqual(4.5)
            expect(score).toBeLessThan(5.75)
        })
        it('will have time faster than 4.5 min for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', score)
            expect(score).toBeLessThanOrEqual(4.5)
        })
    })

    describe('Medium barbell WOD 10 rounds DT', () => {
        const log = false
        const name = '10 Rounds DT'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.MULTIPLE_ROUNDS,
                value: 10
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Deadlifts",
                reps: 12,
                weight: 155,
                weightUnit: 'lbs'
            },{
                id: 1,
                wodId: 0,
                name: "Hang Power Cleans",
                reps: 9,
                weight: 155,
                weightUnit: 'lbs'
            },{
                id: 2,
                wodId: 0,
                name: "Push Jerks",
                reps: 6,
                weight: 155,
                weightUnit: 'lbs'
            }]
        }

        it('will have time between 30-60 min for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', score)
            expect(score).toBeGreaterThanOrEqual(30)
            expect(score).toBeLessThan(60)
        })
        it('will have time between 20-30 min for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', score)
            expect(score).toBeGreaterThanOrEqual(20)
            expect(score).toBeLessThan(30)
        })
        it('will have time between 12-18 min for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', score)
            expect(score).toBeGreaterThanOrEqual(12)
            expect(score).toBeLessThan(18)
        })
        it('will have time between 9.5-12 min for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', score)
            expect(score).toBeGreaterThanOrEqual(9.5)
            expect(score).toBeLessThan(12)
        })
        it('will have time faster than 9.5 min for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', score)
            expect(score).toBeLessThanOrEqual(9.5)
        })
    })

    describe('Short different reps 21-15-9 Thrusters 40 kg + Burpees', () => {
        const log = false
        const name = '21-15-9 Thrusters 40 kg + Burpees'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS,
                value: 3
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Thrusters",
                reps: [21, 15, 9],
                weight: 40,
                weightUnit: 'kg'
            },{
                id: 1,
                wodId: 0,
                name: "Burpees",
                reps: [21, 15, 9]
            }]
        }

        it('will have time of 8-12 minutes for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(8)
            expect(time).toBeLessThan(12)
        })
        it('will have time of 6.5-8 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(6.5)
            expect(time).toBeLessThan(8)
        })
        it('will have time of 4.5-6.5 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(4.5)
            expect(time).toBeLessThan(6.5)
        })
        it('will have time of 4-4.5 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(4)
            expect(time).toBeLessThan(4.5)
        })
        it('will have time of faster than 4 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeLessThan(4)
        })
    })

    describe('Long different reps 21-18-15-12-9-6-3 Thrusters 40 kg + Burpees', () => {
        const log = false
        const name = '21-18-15-12-9-6-3 Thrusters 40 kg + Burpees'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS,
                value: 7
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Thrusters",
                reps: [21, 18, 15, 12, 9, 6, 3],
                weight: 40,
                weightUnit: 'kg'
            },{
                id: 1,
                wodId: 0,
                name: "Burpees",
                reps: [21, 18, 15, 12, 9, 6, 3]
            }]
        }

        it('will have time of 18-25 minutes for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(18)
            expect(time).toBeLessThan(25)
        })
        it('will have time of 14-18 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(12)
            expect(time).toBeLessThan(20)
        })
        it('will have time of 10-14 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(9)
            expect(time).toBeLessThan(12)
        })
        it('will have time of 7.5-9 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(7.75)
            expect(time).toBeLessThan(9)
        })
        it('will have time of faster than 7.75 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeLessThan(7.75)
        })
    })

    describe('Short increasing 10 min AMRAP of 10-20-30-... Box Jumps 60 cm + KB Swings 24 kg', () => {
        const log = false
        const name = '10 min AMRAP of 10-20-30-... Box Jumps 60 cm + KB Swings 24 kg'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP_DIF_REPS,
                value: 8
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Box Jumps",
                height: 60,
                heightUnit: 'cm',
                reps: 10,
                increment: 10
            },{
                id: 1,
                wodId: 0,
                name: "American Kettlebell Swings",
                reps: 10,
                weight: 24,
                weightUnit: 'kg',
                increment: 10
            }]
        }

        it('will have total reps of 105 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeLessThanOrEqual(105)
        })
        it('will have total reps of 105-150 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(105)
            expect(score.totalReps).toBeLessThan(150)
        })
        it('will have total reps of 150-230 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(150)
            expect(score.totalReps).toBeLessThan(230)
        })
        it('will have total reps of 230-260 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(230)
            expect(score.totalReps).toBeLessThan(260)
        })
        it('will have better than 260 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(260)
        })

    })

    describe('Short max reps 10 min AMRAP of 2K Row and max burpees', () => {
        const log = false
        const name = 'Max reps 10 min AMRAP of 2K Row and max burpees'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP_MAX_REPS,
                value: 10
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Row",
                distance: 2000,
                distanceUnit: "m"
            },{
                id: 1,
                wodId: 0,
                name: "Burpees",
                reps: 1
            }]
        }

        it('will have total reps of 1980-2010 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(1980)
            expect(score.totalReps).toBeLessThan(2010)
        })
        it('will have total reps of 2010-2035 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(2010)
            expect(score.totalReps).toBeLessThan(2035)
        })
        it('will have total reps of 2035-2050 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(2035)
            expect(score.totalReps).toBeLessThan(2050)
        })
        it('will have total reps of 2050-2060 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(2050)
            expect(score.totalReps).toBeLessThan(2060)
        })
        it('will have total reps of 2060-2070 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(2060)
            expect(score.totalReps).toBeLessThan(2070)
        })
    })

    describe('20 Min AMRAP of increasing weight on deadlifts and burpees', () => {
        const log = false
        const name = '20 Min AMRAP of increasing weight on deadlifts and burpees'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP_DIF_REPS,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Deadlifts",
                reps: 4,
                weight: 60,
                weightUnit: "kg",
                weightIncrement: 20
            },{
                id: 1,
                wodId: 0,
                name: "Burpees",
                reps: 12
            }]
        }

        it('will end at round of 120 kg or a few with 140 kg with total reps of 48-68 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(48)
            expect(score.totalReps).toBeLessThan(68)
        })
        it('will end at round of 160 kg with total reps of 80-96 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(80)
            expect(score.totalReps).toBeLessThanOrEqual(96)
        })
        it('will end at round of 200 kg with total reps of 112-126 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(112)
            expect(score.totalReps).toBeLessThan(126)
        })
        it('will end at round of 220 kg with total reps of 126-142 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(126)
            expect(score.totalReps).toBeLessThan(142)
        })
        it('will end at round of 240 kg with total reps of 142-158 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(142)
            expect(score.totalReps).toBeLessThan(158)
        })
    })

    describe('20 Min AMRAP 20.2 of DB thrusters, TTB and DUs', () => {
        const log = false
        const name = '20 Min AMRAP 18.2 of DB thrusters, TTB and DUs'
        const state = {
            wods: [{
                id: 0,
                type: WOD_TYPE.AMRAP,
                value: 20
            }],
            movements: [{
                id: 0,
                wodId: 0,
                name: "Double Dumbbell Thrusters",
                reps: 4,
                weight: 100,
                weightUnit: "lbs"
            },{
                id: 1,
                wodId: 0,
                name: "Toes to Bars",
                reps: 6
            },{
                id: 2,
                wodId: 0,
                name: "Double Unders",
                reps: 24
            }]
        }

        it('will end at round 9 with total reps of 306-340 for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Beginner:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(306)
            expect(score.totalReps).toBeLessThan(340)
        })
        it('will end at round 12 with total reps of 408-442 for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Average:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(408)
            expect(score.totalReps).toBeLessThan(442)
        })
        it('will end at round 19 with total reps of 646-680 for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Advanced:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(646)
            expect(score.totalReps).toBeLessThan(680)
        })
        it('will end at round 24 with total reps of 816-850 for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'competitor:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(816)
            expect(score.totalReps).toBeLessThan(850)
        })
        it('will end at round 28 with total reps of 952-986 for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const score = workoutTime.getResult().score
            if (log) console.log(name, 'Elite:', score)
            expect(score.totalReps).toBeGreaterThanOrEqual(952)
            expect(score.totalReps).toBeLessThan(986)
        })
    })

    describe('5 Rounds of 30 Cal AB and 30 Strict Press 30 kg', () => {
        const log = false
        const name = '5 Rounds of 30 Cal AB and 30 Strict Press 30 kg'
        const state = {
            wods: [{   
                id: 0,
                type: WOD_TYPE.MULTIPLE_ROUNDS,
                value: 5
            }],
            movements: [ {
                id: 0,
                wodId: 0,
                name: 'Calories Assault Bike',
                reps: 30
            },
            {
                id: 1,
                wodId: 0,
                name: 'Shoulder Presses',
                reps: 30,
                weight: 30,
                weightUnit: 'kg'
            }]
        }

        it('will have time of 25-35 minutes for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(25)
            expect(time).toBeLessThan(35)
        })
        it('will have time of 20-25 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(20)
            expect(time).toBeLessThan(25)
        })
        it('will have time of 14-20 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(14)
            expect(time).toBeLessThan(20)
        })
        it('will have time of 12.5-14 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(12.5)
            expect(time).toBeLessThan(14)
        })
        it('will have time of 10-12.5 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeGreaterThanOrEqual(10)
            expect(time).toBeLessThan(12.5)
        })
    })

    describe('5 Rounds of 5 Deadlifts 140 kg and 25 Calories Row', () => {
        const log = false
        const name = '5 Rounds of 5 Deadlifts 140 kg and 25 Calories Row'
        const state = {
            wods: [{   
                id: 0,
                type: WOD_TYPE.MULTIPLE_ROUNDS,
                value: 5
            }],
            movements: [ {
                id: 0,
                wodId: 0,
                name: 'Deadlifts',
                weight: 140,
                weightUnit: 'kg',
                reps: 5
            },
            {
                id: 1,
                wodId: 0,
                name: 'Calories Row',
                reps: 25
            }]
        }

        it('will have time of 30 minutes or longer for beginner', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[0])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Beginner:', time)
            expect(time).toBeGreaterThanOrEqual(30)
        })
        it('will have time of 20-30 minutes for average', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[1])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Average:', time)
            expect(time).toBeGreaterThanOrEqual(20)
            expect(time).toBeLessThan(30)
        })
        it('will have time of 10-13 minutes for advanced', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[2])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Advanced:', time)
            expect(time).toBeGreaterThanOrEqual(10)
            expect(time).toBeLessThan(13)
        })
        it('will have time of 8.5-10 minutes for competitor', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[3])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Competitor:', time)
            expect(time).toBeGreaterThanOrEqual(8.5)
            expect(time).toBeLessThan(10)
        })
        it('will have time of 7-8.5 minutes for elite', () => {
            const workoutTime = new WorkoutTime(state.wods, state.movements, FITNESS_LEVEL[4])
            const time = workoutTime.getResult().time
            if (log) console.log(name, 'Elite:', time)
            expect(time).toBeGreaterThanOrEqual(7)
            expect(time).toBeLessThan(8.5)
        })
    })
})

