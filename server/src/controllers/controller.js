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
      const { message, statusCode } = instance[method](req);
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
      statusCode
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
      statusCode
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
    if (this.model && this.model[0]) {
      const record = this.model.find(elem => elem.id === req.params.id);
      if (record) {
        return Controller.defaultResponse(record);
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
    if (this.model && this.model[0]) {
      const record = this.model.find(elem => elem.id === req.params.id);
      if (record) {
        Object.keys(req.body).forEach((element) => {
          record[element] = req.body[element];
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
    if (this.model && this.model[0]) {
      const recordIndex = this.model.findIndex(elem => elem.id === req.params.id);
      if (recordIndex >= 0) {
        this.model.splice(recordIndex, 1);
        return Controller.defaultResponse('Record deleted');
      }
    }
    return Controller.errorResponse();
  }
}
