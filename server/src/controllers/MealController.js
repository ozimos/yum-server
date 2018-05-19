import Controller from './Controller';

export default class MealController extends Controller {

  postRecord(req) {
    if (!req.decoded && !req.decoded.userId) {
      return MealController.errorResponse('userId not supplied');
    }
    req.body.userId = req.decoded.userId;
    return super.postRecord(req);
  }
}