export const STATUS = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE'
}

export const FIRST_LOGGED_WORKOUT = new Date('2020-02-01')

export const WORKOUTS_TO_LOAD = 15

export const MOV_CATEGORIES = ["Bodyweight", "No Equipment", "Squat", "Weight", "Kettlebell", "Pull", "Barbell", "Bar", "Push", "Other", "Multiple", "Box", "Rings", "Cardio", "Reps", "Medicine Ball", "Calories", "Distance", "Squats", "Dumbbell", "Yoke"]

export const PROGRAMMING_TYPES = ['Warm Up', 'Kratos (Str+Cond)',  'Kratos (Strength)', 'Perseus (Cardio)', 'Hercules (All-round)', 'Extra Work (Optional)', 'Comment']
export const BENCHMARK_TYPES = ['CrossFit Girls', 'CrossFit Heroes']

const MAIN_CATEGORIES = ["Weight", "Bodyweight", "Cardio"]
const WEIGHT_CATEGORIES = ["Barbell", "Kettlebell", "Dumbbell", "Other"]
const BODYWEIGHT_CATEGORIES = ["No Equipment", "Bar", "Rings", "Other"]
const CARDIO_CATEGORIES = ["Distance", "Calories", "Reps"]
const PPSO_CATEGORIES = ["Pull", "Push", "Squat", "Multiple"]
const RESET_CATEGORIES = ["Reset Categories"]

export const getCategoriesFor = (category) => {
    switch (category) {
        case "Main":
        case "Reset Categories": return MAIN_CATEGORIES
        case "Weight": return WEIGHT_CATEGORIES
        case "Bodyweight": return BODYWEIGHT_CATEGORIES
        case "Cardio": return CARDIO_CATEGORIES
        case "Barbell":
        case "Kettlebell":
        case "Dumbbell":
        case "No Equipment":
        case "Bar":
        case "Rings": return PPSO_CATEGORIES
        default: return RESET_CATEGORIES
    }
}

export const WOD_TYPE = {
    ONE_ROUND: 'One Round For Time',
    MULTIPLE_ROUNDS: 'Multiple Rounds For Time',
    MULTIPLE_ROUNDS_DIF_REPS: 'Multiple Rounds For Time With Different Reps',
    AMRAP: 'Classic AMRAP',
    AMRAP_DIF_REPS: 'AMRAP With Different Reps',
    AMRAP_MAX_REPS: 'AMRAP With Max Reps',
    EMOM: 'EMOM',
    STRENGTH: 'Strength Workout (only log)',
    CUSTOM: 'Custom Workout (only log)'
}

export const OTHER_TYPES = [WOD_TYPE.STRENGTH, WOD_TYPE.CUSTOM]

export const FITNESS_LEVEL = [
    {
        name: 'Beginner',
        description: '- Relatively new to fitness<br>- Still learning a lot of movements<br>- Scaling workouts most of the time<br>- In bottom 0-40 percentile',
        value: 0
    },
    {
        name: 'Average',
        description: '- A few years of experience<br>- Still has a few weak movements<br>- Most workouts are RX<br>- In middle 40-80 percentile',
        value: 1
    },
    {
        name: 'Advanced',
        description: '- Multiple years of exeperience<br>- No weak movements<br>- All workouts are RX<br>- In high 80-95 percentile',
        value: 2
    },
    {
        name: 'Competitor',
        description: '- Highly dedicated individual<br>- Efficient at advanced movements<br>- Multiple workouts are RX+<br>- Almost at the top with 95-99 percentile',
        value: 3
    },
    {
        name: 'Elite',
        description: '- The best of the best<br>- Lift weights that others don\'t even deadlift<br>- Does RX+ WODs multiple times a day<br>- At very top with 100 percentile',
        value: 4
    }
]

export const WEIGHT_UNITS = [
    {
        name: "kg",
        constant: 1
    },{
        name: "lbs",
        constant: 2.20462262
    },{
        name: "pood",
        constant: 0.0610474999
    }
]

export const WEIGHT_UNITS_WITH_PERCENT = [
    ...WEIGHT_UNITS,
    {
        name: "%",
        constant: 1
    }
]

export const HEIGHT_UNITS = [
    {
        name: "m",
        constant: 1
    },{
        name: "cm",
        constant: 100
    },{
        name: "in",
        constant: 9.7
    },{
        name: "ft",
        constant: .280899
    }
]

export const DISTANCE_UNITS = [
    {
        name: "m",
        constant: 1
    },
    {
        name: "km",
        constant: 0.001
    },
    {
        name: "feet",
        constant: .280899
    },
    {
        name: "yd",
        constant: 1.0961
    },
    {
        name: "miles",
        constant: 0.00062171192
    }
]

export const DURATION_UNITS = [
    {
        name: "sec",
        constant: 60
    },
    {
        name: "min",
        constant: 1
    }
]

export const DIFFICULTY_SETTINGS = [
    {
        beginner: 'not necessary',
        average: 'not necessary',
        advanced: 'not necessary',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for a few',
        average: 'not necessary',
        advanced: 'not necessary',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for some',
        average: 'not necessary',
        advanced: 'not necessary',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for many',
        average: 'recommended for a few',
        advanced: 'not necessary',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for almost everyone',
        average: 'recommended for some',
        advanced: 'not necessary',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for everyone',
        average: 'recommended for many',
        advanced: 'recommended for a few',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for everyone',
        average: 'recommended for almost everyone',
        advanced: 'recommended for some',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for everyone',
        average: 'recommended for everyone',
        advanced: 'recommended for many',
        competitor: 'not necessary',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for everyone',
        average: 'recommended for everyone',
        advanced: 'recommended for almost everyone',
        competitor: 'recommended for a few',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for everyone',
        average: 'recommended for everyone',
        advanced: 'recommended for everyone',
        competitor: 'recommended for some',
        elite: 'not necessary'
    },
    {
        beginner: 'recommended for everyone',
        average: 'recommended for everyone',
        advanced: 'recommended for everyone',
        competitor: 'recommended for many',
        elite: 'recommended for a few'
    }
]

export const HOWDIDYOUHEARABOUTUS = [
    'Search engines (Google, DuckDuckGo, etc)',
    'Social media (Facebook, Instagram, etc)',
    'CrossFit related website',
    'Other fitness related website',
    'Newsletter',
    'Online friend',
    'Real life friend',
    'Gym coach',
    'Other'
]

export const DATE_RANGE = {
    LAST_7: 'Last 7 Days',
    LAST_14: 'Last 14 Days',
    LAST_21: 'Last 21 Days',
    LAST_0: 'Last 0 Days',
    LAST_60: 'Last 60 Days',
    LAST_90: 'Last 90 Days'
}