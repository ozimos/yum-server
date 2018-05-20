import {
  expect,
  defaultMeal3,
  defaultMeal4,
  menuController
} from '../../../../testHelpers/controllerHelper';

describe('Integration Controller Post Menu', () => {


  const body = {
    description: "Wednesday's Menu",
    meals: [defaultMeal3.id, defaultMeal4.id]
  };

  it('postMenu posts the menu for the day', async () => {

    const response = await menuController.postMenu({
      body
    });
    expect(response.data.description).to.equal(body.description);
    // eslint-disable-next-line
    expect(response.data.Meals[0].id).to.exist;
    expect(response.statusCode).to.equal(201);
  });
  it('postMenu returns error message if meal is not in db', async () => {
    const phantomMealId = '91bf8437-b2f3-4e2b-a8ac-d86fd643dfb7';

    const req = {
      body: {
        description: "Wednesday's Menu",
        meals: [phantomMealId]
      }
    };
    const response = await menuController.postMenu(req);
    expect(response.message).to.equal('Menu was not posted. Try again');
    expect(response.statusCode).to.equal(404);
  });
  it('postMenu sets the environment variables', async () => {
    const hour = new Date().getHours();
    const mins = new Date().getMinutes();
    await menuController.postMenu({
      body
    });
    expect(process.env.ORDER_START_HOUR).to.equal(hour.toString());
    expect(parseInt(process.env.ORDER_START_MINS, 10)).to.be.closeTo(mins, 1);
  });
});