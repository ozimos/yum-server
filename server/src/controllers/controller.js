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
   * @param {obj} req express object
   * @param {obj} currentModel allow injection of different database dependencies, for subclasses
   * @memberof Controller
   */
  getAllRecords(req, currentModel = this.model) {
    if (currentModel && currentModel[0]) {
      return Controller.defaultResponse(currentModel);
    }
    return Controller.errorResponse();
  }

  /**
   *
   *  Get a single record
   * @param {obj} req express object
   * @param {obj} currentModel allow injection of different database dependencies, for subclasses
   * @returns {any} A single record
   * @memberof Controller
   */
  getSingleRecord(req, currentModel = this.model) {
    if (currentModel && currentModel[0]) {
      const record = currentModel.find(elem => elem.id === req.params.id);
      if (record) {
        return Controller.defaultResponse(record);
      }
    }
    return Controller.errorResponse();
  }

  /**
   *
   * Creates a new record
   * @param {obj} req express object
   * @param {obj} currentModel allow injection of different database dependencies, for subclasses
   * @returns {any} success, created record
   * @memberof Controller
   */
  postRecord(req, currentModel = this.model) {
    if (currentModel) {
      const len = currentModel.length;
      const newId = len + 1;
      currentModel.push({
        id: newId,
        ...req.body
      });
      return Controller.defaultResponse(currentModel[len], 201);
    }
    return Controller.errorResponse();
  }

  /**
   *
   *  Update a record
   * @param {obj} req express object
   * @param {obj} currentModel allow injection of different database dependencies, for subclasses
   * @returns {any} success, updated record
   * @memberof Controller
   */
  updateRecord(req, currentModel = this.model) {
    if (currentModel && currentModel[0]) {
      const record = currentModel.find(elem => elem.id === req.params.id);
      if (record) {
        Object.keys(req.body).forEach((element) => {
          record[element] = req.body[element];
        });

        return Controller.defaultResponse(currentModel);
      }
    }
    return Controller.errorResponse();
  }
  /**
   *
   *  Delete a record
   * @param {obj} req express object
   * @param {obj} currentModel for subclasses to inject new database dependencies   *
   * @returns {any} success, updated record
   * @memberof Controller
   */
  deleteRecord(req, currentModel = this.model) {
    if (currentModel && currentModel[0]) {
      const recordIndex = currentModel.findIndex(elem => elem.id === req.params.id);
      if (recordIndex >= 0) {
        currentModel.splice(recordIndex, 1);
        return Controller.defaultResponse('Record deleted');
      }
    }
    return Controller.errorResponse();
  }
}
