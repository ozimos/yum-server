import Controller from './controller';

export default class OrderController extends Controller {
  constructor(Model, Meal) {
    super(Model);
    this.Meal = Meal;
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
    return this.Model.build({
      userId
    })
      .then(([order]) => {
        order.setMeals(req.body.meals);
        return order.save();
      })
      .then(savedOrder => Controller.defaultResponse(savedOrder, 201))
      .catch(err => Controller.errorResponse(err));
  }
  updateOrder(req) {

    return this.Model.findById(req.params.id)
      .then(([menu]) => {
        menu.setMeals(req.body.meals);
        return menu.save();
      })
      .then(savedMenu => Controller.defaultResponse(savedMenu, 201))
      .catch(err => Controller.errorResponse(err));
  }
}