import Controller from './Controller';

export default class MenuController extends Controller {
  constructor(Model, Meal) {
    super(Model);
    this.Meal = Meal;
  }
  getMenu() {
    return this.Model.findById('Today', {
      include: [{
        model: this.Meal,
        as: 'Meals',
        required: false,
        through: {
          where: {
            menuTitle: 'Today'
          }
        }
      }]
    })
      .then(response => MenuController.defaultResponse(response))
      .catch(err => MenuController.errorResponse(err));
  }
  postMenu(req) {
    return this.Model.findOrBuild({
      where: {
        title: 'Today'
      }
    })
      .then(([menu]) => {
        try {
          menu.description = req.body.description;
          menu.setMeals(req.body.meals);
          return menu.save();
        } catch (err) {
          throw err;
        }
      })
      .then(savedMenu => MenuController.defaultResponse(savedMenu, 201))
      .catch(err => MenuController.errorResponse(err));
  }
}