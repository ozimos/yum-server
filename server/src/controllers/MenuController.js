import Controller from './Controller';

export default class MenuController extends Controller {
  getMenu() {
    return this.Model.findById('Today', {
      include: [{
        association: 'Meals',
        required: false,
        through: {
          attributes: ['updatedAt']
        }
      }]
    })
      .then((response) => {
        if (response) {
          const today = new Date().setHours(0, 0, 0);
          const menuByDateUpdatedArray = response.Meals
            .sort((a, b) => new Date(b.MealMenus.updatedAt) - new Date(a.MealMenus.updatedAt));
          const menuDate = new Date(menuByDateUpdatedArray[0].MealMenus.updatedAt);
          const isTodayMenu = (menuDate - today) > 0;
          if ((response.Meals.length > 0) && isTodayMenu) {
            return MenuController.defaultResponse(response);
          }
        }
        return MenuController.errorResponse('menu for the day has not been set', 404);
      })
      .catch(err => MenuController.errorResponse(err.message));
  }
  postMenu(req) {
    let postedMenu, menuRef;
    return this.Model.findOrBuild({
      where: {
        title: 'Today'
      }
    })
      .then(([menu]) => {
        try {
          if (req.body.description) { menu.description = req.body.description; }
          return menu.save();
        } catch (err) {
          throw err;
        }
      })
      .then((menu) => {
        menuRef = menu;
        return menu.setMeals(req.body.meals);
      })
      .then(() => menuRef.reload())
      .then((reloadedMenu) => {
        postedMenu = reloadedMenu.dataValues;
        return reloadedMenu.getMeals();
      })
      .then((meals) => {
        if (meals.length > 0) {
          const menuDate = new Date(postedMenu.updatedAt);
          process.env.ORDER_START_HOUR = menuDate.getHours();
          process.env.ORDER_START_MINS = menuDate.getMinutes();
          postedMenu.Meals = meals;
          return MenuController.defaultResponse(postedMenu, 201);
        }
        return MenuController.errorResponse('Menu was not posted. Try again', 404);
      })
      .catch(err => MenuController.errorResponse(err.message));
  }
}