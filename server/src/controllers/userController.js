import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Controller from './controller';

/**
 *
 *
 * @class UserController
 */
class UserController extends Controller {
  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  login(req) {
    // get user details from db
    return this.Model
      .findOne({
        where: {
          email: req.body.email
        }
      }).then((response) => {
        if (!response) {
          return UserController.errorResponse('Account does not exist! Visit /api/v1/users/signup and register.', 404);
        }
        // check if password is correct
        const isCorrectPassword = bcrypt.compareSync(req.body.password, response.password);

        if (isCorrectPassword) {
          return UserController.sendResponseWithToken(response);
        }
        return UserController.errorResponse('Incorrect password', 401);
      }).catch(error => UserController.errorResponse(error.message));
  }


  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  signUp(req) {
    const {
      email,
      ...rest
    } = req.body;
    // check if email is available
    return this.Model.findOrCreate({
      where: {
        email
      },
      defaults: rest
    }).then(([response, created]) => {
      if (!created) {
        return UserController.errorResponse('email has been used');
      }
      return UserController
        .sendResponseWithToken(response, 'Signup Successful, ');
    })
      .catch(error => UserController.errorResponse(error.message));
  }


  /**
   *
   *
   * @param {Sequelize<Model<Instance>>} data
   * @param {String} extraMessage
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  static sendResponseWithToken(data, extraMessage = '') {

    let message = extraMessage;
    const payload = {
      isCaterer: data.isCaterer,
      id: data.id
    };
    const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
      expiresIn: '1h'
    });
    if (typeof token === 'string') {
      message = `${message}Login Successful`;
      return UserController.defaultResponse(data, 200, message, token);
    }
    message = `${message}token.message`;
    return UserController.errorResponse(message, 500);
  }
}

export default UserController;