/* eslint import/no-extraneous-dependencies: off */
import {
  expect,
  deleteMeal,
  mealController
} from './helper';

const phantomMealId = '91bf8437-b2f3-4e2b-a8ac-d86fd643dfb7';

describe('Integration Controller Meal All, Single, Delete', () => {
  describe('AllMeals:', () => {

    it('returns all meals in db', async () => {
      const response = await mealController.getAllRecords();
      /* eslint-disable no-unused-expressions */
      expect(response.data[0].title).to.exist;
      expect(response.data[0].description).to.exist;
      expect(response.data[0].price).to.exist;
      /* eslint-enable no-unused-expressions */
    });
  });
  describe('SingleMeal:', () => {

    it('returns single meal in db', async () => {
      const req = {
        params: {
          id: deleteMeal.id
        }
      };
      const response = await mealController.getSingleRecord(req);
      expect(response.data.title).to.equal(deleteMeal.title);
      expect(response.data.description).to.equal(deleteMeal.description);
      expect(response.data.price).to.equal(deleteMeal.price);
    });
    it('returns error message if meal is not in db', async () => {
      const req = {
        params: {
          id: phantomMealId
        }
      };
      const response = await mealController.getSingleRecord(req);
      expect(response.message).to.equal('no records available');
      expect(response.statusCode).to.equal(404);
    });
  });
  describe('DeleteMeal:', () => {

    it('removes meal from db', async () => {
      const req = {
        params: {
          id: deleteMeal.id
        }
      };
      const response = await mealController.deleteRecord(req);
      expect(response.data).to.equal('1 record(s) deleted');
      expect(response.statusCode).to.equal(200);
    });
    it('returns error message if meal not in db', async () => {
      const req = {
        params: {
          id: phantomMealId
        }
      };
      const response = await mealController.deleteRecord(req);
      expect(response.message).to.equal('no records available');
      expect(response.statusCode).to.equal(404);
    });
  });
});