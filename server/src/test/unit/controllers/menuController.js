/* eslint import/no-extraneous-dependencies: off */
import { expect } from 'chai';
import MenuController from '../../../controllers/menuController.js';

const errorResponse = {
  message: 'records unavailable',
  statusCode: 404
};
const menuList = [
  {
    id: 1,
    date: new Date(2019, 11, 1)
  },
  {
    id: 2,
    date: new Date()
  }
];
describe('getTodaysMenu()', () => {
  it('should return a menu when menu with current date exists', () => {
    const listCopy = [...menuList];
    const menuController = new MenuController(listCopy);
    expect(menuController.getTodaysMenu().message.id).to.eql(listCopy[1].id);
  });
  it('should return error message when no menu with current date exists', () => {
    const listCopy = [...menuList];
    listCopy[1].date = new Date(2014, 8, 1);

    const menuController = new MenuController(listCopy);
    expect(menuController.getTodaysMenu()).to.eql(errorResponse);
  });
});
describe('postRecord()', () => {
  it('should remove menu with current date before posting another menu with current date', () => {
    const listCopy = [...menuList];
    const req = {
      body: { date: new Date() }
    };

    const menuController = new MenuController(listCopy);
    const firstPost = menuController.postRecord(req).message.id;
    const secondPost = menuController.postRecord(req).message.id;
    expect(firstPost).to.equal(secondPost);
  });
  it('should set the date on the menu to the current date', () => {
    const listCopy = [...menuList];
    const req = {
      body: { date: new Date(2020, 3, 4) }
    };

    const menuController = new MenuController(listCopy);

    expect(menuController
      .postRecord(req)
      .message.date.toISOString()
      .substring(0, 10)).to.eql(new Date().toISOString().substring(0, 10));
  });
});
