import strength from '@/data/strength'
import { STATUS } from '@/data/constants'

export default class Strength {

    constructor(data, movement, weight, bodyweight, weightUnit, gender) {
        const status = data ? STATUS.ONLINE : STATUS.OFFLINE
        this._data = data ? data : strength
        this._movement = movement
        this._weight = weight
        this._bodyweight = bodyweight
        this._weightUnit = weightUnit
        this._gender = gender
        if (status === STATUS.OFFLINE) {
            this._decodeObjFor(movement)
        }

        console.log(this._data)
    }

    static getAllNames() {
        return Object.values(strength).map(obj => obj.name)
    }

    getPercentile() {
        const numberRule = v => !(!isNaN(parseFloat(v)) && v >= 1 && v < 10000)
        if (!this._movement || numberRule(this._weight)|| numberRule(this._bodyweight)) return
        const ratio = Math.round((this._weight / this._bodyweight) / 0.05) * 5
        const data = this._gender === 'Male' ? this._data.data.men : this._data.data.women
        let total = 0
        let subtotal = 0
        for (let i = 0; i <= 400; i += 5) {
            let roundedI = Math.round(i * 100) / 100
            if (roundedI in data) {
                if (typeof data[roundedI] === 'object') {
                    const valueFromObj = Object.values(data[roundedI]).reduce((a,b) => parseInt(a) + parseInt(b), 0)
                    if (!isNaN(valueFromObj)) total += valueFromObj
                } else {
                    total += data[roundedI]
                }
            }
            if (roundedI <= ratio) subtotal = total
        }
        //console.log(subtotal, ' test ' , total)
        const percentile = Math.round((subtotal / total) * 1000) / 10
        return percentile
    }

    _decodeObjFor(movement) {
        const key = movement.toLowerCase().replace(/ /gi, '_')
        if (typeof this._data[key].data === 'string') {
            this._data[key].data = JSON.parse(atob(this._data[key].data))
            for (const ratio of Object.keys(this._data[key].data.men)) {
                const newRatio = parseInt(ratio*100)
                this._data[key].data.men[newRatio] = this._data[key].data.men[ratio]
                delete this._data[key].data.men[ratio]
            }
            for (const ratio of Object.keys(this._data[key].data.women)) {
                const newRatio = parseInt(ratio*100)
                this._data[key].data.women[newRatio] = this._data[key].data.women[ratio]
                delete this._data[key].data.women[ratio]
            }
        }
        this._data = {
            data: {
                men: this._data[key].data.men,
                women: this._data[key].data.women
            },
            name: movement
        }
    }
}