import {
  expect,
  request,
  rootURL,
  tokenGenerator,
  userFactory,
  mealFactory,
  getRandomInt,
  orderFactory,
  mealOrderFactory,
} from "../appHelper";
import app from "../../src/app";
import db from "../../src/models";

const limit = 5;
const offset = 0;
const ordersUrl = `${rootURL}/orders`;
const getOrdersUrl = `${rootURL}/orders?offset=${offset}&limit=${limit}`;
const defaultCaterer = userFactory();
const anotherCaterer = userFactory();
const notCaterer = userFactory({ isCaterer: false });
const catererToken = tokenGenerator(defaultCaterer);
const basicUserToken = tokenGenerator(notCaterer);
const meals = Array.from({ length: 4 }, () => mealFactory(defaultCaterer));
const otherMeals = Array.from({ length: 4 }, () => mealFactory(anotherCaterer));
const availableMeals = meals.concat(otherMeals);
const orderInput = availableMeals.map(({ id }) => ({
  id,
  quantity: getRandomInt(1, 10),
}));
const order = orderFactory(notCaterer);
const mealOrders = mealOrderFactory(order, availableMeals, 4);

describe("orders integration test", () => {
  before("before set up order db", async () => {
    await db.Meal.truncate({ cascade: true });
    await db.User.truncate({ cascade: true });
    await db.User.bulkCreate([defaultCaterer, anotherCaterer, notCaterer]);
    await db.Meal.bulkCreate(availableMeals);
  });
  describe("GET should return error message if no orders", () => {
    before("set up order db", async () => {
      await db.MealOrder.truncate({ cascade: true });
      await db.Order.truncate({ cascade: true });
    });
    it("/orders?caterer=true", () =>
      request(app)
        .get(getOrdersUrl + "&caterer=true")
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.message).to.equal("no records available");
          expect(res).to.have.status(404);
        }));
    it("/orders?date=all&caterer=true", () =>
      request(app)
        .get(`${getOrdersUrl}&date=all&caterer=true`)
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.message).to.equal("no records available");
          expect(res).to.have.status(404);
        }));
  });

  // Create An Order
  describe("POST /orders", () => {
    it("should create an order", () =>
      request(app)
        .post(getOrdersUrl)
        .set("authorization", `JWT ${catererToken}`)
        .send(orderInput)
        .then((res) => {
          const { id, password, isCaterer, ...User } = defaultCaterer;
          expect(res.body.data)
            .to.be.an("object")
            .that.includes.all.keys("pages", "count", "rows");
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            count: orderInput.length,
          });
          expect(res.body.data.rows[0]).to.containSubset({
            userId: defaultCaterer.id,
            User,
          });

          const converted = res.body.data.rows[0].Meals.map(
            ({ id, MealOrder: { quantity } }) => ({ id, quantity })
          );
          expect(converted).to.containSubset(orderInput);
          expect(res).to.have.status(201);
        }));
  });

  // Get All Orders
  describe("GET", () => {
    before("seed orders in db", async () => {
      await db.MealOrder.truncate({ cascade: true });
      await db.Order.truncate({ cascade: true });
      await db.Order.bulkCreate([order]);
      await db.MealOrder.bulkCreate(mealOrders);
    });
    it(" /orders should return all orders", () =>
      request(app)
        .get(getOrdersUrl)
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.data)
            .to.be.an("object")
            .that.includes.all.keys("pages", "count", "rows");
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            count: mealOrders.length,
          });
          expect(res.body.data.rows[0].MealsURL)
            .to.be.a("string")
            .that.includes(order.id);
          expect(res.body.data.rows[0]).to.containSubset({
            id: order.id,
            userId: notCaterer.id,
          });
          expect(res.body.data.rows[0].Meals).to.be.an("array");
          expect(res).to.have.status(200);
        }));
    it(" /orders should not return orders that do not belong to user", () =>
      request(app)
        .get(getOrdersUrl)
        .set("authorization", `JWT ${catererToken}`)
        .then((res) => {
          expect(res.body.message).to.equal("no records available");
          expect(res).to.have.status(404);
        }));
    it(" /orders should return orders not belonging to a user only when the user is acting as a caterer", () =>
      request(app)
        .get(getOrdersUrl + "&caterer=true")
        .set("authorization", `JWT ${catererToken}`)
        .then((res) => {
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            count: meals.length,
          });
          expect(res).to.have.status(200);
        }));
    it("/orders/total should return the total amount for the day", () =>
      request(app)
        .get(`${ordersUrl}/total`)
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.data.revenue).to.be.a("number");
          expect(res.body.data).to.containSubset({ orders: 1, users: 1 });
          expect(res).to.have.status(200);
        }));

    it("/orders/:id/total should return the total amount for an order", () =>
      request(app)
        .get(`${ordersUrl}/${order.id}/total`)
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.data).to.containSubset({ orders: 1, users: 1 });
          expect(res.body.data.revenue).to.be.a("number");
          expect(res).to.have.status(200);
        }));

    it("/orders?date=date should return all orders for a given date", () =>
      request(app)
        .get(
          `${getOrdersUrl}&date=${encodeURIComponent(new Date().toISOString())}`
        )
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.data).to.containSubset({
            limit,
            offset,
            count: mealOrders.length,
          });
          expect(res.body.data.rows[0]).to.containSubset({
            id: order.id,
            userId: notCaterer.id,
          });
          expect(res).to.have.status(200);
        }));

    it("/orders/:id should return all meals for an order", () =>
      request(app)
        .get(`${ordersUrl}/${order.id}?offset=${offset}&limit=${limit}`)
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res.body.data).to.containSubset({
            count: mealOrders.length,
          });
          expect(res.body.data.rows[0]).to.containSubset({
            id: order.id,
            userId: notCaterer.id,
          });
          expect(res.body.data.rows[0].Meals).to.be.an("array");
          expect(res).to.have.status(200);
        }));
  });

  // Update An Order
  describe("PUT /orders/:id", () => {
    before("seed orders in db", async () => {
      await db.MealOrder.truncate({ cascade: true });
      await db.Order.truncate({ cascade: true });
      await db.Order.bulkCreate([order]);
      await db.MealOrder.bulkCreate(mealOrders);
    });

    it("should update an order", () =>
      request(app)
        .put(`${ordersUrl}/${order.id}`)
        .set("authorization", `JWT ${basicUserToken}`)
        .send(orderInput)
        .then((res) => {
          expect(res.body.data).to.containSubset({
            count: availableMeals.length,
          });
          expect(res.body.data.rows[0]).to.containSubset({
            id: order.id,
            userId: notCaterer.id,
          });
          
          const converted = res.body.data.rows[0].Meals.map(
            ({ id, MealOrder: { quantity } }) => ({ id, quantity })
          );
          expect(converted).to.containSubset(orderInput);
          expect(res).to.have.status(200);
        }));
    it("should not update an order that does not belong to the current user", () =>
      request(app)
        .put(`${ordersUrl}/${order.id}`)
        .set("authorization", `JWT ${catererToken}`)
        .send(orderInput)
        .then((res) => {
          expect(res.body.message).to.equal(
            "Order was not processed. Try again"
          );
          expect(res).to.have.status(404);
        }));
  });

  // Delete An Order
  describe("DELETE /orders/:id", () => {
    beforeEach("seed orders in db", async () => {
      await db.MealOrder.truncate({ cascade: true });
      await db.Order.truncate({ cascade: true });
      await db.Order.bulkCreate([order]);
      await db.MealOrder.bulkCreate(mealOrders);
    });

    it("should delete an order", () =>
      request(app)
        .delete(`${ordersUrl}/${order.id}`)
        .set("authorization", `JWT ${basicUserToken}`)
        .then((res) => {
          expect(res).to.have.status(200);
        }));

    it("should not delete an order that does not belong to the current user", () =>
      request(app)
        .delete(`${ordersUrl}/${order.id}`)
        .set("authorization", `JWT ${catererToken}`)
        .then((res) => {
          expect(res.body.message).to.equal("record was not deleted");
          expect(res).to.have.status(404);
        }));
  });
});
