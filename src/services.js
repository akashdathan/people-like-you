import _ from 'lodash'
import { DataStore } from './datastore'

//Change these params to change the age : distance : income ratio
const MAX_AGE_DIFF    = 20
const MAX_INCOME_DIFF = 2000
const MAX_DIST_DIFF   = 1000
const EXP_WEIGHT      = 0.3

export class PluServices {

  static async addPerson(params) {
    return DataStore.addEntry(
      params.name,
      params.age,
      params.latitude,
      params.longitude,
      params.monthlyIncome,
      params.experienced
    )
  }

  static async getPeopleLikeYou(params, length) {
    let response = []
    
    for(const val of DataStore.data) {

      const score = this.getScore(params, val)

      if(score === 0) continue

      const selectedObj = _.cloneDeep(val)
      selectedObj.score = score
        
      response.push(selectedObj)

      if(response.length > length)
        response = _.takeRight(_.sortBy(response, ['score']), length)
    }

    return _.sortBy(response, ['score']).reverse().map((val => {
      val.score = Math.round( val.score * 10 ) / 10
      return val
    }))

  }

  static getScore(query, data) {
    let score = 0

    score += this.getDistanceScore({ latitude : query && query.latitude, longitude : query && query.longitude },
                                      { latitude : Number(data.latitude), longitude : Number(data.longitude) })

    score += this.getIntScore(query.age, Number(data.age), MAX_AGE_DIFF)
    score += this.getIntScore(query.monthlyIncome, Number(data['monthly income']), MAX_INCOME_DIFF)

    if(query.experienced !== undefined)
    score += Number(query.experienced.toString() == data.experienced.toString()) * EXP_WEIGHT

    return score/(3 + EXP_WEIGHT)
  }

  static getIntScore(queryInt, dataInt, maxDiff) {
    if(!queryInt) return 0

    const intDiff = Math.abs(queryInt - dataInt)
    
    if(intDiff > maxDiff) return 0

    return 1 - (intDiff/maxDiff)
  }

  static getDistanceScore(qCoordinates, dCoordinates) {
    if(!qCoordinates.latitude && !qCoordinates.longitude) return 0

    const distance = this.getDistance(qCoordinates.latitude, qCoordinates.longitude, dCoordinates.latitude, dCoordinates.longitude)
    
    if(distance > MAX_DIST_DIFF) return 0

    return 1 - (distance/MAX_DIST_DIFF)
  }

  static getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 === lat2) && (lon1 === lon2)) return 0
    
      const rad1     = Math.PI * lat1/180
      const rad2     = Math.PI * lat2/180
      const theta    = lon1 - lon2
      const radtheta = Math.PI * theta/180

      let dist = Math.sin(rad1) * Math.sin(rad2) + Math.cos(rad1) * Math.cos(rad2) * Math.cos(radtheta)
      if (dist > 1) dist = 1

      dist = Math.acos(dist)
      dist *= 180/Math.PI
      dist *= 60 * 1.1515
      dist *= 1.609344 //To Km

      return dist
  }

}