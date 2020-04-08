import { WOD_TYPE } from '@/data/constants'

export const toNth = (number) => {
  if(number%1) return number+'th';
  var s = number % 100;
  if(s > 3 && s < 21) return number+'th';
  switch(s%10){
      case 1: return number+'st';
      case 2: return number+'nd';
      case 3: return number+'rd';
      default: return number+'th';
  }
}

export const to2Dec = number => Math.round(number*100)/100

export const toLocalDate = date => {
    const dateObj = new Date(date)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return `${days[dateObj.getDay()]}, ${dateObj.toLocaleDateString()}`
}

export const weekFromDate = date => {
        const dateObj = new Date(date)
        var onejan = new Date(dateObj.getFullYear(),0,1)
        var millisecsInDay = 86400000
        return Math.ceil((((dateObj - onejan) /millisecsInDay) + onejan.getDay()-1)/7)
}

export const twoDigits = number => isNaN(parseInt(number)) || ('0' + number).slice(-2)

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
export const roundKg = (weight) =>  Math.round(parseFloat(weight)/2.5)*2.5
export const roundLbs = (weight) =>  Math.round(parseFloat(weight)/5)*5
export const textToArray = (text) => text.replace(/[-,\s]/g, ' ').replace(/\s\s+/g, ' ').split(/ /g)
export const equalArrays = (arr1, arr2) => arr1.every(el => arr2.includes(el))
export const sorted = (movements) => movements.sort((a,b) => (a.id - b.id))
export const cleaned = (movements, wods) => {
    const wodIds = []
    wods.forEach(wod => {if (!wodIds.includes(wod.id)) wodIds.push(wod.id)})
    return movements.filter(movement => wodIds.includes(movement.wodId))
}
export const roundsToString = (rounds) => rounds == 0 ? '' : rounds < 2 ? `${rounds} round` : `${rounds} rounds`
export const repsToString = (reps) => reps == 0 ? '' : reps < 2 ? `${reps} rep` : `${reps} reps`
export const timeToString = (time) => `${Math.floor(time)} min ${Math.round((time%1)*60)} secs`
export const showScore = (wods) => wods.find(wod => {
    switch (wod.type) {
        case WOD_TYPE.AMRAP:
        case WOD_TYPE.AMRAP_DIF_REPS:
        case WOD_TYPE.AMRAP_MAX_REPS: return true
        default: false
    }
})
export const showTime = (wods) => wods.find(wod => {
    switch (wod.type) {
        case WOD_TYPE.ONE_ROUND:
        case WOD_TYPE.MULTIPLE_ROUNDS:
        case WOD_TYPE.MULTIPLE_ROUNDS_DIF_REPS: return true
        default: false
    }
})
export const showEmom = (wods) => wods.find(wod => wod.type === WOD_TYPE.EMOM)
export const repsOfMovement = (movement) => {
    let reps = 0
    if ("reps" in movement) {
        const isDifferent = typeof movement.reps.length === 'object' ? true : false
        reps += isDifferent ? movement.reps.reduce((a,b) => a+b, 0)/movement.reps.length : movement.reps
    } else if ("distance" in movement) {
        const isDifferent = typeof movement.distance.length === 'object' ? true : false
        reps += isDifferent ? movement.distance.reduce((a,b) => a+b, 0)/movement.distance.length : movement.distance
    } else if ("duration" in movement) {
        const isDifferent = typeof movement.duration.length === 'object' ? true : false
        reps += isDifferent ? movement.duration.reduce((a,b) => a+b, 0)/movement.duration.length : movement.duration
    }
    return reps
}
export const convertMilisecondToTime = (miliseconds) => {
    let mils = Math.round((miliseconds%1000)/100)
    let secs = Math.floor((miliseconds/1000)%60)
    secs = (secs < 10) ? '0' + secs : '' + secs
    let mins = parseInt((miliseconds/60000))
    mins = (mins < 10) ? '0' + mins : '' + mins
    return `${mins}:${secs}.${mils}` 
}

export const sortedNames = (names) => {
    var sortable = []
    for (let name in names) {
        sortable.push([name, names[name]]);
    }
    sortable.sort((a,b) => b[1]-a[1])
    return sortable
}

export const isDecodableJSON = (str) => {
    try {
        const decodedId = atob(str)
        JSON.parse(decodedId);
    } catch (e) {
        return false;
    }
    return true;
}