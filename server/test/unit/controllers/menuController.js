/* eslint import/no-extraneous-dependencies: off */
import { expect } from 'chai';
import MenuController from '../../../src/controllers/menuController';

const errorResponse = {
  message: 'records unavailable',
  statusCode: 404
};
const menuList = [
  {
    id: 1,
    date: new Date(2019, 11, 1),
    meals: [1, 2]
  },
  {
    id: 2,
    date: new Date(),
    meals: [2, 1]
  }
];
const meals = [
  {
    id: 1,
    title: 'Beef with Rice',
    description: 'plain rice with ground beef',
    price: 1500,
  },
  {
    id: 2,
    title: 'Beef with Fries',
    description: 'beef slab with fried potato slivers',
    price: 2000,
  },
];
describe('getTodaysMenu()', () => {
  const req = {};
  it('should return a menu when menu with current date exists', () => {
    const listCopy = [...menuList];
    const menuController = new MenuController(listCopy, meals);
    expect(menuController.getTodaysMenu(req).message.id).to.eql(listCopy[1].id);
  });
  it('should return error message when no menu with current date exists', () => {
    const listCopy = [...menuList];
    listCopy[1].date = new Date(2014, 8, 1);

    const menuController = new MenuController(listCopy, meals);
    expect(menuController.getTodaysMenu(req)).to.eql(errorResponse);
  });
});
describe('postRecord()', () => {
  it('should remove menu with current date before posting another menu with current date', () => {
    const listCopy = [...menuList];
    const req = {
      body: { date: new Date() }
    };

    const menuController = new MenuController(listCopy, meals);
    const firstPost = menuController.postRecord(req).message.id;
    const secondPost = menuController.postRecord(req).message.id;
    expect(firstPost).to.equal(secondPost);
  });
  it('should set the date on the menu to the current date', () => {
    const listCopy = [...menuList];
    const req = {
      body: { date: new Date(2020, 3, 4) }
    };

    const menuController = new MenuController(listCopy, meals);

    expect(menuController
      .postRecord(req)
      .message.date.toISOString()
      .substring(0, 10)).to.eql(new Date().toISOString().substring(0, 10));
  });
});
