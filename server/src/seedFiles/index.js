import bcrypt from 'bcryptjs';

export const seedPassword = 'Thisisatestpassword';
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(seedPassword, salt);

export const seedUsers = [{
  id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'tovieye@gmail.com',
  password: hashPassword,
  isCaterer: true
},
{
  id: '35ef394f-bc07-4e52-9f5f-6ab326d45f85',
  firstName: 'Douglas',
  lastName: 'Asede',
  email: 'douglas@gmail.com',
  password: hashPassword,
  isCaterer: true
},
{
  id: '1242fe68-67ee-4de2-80d0-0859f3d0f361',
  firstName: 'Dienebi',
  lastName: 'Ombu',
  email: 'dienebi@gmail.com',
  password: hashPassword,
  isCaterer: false
},
{
  id: '20a0dcc4-0a78-43f6-881b-884dd6f32861',
  firstName: 'Asaba',
  lastName: 'Ogieh',
  email: 'moses@gmail.com',
  password: hashPassword,
  isCaterer: false
}
];

export const catererTovieye = seedUsers[0];
export const catererDouglas = seedUsers[1];
export const customerDienebi = seedUsers[2];

export const seedMeals = [{
  id: 'adb53a5a-06c7-4067-8062-c71a7ac5484e',
  userId: catererTovieye.id,
  title: 'Beef with Rice',
  description: 'plain rice with ground beef',
  // eslint-disable-next-line max-len
  imageUrl: 'https://res.cloudinary.com/tovieyeozim/image/upload/c_fill,w_200,h_200/v1532706744/hbj4qsguzdi78xcksws8.jpg',
  price: 2000,
},
{
  id: '5422b66c-09a2-4413-81b1-a8ceed0a66bb',
  userId: catererTovieye.id,
  title: 'Spaghetti and Sauce',
  description: 'Filling and Tasty',
  // eslint-disable-next-line max-len
  imageUrl: 'https://res.cloudinary.com/tovieyeozim/image/upload/c_fill,w_200,h_200/v1532701830/hz2fmblixkuvbfnt4vvv.jpg',
  price: 1500,
},
{
  id: 'a30194b2-7925-48bf-99f2-5847042f34fd',
  userId: catererTovieye.id,
  title: 'Amala and Ewedu',
  description: 'traditional',
  // eslint-disable-next-line max-len
  imageUrl: 'https://res.cloudinary.com/tovieyeozim/image/upload/c_fill,w_200,h_200/v1532723568/rfja8q5tmldmtga2uc29.jpg',
  price: 1800,
},
{
  id: '226ecfc3-82bf-4075-b623-ea0c1fe1bb25',
  userId: catererDouglas.id,
  title: 'Starch and Owho',
  description: 'affordable',
  // eslint-disable-next-line max-len
  imageUrl: 'https://res.cloudinary.com/tovieyeozim/image/upload/c_fill,w_200,h_200/v1532723402/ifzj4ynikksdo6tdtvko.jpg',
  price: 1800,
},
{
  id: '443b76e7-b152-4937-890e-492c842b45a8',
  userId: catererDouglas.id,
  title: 'Pancake and Syrup',
  description: 'affordable',
  // eslint-disable-next-line max-len
  imageUrl: 'https://res.cloudinary.com/tovieyeozim/image/upload/c_fill,w_200,h_200/v1532722391/qgj8cexfzuopitoldmt7.jpg',
  price: 1800,
},
{
  id: 'a49498b3-889a-43f9-8582-058da7b8402a',
  userId: catererDouglas.id,
  title: 'Starch and Owho',
  description: 'affordable',
  // eslint-disable-next-line max-len
  imageUrl: 'http://res.cloudinary.com/tovieyeozim/image/upload/c_fill,w_200,h_200/v1532723533/c4wpnbdit8pisnwlhk7x.jpg',
  price: 1800,
}
];
export const seedMenus = [{
  id: '443b76e7-b152-4937-890e-492c842b45a8',
  userId: catererTovieye.id,
  menuDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: 'a49498b3-889a-43f9-8582-058da7b8402a',
  userId: catererDouglas.id,
  menuDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
}
];

const catererTovieyeMenu = seedMenus[0];
const catererDouglasMenu = seedMenus[1];


export const seedMealMenus = [{
  mealId: seedMeals[0].id,
  menuId: catererTovieyeMenu.id,
  userId: catererTovieye.id,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  mealId: seedMeals[1].id,
  menuId: catererTovieyeMenu.id,
  userId: catererTovieye.id,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  mealId: seedMeals[2].id,
  menuId: catererTovieyeMenu.id,
  userId: catererTovieye.id,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  mealId: seedMeals[3].id,
  menuId: catererDouglasMenu.id,
  userId: catererDouglas.id,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  mealId: seedMeals[4].id,
  menuId: catererDouglasMenu.id,
  userId: catererDouglas.id,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  mealId: seedMeals[5].id,
  menuId: catererDouglasMenu.id,
  userId: catererDouglas.id,
  createdAt: new Date(),
  updatedAt: new Date()
}];

export const seedOrders = [
  {
    id: '1b977331-743a-446b-9609-4d9ad0f708eb',
    userId: customerDienebi.id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'e4d5fd31-0f5c-4bd1-9961-c04ffdcce761',
    userId: customerDienebi.id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '896eb33f-5e2d-4845-8721-a7650970323c',
    userId: customerDienebi.id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '1bb42c5b-6f75-4ee6-b2e1-e2642518c20c',
    userId: customerDienebi.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const seedMealOrders = [
  {
    orderId: seedOrders[0].id,
    mealId: seedMeals[0].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[0].id,
    mealId: seedMeals[1].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[0].id,
    mealId: seedMeals[5].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[1].id,
    mealId: seedMeals[0].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[1].id,
    mealId: seedMeals[1].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[1].id,
    mealId: seedMeals[4].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[2].id,
    mealId: seedMeals[2].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[2].id,
    mealId: seedMeals[3].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[2].id,
    mealId: seedMeals[4].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[3].id,
    mealId: seedMeals[0].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[3].id,
    mealId: seedMeals[4].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    orderId: seedOrders[3].id,
    mealId: seedMeals[5].id,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];
