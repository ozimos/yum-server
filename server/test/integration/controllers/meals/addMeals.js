/* eslint import/no-extraneous-dependencies: off */
import {
  expect,
  defaultMeal,
  defaultUser,
  defaultUser2,
  mealController
} from './helper';

const decoded = {
  userId: defaultUser.id
};
const sampleBody = {
  title: 'Beef Barbecue',
  description: 'roasted ground beef',
  imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg',
  price: 2000,
};
describe.skip('Integration Controller Meal AddMeal', () => {
  it('does not add duplicate meal title by same user', async () => {
    const body = { ...sampleBody };
    body.title = defaultMeal.title;
    const req = { decoded, body };

    const expected = {
      message: 'Meal title is not available',
      statusCode: 400
    };
    const response = await mealController.postRecord(req);
    expect(response).to.eql(expected);
  });
  it('does not add meal without userId', async () => {

    const decoded2 = { ...decoded
    };
    const body = { ...sampleBody
    };
    delete decoded2.userId;

    const req = {
      decoded: decoded2,
      body
    };

    const expected = {
      message: 'Meal title is not available',
      statusCode: 400
    };
    const response = await mealController.postRecord(req);
    expect(response).to.eql(expected);
  });
  it('does add duplicate meal title by different user', async () => {

    const decoded2 = { ...decoded
    };
    const body = { ...sampleBody
    };
    decoded2.userId = defaultUser2.id;
    const req = {
      decoded: decoded2,
      body
    };

    const expected = {
      message: 'Meal title is not available',
      statusCode: 400
    };
    const response = await mealController.postRecord(req);
    expect(response).to.eql(expected);
  });
  it('does create new meal', async () => {

    const req = {
      decoded,
      body: sampleBody
    };

    const expected = {
      message: 'Meal title is not available',
      statusCode: 400
    };
    const response = await mealController.postRecord(req);
    expect(response).to.eql(expected);
  });
});