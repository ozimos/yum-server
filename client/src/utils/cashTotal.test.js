import cashTotal, { subTotal } from './cashTotal';

const sampleOrder = [
  {
    id: 'b7f4b44a-052a-457c-8422-327e106ddbed',
    createdAt: '2018-06-12T08:29:07.670Z',
    updatedAt: '2018-06-12T08:29:07.670Z',
    userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    Meals: [
      {
        id: 'adb53a5a-06c7-4067-8062-c71a7ac5484e',
        title: 'Beef with Rice',
        description: 'plain rice with ground beef',
        price: 2500,
        MealOrders: {
          quantity: 3
        }
      },
      {
        id: '6aaa93e3-5a68-45a1-861b-d13c0b0cb967',
        title: 'Starch and Edikangkong',
        description: 'swallow with vegetable soup',
        price: 2500,
        MealOrders: {
          quantity: 2
        }
      }
    ]
  },
  {
    id: 'b8c05c01-7ed0-45eb-b3b4-e9ff52ffe17c',
    createdAt: '2018-06-12T08:31:15.569Z',
    updatedAt: '2018-06-12T08:31:15.569Z',
    userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    Meals: [
      {
        id: 'adb53a5a-06c7-4067-8062-c71a7ac5484e',
        title: 'Beef with Rice',
        description: 'plain rice with ground beef',
        price: 2500,
        MealOrders: {
          quantity: 3
        }
      },
      {
        id: '6aaa93e3-5a68-45a1-861b-d13c0b0cb967',
        title: 'Starch and Edikangkong',
        description: 'swallow with vegetable soup',
        price: 2500,
        MealOrders: {
          quantity: 2
        }
      }
    ]
  }
];
describe('CashTotal', () => {
  it('should return the total cash for all orders', () => {
    expect(cashTotal(sampleOrder)).toBe(25000);
  });
});
describe('subTotal', () => {
  it('should return the total cash for an order', () => {
    expect(subTotal(sampleOrder[0].Meals)).toBe(12500);
  });
});