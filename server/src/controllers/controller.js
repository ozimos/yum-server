export default class Controller {
  constructor(model) {
    this.model = model;

  }

  /**
   *
   *
   * @static
   * @param {object} instance
   * @param {String} method
   * @returns {function} Express middleware
   * @memberof Controller
   */
  static select(instance, method) {
    return (req, res) => {

      const {
        message,
        statusCode
      } = instance[method](req);
      res.status(statusCode).json(message);

    };
  }
  /**
   *
   *
   * @static
   * @param {any} message a model instance
   * @param {number} [statusCode=200]
   * @returns {object} object
   * @memberof Controller
   */
  static defaultResponse(message, statusCode = 200) {
    return {
      message,
      statusCode,
    };
  }
  /**
   *
   *
   * @static
   * @param {any} message
   * @param {number} [statusCode=400]
   * @returns {object} object
   * @memberof Controller
   */
  static errorResponse(message = 'records unavailable', statusCode = 404) {
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
    if (this.model && this.model[0]) {
      return Controller.defaultResponse(this.model);
    }
    return Controller.errorResponse();
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
      if (this.model[i].id === parseInt(req.params.id, 10)) {
        return Controller.defaultResponse(this.model[i]);
      }
    }
    return Controller.errorResponse();
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
      const len = this.model.length;
      const newId = len + 1;
      this.model.push({
        id: newId,
        ...req.body
      });
      return Controller.defaultResponse(this.model[len], 201);
    }
    return Controller.errorResponse();
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
      if (this.model[i].id === parseInt(req.params.id, 10)) {
        Object.keys(req.body).forEach((element) => {
          this.model[i][element] = req.body[element];
        });

        return Controller.defaultResponse(this.model);
      }
    }
    return Controller.errorResponse();
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
      if (this.model[i].id === parseInt(req.params.id, 10)) {
        delete this.model[i];
        return Controller.defaultResponse('Record deleted');
      }
    }
    return Controller.errorResponse();
  }
}