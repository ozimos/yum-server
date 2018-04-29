import bcrypt from 'bcryptjs';

import Controller from './controller';

export default class UserController extends Controller {
  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  login(req) {
    // get user details from db
    const record = this.model.find(elem => elem.email === req.body.email);
    if (!record) {
      return super.errorResponse('Account does not exist! Visit /api/v1/users/signup and register.');
    }
    // check if password is correct
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      record.passwordHash
    );

    if (isCorrectPassword) {
      return super.defaultResponse(record);
    }
    return super.errorResponse('Incorrect password', 406);
  }

  /**
   *
   *
   * @param {any} req
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  signUp(req) {
    // check if email is available
    const record = this.model.find(elem => elem.email === req.body.email);

    if (record) {
      return UserController.errorResponse(
        `${record.email} has been used`,
        406
      );
    }
    // create hash of password
    const salt = bcrypt.genSaltSync(10);
    req.body.passwordHash = bcrypt.hashSync(req.body.password, salt);
    // remove plaintext password from record to write to db
    delete req.body.password;
    // create user in db
    return super.postRecord(req);
  }
}
