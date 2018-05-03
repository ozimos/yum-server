import Controller from './controller';

export default class MenuController extends Controller {
  constructor(Model, Meal) {
    super(Model);
    this.Meal = Meal;
  }
  getMenu() {
    return this.Model.findOne({
      where: {
        title: 'Today'
      },
      include: [
        {
          model: this.Meal,
          as: 'Meals',
          where: {
            menuTitle: 'Today'
          }
        }
      ]
    })
      .then(response => Controller.defaultResponse(response))
      .catch(err => Controller.errorResponse(err));
  }
  postMenu(req) {
    return this.Model.findOrCreate({
      where: {
        title: 'Today'
      }
    })
      .spread((menu) => {
        menu.setMeals(req.body.meals);
        menu.description = req.body.description;
        return menu.save();
      })
      .then(savedMenu => Controller.defaultResponse(savedMenu, 201))
      .catch(err => Controller.errorResponse(err));
  }
}
