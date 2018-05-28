/* eslint import/no-extraneous-dependencies: off */
import subDays from 'date-fns/sub_days';
import MockDate from 'mockdate';

import {
  expect,
  defaultMeal3,
  defaultMeal4,
  menuController
} from '../../../../testHelpers/controllerHelper';
import db from '../../../../src/models';

describe('Integration Controller Menu', () => {


  beforeEach(async () => {
    await menuController.postMenu({
      meals: []
    });
    await db.Menu.truncate({
      cascade: true
    });
  });
  describe('Get Menu: Fail', () => {

    it('Empty Table: returns error message if the menu table is empty', async () => {
      const response = await menuController.getMenu();
      expect(response.message).to.equal('menu for the day has not been set');
      expect(response.statusCode).to.equal(404);
    });

    it('Empty Menu: returns error message if the menu for the day empty', async () => {

      await db.Menu.upsert({
        title: 'Today',
      });
      const response = await menuController.getMenu();
      expect(response.message).to.equal('menu for the day has not been set');
      expect(response.statusCode).to.equal(404);
    });

    it('Old Menu: returns error message if the menu has not been set for today ', async () => {
      const pastDay2 = subDays(new Date(), 2);
      MockDate.set(pastDay2);
      const body = {
        title: 'Today',
        description: 'New Menu',
        meals: [defaultMeal3.id]
      };
      await menuController.postMenu({
        body
      });

      MockDate.reset();
      const response = await menuController.getMenu();
      expect(response.message).to.equal('menu for the day has not been set');
      expect(response.statusCode).to.equal(404);
    });
    it.skip('getMenu returns error message after invalid meal is set', async () => {
      const phantomMealId = '91bf8437-b2f3-4e2b-a8ac-d86fd643dfb7';

      const body = {
        description: "Wednesday's Menu",
        meals: [phantomMealId]
      };
      try {
        await menuController.postMenu({
          body
        });
      } catch (err) {
        /* eslint no-console: off */
        console.log(err);
      }
      const response = await menuController.getMenu();
      expect(response.message).to.equal('menu for the day has not been set');
      expect(response.statusCode).to.equal(404);
    });
  });
  describe('Get Menu: Success', () => {

    it('getMenu returns the menu for the day', async () => {
      const body = {
        description: "Wednesday's Menu",
        meals: [defaultMeal3.id, defaultMeal4.id]
      };
      await menuController.postMenu({
        body
      });
      const response = await menuController.getMenu();
      expect(response.data.description).to.equal(body.description);
      // eslint-disable-next-line
      expect(response.data.Meals[0].id).to.exist;
      expect(response.statusCode).to.equal(200);
    });
  });
});