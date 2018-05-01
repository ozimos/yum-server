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
  signUp(req) {
    // check if email is available
    return this.Model.findOne({
      where: {
        email: req.body.email
      }
    }).then((response) => {
      if (response) {
        const duplicate = response.userName === (req.body.userName || req.body.email) ? 'userName' : 'email';
        return UserController.errorResponse(`${duplicate} has been used`, 406);
      }
      // create hash of password
      const salt = bcrypt.genSaltSync(10);
      req.body.passwordHash = bcrypt.hashSync(req.body.password, salt);
      // remove plaintext password from record to write to db
      delete req.body.password;
      // create user in db
      return this.Model.create(req.body)
        .then(data => UserController
          .sendResponseWithToken(data, 'Signup Successful '))
        .catch(error => UserController.errorResponse(error.message));
    }).catch(error => UserController.errorResponse(error.message));
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
    // remove password info
    delete data.passwordHash;

    let message = extraMessage;
    const payload = {
      isCaterer: data.isCaterer,
      id: data.id
    };
    const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
      expiresIn: '1h'
    });
    if (token) {
      message = `${message}Login Successful`;
      return UserController.defaultResponse(data, 200, message, token);
    }
    message = `${message} but No token found`;
    return UserController.errorResponse(message, 406);
  }
}

export default UserController;
