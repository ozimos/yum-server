import Controller from './Controller';

export default class MealController extends Controller {

  postRecord(req) {
    req.body.userId = req.decoded.userId;
    return super.postRecord(req);
  }

  updateRecord(req) {
    req.body.userId = req.decoded.userId;
    return super.updateRecord(req);
  }
}