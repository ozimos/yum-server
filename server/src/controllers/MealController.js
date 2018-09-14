import Controller from './Controller';

export default class MealController extends Controller {

  /**
   * get all the caterer's meals
   * @param {obj} req express request object
   * @returns {obj}
   *
   */
  getMeals(req) {
    const options = {
      where: { userId: req.decoded.userId },
      order: [['createdAt', 'DESC']]
    };
    return this.getAllRecords(req, options)
      .catch(error => MealController.errorResponse(error.message));
  }

  /**
   * add a new meal to the database
   * @param {obj} req express request object
   * @returns {obj}
   *
   */
  addMeal(req) {
    req.body.userId = req.decoded.userId;
    req.body.deletedAt = new Date(2100, 0);
    return this.postRecord(req)
      .catch(error => MealController.errorResponse(error.message));
  }

  /**
   * delete a meal from the database
   * @param {obj} req express request object
   * @returns {obj}
   *
   */
  deleteMeal(req) {
    return this.Model
      .destroy({
        where: {
          id: req.params.id,
          deletedAt: new Date(2100, 0)
        }
      })
      .then((result) => {
        if (result) { return this.getMeals(req); }
        return MealController.errorResponse('meal was not deleted', 404);
      })
      .catch(error => MealController.errorResponse(error.message));
  }
}
