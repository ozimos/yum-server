/* eslint import/no-extraneous-dependencies: off */
import { assert } from 'chai';
import schema from '../../../src/middleware/userSchemas';

describe('for POST requests on /api/v1/auth/signup, validation', () => {
  // sample request body data
  const postUserData = {
    firstName: 'Tovieye',
    lastName: 'Ozi',
    email: 'ad.min@gmail.com',
    password: 'abc123',
    confirmPassword: 'abc123',
    isCaterer: true
  };

  it('throws error when some required fields are not in request body', () => {
    const modified = { ...postUserData };
    delete modified.firstName;
    const result = schema.signup.validate(modified);
    assert.notEqual(result.error, null, `Joi output: ${result.error}`);
  });
  it('throws error when unknown fields are in request body', () => {
    const modified = { ...postUserData };
    modified.volume = 'high';
    const result = schema.signup.validate(modified);
    assert.notEqual(result.error, null, `Joi output: ${result.error}`);
  });
  it('does not throw error when all required fields are in request body', () =>
    schema.signup.validate(postUserData));
});