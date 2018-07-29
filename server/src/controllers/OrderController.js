import Sequelize from 'sequelize';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import addDays from 'date-fns/add_days';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import Controller from './Controller';

export default class OrderController extends Controller {

  static orderClose(req, res, next) {
    const hourInterval = parseInt(process.env.ORDER_INTERVAL_HOUR, 10) || 4;
    const minuteInterval = parseInt(process.env.ORDER_INTERVAL_MIN, 10) || 0;
    const computedCloseHour = parseInt(process.env.ORDER_START_HOUR, 10) + hourInterval;
    const computedCloseMin = parseInt(process.env.ORDER_START_MIN, 10) +
      minuteInterval;
    const closeHour = parseInt(process.env.ORDER_CLOSE_HOUR, 10) || computedCloseHour || 23;
    const closeMin = parseInt(process.env.ORDER_CLOSE_MIN, 10) || computedCloseMin || 50;
    const closeDate = new Date().setHours(closeHour, closeMin, 0);
    const date = new Date();
    if ((date - closeDate) >= 0) {
      const message = `Orders for the day have closed. Please place your order before ${closeHour}:${closeMin} Hours`;
      return res.status(403).json({
        message
      });
    }
    return next();
  }
  static canEdit(date) {
    const hasEditMinutes = (parseInt(process.env.ORDER_EDIT_MINUTES, 10) || 15)
     - differenceInMinutes(new Date(), date) > 0;
    return (isToday(date) && hasEditMinutes);
  }
  getAllOrders() {
    const options = {
      include: [{
        association: 'Meals',
        required: false,
        paranoid: false,
        attributes: ['id', 'title', 'description', 'price'],
        through: {
          attributes: ['quantity']
        }
      },
      {
        association: 'User',
        attributes: ['firstName', 'lastName', 'email']
      }]
    };
    return this.Model
      .findAll(options)
      .then((result) => {
        if (result && result.length > 0) {
          return OrderController.defaultResponse(result);
        }
        return OrderController.errorResponse('no records available', 404);
      })
      .catch(error => OrderController.errorResponse(error.message));
  }
  getUserOrdersByDate(req) {
    const { userId } = req.decoded;
    const currentDate = format(new Date(), 'YYYY-MM-DD');
    const date = req.params.date || currentDate;
    const nextDate = addDays(date, 1);
    const { Op } = Sequelize;

    const options = {
      where: { userId,
        createdAt: { [Op.gt]: date, [Op.lt]: nextDate } },
      include: [{
        association: 'Meals',
        required: false,
        paranoid: false,
        attributes: ['id', 'title', 'description', 'price'],
        through: {
          attributes: ['quantity']
        }
      },
      {
        association: 'User',
        attributes: ['firstName', 'lastName', 'email']
      }]
    };
    return this.Model
      .findAll(options)
      .then((result) => {
        if (result && result.length > 0) {
          return OrderController.defaultResponse(result);
        }
        return OrderController.errorResponse('no records available', 404);
      })
      .catch(error => OrderController.errorResponse(error.message));
  }
  getOrdersByDate(req) {
    const currentDate = format(new Date(), 'YYYY-MM-DD');
    const date = req.params.date || currentDate;
    const nextDate = addDays(date, 1);
    const { Op } = Sequelize;
    const options = {
      where: { createdAt: { [Op.gt]: date, [Op.lt]: nextDate } },
      include: [{
        association: 'Meals',
        required: false,
        paranoid: false,
        attributes: ['id', 'title', 'description', 'price'],
        through: {
          attributes: ['quantity']
        }
      },
      {
        association: 'User',
        attributes: ['firstName', 'lastName', 'email']
      }]
    };
    return this.Model
      .findAll(options)
      .then((result) => {
        if (result && result.length > 0) {
          return OrderController.defaultResponse(result);
        }
        return OrderController.errorResponse('no records available', 404);
      })
      .catch(error => OrderController.errorResponse(error.message));
  }
  postOrder(req) {
    const {
      userId
    } = req.decoded;

    return this.Model.create({
      userId
    })
      .then(order => OrderController.orderProcess(order, req, 201))
      .catch(err => OrderController.errorResponse(err.message));
  }
  updateOrder(req) {
    let orderRef;
    return this.Model.findById(req.params.id)
      .then((order) => {
        orderRef = order;
        if (OrderController.canEdit(order.createdAt)) { return order.setMeals([]); }
        return Promise.reject(new Error('Order edit period has expired'));
      })
      .then(() => orderRef.reload())
      .then(reloadedOrder => OrderController.orderProcess(reloadedOrder, req))
      .catch(err => OrderController.errorResponse(err.message));
  }
  static async orderProcess(order, req, successCode = 200) {
    try {
      const promise = req.body.meals.map(meal =>
        order.addMeal(meal.id, {
          through: {
            quantity: meal.quantity
          }
        }));
      await Promise.all(promise);
      const reloadedOrder = await order.reload();
      const postedOrder = reloadedOrder.dataValues;
      const meals = await reloadedOrder.getMeals({ paranoid: false });
      if (meals.length > 0) {
        const mealList = meals.map(elem => elem.id);
        const quantityList = meals.map(elem => elem.MealOrders.quantity);
        postedOrder.Meals = meals;
        postedOrder.mealList = mealList;
        postedOrder.quantityList = quantityList;
        return OrderController.defaultResponse(postedOrder, successCode);
      }
      return OrderController.errorResponse('Order was not processed. Try again', 404);
    } catch (error) {
      return OrderController.errorResponse(error.message);
    }
  }
}
