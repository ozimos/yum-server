export default {
  up: queryInterface => queryInterface.bulkInsert('Meals', [{
    id: '6066e6ad-6ebd-4861-b932-b72c095f69e6',
    userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    title: 'Beef with Rice',
    menuTitle: 'Today',
    description: 'plain rice with ground beef',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg',
    price: 2000,
  },
  {
    id: 'adb53a5a-06c7-4067-8062-c71a7ac5484e',
    userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    title: 'Spaghetti and Sauce',
    description: 'plain rice with ground beef',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg',
    price: 1500,
  },
  {
    id: 'a30194b2-7925-48bf-99f2-5847042f34fd',
    userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    title: 'Amala and Ewedu',
    description: 'plain rice with ground beef',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg',
    price: 1800,
  }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Meals', null)
};