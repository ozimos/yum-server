import Controller from './controller';

export default class MenuController extends Controller {
  getMenu() {
    if (this.model) {
      return Controller.defaultResponse(this.model);
    }
    return Controller.errorResponse();
  }
  postMenu(req) {
    if (this.model) {
      this.model = req.body;
      return Controller.defaultResponse(this.model, 201);
    }
    return Controller.errorResponse();
  }
}
