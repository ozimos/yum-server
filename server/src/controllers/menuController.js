import Controller from './controller';

export default class MenuController extends Controller {

  static sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
  getTodaysMenu() {
    const now = new Date();

    for (let i = 0; i < this.model.length; i += 1) {
      if (MenuController.sameDay(this.model[i].date, now)) {
        return Controller.defaultResponse(this.model[i]);
      }
    }
    return Controller.errorResponse();
  }
  postRecord(req) {
    const now = new Date();
    req.body.date = now;
    for (let i = 0; i < this.model.length; i += 1) {
      if (MenuController.sameDay(this.model[i].date, now)) {
        this.model.splice(i, 1);
      }
    }
    return super.postRecord(req);
  }
}