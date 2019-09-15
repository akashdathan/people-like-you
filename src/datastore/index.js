
// import * as csv from 'csv-parser'
const csv = require('csv-parser')

import * as fs from 'fs'
import * as path from 'path'
import _ from 'lodash'

const MAX_DATA = 500000


const DATA_PATH = path.resolve('./src/datastore/data.csv')

export class DataStore {

  static data = []

  //Loaded into ram since data set is small and db is not used.
  static async init() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(DATA_PATH)
      .pipe(csv())
      .on('data', async (data) => { this.data.push(data) })
      .on('end', () => { resolve(true) })
      .on('error', (error) => { reject(error) })
    })
  }

  static async addEntry(name, age, latitude, longitude, monthlyIncome, experienced) {

    if(this.data.length >= MAX_DATA) return 'Cannot Add Anymore Users'

    const InputObj = {
      name,
      age : age.toString(),
      latitude : latitude.toString(),
      longitude : longitude.toString(),
      'monthly income' : monthlyIncome.toString(),
      experienced : experienced.toString()
    }

    if(_.some(this.data, InputObj)) return 'User Already Exists'
    
    this.data.push(InputObj)

    return false
  }

}