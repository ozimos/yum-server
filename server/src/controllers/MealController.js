import Controller from './Controller';

export default class MealController extends Controller {

  postRecord(req) {
    req.body.userId = req.decoded.userId;
    super.postRecord(req);
  }

  updateRecord(req) {
    req.body.userId = req.decoded.userId;
    super.updateRecord(req);
  }
}