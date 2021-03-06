import { config } from "dotenv";
import path from "path";
import addDays from "date-fns/addDays";
import formatISO from "date-fns/formatISO";

import {
  expect,
  tokenGenerator,
  request,
  rootURL,
  userFactory,
  mealFactory,
  menuFactory,
  mealMenuFactory
} from "../appHelper";
import app from "../../src/app";
import db from "../../src/models";

const defaultCaterer = userFactory();
const anotherCaterer = userFactory();
const catererToken = tokenGenerator(defaultCaterer);
const meals = Array.from({ length: 4 }, () => mealFactory(defaultCaterer));
const otherMeals = Array.from({ length: 4 }, () => mealFactory(anotherCaterer));
const mealsId = meals.map(meal => meal.id);
const otherMealsId = otherMeals.map(meal => meal.id);
const limit = 8;
const offset = 0;
const menuUrl = `${rootURL}/menu?offset=${offset}&limit=${limit}`;
const menu = menuFactory(defaultCaterer);
const mealMenu = mealMenuFactory(menu, meals);
const today = new Date().setHours(0, 0, 0, 0);
const menuDate = formatISO(addDays(today, 1));
const menuDateURI = encodeURIComponent(menuDate);

context("menu integration test", () => {
  before("set up menu db", async () => {
    await db.MealMenu.truncate({ cascade: true });
    await db.Menu.truncate({ cascade: true });
    await db.Meal.truncate({ cascade: true });
    await db.User.truncate({ cascade: true });
    await db.User.bulkCreate([defaultCaterer, anotherCaterer]);
    await db.Meal.bulkCreate(meals);
    await db.Meal.bulkCreate(otherMeals);
  });

  beforeEach("remove previous menu", async () => {
    await db.MealMenu.truncate({ cascade: true });
    await db.Menu.truncate({ cascade: true });
  });

  // Post Menu
  describe("POST /menu", () => {
    const newMenu = {
      meals: mealsId
    };

    it("should create a menu for today", () =>
      request(app)
        .post(menuUrl)
        .set("authorization", `Bearer ${catererToken}`)
        .send(mealsId)
        .then(res => {
          expect(res.body.data.rows[0]).to.have.property("id");
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            pages: 1,
            count: 4,
            rows: [{ Meals: meals }]
          });
          expect(res).to.have.status(201);
        }));

    it("should not create a menu with another caterer's meals", () =>
      request(app)
        .post(menuUrl)
        .set("authorization", `Bearer ${catererToken}`)
        .send(otherMealsId)
        .then(res => {
          expect(res.body.message).to.equal(
            "userId fields on meal and menu do not match"
            );
            expect(res).to.have.status(422);
        }));

    it("should not create a menu without meals", () =>
      request(app)
        .post(menuUrl)
        .set("authorization", `Bearer ${catererToken}`)
        .send([])
        .then(res => {
          expect(res.body.message).to.deep.equal({
            error: '"value" does not contain 1 required value(s)'
          });
          expect(res).to.have.status(400);
        }));

    it("should not create a menu with wrong meal ids", () =>
      request(app)
        .post(menuUrl)
        .set("authorization", `Bearer ${catererToken}`)
        .send([mealsId[0], mealsId[0], "wrong"])
        .then(res => {
          expect(res.body.message).to.deep.equal({
            "1": '"[1]" contains a duplicate value',
            "2": '"[2]" must be a valid GUID'
          });
          expect(res).to.have.status(400);
        }));
  });

  describe("POST /menu timing", () => {
    beforeEach("set cutoff time to 0", async () => {
      process.env.MENU_CUTOFF_HOUR = 0;
      process.env.MENU_CUTOFF_MINUTE = 0;
    });

    afterEach("restore cutoff time", async () => {
      delete process.env.MENU_CUTOFF_HOUR;
      delete process.env.MENU_CUTOFF_MINUTE;
      config({ path: path.resolve(process.cwd(), ".env.test") });
    });

    it("should not create a menu for current day after the cutoff time", () =>
      request(app)
        .post(menuUrl)
        .set("authorization", `Bearer ${catererToken}`)
        .send(mealsId)
        .then(res => {
          expect(res.body.message).to.contain(
            "Validation error: This menu can only be posted before"
            );
            expect(res).to.have.status(422);
        }));

    it("should create a menu for any subsequent days regardless of the cutoff time", () => {
      return request(app)
        .post(`${menuUrl}&date=${menuDateURI}`)
        .set("authorization", `Bearer ${catererToken}`)
        .send(mealsId)
        .then(res => {
          expect(res.body.data.rows[0]).to.have.property("id");
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            pages: 1,
            count: 4,
            rows: [{ Meals: meals }]
          });
          expect(res).to.have.status(201);
        });
    });
  });

  // Get  Menu
  describe("GET /menu", () => {
    const tomorrowMenu = menuFactory(defaultCaterer, { menuDate });
    const tomorrowMealMenu = mealMenuFactory(tomorrowMenu, meals);
    beforeEach("set up menu meals", async () => {
      await db.Menu.bulkCreate([menu, tomorrowMenu]);
      await db.MealMenu.bulkCreate(mealMenu.concat(tomorrowMealMenu));
    });
    it("should return the menu for today", () =>
      request(app)
        .get(menuUrl)
        .set("authorization", `Bearer ${catererToken}`)
        .then(res => {
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            pages: 1,
            count: 4,
            rows: [{ Meals: meals }]
          });
          expect(res).to.have.status(200);
        }));
    it("should return the menu for tomorrow", () =>
      request(app)
        .get(`${menuUrl}&date=${menuDateURI}`)
        .set("authorization", `Bearer ${catererToken}`)
        .then(res => {
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            pages: 1,
            count: 4,
            rows: [{ Meals: meals }]
          });
          expect(res).to.have.status(200);
        }));
  });
});
