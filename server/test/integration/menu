import { expect, request, menuUrl, templateTest } from './helper';

import app from '../../src/app';

const defaultMenu = {
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
// Get  Menu
describe('GET /menu', () => {
  it('should return the menu for today', () =>
    request(app)
      .get(menuUrl)
      .then((res) => {
        expect(res.body).to.eql(defaultMenu);
      }));
  templateTest('Get Menu', 'get', menuUrl, null, 'meals', 'object');
});

// Post Menu
describe('POST /menu', () => {
  const newMenu = {
    description: 'Thursday Menu',
    meals: [
      {
        id: 3,
        title: 'Beef with Spaghetti',
        description: 'spaghetti with ground beef',
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
    request(app)
      .post(menuUrl)
      .send(newMenu)
      .then((res) => {
        expect(res.body).to.eql(newMenu);
      }));
  templateTest('Add Menu', 'post', menuUrl, newMenu, 'meals', 'object', '201');
});
