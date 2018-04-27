import Controller from './controller';

export default class MenuController extends Controller {
  static sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
  getTodaysMenu() {
    const now = new Date();
    const record = this.model.find(elem =>
      MenuController.sameDay(elem.date, now));
    if (record) {
      return Controller.defaultResponse(record);
    }
    return Controller.errorResponse();
  }
  postRecord(req) {
    const now = new Date();
    req.body.date = now;
    const recordIndex = this.model.findIndex(elem =>
      MenuController.sameDay(elem.date, now));
    if (recordIndex >= 0) {
      this.model.splice(recordIndex, 1);
    }

    return super.postRecord(req);
  }
}
