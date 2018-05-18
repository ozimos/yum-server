import Controller from './Controller';

export default class OrderController extends Controller {

  static orderClose(req, res, next) {
    const hourInterval = parseInt(process.env.ORDER_INTERVAL_HOUR, 10) || 4;
    const minuteInterval = parseInt(process.env.ORDER_INTERVAL_MIN, 10) || 30;
    const computedCloseHour = parseInt(process.env.ORDER_START_HOUR, 10) + hourInterval;
    const computedCloseMin = parseInt(process.env.ORDER_START_MIN, 10) +
      minuteInterval;
    const closeHour = parseInt(process.env.ORDER_CLOSE_HOUR, 10) || computedCloseHour || 23;
    const closeMin = parseInt(process.env.ORDER_CLOSE_MIN, 10) || computedCloseMin || 0;
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
      }]
    };
    return this.Model
      .findAll(options)
      .then((result) => {
        if (result.length > 0) {
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
      .then(order => this.orderProcess(order, req, 201))
      .catch(err => OrderController.errorResponse(err.message));
  }
  updateOrder(req) {

    return this.Model.findById(req.params.id)
      .then(order => this.orderProcess(order, req))
      .catch(err => OrderController.errorResponse(err.message));

  }
  async orderProcess(order, req, successCode = 200) {
    let postedMenu = {};
    try {
      await req.body.meals.forEach((meal) => {
        order.addMeal(meal.id, {
          through: {
            quantity: meal.quantity
          }
        });
      });
      const savedOrder = await order.save();
      postedMenu = savedOrder.dataValues;
      const checkOrder = await this.Model.findById(postedMenu.id);
      const meals = await checkOrder.getMeals();
      if (meals.length > 0) {
        postedMenu.Meals = meals;
        return OrderController.defaultResponse(postedMenu, successCode);
      }
      return OrderController.errorResponse('Order was not processed. Try again', 404);
    } catch (error) {
      OrderController.errorResponse(error.message);

    }

  }
}