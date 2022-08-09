import { valuesService } from '../services/ValueService'
import BaseController from '../utils/BaseController'

// NOTE you have to respin your server everytime you make a change
// in postman you need the full address with the api and "door" address, and then you can make put,post,delete, etc. reqs. in the body tab you can send raw JSON strings which will just be objects { with "atr": values} puts need th id on the end of the address or they won't work
// the FAKE_DB is stored as a const in the service scratch that, make a js file in the db folder
// the cannot edit this file error is a debugging file, close it and edit the real one
// reusing the getcatbyid function saves space, and lets us id check with the one error catch


export class ValuesController extends BaseController {
  constructor() {
    // the super is the door label
    // when you have a class that extends  another class you must have a super in the ctor
    super('api/values')
    // the router comes from the base controller
    this.router
    // method chaining
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:valueId', this.remove)
  }

  /**
   * Sends found values to a client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getAll(req, res, next) {
    // order of these ^ is important! don't remove one or change the order
    try {
      const values = await valuesService.find()
      return res.send(values)
    } catch (error) {
      // logger.error() but this goes elsewhere because of next
      next(error)
    }
  }

  /**
   * Creates a value from request body and returns it
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async create(req, res, next) {
    try {
      const value = await valuesService.create(req.body)
      res.send(value)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a value using req params
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async remove(req, res, next) {
    try {
      const value = await valuesService.remove(req.params.valueId)
      res.send(value)
    } catch (error) {
      next(error)
    }
  }
}
