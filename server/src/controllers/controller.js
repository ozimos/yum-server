/**
 *
 *
 * @class Controller
 */
class Controller {
  /**
   * Creates an instance of Controller.
   * @param {any} Model
   * @memberof Controller
   */
  constructor(Model) {
    this.Model = Model;
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
      instance[method](req).then((response) => {
        const {
          statusCode,
          ...rest
        } = response;
        res.status(statusCode).json(rest);
      });
    };
  }
  /**
   *
   *
   * @static
   * @param {any} data a table instance
   * @param {number} [statusCode=200]
   * @param {string} message optional
   * @param {string} token optional
   * @returns {object} object
   * @memberof Controller
   */
  static defaultResponse(data, statusCode = 200, message, token) {
    return {
      data,
      statusCode,
      message,
      token
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
  static errorResponse(message, statusCode = 400) {
    return {
      message,
      statusCode,
    };
  }


  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  createRow(req) {
    return this.Model
      .create(req.body)
      .then(result => Controller.defaultResponse(result, 201))
      .catch(error => Controller.errorResponse(error.message));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  getAllRows() {
    return this.Model
      .findAll()
      .then((result) => {
        if (result.length > 0) {
          return Controller.defaultResponse(result);
        }
        return Controller.errorResponse('no records available', 404);
      })
      .catch(error => Controller.errorResponse(error.message));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  getRowById(req) {
    return this.Model.findById(req.params.id)
      .then((result) => {
        if (!result) {
          return Controller.errorResponse('no records available', 404);
        }
        return Controller.defaultResponse(result);
      })
      .catch(error => Controller.errorResponse(error.message));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  updateRow(req) {
    return this.Model.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    }).then(result => Controller.defaultResponse(result))
      .catch(error => Controller.errorResponse(error.message, 422));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  deleteRow(req) {
    return this.Model
      .destroy({
        where: {
          id: req.params.id
        },
      })
      .then(result => Controller.defaultResponse(result))
      .catch(error => Controller.errorResponse(error.message, 422));
  }
}

export default Controller;