import { expect, request, menuUrl, templateTest } from './helper';

// Get  Menu
describe('GET /menu', () => {
  it('should return the menu for today', () =>
    request.get(menuUrl).then((res) => {
      expect(res.body.date.toString().substring(0, 10))
        .to.equal(new Date().toISOString().substring(0, 10));
    }));
  templateTest('Get Menu', 'get', menuUrl, null, 'meals', 'object');
});

// Post Menu
describe('POST /menu', () => {
  const newMenu = {
    // date will be set to current date by controller
    date: '2018-05-25',
    description: 'Continental, Local',
    meals: [
      {
        id: 1,
        title: 'Beef with Rice',
        description: 'plain rice with ground beef',
        price: 1500
      },
      {
        id: 2,
        title: 'Beef with Fries',
        description: 'beef slab with fried potato slivers',
        price: 2000
      }
    ]
  };
  it('should create a menu', () =>
    request
      .post(menuUrl)
      .send(newMenu)
      .then((res) => {
        expect(res.body.description).to.equal(newMenu.description);
      }));
  templateTest('Add Menu', 'post', menuUrl, newMenu, 'meals', 'object', '201');
});
