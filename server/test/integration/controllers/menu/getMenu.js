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
        id: '879f1ce3-8ff3-4cdd-afbd-0ca15e80b576',
      });
      const response = await menuController.getMenu();
      expect(response.message).to.equal('menu for the day has not been set');
      expect(response.statusCode).to.equal(404);
    });

    it('Old Menu: returns error message if the menu has not been set for today ', () => {
      const pastDay2 = subDays(new Date(), 2);
      MockDate.set(pastDay2);
      const body = {
        meals: [defaultMeal3.id]
      };
      menuController.postMenu({
        body
      }).then(() => {
        MockDate.reset();
        menuController.getMenu().then((response) => {
          expect(response.message).to.equal('menu for the day has not been set');
          expect(response.statusCode).to.equal(404);
        });
      });
    });
    it('getMenu returns error message after invalid meal is set', async () => {
      const phantomMealId = '91bf8437-b2f3-4e2b-a8ac-d86fd643dfb7';

      const body = {
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
