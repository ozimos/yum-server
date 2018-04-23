export default class Controller {
  constructor(model) {
    this.model = model;

  }

  /**
   *
   *
   * @static
   * @param {any} message endpoint response
   * @param {number} [statusCode=200]
   * @returns {object} object
   * @memberof Controller
   */
  static response(message = 'records unavailable', statusCode = 200) {
    return {
      message,
      statusCode,
    };
  }

  /**
   *
   * Get All Records
   * @returns {any} all records
   * @memberof Controller
   */
  getAllRecords() {
    if (this.model) {
      return Controller.response(this.model);
    }
    return Controller.response(null, 400);
  }

  /**
   *
   *  Get a single record
   * @param {obj} req
   * @returns {any} A single record
   * @memberof Controller
   */
  getSingleRecord(req) {
    for (let i = 0; i < this.model.length; i += 1) {
      if (this.model[i].id === req.params.id) {
        return Controller.response(this.model[i]);
      }
    }
    return Controller.response(null, 404);
  }

  /**
   *
   * Creates a new record
   * @param {obj} req
   * @returns {any} success, created record
   * @memberof Controller
   */
  postRecord(req) {
    if (this.model) {
      const newId = this.model.length + 1;
      this.model.push({
        id: newId,
        ...req.body
      });
      return Controller.response(this.model[this.model.length - 1]);
    }
    return Controller.response(null, 400);
  }

  /**
   *
   *  Update a record
   * @param {obj} req
   * @returns {any} success, updated record
   * @memberof Controller
   */
  updateRecord(req) {
    for (let i = 0; i < this.model.length; i += 1) {
      if (this.model[i].id === req.params.id) {
        Object.keys(req.body).forEach((element) => {
          this.model[i][element] = req.body[element];
        });

        return Controller.response(this.model[i]);
      }
    }
    return Controller.response(null, 400);
  }
  /**
   *
   *  Delete a record
   * @param {obj} req
   * @returns {any} success, updated record
   * @memberof Controller
   */
  deleteRecord(req) {
    for (let i = 0; i < this.model.length; i += 1) {
      if (this.model[i].id === req.params.id) {
        delete this.model[i];
        return Controller.response('Record deleted');
      }
    }
    return Controller.response(null, 400);
  }
}