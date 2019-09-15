import express from 'express'
import { PluServices } from './services'
import { DataStore } from './datastore'
import { check, validationResult } from 'express-validator'

const app = express()
const PORT = 3000

app.use(express.json())


export class PluServer {

  static async start() {

    this.registerGetPeopleLikeYou()
    this.registerAddPerson()

    await DataStore.init()

    console.log('DataStore Entries:', DataStore.data.length);
    
    app.get('/', (req, res) => {
      return res.status(200).send({'message': 'Server Up!!!'});
    })

    app.post('/', (req, res) => {
      return res.status(200).send({'message': 'Server Up!!!'});
    })
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`)
    })
  }


  static registerGetPeopleLikeYou() {
    const url = '/people-like-you/:age?/:latitude?/:longitude?/:monthlyIncome?/:experienced?'

    app.get(url, async (req, res) => {
      
      const peopleLikeYou = await PluServices.getPeopleLikeYou(req.query, 10)

      return res.status(200).send({ peopleLikeYou })
    })
  }

  static registerAddPerson() {
    const url = '/add-person'

    app.post(url, [
      check('name').isLength({ min: 3 }),
      check('age').isNumeric(),
      check('latitude').isNumeric(),
      check('longitude').isNumeric(),
      check('monthlyIncome').isNumeric(),
      check('experienced').isBoolean()
      
    ],async (req, res) => {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      
      const resp = await PluServices.addPerson(req.body)

      if(resp) return res.status(422).json({ errors: [{msg : resp}] })
    
      return res.status(200).send({ status : true })
    })
  }
}

