import isSameDay from 'date-fns/is_same_day';
import Controller from './controller';

export default class MenuController extends Controller {
  constructor(menu, model) {
    super(model);
    this.menu = menu;
  }
  getTodaysMenu(req) {
    const queryDate = req.query && req.query.date;
    const date = queryDate || (new Date());
    const record = this.menu.find(elem => isSameDay(elem.date, date));
    if (record) {
      const recordCopy = { ...record };
      const mealsArray = [...recordCopy.meals];
      const expandedMealsArray = mealsArray
        .map(mealId => super.getSingleRecord({ params: { id: mealId } }).message);
      recordCopy.meals = expandedMealsArray;
      return Controller.defaultResponse(recordCopy);
    }
    return Controller.errorResponse();
  }
  postRecord(req) {
    const now = new Date();
    req.body.date = now;
    const recordIndex = this.menu.findIndex(elem => isSameDay(elem.date, now));
    if (recordIndex >= 0) {
      this.menu.splice(recordIndex, 1);
    }

    return super.postRecord(req, this.menu);
  }
}
