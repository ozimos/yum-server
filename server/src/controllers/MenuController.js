import Sequelize, { Op } from 'sequelize';
import Controller from './Controller';

export default class MenuController extends Controller {
  getMenu() {
    const today = new Date().setHours(0, 0, 0, 0, 0);

    return this.Model.find({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      },
      include: [{
        association: 'Meals',
        required: false,
        through: {
          attributes: ['updatedAt']
        }
      }]
    })
      .then((response) => {
        if (response && response.Meals[0]) {
          return MenuController.defaultResponse(response);
        }
        return MenuController.errorResponse('menu for the day has not been set', 404);
      })
      .catch(err => MenuController.errorResponse(err.message));
  }
  postMenu(req) {

    const today = new Date().setHours(0, 0, 0, 0, 0);

    let menuRef;
    return this.Model.findOrCreate({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      },
      defaults: {
        createdAt: Sequelize.fn('NOW')
      }
    })
      .then(([menu]) => {
        menuRef = menu;
        return menu.setMeals(req.body.meals);
      })
      .then(() => this.Model.findById(menuRef.id, {
        include: [{
          association: 'Meals',
          required: false,
          through: {
            attributes: ['updatedAt']
          }
        }]
      }))
      .then((response) => {
        if (response && response.Meals[0]) {
          process.env.ORDER_START_HOUR = new Date().getHours();
          process.env.ORDER_START_MINS = new Date().getMinutes();
          return MenuController.defaultResponse(response, 201);
        }
        return MenuController.errorResponse('Menu was not posted. Try again', 404);
      })
      .catch(err => MenuController.errorResponse(err.message));
  }
}
