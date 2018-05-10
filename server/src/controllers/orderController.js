import Controller from './controller';

export default class OrderController extends Controller {
  constructor(Model, Meal) {
    super(Model);
    this.Meal = Meal;
  }
  static orderClose(req, res, next) {
    const closeHour = parseInt(process.env.ORDER_CLOSE, 10) || 12;
    const closeDate = new Date().setHours(closeHour, 0, 0);
    const date = new Date();
    if ((date - closeDate) >= 0) {
      const message = `Orders for the day have closed. Please place your order before ${closeHour}00 Hours`;
      return OrderController.errorResponse(message, 403);
    }
    return next();
  }
  getAllOrders() {
    const options = {
      include: [{
        model: this.Meal,
        as: 'Meals',
        required: false,
        attributes: ['id', 'title', 'description', 'price'],
        through: {
          attributes: []
        }
      }]
    };
    return this.Model
      .findAll(options)
      .then((result) => {
        if (result.length > 0) {
          return Controller.defaultResponse(result);
        }
        return Controller.errorResponse('no records available', 404);
      })
      .catch(error => Controller.errorResponse(error.message));
  }
  postOrder(req) {
    const {
      userId
    } = req.decoded;
    return this.Model.create({
      userId
    })
      .then(order => order.setMeals(req.body.meals))
      .then(savedOrder => Controller.defaultResponse(savedOrder, 201))
      .catch(err => Controller.errorResponse(err));
  }
  updateOrder(req) {

    return this.Model.findById(req.params.id)
      .then(order => order.setMeals(req.body.meals))
      .then(savedOrder => Controller.defaultResponse(savedOrder))
      .catch(err => Controller.errorResponse(err));
  }
}