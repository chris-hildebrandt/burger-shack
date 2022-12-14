
import { burgersService } from "../services/BurgersService.js"
import { BaseController } from "../utils/BaseController.js"
export class BurgersController extends BaseController {

  constructor() {
    super('/api/burgers')

    this.router
      .get('', this.getBurgers)
      .get('/:burgerId', this.getBurgerById)
      .post('', this.createBurger)
      .put('/:burgerId', this.editBurger)
      .delete('/:burgerId', this.deleteBurger)
  }

  async getBurgers(req, res, next) {
    try {
      let res = await burgersService.getBurgers()
      res.send(burgers)
    } catch (error) {
      next(error)
    }
  }

  async getBurgerById(req, res, next) {
    try {
      let res = await this.getBurgerById(req.params.burgerId)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  async createBurger(req, res, next) {
    try {
      let burgerData = req.body
      let burger = await burgersService.createBurger(burgerData)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  async editBurger(req, res, next) {
    try {
      let burger = await burgersService.editBurger(req.params.burgerId, req.body)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  async deleteBurger(req, res, next) {
    try {
      let burger = await burgersService.deleteBurger(req.params.burgerId)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

}